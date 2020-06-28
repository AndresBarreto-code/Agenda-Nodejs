const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
	userId:{ type: Number, require: true, unique:true },
	full_name:{ type: String, require: true },
    mail:{ type: String, require: true },
    password:{ type: String, require: true },
	bod:{ type: String, require: true}
});
let UserModel = mongoose.model('Users', UserSchema);
module.exports.UserModel = UserModel;

let EventSchema = new Schema({
	eventId:{ type: Number, require: true, unique:true },
	title:{ type: String, require: true },
    start:{ type: String, require: true },
    startTime:{ type: String},
    end:{ type: String},
    endTime:{ type: String},
    allDay:{ type: Boolean, require: true },
	id_user:{ type: Number, require: true}
});
let EventModel = mongoose.model('Events', EventSchema);
module.exports.EventModel = EventModel;
mongoose.connect('mongodb://localhost/agenda');