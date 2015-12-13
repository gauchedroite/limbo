
export default class AstNode {
    type: string;
    children: Array<AstNode>;
    value: string;
    constructor(type: string) {
        this.type = type;
    }
}
