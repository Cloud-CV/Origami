import mongoose from 'mongoose';

const rootSettingsSchema = mongoose.Schema({
  rootUserGithubLoginId: Number,
  rootUserGithubLoginName: String,
  allowNewLogins: Boolean
});

export default mongoose.model('rootSettings', rootSettingsSchema);
