$(document).ready(function () {
  $(document).on('click', 'li button#change-status, div button#admin-change-status', function (event) {
    event.preventDefault();

    var status = $(this).attr('phone-status');
    var phoneId = $(this).attr('phone-id');

    $.ajax({
      type: 'PUT',
      contentType: 'application/json',
      url: window.location.origin + '/admin/phone-numbers/change-status',
      data: JSON.stringify({ status: status === 'true' ? false : true, phone_number_id: phoneId }),
      dataType: 'json',
      success: function (phoneNumber) {
        var btn = $('button[phone-id=' + phoneNumber.phoneId + ']');

        if (phoneNumber.isActive) {
          btn.attr('phone-status', true);
          btn.attr('title', 'Click to inactive this phone number');
          btn.find('img').attr('src', '/images/status1.png');

          btn.removeClass('status-inactive');
          btn.addClass('status-active');
        } else {
          btn.attr('phone-status', false);
          btn.attr('title', 'Click to active this phone number');
          btn.find('img').attr('src', '/images/status0.png');

          btn.removeClass('status-active');
          btn.addClass('status-inactive');
        }
      },
      error: function (e) {
        console.log(e);
      },
    });
  });

  $('button.admin-change-phone').click(function () {
    var phoneRandom = $(this).attr('random-phone');
    window.location.href = '/admin/phone-numbers/' + phoneRandom;
  });
});
