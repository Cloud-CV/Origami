import mongoose from 'mongoose';

const rootSettingsSchema = mongoose.Schema({
  rootUserGithubLoginId: Number,
  rootUserGithubLoginName: String,
  clientid: String,
  clientsecret: String,
  isCloudCV: Boolean,
  allowNewLogins: Boolean,
  appip: String,
  port: String
});

export default mongoose.model('rootSettings', rootSettingsSchema);
