import mongoose, { Schema } from 'mongoose';

const schema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    collegiateBodies: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'CollegiateBody',
        required: true
      }
    ],
    publicationDate: {
      type: Date,
      required: true
    },
    entryIntoForce: {
      type: Date,
      required: true
    },
    expeditionDate: {
      type: Date,
      required: true
    },
    keywords: [
      {
        word: String,
        frequency: Number,
        required: true
      }
    ],
    body: {
      type: String,
      required: true
    }
  },
  { versionKey: false, timestamps: true }
);

const documentSchema = mongoose.model('Document', schema);

export { documentSchema };
