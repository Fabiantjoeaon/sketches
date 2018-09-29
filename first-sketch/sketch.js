import canvasSketch from "canvas-sketch";
import { random } from "canvas-sketch-util";
import _ from "lodash";

document.body.style.backgroundColor = "#fff";

const settings = {
    animate: true,
    duration: 15,
    dimensions: [2048, 2048],
    fps: 60
};

const params = {
    numCircles: _.range(20),
    squareSize: 30,
    circleRadius: 80
};

const palette = ["#C484EC", "#8a6feb", "#AC58E2", "#7f5fef"];

const sketch = () => {
    const { squareSize, numCircles, circleRadius } = params;

    const renderSquare = ({ ctx, x, y, radius, fill }) => {
        // ctx.fillStyle = fill;

        // ctx.translate(x + squareSize / 2, y + squareSize / 2);
        // ctx.rotate(rotation);
        // ctx.translate(-1 * (x + squareSize / 2), -1 * (y + squareSize / 2));
        // ctx.fillRect(x, y, squareSize, squareSize);
        ctx.beginPath();
        ctx.strokeStyle = fill;
        ctx.lineWidth = 5;
        ctx.moveTo(x, y);
        ctx.arcTo(x + 20, y + 20, x + 40, y + 40, radius);
        ctx.stroke();
    };

    // HINT: Treat this like a render method!
    return ({ context: ctx, width, height, playhead, time }) => {
        // ctx.fillStyle = "#850fd0";
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, width, height);

        // Sketch here:
        // HINT: For an element around a centre at (x, y), distance r, the element's centre should be positioned at:
        // (x + r cos(2kπ/n), y + r sin(2kπ/n))

        // TODO: Have every circle be a different color iterating in color
        // TODO: Calculate total radius (or length of the outer circle) of each circle and divide width of each rectangle randomly
        // TODO: Bend arc to shape of circle
        // TODO: Easing?
        const center = {
            x: width / 2,
            y: width / 2
        };

        const t = Math.sin(playhead * Math.PI);

        for (const j in numCircles) {
            const isEvenOrOneven = j % 2;
            const circleT = isEvenOrOneven ? t * 1.5 : t;
            const isReverse = isEvenOrOneven ? t * -1 : t;
            const numSquares = _.range(j * 10);

            for (const i in numSquares) {
                const angle = (i / (numSquares.length / 2)) * Math.PI;
                const radius = j * circleRadius;
                renderSquare({
                    ctx,
                    x:
                        center.x +
                        radius * Math.cos(angle + isReverse) -
                        squareSize / 2,
                    y:
                        center.y +
                        radius * Math.sin(angle + isReverse) -
                        squareSize / 2,
                    radius: circleRadius,
                    fill: palette[Math.floor(j / palette.length)]
                });
            }
        }
    };
};

canvasSketch(sketch, settings);
