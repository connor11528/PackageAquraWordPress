$(document).ready(function () {
    var AFFIX_TOP_LIMIT = $(".docs-nav").offset().top;
    var AFFIX_OFFSET = 49;

    var $menu = $("#menu"),
		$btn = $("#menu-toggle");

    $("#menu-toggle").on("click", function () {
        $menu.toggleClass("open");
        return false;
    });

    jQuery(".lightbox").attr('rel','gallery').fancybox({
        fitToView: true,
        autoSize :  true,
        margin : 30,
        autoScale : true,
        width : '100%',
        height : '100%',
        showNavArrows: true,
        showCloseButton: true,
        helpers : {
            media : {}
        }
    });

    $(".docs-nav").each(function () {
        var $affixNav = $(this),
			$container = $affixNav.parent(),
			affixNavfixed = false,
			originalClassName = this.className,
			current = null,
			$links = $affixNav.find("a");

        function getClosestHeader(top) {
            var last = $links.first();

            if (top < AFFIX_TOP_LIMIT) {
                return last;
            }

            for (var i = 0; i < $links.length; i++) {
                var $link = $links.eq(i),
					href = $link.attr("href");

                if (href.charAt(0) === "#" && href.length > 1) {
                    var $anchor = $(href).first();

                    if ($anchor.length > 0) {
                        var offset = $anchor.offset();

                        if (top < offset.top - AFFIX_OFFSET) {
                            return last;
                        }

                        last = $link;
                    }
                }
            }
            return last;
        }

        function windowScrollStart() {

            var top = jQuery(window).scrollTop(),
                height = $affixNav.outerHeight(),
                max_bottom = $container.offset().top + $container.outerHeight(),
                bottom = top + height + AFFIX_OFFSET;

            if (top < ( AFFIX_TOP_LIMIT - AFFIX_OFFSET )) {
                $affixNav.removeClass("fixed");
                $affixNav.css('top', 0);
            } else if (top > ( AFFIX_TOP_LIMIT - AFFIX_OFFSET )) {
                $affixNav.addClass("fixed");
                $affixNav.css('top', AFFIX_OFFSET);
            }

            if (bottom >= max_bottom) {
                $affixNav.css("top", (max_bottom - height) - top);
            }

            var $current = getClosestHeader(top);

            if (current !== $current) {
                $affixNav.find(".active").removeClass("active");
                $current.addClass("active");
                current = $current;
            }

        }


        windowScrollStart();

        $(window).on("scroll", function (evt) {
            windowScrollStart();
        });
    });

    /* Toggle between adding and removing the "active" and "show" classes when the user clicks on one of the "Section" buttons. The "active" class is used to add a background color to the current button when its belonging panel is open. The "show" class is used to open the specific accordion panel */
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].onclick = function(){
            this.classList.toggle("active");
            this.nextElementSibling.classList.toggle("show");
        }
    }

    prettyPrint();
});
