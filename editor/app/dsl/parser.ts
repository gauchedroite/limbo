import Scanner from "./scanner";
import AstNode from "./ast";

export default class Parser {
    ast = new AstNode("scene");
    
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
    parse = () => {
        this.scanner.nextSymbol();
        this.parse_scene();
        this.scanner.accept("");
    };
    parse_scene = () => {
        this.parse_location();
        this.parse_when();
        this.parse_then();
        this.parse_remember();
        this.parse_timeout();
        this.parse_body_csv();
    };
    parse_location = (): any => {
        if (this.scanner.accept(".location")) {
            var location: any = { type: "location" };
            location.text = this.scanner.symbol;
            this.scanner.nextSymbol();
            if (this.scanner.accept("/")) {
                location.key = this.scanner.symbol;
                this.scanner.nextSymbol();
            }
            console.log(location);
            return location;
        }
        console.log("**LOCATION IS MANDATORY");
        this.scanner.nextSymbol();
        return null;
    };
    parse_when = () => {
        if (this.scanner.accept(".when")) {
            var when: any = { type: "when", conditions: [] };
            do {
                when.conditions.push(this.scanner.symbol);
                this.scanner.nextSymbol();
            } while (this.scanner.accept(","));
            console.log(when);
            return when;
        }
        return null;
    };
    parse_then = (): any => {
        if (this.scanner.accept(".then")) {
            var then: any = { type: "then" };
            then.character = this.scanner.symbol;
            then.concept = this.scanner.nextSymbol();
            this.scanner.nextSymbol();
            console.log(then);
            return then;
        }
        return null;
    }
    parse_remember = (): any => {
        if (this.scanner.accept(".remember")) {
            var remember: any = { type: "remember" };
            remember.key = this.scanner.symbol;
            this.scanner.nextSymbol();
            if (this.scanner.accept("=")) {
                remember.value = this.scanner.symbol;
                this.scanner.nextSymbol();
                console.log(remember);
                return remember;
            } else {
                console.log("**invalid REMEMBER");
                this.scanner.nextSymbol();
            }
        }
        return null;
    }
    parse_timeout = (): any => {
        if (this.scanner.accept(".timeout")) {
            var timeout: any = { type: "timeout" };
            timeout.value = this.scanner.symbol;
            this.scanner.nextSymbol();
            console.log(timeout);
            return timeout;
        }
        return null;;;
    }
    parse_body_csv  = () => {
        do {
            this.parse_when(/*"optional"*/);
            this.parse_body_do();
        } while (this.scanner.symbol != null)
    }
    parse_body_do = () => {
        if (this.parse_action() != null)
            return;
        if (this.parse_character() != null) {
            if (this.scanner.accept(".question-mark")) {
                this.parse_query();
            } else {
                this.parse_dialog();
            }
            return;
        }
        console.log("**invalid BODY");
        this.scanner.nextSymbol();
    }
    parse_action = (): any => {
        var line = this.parse_line();
        this.parse_style();
        return line;
    }    
    parse_dialog = () => {
        if (this.parse_dialog_line() != null) {
            while (this.parse_dialog_line() != null) {}
        }
        else {
            console.log("**NEEDS AT LEAST ONE DIALOG LINE");
            this.scanner.nextSymbol();
        }
    }
    parse_dialog_line = (): any => {
        if (this.parse_line() != null) {
            this.parse_odds();
            this.parse_then();
            this.parse_remember();
            return true;
        }
        return null;
    }
    parse_odds = (): any => {
        if (this.scanner.accept(".odds")) {
            var odds: any = { type: "odds" };
            odds.text = this.scanner.symbol;
            this.scanner.nextSymbol();
            console.log(odds);
            return true;
        }
        return null;
    }
    parse_query = () => {
        if (this.parse_line() != null) {
            while (this.parse_query_line() != null) {}
        }
        else {
            console.log("**QUERY NEEDS A QUESTION");
            this.scanner.nextSymbol();
        }
    }
    parse_query_line = (): any => {
        if (this.parse_line() != null) {
            this.parse_default();
            this.parse_then();
            this.parse_remember();
            return true;
        }
        return null;
    }
    parse_default = (): any => {
        if (this.scanner.accept(".default")) {
            var def: any = { type: "default" };
            console.log(def);
            return def;
        }
        return null;
    }
    parse_line = (): any => {
        if (this.scanner.accept(".line")) {
            var line: any = { type: "line" };
            line.text = this.scanner.symbol;
            this.scanner.nextSymbol();
            console.log(line);
            return line;
        }
        return null;
    }
    parse_style = (): any => {
        if (this.scanner.accept(".style")) {
            var style: any = { type: "style" };
            style.text = this.scanner.symbol;
            this.scanner.nextSymbol();
            console.log(style);
            return style;
        }
        return null;
    }
    parse_character = (): any => {
        if (this.scanner.accept(".character")) {
            var character: any = { type: "character"};
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
            console.log(character);
            return character;
        }
        return null;
    }
}
