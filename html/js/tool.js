$(document).on('click', '.copys', function () {
  var phoneNumber = $(this).html();
  copyToClipboard(phoneNumber);
  setTooltip(this, 'Phone Number Copied!');
  hideTooltip(this);
});

function copyToClipboard(str) {
  var el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}

function setTooltip(btn, message) {
  $(btn).tooltip('hide').attr('data-original-title', message).tooltip('show');
}
function hideTooltip(btn) {
  setTimeout(function () {
    $(btn).tooltip('hide');
  }, 2000);
}
