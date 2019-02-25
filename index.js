/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/IndexAPI.js
 */
const addFirebaseBootFilesAndComponents = (cfg, ctx) => {

    let bootFileAdditions = [
      { path: 'firebase' },
      { path: 'routeGuard' },
      { path: 'vuelidate' }
    ]

    let frameworkComponentAdditions = [
      'QInput',
      'QSpinnerGears'
    ]

    bootFileAdditions.forEach((item, index) => {
      ctx.boot.push(item)
    })

    frameworkComponentAdditions.forEach((item, index) => {
      ctx.framework.components.push(item)
    })
}

module.exports = function (api, ctx) {
  api.extendQuasarConf((cfg) => {
    addFirebaseBootFilesAndComponents(api, cfg)
  })
}
