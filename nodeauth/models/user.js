var mongoose = require('mongoose');

var bcryptjs = require('bcryptjs');

mongoose.connect('mongodb://localhost/nodeauth');

var db = mongoose.connection;

//User Schema

var UserSchema = mongoose.Schema({
    username:{
        type: String,
        index: true
    },
    password:{
        type: String
    },
    email:{
        type: String
    },
    name:{
        type: String
    },
    profileimage:{
        type: String
    }
});

var User = module.exports = mongoose.model('User',UserSchema);

//Because we are using these functions outside of the file we use modules.export
module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcryptjs.compare(candidatePassword, hash, function(err, isMatch) {
    	callback(null, isMatch);
	});
}
module.exports.createUser = function(newUser, callback){

    bcryptjs.genSalt(10, function(err,salt){
        bcryptjs.hash(newUser.password,salt,function(err,hash){
            newUser.password = hash;
            newUser.save(callback);
        })
    })
    newUser.save(callback);
}