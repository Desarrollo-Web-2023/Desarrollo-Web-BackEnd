import mongoose, { Schema } from 'mongoose';

const schema = new Schema(
  {
    collegiateBody: {
      type: mongoose.Types.ObjectId,
      ref: 'CollegiateBody',
      required: true
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      requried: true
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { versionKey: false, timestamps: true }
);

schema.index({ collegiateBody: 1, user: 1 }, { unique: true });

const colDirSchema = mongoose.model('CollegiateDirectory', schema);

export { colDirSchema };
