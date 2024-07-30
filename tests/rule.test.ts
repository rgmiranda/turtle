import { describe, expect, it } from "vitest";
import { Rule } from "../src";

describe(Rule.name, () => {
   
    it('creates an instance', () => {
        const r = new Rule('F=>F');
        expect(r).toBeInstanceOf(Rule);
    });
   
    const rulePartsData = [
        ['F=>FG+', 'F', 'FG+'],
        ['+=>LFG[]', '+', 'LFG[]'],
        ['+   =>LFG[]', '+', 'LFG[]'],
        ['+   =>LFG[]', '+', 'LFG[]'],
        ['+=>   LFG[]', '+', 'LFG[]'],
        ['+   =>   LFG[]', '+', 'LFG[]'],
        ['   + => LFG[ ]   ', '+', 'LFG[]'],
    ];

    it.each(rulePartsData)('detects rule parts', (s, c, p) => {
        const r = new Rule(s);
        expect(r).toBeInstanceOf(Rule);
        expect(r.base).toBe(c);
        expect(r.nextString).toBe(p);
    });

    const invalidRules = [
        ['FF=>FG+', 'Unrecognized rule pattern'],
        ['F=>', 'Unrecognized rule pattern'],
        ['=>FG', 'Unrecognized rule pattern'],
        ['Y=>FG+', "Symbol 'Y' not recognized in condition"],
        ['F=>FGY+', "Symbol 'Y' not recognized in predicate"],
    ];
    it.each(invalidRules)('fails on invalid rules', (str, err) => {
        expect(() => new Rule(str)).toThrowError(err);
    });
});