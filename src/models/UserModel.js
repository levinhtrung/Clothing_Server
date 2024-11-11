const mongoose = require('mongoose');
// const slug = require('mongoose-slug-generator')
// const slug = require('mongoose-slug-updater')
// const mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        //   author: ObjectId,
        name: { type: String, default: '' },
        email: { type: String, required: true},
        password: { type: String, required: true},
        isAdmin: { type: Boolean, default: false},
        phone: { type: String, default: ''  },
        address: { type: String, default: ''  },
        avatar: { type: String, default: ''  },
        city: {type: String, default: '' },
        // access_token: { type: String},
        // refresh_token: { type: String},
        // slug: { type: String, slug: 'name', unique: true },
    },
    {
        timestamps: true,
    },
);

// Add plugins
// mongoose.plugin(slug);
// UserSchema.plugin(mongooseDelete, {
//     deletedAt: true,
//     overrideMethods: 'all',
// });
//{ overrideMethods: 'all' } là không hiển thị tất cả các database có deleted: true

//unique: true: chỉ tồn tại duy nhất 1 cái, tránh trùng slug khi đặt trùng name

const User = mongoose.model('UserSchema', userSchema);
module.exports = User
