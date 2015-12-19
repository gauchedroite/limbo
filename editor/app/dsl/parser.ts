import Scanner from "./scanner";

export default class Parser {
    constructor(private scanner: Scanner) {
        scanner.separators = (op: string): Array<string> => {
            var seps = [" ", ",", "=", "\n"];
            if (op == ".location")
                seps = ["/", "\n"];
            else if (op == ".character")
                seps = ["/", "\n"];
            else if (op == ".line" || op == ".parenthetical")
                seps = ["\n"];
            return seps;
        };
    }
    parse = (): any => {
        var node = {};
        this.scanner.nextSymbol();
        this.parse_scene(node);
        this.scanner.accept("");
        //console.log(JSON.stringify(node));
        return node;
    };
    parse_scene = (node: any) => {
        this.parse_scene_main(node);
        this.parse_extra(node);
        this.parse_body_csv(node);
    };
    parse_scene_main = (node: any) => {
        node.main = {};
        this.parse_location(node.main);
        var when = this.parse_when(node.main);
        if (when == null)
            node.main.when = { err: "When is missing" };
    }
    parse_extra = (node: any) => {
        node.extra = {};
        var found = false;
        do {
            found = (this.parse_then(node.extra) != null);
            found = found || (this.parse_remember(node.extra) != null);
            found = found || (this.parse_timeout(node.extra) != null);
        } while (found);
    }
    parse_location = (node: any): any => {
        if (this.scanner.accept(".location")) {
            var location: any = {};
            var idtext = this.splitKeys(this.scanner.symbol);
            location.id = idtext.id;
            location.text = idtext.text;
            this.scanner.nextSymbol();
            if (this.scanner.accept("/")) {
                location.key = this.scanner.symbol;
                this.scanner.nextSymbol();
            }
            return node.location = location;
        }
        return node.location = {err: "Location is missing"};
    };
    parse_when = (node: any) => {
        if (this.scanner.accept(".when")) {
            var when: any = [];
            do {
                if (this.scanner.symbol.charAt(0) == ".") {
                    return node.when = {err: "When: missing condition"};
                }
                when.push(this.scanner.symbol);
                this.scanner.nextSymbol();
            } while (this.scanner.accept(","));
            return node.when = when;
        }
        return null;
    };
    parse_then = (node: any): any => {
        if (this.scanner.accept(".then")) {
            var then: any = {};
            then.character = this.scanner.symbol;
            if (then.character.charAt(0) == ".")
                return node.then = {err: "Then: missing character"};
                
            then.concept = this.scanner.nextSymbol();
            if (then.concept.charAt(0) == ".")
                return node.then = {err: "Then: missing concept"};
                
            this.scanner.nextSymbol();
            return node.then = then;
        }
        return null;
    }
    parse_remember = (node: any): any => {
        if (this.scanner.accept(".remember")) {
            var remember: any = {};
            remember.key = this.scanner.symbol;
            if (remember.key.charAt(0) == ".")
                return node.remember = {err: "Remember: missing key"};
            
            this.scanner.nextSymbol();
            if (this.scanner.symbol.charAt(0) == ".")
                return node.remember = {err: "Remember: missing '='"};

            if (this.scanner.accept("=") == false) {
                this.scanner.skipToNextLine();
                return node.remember = {err: "Remember: invalid syntax"};
            }
            
            remember.value = this.scanner.symbol;
            if (this.scanner.symbol.charAt(0) == ".")
                return node.remember = {err: "Remember: missing value"};
            
            this.scanner.nextSymbol();
            return node.remember = remember;
        }
        return null;
    }
    parse_timeout = (node: any): any => {
        if (this.scanner.accept(".timeout")) {
            var timeout = this.scanner.symbol;
            if (timeout.charAt(0) != ".") {
                this.scanner.nextSymbol();
                return node.timeout = timeout;
            }
            return node.timeout = {err: "Timeout: missing duration"};
        }
        return null;
    }
    parse_body_csv = (node: any) => {
        node.body = [];
        do {
            var step = {};
            node.body.push(step);
            this.parse_when(step);
            this.parse_body_do(step);
        } while (this.scanner.symbol != null)
    }
    parse_body_do = (node: any) => {
        var action = this.parse_action({});
        if (action != null) {
            node.action = action;
            return action;
        }
        if (this.scanner.accept(".question")) {
            node.question = {};
            var character = this.parse_character({});
            if (character == null) {
                this.scanner.nextSymbol();
                return node.question = {err: "Missing character (question)"};
            }
            node.question.character = character;
            var ask = this.parse_line({});
            if (ask == null) {
                node.question.ask = {err: "Query needs a question"};
                node.question.choices = [];
                this.scanner.nextSymbol();
                return node.question;
            }
            node.question.ask = ask;
            node.question.choices = [];
            this.parse_query(node.question.choices);
            return node.question;
            
        } else if (this.scanner.accept(".random")) {
            node.random = {};
            var character = this.parse_character({});
            if (character == null) {
                this.scanner.nextSymbol();
                return node.random = {err: "Missing character (random)"};
            }
            node.random.character = character;
            node.random.lines = [];
            this.parse_dialog(node.random.lines);
            return node.random;
            
        } else {
            node.dialog = {};
            var character = this.parse_character({});
            if (character != null) {
                node.dialog.character = character;
                var line = this.parse_line({});
                if (line == null)
                    return node.dialog.line = {err: "Dialog: missing line"};
                return node.dialog.line = line;
            } else {
                var symbol = this.scanner.symbol;
                if (symbol.charAt(0) == ".") {
                    this.scanner.skipToNextLine();
                    return node.dialog = {err: `Invalid command: ${symbol}`};
                }
                this.scanner.nextSymbol();
                return node.dialog = {err: "Missing character (dialog)"};
            }
        }
    }
    parse_action = (node: any): any => {
        var line = this.parse_line({});
        if (line != null) {
            node.text = line;
            this.parse_style(node);
            return node;
        }
        return null;
    }
    parse_dialog = (node: any) => {
        var line = this.parse_dialog_line({});
        if (line == null) {
            this.scanner.nextSymbol();
            return node = {err: "Needs at least one dialog line"};
        }
        node.push(line);
        do {
            var line = this.parse_dialog_line({});
            if (line == null)
                break;
            node.push(line);
        } while (true);
    }
    parse_dialog_line = (node: any): any => {
        if (this.parse_line(node) != null) {
            this.parse_odds(node);
            this.parse_then(node);
            this.parse_remember(node);
            return node;
        }
        return null;
    }
    parse_odds = (node: any): any => {
        if (this.scanner.accept(".odds")) {
            var odds = this.scanner.symbol;
            if (odds.charAt(0) == ".")
                return node.odds = {err: "Odds: missing value"};
            this.scanner.nextSymbol();
            return node.odds = odds;
        }
        return null;
    }
    parse_query = (node: any) => {
        do {
            var line = this.parse_query_line({});
            if (line == null)
                break;
            node.push(line);
        } while (true);
    }
    parse_query_line = (node: any): any => {
        if (this.parse_line(node) != null) {
            this.parse_default(node);
            this.parse_then(node);
            this.parse_remember(node);
            return node;
        }
        return null;
    }
    parse_default = (node: any): any => {
        if (this.scanner.accept(".default")) {
            return node.def = true;
        }
        return null;
    }
    parse_line = (node: any): any => {
        if (this.scanner.accept(".line")) {
            var line = this.scanner.symbol;
            this.scanner.nextSymbol();
            return node.line = line;
        }
        return null;
    }
    parse_style = (node: any): any => {
        if (this.scanner.accept(".style")) {
            var style = this.scanner.symbol;
            if (style.charAt(0) != ".") {
                this.scanner.nextSymbol();
                return node.style = style;
            }
            return node.style = {err: "Style: missing value"};
        }
    }
    parse_character = (node: any): any => {
        if (this.scanner.accept(".character")) {
            var character: any = {};
            var idtext = this.splitKeys(this.scanner.symbol);
            character.id = idtext.id;
            character.actor = idtext.text;
            if (character.actor.charAt(0) == ".")
                return node.character = {err: "Character: missing name"};
            this.scanner.nextSymbol();
            if (this.scanner.accept("/")) {
                character.mood = this.scanner.symbol;
                this.scanner.nextSymbol();
            }
            if (this.scanner.accept(".parenthetical")) {
                character.parenthetical = this.scanner.symbol;
                this.scanner.nextSymbol();
            }
            return node.character = character;
        }
        return null;
    }
    splitKeys = (symbol: string) => {
        var ix = symbol.indexOf(":");
        if (ix == -1)
            return {
                id: null,
                text: symbol 
            };
        else
            return {
                id: symbol.substr(0, ix),
                text: symbol.substr(ix + 1)
            };
    }
}
