function resizeCanvas() {
  const canvas = document.getElementById('myCanvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  drawSquares();
}

function drawSquares() {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    const squareSize = 80;
    const margin = 10;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Positions according to the provided image, with fewer squares in the top corners
    const positions = [
        // Top-left corner (smaller triangle)
        [10, 10], [100, 10], [190, 10],
        [10, 100], [100, 100],
        [10, 190],
        [10, 280],

        // Bottom-left corner
        [10, canvas.height - 90], [100, canvas.height - 90], [190, canvas.height - 90], [370, canvas.height - 90],
        [10, canvas.height - 180], [190, canvas.height - 180], [280, canvas.height - 180],
        [10, canvas.height - 270], [100, canvas.height - 270], [190, canvas.height - 270], [370, canvas.height - 270],
        [10, canvas.height - 360], [100, canvas.height - 360],
        [10, canvas.height - 450],

        // Top-right corner (smaller triangle)
        [canvas.width - 90, 10], [canvas.width - 180, 10], [canvas.width - 270, 10],
        [canvas.width - 90, 100], [canvas.width - 180, 100],
        [canvas.width - 90, 190], [canvas.width - 270, 190],
        [canvas.width - 180, 280],

        // Bottom-right corner
        [canvas.width - 90, canvas.height - 90], [canvas.width - 180, canvas.height - 90], [canvas.width - 360, canvas.height - 90], [canvas.width - 450, canvas.height - 90],
        [canvas.width - 90, canvas.height - 180], [canvas.width - 180, canvas.height - 180], [canvas.width - 270, canvas.height - 180], [canvas.width - 360, canvas.height - 180],
        [canvas.width - 90, canvas.height - 270],  [canvas.width - 270, canvas.height - 270],  [canvas.width - 270, canvas.height - 450],
        [canvas.width - 90, canvas.height - 360], [canvas.width - 180, canvas.height - 360],
        [canvas.width - 90, canvas.height - 450],

        // Diagonal from bottom-left to top-right
        [10, canvas.height - 90], [canvas.width - 90, 10],
    ];

    let squareParams = positions.map(() => ({
        scale: 1,
        shadowOpacity: 0.2,
        animating: false,
        animationStartTime: null,
        animationDirection: 1, // 1 for scaling down, -1 for scaling back up
    }));

    let currentAnimatingIndex = -1;

    function animateSquare(index) {
        if (index >= positions.length) return; // No more squares to animate

        let params = squareParams[index];
        params.animating = true;
        params.animationStartTime = Date.now();

        function animate() {
            let currentTime = Date.now();
            let elapsedTime = (currentTime - params.animationStartTime) / 1000; // Time in seconds
            let progress = elapsedTime / 1.5; // Duration of one stage of animation - 1.5 seconds

            if (progress > 1) {
                progress = 1;
            }

            if (params.animationDirection === 1) {
                params.scale = 1 - 0.2 * Math.sin(progress * Math.PI / 2);
                params.shadowOpacity = 0.2 * (1 - Math.sin(progress * Math.PI / 2));
            } else {
                params.scale = 0.8 + 0.2 * Math.sin(progress * Math.PI / 2);
                params.shadowOpacity = 0.2 * Math.sin(progress * Math.PI / 2);
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < positions.length; i++) {
                let [x, y] = positions[i];
                let p = squareParams[i];

                // Draw shadow
                ctx.fillStyle = 'rgba(247, 244, 235, 1)';
                ctx.shadowColor = `rgba(32, 32, 32, ${p.shadowOpacity})`;
                ctx.shadowBlur = 20;
                ctx.shadowOffsetX = 5;
                ctx.shadowOffsetY = 5;
                ctx.fillRect(x, y, squareSize, squareSize);

                // Draw square with modified size
                ctx.shadowColor = 'rgba(0, 0, 0, 0)'; // Remove shadow from the square
                ctx.fillStyle = 'rgba(247, 244, 235, 1)';
                ctx.fillRect(
                    x + (squareSize * (1 - p.scale)) / 2,
                    y + (squareSize * (1 - p.scale)) / 2,
                    squareSize * p.scale,
                    squareSize * p.scale
                );
            }

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                if (params.animationDirection === 1) {
                    params.animationDirection = -1;
                    params.animationStartTime = Date.now(); // Restart for the next stage
                    requestAnimationFrame(animate);
                } else {
                    params.animating = false;
                    currentAnimatingIndex++;
                    setTimeout(() => animateSquare(currentAnimatingIndex), 100); // Delay before animating the next square
                }
            }
        }

        animate();
    }

    function startAnimation() {
        currentAnimatingIndex = 0;
        animateSquare(currentAnimatingIndex);
    }

    startAnimation();

    canvas.addEventListener('mousemove', function(event) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        canvas.style.cursor = 'default';
        for (let i = 0; i < positions.length; i++) {
            const [x, y] = positions[i];
            if (mouseX >= x && mouseX <= x + squareSize && mouseY >= y && mouseY <= y + squareSize) {
                if (!squareParams[i].animating) {
                    animateSquare(i);
                }
                canvas.style.cursor = 'pointer';
                break;
            }
        }
    });
}




export default resizeCanvas;
