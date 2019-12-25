$(document).ready(function() {
  toggleSection();
  $('#datetimepicker').datepicker();
  $('#timepicker1')
    .timepicker({
      maxHours: 24,
      minuteStep: 1,
      defaultTime: '',
      showMeridian: false,
      icons: {
        up: 'fas fa-sort-up',
        down: 'fas fa-caret-down',
      },
    })
    .on('changeTime.timepicker', function(e) {
      $('#input-timepicker').val(e.time.value);
    });
});
