import mongoose from 'mongoose';

const tokenSchema = new mongoose.Schema(
  {
    tokenUuid: {
      type: String,
      required: [true, 'Token UUID'],
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);
const Token = mongoose.model('Token', tokenSchema);

export default Token;
