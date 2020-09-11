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

  var features = [];
  var airCondition = $("#air-condition").prop("checked"); // boolean
  if (airCondition){
    features.push(1);
  }

  var microwave = $("#microwave").prop("checked");
  if (microwave){
    features.push(2);
  }
  var windowCoverings = $("#window-coverings").prop("checked");
  if (windowCoverings){
    features.push(3);
  }
  var lawn = $("#lawn").prop("checked");
  if (lawn){
    features.push(4);
  }

  var swimmingPool = $("#swimming-pool").prop("checked");
  if (swimmingPool){
    features.push(5);
  }
  var wifi = $("#wifi").prop("checked");
  if (wifi){
    features.push(6);
  }
  var dryer = $("#dryer").prop("checked");
  if (dryer){
    features.push(7);
  }
  var gym = $("#gym").prop("checked");
  if (gym){
    features.push(8);
  }

  var tvCable = $("#tv-cable").prop("checked");
  if (tvCable){
    features.push(9);
  }
  var laundry = $("#laundry").prop("checked");
  if (laundry){
    features.push(10);
  }
  var barbeque = $("#barbeque").prop("checked");
  if (barbeque){
    features.push(11);
  }
  var refrigerator = $("#refrigerator").prop("checked");
  if (refrigerator){
    features.push(12);
  }

  var sauna = $("#sauna").prop("checked");
  if (sauna){
    features.push(13);
  }
  var washer = $("#washer").prop("checked");
  if (washer){
    features.push(14);
  }
  var outdoorShower = $("#outdoor-shower").prop("checked");
  if (outdoorShower){
    features.push(15);
  }

  var data = {
    city: city,
    houseType: houseType,
    numberOfBedRoom: numberOfBedRoom,
    numberOfBathRoom: numberOfBathRoom,
    numberOfFloor: numberOfFloor,

    target: target,
    price: price,
    squareFeet: squareFeet,

    features: features

    // airCondition:airCondition,
    // microwave: microwave,
    // windowCoverings: windowCoverings,
    // lawn: lawn,
    //
    // swimmingPool: swimmingPool,
    // wifi: wifi,
    // dryer: dryer,
    // gym: gym,
    //
    // tvCable: tvCable,
    // laundry: laundry,
    // barbeque: barbeque,
    // refrigerator: refrigerator,
    //
    // sauna: sauna,
    // washer: washer,
    // outdoorShower: outdoorShower
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