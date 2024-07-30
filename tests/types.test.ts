import { describe, expect, it } from "vitest";
import { isValidAlphabetSymbol } from "../src/types";

describe(isValidAlphabetSymbol.name, () => {

    const testData = [
        ['F', true],
        ['G', true],
        ['FG', false],
        ['', false],
        ['X', false],
    ];

    it.each(testData)('validates correctly', (c: any, expected: any) => {
        expect(isValidAlphabetSymbol(c)).toBe(expected);
    });
})