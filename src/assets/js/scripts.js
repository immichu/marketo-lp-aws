// Make subnav sticky on scroll
window.onscroll = function () {
	stickyNav()
};
var navlinks = document.querySelector("#navlinks");
var sticky = navlinks.offsetTop;
var tOffset = window.innerWidth > 768 ? 68 : 50;
function stickyNav() {
	return window.pageYOffset + tOffset >= sticky ? navlinks.classList.add("sticky") : navlinks.classList.remove("sticky");
}

// Add tracking tag to subnav links
var subnavLinks = document.querySelectorAll("#navlinks a");
Array.from(subnavLinks).forEach(function (el) {
	el.setAttribute('data-trk-params', '{”trkOutputParam”:“trk”}');
});

// Smoothscroll on page anchor click
$(document).on('click', 'a[href^="#"]', function (event) {
	event.preventDefault();
	$('html, body').animate({
		scrollTop: $($.attr(this, 'href')).offset().top - tOffset - 34
	}, 1500);
});

// Accordion click class and logic
$('.accordion').click(function() {
	var $this = $(this);
	if ($this.next().hasClass('show')) {
			$this.removeClass('active');
		$this.next().removeClass('show');
		$this.next().slideUp(350);
	} else {
		$this.parent().parent().find('.panel').removeClass('show');
		$this.parent().parent().find('.accordion').removeClass('active');
		$this.parent().parent().find('.panel').slideUp(350);
		$this.next().toggleClass('show');
		$this.next().slideToggle(350);
		$this.addClass('active');
	}
});