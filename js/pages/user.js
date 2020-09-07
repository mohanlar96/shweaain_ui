$( document ).ready(function() {
  var authorization = getAuthorizationFromCache();
  if (!authorization) {
    document.location = 'login.html';
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

  $.ajax({
    method: "GET",
    url: api + "/all/info",
    headers: {"Accept":"application/json"}
  }).done(function( data ) {
    // $( "#total-rating" ).html( data.totalRating );
    // $( "#total-house" ).html( data.totalHouse );
    // $( "#total-client" ).html( data.totalClient );
    // $( "#total-transaction" ).html( data.totalTransaction );

    $("#city").html("<option value='0'>All</option>")
    if (data && data.cities) {
      data.cities.forEach(function(city) {
        $("#city").append($("<option value='" + city.id + "'>" + city.name + "</option>"));
      });
      $('#city').trigger("chosen:updated");
    }

    $("#house-type").html("<option value='0'>All</option>")
    if (data && data.homeTypes) {
      data.homeTypes.forEach(function(houseType) {
        $("#house-type").append($("<option value='" + houseType.id + "'>" + houseType.name + "</option>"));
      });
      $('#house-type').trigger("chosen:updated");
    }
  });
});

function uploadHouse () {
  var authorization = getAuthorizationFromCache();

  var city = $('#city').val(); // fairfield
  var houseType = $('#house-type').val(); // Apartment, Flat, House, Villa
  var numberOfBedRoom = $('#number-of-bed-room input[type=radio]:checked').val(); // 1 2 3 4 5
  var numberOfBathRoom = $('#number-of-bath-room input[type=radio]:checked').val(); // 1 2 3 4 5
  var numberOfFloor = $('#number-of-floor').val(); // 1 2 3 4 5
  var target = $('#target').val(); // for rent, For Sale

  var price = $('#price').val();
  var squareFeet = $('#square-feet').val();// 3100;3300

  var airCondition = $("#air-condition").prop("checked"); // boolean
  var microwave = $("#microwave").prop("checked");
  var windowCoverings = $("#window-coverings").prop("checked");
  var lawn = $("#lawn").prop("checked");

  var swimmingPool = $("#swimming-pool").prop("checked");
  var wifi = $("#wifi").prop("checked");
  var dryer = $("#dryer").prop("checked");
  var gym = $("#gym").prop("checked");

  var tvCable = $("#tv-cable").prop("checked");
  var laundry = $("#laundry").prop("checked");
  var barbeque = $("#barbeque").prop("checked");
  var refrigerator = $("#refrigerator").prop("checked");

  var sauna = $("#sauna").prop("checked");
  var washer = $("#washer").prop("checked");
  var outdoorShower = $("#outdoor-shower").prop("checked");

  var data = {
    city: city,
    houseType: houseType,
    numberOfBedRoom: numberOfBedRoom,
    numberOfBathRoom: numberOfBathRoom,
    numberOfFloor: numberOfFloor,

    target: target,
    price: price,
    squareFeet: squareFeet,

    airCondition:airCondition,
    microwave: microwave,
    windowCoverings: windowCoverings,
    lawn: lawn,

    swimmingPool: swimmingPool,
    wifi: wifi,
    dryer: dryer,
    gym: gym,

    tvCable: tvCable,
    laundry: laundry,
    barbeque: barbeque,
    refrigerator: refrigerator,

    sauna: sauna,
    washer: washer,
    outdoorShower: outdoorShower
  }

  $.ajax({
    method: "POST",
    url: api + "house/insert",
    data: data,
    headers: {"Accept":"application/json", "Authorization": authorization}
  }).done(function (data){
    if (data && data.message && data.message == "success") {
      alert("Upload Successful");
    }
  });
}