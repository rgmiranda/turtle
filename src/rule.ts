import { AlphabetSymbol, isValidAlphabetSymbol } from "./types";

export class Rule {
    
    private _base: AlphabetSymbol;

    private _next: AlphabetSymbol[];

    constructor(rule: string) {
        const matches = rule.replace(/\s/g, '').match(/^(.)(-|=)>(.+)$/);
        if (!matches) {
            throw new Error('Unrecognized rule pattern');
        }
        const base = matches[1] as AlphabetSymbol;
        const next = matches[3];
        if (!isValidAlphabetSymbol(base)) {
            throw new Error(`Symbol '${base}' not recognized in condition`);
        }    
        this._base = base;
        this._next = [];
        next.split('').forEach(c => {
            if (!isValidAlphabetSymbol(c)) {
                throw new Error(`Symbol '${c}' not recognized in predicate`);
            }
            this._next.push(c as AlphabetSymbol);
        });
    }

    get base(): AlphabetSymbol {
        return this._base;
    }

    get next(): AlphabetSymbol[] {
        return this._next;
    }
    
    get nextString(): string {
        return this._next.join('');
    }

    public toString(): string {
        return `${this.base} => ${this._next.join('')}`;
    }
};