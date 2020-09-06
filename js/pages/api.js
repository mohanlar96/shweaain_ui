var api = "http://ca1e0361ab35.ngrok.io/";

function insertTokenToCache(token) {
  localStorage['token'] = token;
}

function getTokenFromCache() {
  return localStorage['token'];
}