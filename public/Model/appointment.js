const mongoose = require('mongoose')

const AppointmentSchema = new mongoose.Schema(
	{
		Date: { type: String },
		Time: { type: String},
		Email: { type: String},
		FullName: { type: String},
		PhoneNumber: { type: String},
        Message: {type: String}
	},
	{ collection: 'appointments' }
)

const model = mongoose.model('AppointmentSchema', AppointmentSchema)

module.exports = model