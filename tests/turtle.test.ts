import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Turtle } from '../src';
import { setupJestCanvasMock } from 'jest-canvas-mock'

describe(Turtle.name, () => {

    let canvas: HTMLCanvasElement;
    let context: CanvasRenderingContext2D;
    let turtle: Turtle;

    beforeEach(() => {
        vi.resetAllMocks();
        setupJestCanvasMock();

        canvas = document.createElement('canvas');
        canvas.width = 100;
        canvas.height = 100;
        context = canvas.getContext('2d') as CanvasRenderingContext2D;
        turtle = new Turtle({
            angle: Math.PI * 0.5,
            context,
            strokeSize: 20,
            strokeWeight: 2,
            scale: {
                ratio: 1,
                scaleStrokeSize: true,
                scaleStrokeWeight: true,
            }
        });
    });
    
    it('creates instance', () => {
        expect(turtle).toBeInstanceOf(Turtle);
    });

    it('inits graphics', () => {
        turtle.init(50, 50, 0);
        expect(context.resetTransform).toHaveBeenCalledOnce();
        expect(context.translate).toHaveBeenCalledWith(50, 50);
        expect(context.rotate).toHaveBeenCalledWith(0);
    });

    it('draws straight line with F', () => {
        turtle.render('F');
        expect(context.beginPath).toHaveBeenCalledOnce();
        expect(context.moveTo).toHaveBeenCalledWith(0, 0);
        expect(context.lineCap).toBe('round');
        expect(context.lineWidth).toBe(2);
        expect(context.lineTo).toHaveBeenCalledWith(20, 0);
        expect(context.stroke).toHaveBeenCalledOnce();
        expect(context.translate).toHaveBeenCalledWith(20, 0);
    });

    it('draws straight line with G', () => {
        turtle.render('G');
        expect(context.beginPath).toHaveBeenCalledOnce();
        expect(context.moveTo).toHaveBeenCalledWith(0, 0);
        expect(context.lineCap).toBe('round');
        expect(context.lineWidth).toBe(2);
        expect(context.lineTo).toHaveBeenCalledWith(20, 0);
        expect(context.stroke).toHaveBeenCalledOnce();
        expect(context.translate).toHaveBeenCalledWith(20, 0);
    });

    it('moves the pencil', () => {
        turtle.render('M');
        expect(context.translate).toHaveBeenCalledWith(20, 0);
    });

    it('rotates right', () => {
        turtle.render('+');
        expect(context.rotate).toHaveBeenCalledWith(Math.PI * 0.5);
    });

    it('rotates left', () => {
        turtle.render('-');
        expect(context.rotate).toHaveBeenCalledWith(-Math.PI * 0.5);
    });

    it('saves and restores context', () => {
        turtle.render('[]');
        expect(context.save).toHaveBeenCalledOnce();
        expect(context.restore).toHaveBeenCalledOnce();
    });
});