var lat = 0;
var long = 0;

today = new Date();
$('#date').val(today);

var form = document.getElementById("form");

function getPos(position)
{
  lat = position.coords.latitude;
  long = position.coords.longitude;
  $('#latitude').val(lat);
  $('#longitude').val(long);
}

if(navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(getPos);
} else {
  $('#latitude').val(0);
  $('#longitude').val(0);
}
