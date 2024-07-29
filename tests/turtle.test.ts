import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Turtle } from '../src';
import { setupJestCanvasMock } from 'jest-canvas-mock'

describe(Turtle.name, () => {

    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;

    beforeEach(() => {
        vi.resetAllMocks();
        setupJestCanvasMock();

        canvas = document.createElement('canvas');
        canvas.width = 100;
        canvas.height = 100;
        ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    });
    
    it('creates instance', () => {
        const turtle = new Turtle(ctx, 20, 2, Math.PI * 0.5, 1);
        expect(turtle).toBeInstanceOf(Turtle);
    });

    it('inits graphics', () => {
        const turtle = new Turtle(ctx, 20, 2, Math.PI * 0.5, 1);
        turtle.init(50, 50, 0);
        expect(ctx.resetTransform).toHaveBeenCalledOnce();
        expect(ctx.translate).toHaveBeenCalledWith(50, 50);
        expect(ctx.rotate).toHaveBeenCalledWith(0);
    });

    it('draws straight line with F', () => {
        const turtle = new Turtle(ctx, 20, 2, Math.PI * 0.5, 1);
        turtle.render('F');
        expect(ctx.beginPath).toHaveBeenCalledOnce();
        expect(ctx.moveTo).toHaveBeenCalledWith(0, 0);
        expect(ctx.lineCap).toBe('round');
        expect(ctx.lineWidth).toBe(2);
        expect(ctx.lineTo).toHaveBeenCalledWith(20, 0);
        expect(ctx.stroke).toHaveBeenCalledOnce();
        expect(ctx.translate).toHaveBeenCalledWith(20, 0);
    });

    it('draws straight line with G', () => {
        const turtle = new Turtle(ctx, 20, 2, Math.PI * 0.5, 1);
        turtle.render('G');
        expect(ctx.beginPath).toHaveBeenCalledOnce();
        expect(ctx.moveTo).toHaveBeenCalledWith(0, 0);
        expect(ctx.lineCap).toBe('round');
        expect(ctx.lineWidth).toBe(2);
        expect(ctx.lineTo).toHaveBeenCalledWith(20, 0);
        expect(ctx.stroke).toHaveBeenCalledOnce();
        expect(ctx.translate).toHaveBeenCalledWith(20, 0);
    });

    it('moves the pencil', () => {
        const turtle = new Turtle(ctx, 20, 2, Math.PI * 0.5, 1);
        turtle.render('M');
        expect(ctx.translate).toHaveBeenCalledWith(20, 0);
    });

    it('rotates right', () => {
        const turtle = new Turtle(ctx, 20, 2, Math.PI * 0.5, 1);
        turtle.render('+');
        expect(ctx.rotate).toHaveBeenCalledWith(Math.PI * 0.5);
    });

    it('rotates left', () => {
        const turtle = new Turtle(ctx, 20, 2, Math.PI * 0.5, 1);
        turtle.render('-');
        expect(ctx.rotate).toHaveBeenCalledWith(-Math.PI * 0.5);
    });

    it('saves and restores context', () => {
        const turtle = new Turtle(ctx, 20, 2, Math.PI * 0.5, 1);
        turtle.render('[]');
        expect(ctx.save).toHaveBeenCalledOnce();
        expect(ctx.restore).toHaveBeenCalledOnce();
    });
});