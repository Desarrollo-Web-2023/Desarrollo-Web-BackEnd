import mongoose, { Schema } from 'mongoose';

const schema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[\w.%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
    },
    preferences: {
      type: [String],
      validate: [
        (docu: string[]) => {
          return docu.length >= 3;
        },
        'Should have 3 elements'
      ],
      required: true
    }
  },
  { versionKey: false }
);

const userSchema = mongoose.model('User', schema);

export { userSchema };
