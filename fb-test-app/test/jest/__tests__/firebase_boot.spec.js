import firebaseBoot from '~/src/boot/firebase.js'
import { createLocalVue, shallowMount } from 'test-utils'
import firebasemock from 'firebase-mock'

const mockauth = new firebasemock.MockAuthentication()
const mockdatabase = new firebasemock.MockFirebase()
// import Quasar from 'quasar'
// import { mountQuasar } from '~/test/jest/utils'
console.log(mockauth, mockdatabase)
describe('Firebase boot', () => {
  it('Does stuff', () => {
    // const wrapper = mountQuasar()
    const app = { props: {} }
    const router = { routes: [] }
    const Vue = createLocalVue()
    const ctx = {
      app,
      router,
      Vue
    }
    firebaseBoot(ctx)
  })
})
