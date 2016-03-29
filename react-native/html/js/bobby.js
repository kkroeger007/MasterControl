$(document).ready(function(){
  $('#openSidebar').click(function(e){
    e.preventDefault();
    var options = {
      direction: 'left',
    }
    $('.sidebar').toggle('slide', {
            direction: 'left'
        }, 250);
  });
  $('#closeSidebar').click(function(e){
    e.preventDefault();
    var options = {
      direction: 'left',
    }
    $('.sidebar').toggle('slide', {
            direction: 'left'
        }, 250);
  });

  $('.live-flight-controls .single-control').click(function(e){
    e.preventDefault();
    $('.live-flight-controls .single-control').removeClass('active');
    $(this).addClass('active');
  });

  // Horizon Indicator
  var compass =   $('#compass');
  var flight =    $('#flight-indicator');
  var aircraft =  $('#aircraft-indicator');

  function rotate(el, degrees) {
    el.css({
    '-webkit-transform' : 'rotate('+degrees+'deg)',
       '-moz-transform' : 'rotate('+degrees+'deg)',
        '-ms-transform' : 'rotate('+degrees+'deg)',
         '-o-transform' : 'rotate('+degrees+'deg)',
            'transform' : 'rotate('+degrees+'deg)',
                 'zoom' : 1,
            'transition': 'all .5s'

      });
  }

  $('#compass-slider').change(function(){
    var degree = $(this).val();
    rotate(compass, degree);
    $('.compassDegrees').text(degree);
  });
  $('#flight-slider').change(function(){
    var degreeUp = 100 - $(this).val();
    var degreeDown = $(this).val();
    $('.flight-indicator-inner').css({
      'background': '-webkit-linear-gradient(top, #638CA6 0%, #638CA6'+ degreeDown +'%, #16A092 '+ degreeDown +'%, #16A092) 100%)',
      'transform': 'all .5s',
    })
    // $('.flightDegrees').text(degree);
  });
  $('#aircraft-slider').change(function(){
    var degree = $(this).val();
    rotate(aircraft, degree);
    $('.aircraftDegrees').text(degree);
  });

})
