# firebase-authentication (quasar-app-extension-firebase-authentication)
This project is a Quasar Application Extension. It's main objective is to add the first level of authentication: Register Users & Log In

## Installation

`quasar ext --add @quasar/firebase-authentication`

## Dependancies

- Quasar's dotenv (https://github.com/quasarframework/app-extension-dotenv)
`quasar ext --add @quasar/donenv`

## Usage

1. Add the dotenv extension and follow the prompts. The root object must be named: **firebaseConfig**. This is the name of the config object that will be place into the process.env object during build time.

2. Next, install the firebase-authentication extension.

3. Last, add a routes for the login, and register user paths. For example:
`{ path: '/login', name: 'Login', component: () => import('components/Q-AE-Auth.vue') },`
 `{ path: '/register', name: 'Register', component: () => import('components/Q-AE-Auth.vue') }`

## Configuration

You must add at least one .env file that you named when installing the dotenv app extension. If you forgot what you name your environment files, you can look in:
`/quasar.extensions.json`

Once that file is created, get your api key from your firebase console, and then add the key into that .env file. Formatting is necessary for the environment file to be handled correctly. Here is an example: