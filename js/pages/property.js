$( document ).ready(function() {

  var token = getTokenFromCache();
  var authorization = "";
  if (token) {
    var authorization = "Bearer " + token;
  }

  if (!authorization) {
    // redirect to login
  }

  //Updated on May 29, 2017 at 3:42 pm
  var monthShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  var currentDate = new Date();
  $("#update-time").text("Updated on " + monthShortNames[currentDate.getMonth()] + " " + currentDate.getDate() + ", " + currentDate.getFullYear() + " at " + ((currentDate.getHours() % 12) || (12)) + ":" + currentDate.getMinutes() + " " + (currentDate.getHours() >= 12 ? 'PM' : 'AM')
  );

  var id = getIDToSessionAndRemove();
  if (!id){
    id = 0;
  }

  $.ajax({
    method: "GET",
    url: api + "house",
    headers: {"Accept":"application/json", "Authorization": authorization}
  }).done(function( house ) {
    if (!house) {

      $('#image').prop("src", house.imageUrl);
      $('#city').text(house.city.name);
      $('#house-type-feet').text("Comfortable " + house.houseType + ' ' + house.squareFeet + ' Sqrt'); // Comfortable Apartments 15 Sqrt

      var ratingStart = "";
      for (var i =0; i< house.rating; i++) {
        ratingStart += '<li><i class="ion-android-star"></i></li>';
      }
      $("#rating-star").html(ratingStart);

      $("#status").text(house.status); // rented, sold, for rent, for sale
      $("#square-feet").text(house.squareFeet); // 1500
      $("#number-of-bed").text(house.numberOfBedRoom); // 1
      $("#price").text("$" + house.price); // 1500

      $("#house-type").text(house.houseType); //Apartment
      $("#number-of-bath").text(house.numberOfBathRoom);

      $("#price-final").text("$" + house.price-final); //$123

    }
  });
});

function getIDToSessionAndRemove() {
  var id = localStorage['houseId'];
  localStorage.removeItem("houseId");
  return id;
}