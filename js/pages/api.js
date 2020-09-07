var api = "http://4bf86b6826cb.ngrok.io/";

function insertTokenToCache(token) {
  localStorage['token'] = token;
}

function getTokenFromCache() {
  return localStorage['token'];
}