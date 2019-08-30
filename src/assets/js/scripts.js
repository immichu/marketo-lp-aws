window.onscroll = function() {
	stickyNav()
};
var navlinks = document.querySelector(".saponaws-navlinks");
var sticky = navlinks.offsetTop;
var tOffset = window.innerWidth > 768 ? 68 : 50;
function stickyNav() {
	return window.pageYOffset + tOffset >= sticky ? navlinks.classList.add("sticky") : navlinks.classList.remove("sticky");
}