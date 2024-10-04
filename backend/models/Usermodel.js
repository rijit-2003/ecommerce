const mongoose = require('mongoose')
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Others', null],
        default: null
    },
    mobileno: {
        type: Number,
    },
    date: {
        type: Date,
        default: Date.now
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String,
        enum: ['Choose...',
            'Andaman and Nicobar Islands','Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chandigarh','Chhattisgarh',
            'Dadra and Nagar Haveli & Daman and Diu','Delhi','Goa','Gujarat','Haryana','Himachal Pradesh','Jammu and Kashmir','Jharkhand',
            'Karnataka','Kerala','Ladakh','Lakshadweep','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Puducherry',
            'Punjab',
            'Rajasthan',
            'Sikkim',
            'Tamil Nadu',
            'Telangana',
            'Tripura',
            'Uttar Pradesh',
            'Uttarakhand','West Bengal',
        ]
    },
    zip:{
        type:Number,
    }
})
const User = mongoose.model('users', UserSchema);
module.exports = User;