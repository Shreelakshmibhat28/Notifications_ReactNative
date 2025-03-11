// global.d.ts
declare function require(context: string): {
    (id: string): any;
    keys(): string[];
    resolve(id: string): string;
    id: string;
};