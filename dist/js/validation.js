//
// Validation scripts
//
(function($) {
  $(document).ready(function($) {
    // numeric inputs
    $(document).on('keydown', '.js-numeric', function(e) {
      if (
        $.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 || // allow: backspace, delete, tab, escape, enter and .
        (e.keyCode == 65 && ( e.ctrlKey === true || e.metaKey === true ) ) || // allow: Ctrl+A, Command+A
        (e.keyCode >= 35 && e.keyCode <= 40) // allow: home, end, left, right, down, up
      ) {
        return; // let it happen, don't do anything
      }
      // ensure that it is a number and stop the keypress
      if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
      }
    });
  });
})(jQuery);
