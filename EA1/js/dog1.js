(function () {

  var sprite2 = document.getElementById('y');

  const AUTO = 100;
  const ELEMENTS_TOTAL = 8;
  const ELEMENT_WIDTH = 256;

  var curr_element = 0;
  var next_element = 0;
  var new_element_width = 0;

  window.setInterval(function() {
    curr_element++;
    if (curr_element >= ELEMENTS_TOTAL) curr_element = 0;
    next_element = curr_element;
    new_element_width = -(next_element*ELEMENT_WIDTH)
    sprite2.style.backgroundPosition = new_element_width + 'px 0px';
  }, AUTO);
}) ();
