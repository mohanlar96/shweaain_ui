
$( document ).ready(function() {
  $.get( "rating/total", function( data ) {
    $( "#total-rating" ).html( data );
  });

  $.get( "house/total", function( data ) {
    $( "#total-house" ).html( data );
  });

  $.get( "client/total", function( data ) {
    $( "#total-client" ).html( data );
  });

  $.get( "transaction/total", function( data ) {
    $( "#total-transaction" ).html( data );
  });

  $.get( "city", function( data ) {
    $("#city").html("<option value='0'>All</option>")
    if (data) {
      data.forEach(function(city) {
        $("#city").append($("<option value='" + city.id + "'>" + city.name + "</option>"));
      });
      $('#city').trigger("chosen:updated");
    }
  });

  $.get("apartment",function (data) {
    $("#house-type").html("<option value='0'>All</option>")
    if (data) {
      data.forEach(function(houseType) {
        $("#house-type").append($("<option value='" + houseType.id + "'>" + houseType.name + "</option>"));
      });
      $('#house-type').trigger("chosen:updated");
    }
  });

  search();

});

function search() {
  var city = $('#city').val(); // fairfield
  var houseType = $('#house-type').val(); // Apartment, Flat, House, Villa
  var numberOfBedRoom = $('#number-of-bed-room input[type=radio]:checked').val(); // 1 2 3 4 5
  var numberOfBathRoom = $('#number-of-bath-room input[type=radio]:checked').val(); // 1 2 3 4 5
  var numberOfFloor = $('#number-of-floor').val(); // 1 2 3 4 5

  var filterDate = {
    city: city,
    houseType: houseType,
    numberOfBedRoom: numberOfBedRoom,
    numberOfBathRoom: numberOfBathRoom,
    numberOfFloor: numberOfFloor
  }
  $.get("house/search", filterDate, function (data) {

  });
}