$(document).on('click', '.btn-change-phone', function () {
  var phoneRandom = $(this).attr('random-phone');
  window.location.href = '/phone-number/' + phoneRandom;
});
