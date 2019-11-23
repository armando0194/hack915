//constructor
function OutputCatalog() {}

//get all outputs
OutputCatalog.prototype.GetAll = function(db, callback){
  const proj = { projection: { _id: 0} };
  db.collection("output-catalog").find({}, proj).toArray(function(err, result) {
  if (err) throw err;
  //console.log(JSON.stringify(result));
  callback(result);
  });
};

//get outputs by model
OutputCatalog.prototype.GetByModel = function(db, modelID, callback){
  const proj = { projection: { _id: 0} };
  db.collection("output-catalog").find({'modelID': modelID}, proj).toArray(function(err, result) {
    if (err) throw err;
    callback(result);
    });
};

//get output by name
OutputCatalog.prototype.GetByName = function(db, varName, callback){
  const proj = { projection: { _id: 0} };
  db.collection("output-catalog").find({'varName': varName}, proj).toArray(function(err, result) {
    if (err) throw err;
    callback(result);
    });
  };

module.exports = OutputCatalog;
