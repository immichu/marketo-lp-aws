"use strict";window.onscroll=function(){stickyNav()};var navlinks=document.querySelector("#navlinks"),sticky=navlinks.offsetTop,tOffset=768<window.innerWidth?68:50;function stickyNav(){return window.pageYOffset+tOffset>=sticky?navlinks.classList.add("sticky"):navlinks.classList.remove("sticky")}var subnavLinks=document.querySelectorAll("#navlinks a");Array.from(subnavLinks).forEach(function(t){t.setAttribute("data-trk-params","{”trkOutputParam”:“trk”}")}),$(document).on("click",'a[href^="#"]',function(t){t.preventDefault(),$("html, body").animate({scrollTop:$($.attr(this,"href")).offset().top-tOffset-34},1500)}),$(".accordion").click(function(){var t=$(this);t.next().hasClass("show")?(t.removeClass("active"),t.next().removeClass("show"),t.next().slideUp(350)):(t.parent().parent().find(".panel").removeClass("show"),t.parent().parent().find(".accordion").removeClass("active"),t.parent().parent().find(".panel").slideUp(350),t.next().toggleClass("show"),t.next().slideToggle(350),t.addClass("active"))});
//# sourceMappingURL=main-on-aws.js.map