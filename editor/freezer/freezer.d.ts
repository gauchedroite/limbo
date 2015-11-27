declare class Freezer {
    constructor(initialValue: any, options?: any);
    get(): any;
    on(event: string, callback: (newValue: any) => void): void;
    trigger(event: string, value: any): void;
}

export = Freezer;
