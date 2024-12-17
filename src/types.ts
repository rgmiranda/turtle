export const alphabetSymbols = ['F', 'G', 'H', 'L', 'M', 'D', 'U', '+', '-', '[', ']'] as const;
export type AlphabetSymbol = typeof alphabetSymbols[number];

export const isValidAlphabetSymbol = (chr: string) => alphabetSymbols.includes(chr as AlphabetSymbol);
