import { Greeter } from "../../services/greeter-service/greeter";
import { complex, Complex, add,multiply, sqrt, pow } from "mathjs";
const TRESHOLD = 2;
const ITERA = 3;
const WIDTH = 100;
const HEIGHT = 100;

const REAL_SET = { start: -2, end: 1 }
const IMAGINARY_SET = { start: -1, end: 1 };

const colors = new Array(16).fill(0).map((_, i) => i === 0 ? '#000' : `#${((1 << 24) * Math.random() | 0).toString(16)}`);

function getColor(x: number){
   
}

function mandelbrot(c: Complex) {
    let z: Complex = complex(0, 0), n = 0, p: Complex, d: number;
    /*do {
        p = {
            x: Math.pow(z.x, 2) - Math.pow(z.y, 2),
            y: 2 * z.x * z.y
        }
        z = {
            x: p.x + c.x,
            y: p.y + c.y
        }
        d = Math.sqrt(Math.pow(z.x, 2) + Math.pow(z.y, 2));
        n += 1;
    } while (d <= TRESHOLD && n < ITERA);*/
    do {
        p = <Complex>pow(z, 2);
        z = <Complex>add(p, c);
        d = Math.sqrt(Math.pow(z.re, 2) + Math.pow(z.im, 2));
        n += 1;
    } while (d <= TRESHOLD && n < ITERA);
    return {n: n, d: d <= TRESHOLD};
}

window.onload = () => {
    let canvas = <HTMLCanvasElement>document.getElementById('canvas');
    if (canvas.getContext) {
      let ctx = canvas.getContext('2d');
      for (let i = 0; i < WIDTH; i++) {
        for (let j = 0; j < HEIGHT; j++) {
            let complexNum: Complex = complex(REAL_SET.start + (i / WIDTH) * (REAL_SET.end - REAL_SET.start),
               IMAGINARY_SET.start + (j / HEIGHT) * (IMAGINARY_SET.end - IMAGINARY_SET.start));

            const {n, d} = mandelbrot(complexNum);
            ctx.fillStyle = colors[d ? 0 : (n % colors.length - 1) + 1];
            ctx.fillRect(i, j, 1, 1);
        }
        }
    }

}

