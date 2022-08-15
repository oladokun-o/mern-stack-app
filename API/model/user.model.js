const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const userSchema = new mongoose.Schema({
                selected: {
                    type: Boolean
                },  
                serial_no: {
                    type: Number
                },
                name: {
                    type: String,
                    required: true
                }, 
                phone_number:  {
                    type: String,
                    required: true
                },
                email:  {
                    type: String,
                    required: true
                },
                hobbies:  {
                    type: String,
                    required: true
                },
             },
                { timestamps: { createDate: 'created_at', updatedDate: 'updated_at'}});

userSchema.plugin(AutoIncrement, {id: 'serial_no_seq', inc_field: 'serial_no'})
const User = mongoose.model('users', userSchema);

module.exports = {
    User
}