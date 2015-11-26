declare class Freezer {
    constructor(initialValue: any, options: any);
    get(): any;
    on(event: string, callback: (newValue: any) => void): void;
}

export = Freezer;
