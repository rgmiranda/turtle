import { describe, expect, it } from "vitest";
import { LSystem } from "../src/lsystem";
import { Rule } from "../src";

describe(LSystem.name, () => {
    it('creates an instance', () => {
        let lsystem = new LSystem('F', []);
        expect(lsystem).toBeInstanceOf(LSystem);
    });
    
    it('creates rules', () => {
        let lsystem = new LSystem('F', [
            'F=>F[+F][-F]',
            new Rule('G=>G'),
        ]);
        expect(lsystem).toBeInstanceOf(LSystem);
        expect(lsystem.rules.length).toBe(2);
    });
    
    it('fails on invalid rules', () => {
        expect(() => new LSystem('F', ['F=>K[+F][-F]'])).toThrowError("Symbol 'K' not recognized in predicate");
    });
    
    it('fails on invalid axioms', () => {
        expect(() => new LSystem('K', [])).toThrow("Symbol 'K' not recognized in axiom");
    });
    
    it('generates sentences', () => {
        let lsystem = new LSystem('F', [
            'F=>F[+F][-F]',
            new Rule('G=>G'),
        ]);
        expect(lsystem).toBeInstanceOf(LSystem);
        expect(lsystem.sentence).toBe('F');
        lsystem.generate();
        expect(lsystem.sentence).toBe('F[+F][-F]');
        
        lsystem.axiom = 'G';
        lsystem.generate();
        expect(lsystem.sentence).toBe('G');
    });
});