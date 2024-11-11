const mongoose = require('mongoose');
// const slug = require('mongoose-slug-generator')
// const slug = require('mongoose-slug-updater')
// const mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema;

const otpSchema = new Schema(
    {
        email: { type: String, required: true},
        otp: { type: String, required: true},
    },
    {
        timestamps: true,
    },
);

const OTP = mongoose.model('OtpSchema', otpSchema);
module.exports = OTP
