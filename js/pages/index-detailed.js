var api = "http://75c151037c03.ngrok.io/shweaain/public/";
$( document ).ready(function() {
  $.get( api + "rating/total", function( data ) {
    $( "#total-rating" ).html( data );
  });

  $.get( api + "house/total", function( data ) {
    $( "#total-house" ).html( data );
  });

  $.get( api + "client/total", function( data ) {
    $( "#total-client" ).html( data );
  });

  $.get( api + "transaction/total", function( data ) {
    $( "#total-transaction" ).html( data );
  });

  $.get( api + "city", function( data ) {
    $("#city").html("<option value='0'>All</option>")
    if (data) {
      data.forEach(function(city) {
        $("#city").append($("<option value='" + city.id + "'>" + city.name + "</option>"));
      });
      $('#city').trigger("chosen:updated");
    }
  });

  $.get( api + "apartment",function (data) {
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
  var sortBy = $('#sort-by').val(); // name, price
  var target = $('#target').val(); // for rent, For Sale

  var priceRange = $('#price-range').val(); // 278400;3500000
  var priceMin = priceRange.split(";")[0]; // 278400
  var priceMax = priceRange.split(";")[1]; // 3500000

  var squareFeet = $('#square-feet').val();// 3100;3300
  var squareFeetMin = squareFeet.split(";")[0];// 3100
  var squareFeetMax = squareFeet.split(";")[1];// 3300

  var yearBuilt = $('#year-built').val(); //
  var yearBuiltMin = yearBuilt.split(";")[0];//
  var yearBuiltMax = yearBuilt.split(";")[1];//

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

  var filterData = {
    city: city,
    houseType: houseType,
    numberOfBedRoom: numberOfBedRoom,
    numberOfBathRoom: numberOfBathRoom,
    numberOfFloor: numberOfFloor,
    sortBy: sortBy,
    target: target,
    priceMin: priceMin,
    priceMax: priceMax,
    squareFeetMin: squareFeetMin,
    squareFeetMax: squareFeetMax,
    yearBuiltMin: yearBuiltMin,
    yearBuiltMax: yearBuiltMax,

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

  $.get(api + "house/search", filterData, function (data) {
    if (data) {

      $("#btn-total-result").val("Show " + data.length + " Results");

      data.forEach(function(house) {

        if (!house) {
          return;
        }

        var ratingStart = "";
        for (var i =0; i< house.rating; i++) {
          ratingStart += '<li><i class="ion-android-star"></i></li>';
        }

        var htmlResponse = '<div class="cf-xs-6 cf-sm-6 cf-lg-4 col-xs-6 col-sm-6 col-md-4 prop-i-col">\n' +
            '            <div class="prop-i">\n' +
            '                <a href="#" class="prop-i-img">\n' +
            '                    <img src="' + house.imageUrl + '" alt="">\n' +
            '                </a>\n' +
            '                <div class="prop-i-top">\n' +
            '                    <p class="prop-i-loc">' + house.city.name + '</p>\n' +
            '                </div>\n' +
            '                <h3 class="prop-i-ttl">\n' +
            '                    <a href="property-2.html" onclick="setIDToSession(' + house.id + ');">' + house.houseType + ' ' + house.squareFeet + ' Sqrt</a>\n' +
            '                </h3>\n' +
            '                <ul class="prop-i-rating">\n' + ratingStart +
            '                </ul>\n' +
            '                <dl class="prop-i-info">\n' +
            '                    <dt>\n' +
            '                        <span class="prop-i-info-icon"><img src="img/propinfo1.png" alt=""></span>\n' +
            '                        Square Feet\n' +
            '                    </dt>\n' +
            '                    <dd>'+ house.squareFeet + '</dd>\n' +
            '                    <dt>\n' +
            '                        <span class="prop-i-info-icon"><img src="img/propinfo2.png" alt=""></span>\n' +
            '                        Bedrooms\n' +
            '                    </dt>\n' +
            '                    <dd>' + house.numberOfBedRoom + '</dd>\n' +
            '                    <dt>\n' +
            '                        <span class="prop-i-info-icon"><img src="img/propinfo3.png" alt=""></span>\n' +
            '                        Guests\n' +
            '                    </dt>\n' +
            '                    <dd> ' + house.numberOfGuest + ' </dd>\n' +
            '                </dl>\n' +
            '                <div class="prop-i-bottom">\n' +
            '                    <p class="prop-i-price"><span class="prop-i-price-val">$' + house.price + '</span></p>\n' +
            '                    <p class="prop-i-type">' + house.target + '</p>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '        </div>';
        $("#search-result").append(htmlResponse);
      });
    }
  });
}

function setIDToSession(id) {
  localStorage['houseId'] = id;
}