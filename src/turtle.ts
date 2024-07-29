import { AlphabetSymbol } from "./types";

export class Turtle {

    /**
     * @type { number }
     */
    private currentScale: number = 1

    private readonly alphabetMap: Record<AlphabetSymbol, () => void> = {
        F: () => {
            this.ctx.beginPath();
            this.ctx.moveTo(0, 0);
            this.ctx.lineCap = 'round';
            this.ctx.lineWidth = this.strokeWeight * this.currentScale;
            this.ctx.lineTo(this.strokeSize * this.currentScale, 0);
            this.ctx.stroke();
            this.ctx.translate(this.strokeSize * this.currentScale, 0);
        },
        G: () => {
            this.ctx.beginPath();
            this.ctx.moveTo(0, 0);
            this.ctx.lineCap = 'round';
            this.ctx.lineWidth = this.strokeWeight * this.currentScale;
            this.ctx.lineTo(this.strokeSize * this.currentScale, 0);
            this.ctx.stroke();
            this.ctx.translate(this.strokeSize * this.currentScale, 0);
        },
        L: () => {
            this.ctx.beginPath();
            this.ctx.moveTo(0, 0);
            this.ctx.lineCap = 'round';
            this.ctx.lineWidth = this.strokeWeight * this.currentScale;
            this.ctx.arc(this.strokeSize * this.currentScale * 0.5, this.strokeSize * this.currentScale * 0.5, this.strokeSize * this.currentScale * Math.SQRT1_2, Math.PI * 1.25, Math.PI * 1.75);
            this.ctx.arc(this.strokeSize * this.currentScale * 0.5, -this.strokeSize * this.currentScale * 0.5, this.strokeSize * this.currentScale * Math.SQRT1_2, Math.PI * 0.25, Math.PI * 0.75);
            this.ctx.stroke();
        },
        M: () => this.ctx.translate(this.strokeSize * this.currentScale, 0),
        D: () => this.currentScale *= this.scale,
        U: () => this.currentScale /= this.scale,
        "+": () => this.ctx.rotate(this.angle),
        "-": () => this.ctx.rotate(-this.angle),
        "[": () => this.ctx.save(),
        "]": () => this.ctx.restore()
    };

    /**
     * 
     * @param { CanvasRenderingContext2D } ctx 
     * @param { number } strokeSize 
     * @param { number } strokeWeight 
     * @param { number } angle
     * @param { number } scale
     */
    constructor(
        public ctx: CanvasRenderingContext2D,
        public strokeSize: number,
        public strokeWeight: number,
        public angle: number,
        public scale: number) {
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
        this.ctx.resetTransform();
        this.ctx.translate(x, y);
        this.ctx.rotate(angle);
        this.currentScale = 1;
    }
}