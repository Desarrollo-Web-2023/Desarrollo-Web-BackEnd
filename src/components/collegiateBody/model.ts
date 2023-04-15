import mongoose, { Schema } from 'mongoose';

const schema = new Schema(
  {
    name: {
      type: String,
      required: true
      //unique: true,
    },
    admins: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
      }
    ]
  },
  { versionKey: false, timestamps: true }
);

const collegiateBodySchema = mongoose.model('CollegiateBody', schema);

export { collegiateBodySchema };
