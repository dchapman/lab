function easyFader($container, slideDur, fadeDur) {
    $container[0].faderConfig = {};
    var config = $container[0].faderConfig;

    config = {
        slideDur : slideDur,
        fadeDur : fadeDur
    };

    var slideSelector = '.slide',
        slideTimer,
        totalSlides,
        activeSlide,
        newSlide,
        $slides = $container.find(slideSelector),
        $pagers = $container.find('.pager_list');

    totalSlides = $slides.length;

    $slides.eq(0).css('opacity', 1);
    activeSlide = 0;

    for(var i=0; i < totalSlides; i++) {
        $pagerList
            .append('<li class="page" data-target="'+i+'">'+i+'</li>');
    };

    $pagers.eq(0).addClass('active');

    $container.find('.page').bind('click',function(){
        var target = $(this).attr('data-target');
        clearTimeout(slideTimer);
        changeSlides(target);
    });

    waitForNext();

    function changeSlides(target) {
        if (target === 'next') {
            newSlide = activeSlide + 1;

            if (newSlide > totalSlides - 1) {
                newSlide = 0;
            }
        } else if (target === 'prev') {
            newSlide = activeSlide - 1;

            if(newSlide < 0) {
                newSlide = totalSlides - 1;
            }
        } else {
            newSlide = target;
        }

        animateSlides(activeSlide, newSlide);
    }

    function animateSlides(activeNdx, newNdx) {
        if(fading || activeNdx == newNdx) {
            return false;
        };
        fading = true;

        $pagers.removeClass('active').eq(newSlide).addClass('active');

        $slides.eq(activeNdx).css('z-index', 3);

        $slides.eq(newNdx).css({
            'z-index': 2,
            'opacity': 1
        });

        $slides.eq(activeNdx).animate({'opacity': 0}, config.fadeDur, function() {
            $slides.eq(activeNdx).removeAttr('style');
            activeSlide = newNdx;

            waitForNext();
        });
    }

    function waitForNext() {
        slideTimer = setTimeout(function() {
            changeSlides('next');
        }, config.slideDur);
    };
}