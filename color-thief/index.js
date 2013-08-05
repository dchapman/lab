$(document).ready(function () {
    // Use mustache.js templating to create layout
    var imageArray = { images: [
        {"file": "dadaab.png"},
        {"file": "3.jpg"},
        {"file": "4.jpg"},
        {"file": "5.jpg"},
        {"file": "logo1.png"}
    ]};

    var html = Mustache.to_html($('#template').html(), imageArray);
    $('#main').append(html);

    // For each image:
    // Once image is loaded, get dominant color and palette and display them.
    $('img').bind('load', function (event) {
        var image = event.target,
            $image = $(image),
            domColorArray = getDominantColor(image),
            domColor = domColorArray.toString();


        // returns an RGB string with altered colors
        var newRgb = function(rgb, op, type) {
            var rgb = rgb || [0,0,0],
                op = op || 'darken',
                type = type || 'string',
                rgbLen = rgb.length,
                newRgbArray = [],
                val;

            switch(op) {
                case 'darken':
                    for(i = 0; i < rgbLen; i++ ) {
                        val = rgb[i] - 20;
                        newRgbArray.push(val);
                    }
                    break;

                default:
                    console.log('available operations: "darken"');
                    return false;
            }

            switch(type) {
                case 'array':
                    return newRgbArray;
                    break;

                case 'string':
                    return newRgbArray.toString();

                default:
                    console.log('available types of return: "string', "array");
                    return false;
            }
        }

        var darkerColor = newRgb(domColorArray);

        $image.css({
            'outline-color': 'rgba('+ darkerColor +',1)'
        });

        $image.parents().css({
            'background-color': 'rgba('+ domColor +',1)',
            'border-color': 'rgba('+ darkerColor +',1)'
        });
    });

    var imageWrapSize = function() {
        var windowWidth = $(window).width();
        var windowHeight =$(window).height();
        $('.imageWrap').css({'width': windowWidth, 'height':windowHeight});
    }

    imageWrapSize();
    $(window).on('resize', imageWrapSize);
});