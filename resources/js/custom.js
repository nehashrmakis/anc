import $ from 'jquery';

(function () {
	"use strict";

	var treeviewMenu = $('.app-menu');

	// Toggle Sidebar
	$('[data-toggle="sidebar"]').click(function(event) {
		event.preventDefault();
		$('.app').toggleClass('sidenav-toggled');
	});

	// Activate sidebar treeview toggle
	$("[data-toggle='treeview']").click(function(event) {
		event.preventDefault();
		if(!$(this).parent().hasClass('is-expanded')) {
			treeviewMenu.find("[data-toggle='treeview']").parent().removeClass('is-expanded');
		}
		$(this).parent().toggleClass('is-expanded');
	});

})();


function increment(btn) {
  const counting = btn.parentElement.querySelector('.counting');
  let value = parseInt(counting.textContent) || 0;
  counting.textContent = value + 1;
}

function decrement(btn) {
  const counting = btn.parentElement.querySelector('.counting');
  let value = parseInt(counting.textContent) || 0;
  if (value > 0) {
	counting.textContent = value - 1;
  }
}
 