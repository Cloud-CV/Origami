# CloudCVfy Webapp

Current Status: An app that works.

Follow issues template to file an issue unless it is a feature request.

## Build instructions

**This application requires node v6.2.0+**

**Using [nvm](https://github.com/creationix/nvm) is recommended**

1. go to [GH developer console](https://github.com/settings/applications/) and create a new application. Enter the app-url as the url where you will run this app (for example `http://0.0.0.0:3000` - this has to be on port 3000 for now). The callback-url will be `app-url/auth/github/callback` (for example `http://0.0.0.0:3000/auth/github/callback`). Note the CLIENT_ID and CLIENT_SECRET.
2. clone this repo
3. copy `outCalls/config.sample.js` to `outCalls/config.js` and edit it accordingly. Add the APP_SECRET as a random long string.
4. `npm i`

### Development

5. `npm start -s`

### Production

5. `npm run build -s`

(building for production will take some time and require > 1GB ram - use swap if your machine doesn't have meet the requirements)
