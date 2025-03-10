import mongoose from 'mongoose'

const userModel = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email Must be Required'],
    },

    password: {
      type: String,
      required: [true, 'Email Must be Required'],
    },

    username: {
      type: String,
      required: [true, 'Email Must be Required'],
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    role: {
      type: String,
      enum: ['Guide', 'Admin', 'User'],
      default: 'User',
    },

    userProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserProfile',
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model('User', userModel);
export default User;
