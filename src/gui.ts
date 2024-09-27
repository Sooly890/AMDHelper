import sdl from '@kmamal/sdl'
import { Canvas, CanvasRenderingContext2D, createCanvas, Image } from 'canvas'

export default class Gui{
    window: sdl.Sdl.Video.Window;
    canvas: Canvas;
    ctx: CanvasRenderingContext2D;
    async start(){
        this.window = sdl.video.createWindow( {title: "AMDHelper" } );
        this.canvas = createCanvas(this.window.width, this.window.width);
        this.ctx = this.canvas.getContext("2d");

        this.ctx.fillStyle;
        const img = new Image()
        img.src = ""

        const myself = this;     
        img.onload = function(){
            const ctx = myself.ctx as CanvasRenderingContext2D;

            ctx.drawImage(img, 0, 0);
        }

        this.window.on("mouseButtonUp", function(ev) {
            
        });
        this.window.on("resize", function(ev){
            myself.canvas.width = ev.pixelWidth;  // Set canvas width
            myself.canvas.height = ev.pixelHeight; // Set canvas height
        })
    }
}