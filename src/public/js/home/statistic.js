$(window).scroll(function () {
  var h = $(document).scrollTop();
  var j = window.screen.height;
  var o = $('.contain').offset().top;
  if (h > o + 200) {
    $('.digital').addClass('active');
  } else {
    $('.digital').removeClass('active');
  }
});
