import mongoose from 'mongoose';

const rootSettingsSchema = mongoose.Schema({
  id: {
    type: String,
    unique: true
  },
  rootUserGithubLoginName: String,
  allowNewLogins: Boolean
});

export default mongoose.model('rootSettings', rootSettingsSchema);
