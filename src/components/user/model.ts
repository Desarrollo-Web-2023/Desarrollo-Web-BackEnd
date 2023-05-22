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
      match: /^[\w.%+-]+@unal.edu.co$/
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
