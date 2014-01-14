animatePath('arc', 2, 121, 0);
animatePath('bar', 2, 50, 180);

function animatePath(groupSelector, totalPaths, totalFrames, delay) {
    var currentFrame = 0,
        path = new Array(),
        length = new Array(),
        handle = 0;

    for(var i=0; i < totalPaths; i++) {
        path[i] = document.getElementById(groupSelector + i);

        var l = path[i].getTotalLength();

        length[i] = l;

        path[i].style.strokeDasharray = l + ' ' + l;
        path[i].style.strokeDashoffset = l;
    }

    if(delay == true && delay > 0) {
        setTimeout(function() {
            draw();
        }, delay);
    } else {
        draw();
    }

    function draw() {
        var progress = currentFrame / totalFrames;

        if (progress > 1) {
            window.cancelAnimationFrame(handle);
        } else {
            currentFrame++;

            for(var j=0; j < path.length; j++){
                path[j].style.strokeDashoffset = Math.floor(length[j] * (1 - progress));
            }

            handle = window.requestAnimationFrame(draw);
        }
    }
}