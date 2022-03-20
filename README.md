# Simple Convert App [TEST TASK]

The project was implemented as a test task in scope of hiring process to [Simple](https://simple.life/)
There was one key implementation requirement - project must use [Vue 3](https://vuejs.org/) and any additional libraries, which may be considered necessary.

**Also, there were list of essential capabilities**:

1. It should be SPA
2. It should have 2 pages:
- Converter page, which contains input controls for currencies, and show result of conversion
- Currencies list page, which contains list of currencies rates relates to base currency
3. Base currency should be stored during user journey

Apart of that, there were few additional requirements:
- Test coverage
- User-friendly UI/UX
- As better performance as possible

### Project description

The project powered by:
- [Vue 3](https://vuejs.org/) and [Vue-CLI 5](https://cli.vuejs.org/), [Vuex](https://vuex.vuejs.org/guide/) and [Vue-Router](https://router.vuejs.org/)
- Supported [TypeScript](https://vuejs.org/guide/typescript/overview.html) and [PWA abilities](https://cli.vuejs.org/core-plugins/pwa.html#vue-cli-plugin-pwa)
- As financial api had been choosen [Principal API from Rapid API](https://rapidapi.com/principalapis/api/currency-conversion-and-exchange-rates/)

**Notes about project structure:**

Mostly, it is usual Vue-CLI project, but there are few important notes:
- `hooks` dir contains extracted logic, which might be shared between SFCs, in accordance to React hooks approach
- `services` dir contains class instances, which interacts with external APIs
- `pages` dir contains SFCs, which are as a `HOCs` for children components. Means, that they response to passing data to children, handling events from childrens (Data down, Actions up) and interaction with store. 
- Only components have unit-tests, because only for them unit-testing look applicable, as user input oriented SFCs

## How to run

There are supported `development` and `production` modes.

**NOTE:** PWA support works properly only in `production` mode.

#### Prerequisites

- Node.js v16.10.0
- NPM 7.24.0
- NPX 7.24.0
- Yarn 1.22.17
- OPTIONAL: serve 13.0.2 (for using `production` mode locally)

#### PrincipalAPI usage restictions:

Rapid API provides a lot of APIs kinds, but almost all of them has some restrictions/quotas for free subscriptions.
The API, which I use in current project also has quota to 1000 requests/month, so if you face with any issues with access to Principal API, you will have to perform next steps:

1. Visit and sign in or login on [Principal API page on RapidAPI](https://rapidapi.com/principalapis/api/currency-conversion-and-exchange-rates/)
2. Get `X-RapidAPI-Host` and `X-RapidAPI-Key` values from accordingly fields
3. Go to `.env` file from repository root level, and replace existing values by values from previous step
```
VUE_APP_API_BASE_URL=https://currency-conversion-and-exchange-rates.p.rapidapi.com
VUE_APP_API_HOST=[Your X-RapidAPI-Host]
VUE_APP_API_KEY=[Your X-RapidAPI-Key]
```

### Run in development mode

1. Clone repo
2. Install dependencies via `npm` or `yarn`
```
npm i
# OR
yarn
```
3. Run project
```
npm run serve
# OR
yarn serve
```
4. Run tests
```
npm run test:unit
# OR
yarn run test:unit
```

### Run in production mode

1. Clone repo
2. install `serve`
```
npx serve
# OR
yarn global add serve
```
3. Install dependencies via `npm` or `yarn`
```
npm i
# OR
yarn
```
4. Build project
```
napm run build
# OR
yarn build
```
4. Run project locally
```
serve -s dist
```

So, that's all. Have fun!
