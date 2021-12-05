const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
	{
		FirstName: { type: String },
		LastName: { type: String },
		Email: { type: String, unique: true },
		Password: { type: String}
	},
	{ collection: 'users' }
)

const model = mongoose.model('UserSchema', UserSchema)

module.exports = model