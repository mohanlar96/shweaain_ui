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
    url: api + "oauth/token", // "api/test",
    data: data,
    headers: {
      'Accept': 'application/json'
    },
  }).done(function( response ) {
    if(!response){
      alert("Login is not success");
    }


    var token = response.access_token;
    if (token) {
      insertTokenToCache(token);
    }
    getUserName();

    // document.location = 'user.html';
  });
}

function getUserName() {
  var token = getTokenFromCache();
  $.ajax({
    method: "GET",
    url: api + "api/user",
    headers: {
      'Accept': 'application/json',
       "Authorization": "Bearer " + token
    },
  }).done(function( response ) {
    insertUserNameToCache(response.user.name);
  });
}