import Scanner from "./scanner";

export default class Parser {
    constructor(private scanner: Scanner) {
        scanner.separators = (op: string): Array<string> => {
            var seps = [" ", ",", "=", "\n"];
            if (op == ".location")
                seps = ["/", "\n"];
            else if (op == ".character")
                seps = ["/", "\n"];
            else if (op == ".line")
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
        this.parse_when(node.main);
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
            location.text = this.scanner.symbol;
            this.scanner.nextSymbol();
            if (this.scanner.accept("/")) {
                location.key = this.scanner.symbol;
                this.scanner.nextSymbol();
            }
            return node.location = location;
        }
        node.location = "Location: mandatory";
        return null;
    };
    parse_when = (node: any) => {
        if (this.scanner.accept(".when")) {
            var when: any = [];
            do {
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
            then.concept = this.scanner.nextSymbol();
            this.scanner.nextSymbol();
            return node.then = then;
        }
        return null;
    }
    parse_remember = (node: any): any => {
        if (this.scanner.accept(".remember")) {
            var remember: any = {};
            remember.key = this.scanner.symbol;
            this.scanner.nextSymbol();
            if (this.scanner.accept("=")) {
                remember.value = this.scanner.symbol;
                this.scanner.nextSymbol();
                return node.remember = remember;
            } else {
                node.remember = "Remember: invalid syntax";
                this.scanner.skipToNextLine();
                return null;
            }
        }
        return null;
    }
    parse_timeout = (node: any): any => {
        if (this.scanner.accept(".timeout")) {
            var timeout = this.scanner.symbol;
            this.scanner.nextSymbol();
            return node.timeout = timeout;
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
            if (character != null) {
                node.question.character = character;
                var ask = this.parse_line({});
                if (ask != null) {
                    node.question.ask = ask;
                    node.question.choices = [];
                    this.parse_query(node.question.choices);
                    return node.question;
                } else {
                    node.err = "Query needs a question";
                    this.scanner.nextSymbol();
                    return null;
                }
            } else {
                node.err = "Missing character (question)";
                this.scanner.nextSymbol();
                return null;
            }
        } else if (this.scanner.accept(".random")) {
            node.random = {};
            var character = this.parse_character({});
            if (character != null) {
                node.random.character = character;
                node.random.lines = [];
                this.parse_dialog(node.random.lines);
                return node.random;
            } else {
                node.err = "Missing character (random)";
                this.scanner.nextSymbol();
                return null;
            }
        } else {
            node.dialog = {};
            var character = this.parse_character({});
            if (character != null) {
                node.dialog.character = character;
                var line = this.parse_line({});
                return node.dialog.line = line;
            } else {
                node.err = "Missing character (dialog)";
                this.scanner.nextSymbol();
                return null;
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
        if (line != null) {
            node.push(line);
            do {
                var line = this.parse_dialog_line({});
                if (line == null)
                    break;
                node.push(line);
            } while (true);
        } else {
            node.err = "Needs at least one dialog line";
            this.scanner.nextSymbol();
        }
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
            this.scanner.nextSymbol();
            return node.style = style;
        }
        return null;
    }
    parse_character = (node: any): any => {
        if (this.scanner.accept(".character")) {
            var character: any = {};
            character.actor = this.scanner.symbol;
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
}
