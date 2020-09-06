var api = "http://8dd7643991a6.ngrok.io/";

function insertTokenToCache(token) {
  localStorage['token'] = token;
}

function getTokenFromCache() {
  return localStorage['token'];
}