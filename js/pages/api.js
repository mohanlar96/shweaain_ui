var api = "http://192.168.137.1/shweaain_dev/public/";

function insertTokenToCache(token) {
  localStorage['token'] = token;
}

function getTokenFromCache() {
  return localStorage['token'];
}

function insertUserNameToCache(userName) {
  localStorage['userName'] = userName;
}

function getUserNameFromCache() {
  return localStorage['userName'];
}

function insertUserIdToCache(userId) {
  localStorage['userId'] = userId;
}

function getUserIdFromCache() {
  return localStorage['userId'];
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userName");
  location.reload();
}

function getAuthorizationFromCache(){
  var token = getTokenFromCache();
  if (token) {
    return "Bearer " + token;
  }
  return undefined;
}