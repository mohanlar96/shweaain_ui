$( document ).ready(function() {

  var authorization = getAuthorizationFromCache();
  if (!authorization) {
    //document.location = 'login.html';
  }

  var userName = getUserNameFromCache();
  if (userName) {
    $("#user-name").text("Hello " + userName);
    $("#alogin").hide();
    $("#alogout").show();
    $("#auser").show();
    $("#user-name").show();
  } else {
    $("#alogin").show();
    $("#alogout").hide();
    $("#auser").hide();
    $("#user-name").hide();
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
    url: api + "api/property" + "/" + id,
    headers: {"Accept":"application/json"}
  }).done(function( house ) {
    if (house && house.apartment) {
      var apartment = house.apartment[0];

      $('#image').prop("src", apartment.images[1]);
      $('#city').text(apartment.address_en);
      $('#house-type-feet').text(apartment.title_en); // Comfortable Apartments 15 Sqrt

      var ratingStart = "";
      for (var i =0; i< apartment.rating; i++) {
        ratingStart += '<li><i class="ion-android-star"></i></li>';
      }
      $("#rating-star").html(ratingStart);

      $("#status").text(apartment.business_type.name_en); // rented, sold, for rent, for sale
      $("#square-feet").text(apartment.area); // 1500
      $("#number-of-bed").text(apartment.number_of_rooms); // 1
      $("#price").text("$" + apartment.price); // 1500

      $("#house-type").text(apartment.apartment_type.name_en); //Apartment
      $("#number-of-bath").text(apartment.number_of_bathroom);

      $("#price-final").text("$" + apartment.price); //$123

      $("#description").text(apartment.description_en);
    }
  });
});

function getIDToSessionAndRemove() {
  var id = localStorage['houseId'];
  // localStorage.removeItem("houseId");
  return id;
}

function rentTheHouse() {
  requestBusiness(1, function(msg){alert("Rent success with message:" + msg)});
}

function buyTheHouse() {
  requestBusiness(2, function(msg){alert("Buy success with message:" + msg)});
}

function requestBusiness(businessTypeId, callBack) {
  var apartmentId = localStorage['houseId'];
  var userId = getUserIdFromCache();

  if (!userId){
    alert("you must login first");
    return;
  }

  var data = {
    userId : userId,
    apartmentId: apartmentId,
    businessTypeId: businessTypeId
  };
  $.ajax({
    method: "GET",
    url: api + "api/property/business",
    data: data,
    headers: {"Accept":"application/json"}
  }).done(function( data ){

    callBack(data.response);
  });
}