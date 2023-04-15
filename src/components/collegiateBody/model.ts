import mongoose, { Schema } from 'mongoose';

const schema = new Schema(
  {
    name: {
      type: String,
      required: true
      //unique: true,
    },
    admins: {
      type: [mongoose.Types.ObjectId],
      required: true,
      ref: 'User'
    }
  },
  { versionKey: false, timestamps: true }
);

const collegiateBodySchema = mongoose.model('CollegiateBody', schema);

export { collegiateBodySchema };
