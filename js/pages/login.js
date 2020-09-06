$( document ).ready(function() {

});

function loginUser() {
  var login = $("#login").val(); // user@gmail.com
  var password = $("#password").val(); //useruser

  var data = {
    grant_type: "password",
    client_id: "2",
    client_secret: "6vnvkJVOtHhUTWqUAeaiyltBEh0OM1J7zPEi2HCd",
    username: login,
    password: password
  };

  $.ajax({
    method: "POST",
    url: api + "oauth/token",
    data: data,
    crossDomain: true,
    dataType: 'json',
    headers: {"Accept":"application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": '*',
      "Access-Control-Allow-Credentials": true
    }
  }).done(function( response ) {
    if(!response){
      alert("Login is not success");
    }
    var token = response.access_token;
    insertTokenToCache(token);

    document.location = '/index-detailed.html';
  });
}