import { Rule } from "./rule";
import { isValidAlphabetSymbol } from "./types";

export class LSystem {

    private _axiom: string = '';
    private _rules: Rule[];
    private _sentence: string = '';
    private _generation: number = 0;

    constructor (axiom: string, rules: (string | Rule)[]) {
        this.axiom = axiom;
        this._rules = rules.map(rule => typeof rule === 'string' ? new Rule(rule) : rule);
        this.init();
    }

    private init() {
        this._sentence = this._axiom;
        this._generation = 0;
    }

    /**
     * 
     * @param { number } n 
     */
    generate(n: number = 1): void {
        let nextGen: string;

        for (let i = 0; i < n; i++) {
            nextGen = '';
            this._sentence.split('').forEach(c => {
                const rule = this._rules.find(r => r.base === c);
                nextGen = nextGen.concat(rule === undefined ? c : rule.nextString);
            });
            this._sentence = nextGen;
            this._generation++;
        }
    }

    get sentence(): string {
        return this._sentence;
    }

    get generation(): number {
        return this._generation;
    }

    get rules(): Rule[] {
        return [ ...this._rules ];
    }

    set axiom(val: string) {
        val.split('').forEach((c) => {
            if (!isValidAlphabetSymbol(c)) {
                throw new Error(`Symbol '${c}' not recognized in axiom`);
            }
        });
        this._axiom = val;
        this.init();
    }

    get axiom(): string {
        return this._axiom;
    }
}
