# firebase-authentication (quasar-app-extension-firebase-authentication)

This extension allows a developer to add basic core firebase authentication to their application. The main objectives are: **Register Users & Log In**

## Prerequisites

- You must have a firebase account, and access to your console
- A registered app in firebase, and access to the web api keys

## Installation & Uninstallation

**Install:**

`quasar ext --add @quasar/firebase-authentication`

While in dev:

`quasar ext --add firebase-authentication --skip-pkg`

**Uninstall:**

`quasar ext --remove @quasar/firebase-authentication`

While in dev:

`quasar ext --remove firebase-authentication --skip-pkg`

## Dependancies

- Quasar's dotenv (https://github.com/quasarframework/app-extension-dotenv)

`quasar ext --add @quasar/dotenv`

## Usage

In order to use this extension, either add it to your app, or take it for a test run in the test app location in this app extension. ***fb-test-app***

Note: The test app has had it's dotenv & firebase-authentication extensions removed to allow a fresh start.

1. Add the dotenv extension and follow the prompts. The root object must be named: **firebaseConfig**. This is the name of the config object that will be place into the process.env object during build time.

2. Next, install the firebase-authentication extension.

3. Last, add a routes for the login, and register user paths. For example:

`{ path: '/login', name: 'Login', component: () => import('components/Q-AE-Auth.vue') },`

`{ path: '/register', name: 'Register', component: () => import('components/Q-AE-Auth.vue') }`

If after the installation, you would like to modify your firebase authentication code for any reason, you can do so in the component installed from the app extension.

## Configuration

You must add at least one .env file that you named when installing the dotenv app extension. If you forgot what you name your environment files, you can look in:
`/quasar.extensions.json`

Once that file is created, get your api key from your firebase console, and then add the key into that .env file. Formatting is necessary for the environment file to be handled correctly. Here is an example:

## License

Copyright (c) 2019-present Adam K. Purdy

[MIT License](https://en.wikipedia.org/wiki/MIT_License)
