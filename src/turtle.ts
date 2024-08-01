import { AlphabetSymbol } from "./types";

export interface ScaleOptions {
    ratio: number,
    scaleStrokeSize?: boolean,
    scaleStrokeWeight?: boolean,
    scaleAngle?: boolean,
};

export interface TurtleConfig {
    context: CanvasRenderingContext2D,
    strokeSize: number,
    strokeWeight: number,
    angle: number,
    scale: ScaleOptions,
};

export class Turtle {

    /**
     * @type { number }
     */
    private currentScale: number = 1

    private readonly alphabetMap: Record<AlphabetSymbol, () => void> = {
        F: () => {
            const ctx = this.config.context;
            const lineWith = this.config.scale.scaleStrokeWeight ? this.config.strokeWeight * this.currentScale : this.config.strokeWeight;
            const lineSize = this.config.scale.scaleStrokeSize ? this.config.strokeSize * this.currentScale : this.config.strokeSize;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineCap = 'round';
            ctx.lineWidth = lineWith;
            ctx.lineTo(lineSize, 0);
            ctx.stroke();
            ctx.translate(lineSize, 0);
        },
        G: () => {
            const ctx = this.config.context;
            const lineWith = this.config.scale.scaleStrokeWeight ? this.config.strokeWeight * this.currentScale : this.config.strokeWeight;
            const lineSize = this.config.scale.scaleStrokeSize ? this.config.strokeSize * this.currentScale : this.config.strokeSize;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineCap = 'round';
            ctx.lineWidth = lineWith;
            ctx.lineTo(lineSize, 0);
            ctx.stroke();
            ctx.translate(lineSize, 0);
        },
        L: () => {
            const ctx = this.config.context;
            const lineWith = this.config.scale.scaleStrokeWeight ? this.config.strokeWeight * this.currentScale : this.config.strokeWeight;
            const lineSize = this.config.scale.scaleStrokeSize ? this.config.strokeSize * this.currentScale : this.config.strokeSize;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineCap = 'round';
            ctx.lineWidth = lineWith;
            ctx.arc(lineSize * 0.5, lineSize * 0.5, lineSize * Math.SQRT1_2, Math.PI * 1.25, Math.PI * 1.75);
            ctx.arc(lineSize * 0.5, -lineSize * 0.5, lineSize * Math.SQRT1_2, Math.PI * 0.25, Math.PI * 0.75);
            ctx.stroke();
        },
        M: () => {
            const lineSize = this.config.scale.scaleStrokeSize ? this.config.strokeSize * this.currentScale : this.config.strokeSize;
            this.config.context.translate(lineSize, 0);
        },
        D: () => this.currentScale *= this.config.scale.ratio,
        U: () => this.currentScale /= this.config.scale.ratio,
        "+": () => {
            const angle = this.config.scale.scaleAngle ? this.config.angle * this.currentScale : this.config.angle;
            this.config.context.rotate(angle);
        },
        "-": () => {
            const angle = this.config.scale.scaleAngle ? this.config.angle * this.currentScale : this.config.angle;
            this.config.context.rotate(-angle);
        },
        "[": () => this.config.context.save(),
        "]": () => this.config.context.restore()
    };

    
    constructor(public config: TurtleConfig) {
    }

    /**
     * 
     * @param { string } sentence 
     */
    render(sentence: string) {
        for (let i = 0; i < sentence.length; i++) {
            const chr = sentence[i] as AlphabetSymbol;
            const fn = this.alphabetMap[chr];
            if (typeof fn === 'function') {
                fn.call(this);
            }
        }
    }

    /**
     * 
     * @param { number } x 
     * @param { number } y 
     * @param { number } angle 
     */
    init(x: number, y: number, angle: number) {
        this.config.context.resetTransform();
        this.config.context.translate(x, y);
        this.config.context.rotate(angle);
        this.currentScale = 1;
    }
}