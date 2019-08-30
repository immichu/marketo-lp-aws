window.onscroll = function () {
	stickyNav()
};
var navlinks = document.querySelector(".saponaws-navlinks");
var sticky = navlinks.offsetTop;
var tOffset = window.innerWidth > 768 ? 68 : 50;
function stickyNav() {
	return window.pageYOffset + tOffset >= sticky ? navlinks.classList.add("sticky") : navlinks.classList.remove("sticky");
}
var subnavLinks = document.querySelectorAll("#navlinks a");
Array.from(subnavLinks).forEach(function (el) {
	el.setAttribute('data-trk-params', '{”trkOutputParam”:“trk”}');
});
$(document).on('click', 'a[href^="#"]', function (event) {
	event.preventDefault();
	$('html, body').animate({
		scrollTop: $($.attr(this, 'href')).offset().top - tOffset - 34
	}, 1500);
});
