function setTooltip(btn, message) {
  $(btn).tooltip('hide').attr('data-original-title', message).tooltip('show');
}
function hideTooltip(btn) {
  setTimeout(function () {
    $(btn).tooltip('hide');
  }, 2000);
}
var clipboard1 = new Clipboard('h1');
clipboard1.on('success', function (e) {
  setTooltip(e.trigger, 'Phone Number Copied!');
  hideTooltip(e.trigger);
});
clipboard1.on('error', function (e) {
  setTooltip(e.trigger, 'Failed!');
  hideTooltip(e.trigger);
});
var clipboard2 = new Clipboard('span');
clipboard2.on('success', function (e) {
  setTooltip(e.trigger, 'Code Copied!');
  hideTooltip(e.trigger);
});
clipboard2.on('error', function (e) {
  setTooltip(e.trigger, 'Failed!');
  hideTooltip(e.trigger);
});
