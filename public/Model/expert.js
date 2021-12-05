const mongoose = require('mongoose')

const ExpertSchema = new mongoose.Schema(
	{
		FirstName: { type: String },
		LastName: { type: String },
		Email: { type: String, unique: true },
		Password: { type: String},
		Bio: { type: String}
	},
	{ collection: 'expert' }
)

const model = mongoose.model('ExpertSchema', ExpertSchema)

module.exports = model