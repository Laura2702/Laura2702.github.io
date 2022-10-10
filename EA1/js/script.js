//START Aufgabe EA1
function loadImage(filename) {
  document.getElementById('x').style.backgroundImage="url(img/violin.png)";
  document.getElementById('y').style.backgroundImage="url(img/dog_ex.png)";
}

(function() {

    const ELEMS_TOTAL = 12;
    const ELEM_WIDTH = 128;
    const AUTO = 200;

    var image = document.getElementById('x');
    var cur_elem = 0;
    var next_elem = 0
    var new_elem_width = 0;
    updateImage();

    var auto_active = false;
    var auto_interval = 0;

    window.onkeydown = function(event) {
        if (event.keyCode === 76) {
            rotateLeft();
        } else if (event.keyCode === 82) {
          rotateRight();
        } else if (event.keyCode === 65) {
          automatic();
        }
    }

    function rotateLeft() {
        cur_elem--;
        if (cur_elem < 0) cur_elem = ELEMS_TOTAL - 1;
        updateImage();
    }

    function rotateRight() {
        cur_elem++;
        if (cur_elem >= ELEMS_TOTAL) cur_elem = 0;
        updateImage();
    }

    function automatic() {
        auto_active = !auto_active;
        if (!auto_active) clearInterval(auto_interval);
        else {
            auto_interval = window.setInterval(function() {
                rotateRight();
            }, AUTO);
        }
    }

    function updateImage() {
        next_elem = cur_elem;
        new_elem_width = -(next_elem*ELEM_WIDTH);
        image.style.backgroundPosition = new_elem_width + 'px 0px';
        //image_dom.style.backgroundPosition="-${current_element*ELEMENT_WIDTH}px 0px");
    }
})();

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

//END Aufgabe EA1
