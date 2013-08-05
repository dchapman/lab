$(function(){
    var lastScrollTop = 0, delta = 5;
    $(window).scroll(function(event){
        var st = $(this).scrollTop();

        if(Math.abs(lastScrollTop - st) <= delta)
            return;

        if (st > lastScrollTop){
            // Scroll Down
            $(".navbar").delay(100).queue(function() {
                $(this).addClass("asleep");
                $(this).dequeue();
            });

        } else {
            // Scroll Up
            $('.navbar').delay(100).queue(function() {
                $(this).removeClass("asleep");
                $(this).dequeue();
            });
        }

        lastScrollTop = st;
    });
});