//constructor
function MongoSettings(user, password, host, port){
  this.user = user;
  this.password = password;
  this.host = host;
  this.port = port;
}

MongoSettings.prototype.GetURL = function(){
  return ("mongodb://" + this.user + ":" + this.password + "@" + this.host + ":" + this.port + "/");
};

module.exports = MongoSettings;

