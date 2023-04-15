import mongoose, { Schema } from 'mongoose';

const schema = new Schema(
  {
    name: {
      type: String,
      required: true
      //unique: true,
    },
    admins: {
      type: [String],
      required: true
    },
    created: {
      type: String,
      required: true
    },
    updated: {
      type: String,
      required: true
    }
  },
  { versionKey: false }
);

const collegiateBodySchema = mongoose.model('CollegiateBody', schema);

export { collegiateBodySchema };
