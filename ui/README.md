## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


Out of the box the UI expects the cms to be running locally at http://localhost:1337. For details on running the CMS locally see the [README.md](https://github.com/GSA/ai-experience-sharing-platform/blob/develop/cms/README.md). Another option is to modify where the UI proxy is pointed to https://github.com/GSA/ai-experience-sharing-platform/blob/develop/ui/src/setupProxy.js#L3. If you want to authenticate locally you can however login.gov will send it's response to http://localhost:1337 if you change the port after login from 1337 to 3000 it will complete the login process locally.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />

### `yarn run prebuild`

Launches a prebuild script that indexes content and prepares environment variables.

**prepareEnv()** - forwards environment variables from federalist to create-react-app

**prepareContent()** - parses markdown and appends objects with table of contents and excerpt. Creates an index.json file in each content directory that contains all content objects.

**indexMenus()** - Creates an index.json file in the menu directory that contains all menu objects.

### `yarn run build`

Builds the app for production to the `build` folder.

### Github Actions

When a push is made to the `content` branch, a PR will be automatically generated to merge the changes to the `master` branch. This is done to isolate content changes from code changes.

### Local Authentication

Login.gov can work with http://localhost:3000 however when the browser is redirected back it will be sent to http://localhost:1337/react/auth/logingov/callback?id_token=token&access_token=token&raw%5Baccess_token%5D=token&raw%5Btoken_type%5D=token Change the port from 1337 to 3000 in the browser and authentication will complete.
