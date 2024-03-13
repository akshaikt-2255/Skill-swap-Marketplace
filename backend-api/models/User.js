const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: '',
    },
    bio: {
        type: String,
        default: '',
    },
    interests: [{
        type: String,
    }],
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
    },
    primarySkill: {
        type: String,
        required: false,
        default: '',
    },
    chatHistory: [
        {
          type: Schema.Types.ObjectId,
          ref: "Conversation",
        },
      ],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      }],
      following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      }],
}, { timestamps: true });

// Password hashing middleware
userSchema.pre('save', async function(next) {
    if (this.isModified('password') || this.isNew) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

// Method to compare password for login
userSchema.methods.comparePassword = function(candidatePassword) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
            if (err) {
                reject(err);
            } else {
                resolve(isMatch);
            }
        });
    });
};

module.exports = mongoose.model('User', userSchema);
