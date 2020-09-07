var api = "http://10.10.14.101/shweaain_dev/public/";

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

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userName");
  location.reload();
}