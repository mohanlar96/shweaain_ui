$( document ).ready(function() {
  var token = getTokenFromCache();
  var authorization = "";
  if (token) {
    authorization = "Bearer " + token;
  }

  if (!authorization) {
    document.location = 'login.html';
  }

  var userName = getUserNameFromCache();
  if (userName) {
    $("#user-name").text("Hello " + userName);
    $("#alogin").hide();
    $("#alogout").show();
  } else {
    $("#alogin").show();
    $("#alogout").hide();
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