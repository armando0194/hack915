// constructor
function AcronymCatalog() {}

// get by model and language
AcronymCatalog.prototype.GetByModelnLanguage = function(db, modelID , lang, callback){
const proj = { projection: { _id: 0, dictionary: 1} };
db.collection("acronym-catalog").findOne({'modelID': modelID, 'lang': lang}, proj, function(err, result) {
  if (err) throw err;
  //console.log(JSON.stringify(result));
  callback(result);
  });
}

module.exports = AcronymCatalog;
