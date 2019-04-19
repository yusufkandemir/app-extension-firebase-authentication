import QAEAuth from '~/src/components/Q-AE-Auth.vue'
import Vuelidate from 'vuelidate'
import { createLocalVue, shallowMount } from 'test-utils'
import flushPromises from 'flush-promises'

import { Quasar, QBtn, QIcon, QInput, QSpinnerGears, Notify } from 'quasar'
import { mountQuasar } from '~/test/jest/utils'
import { mount } from '@vue/test-utils'

import firebasemock from 'firebase-mock'
import { resolve } from 'tsconfig'
const mockauth = new firebasemock.MockAuthentication()
const mocksdk = new firebasemock.MockFirebaseSdk(() => {
  return mockauth
})

const localVue = createLocalVue()
localVue.use(Vuelidate)
localVue.use(Quasar, { components: { QBtn, QIcon, QInput, QSpinnerGears }, plugins: { Notify } })
const wrapper = mount(QAEAuth, {
  localVue,
  mocks: {
    $route: { name: '' }
  },
  stubs: ['router-link']
})

const vm = wrapper.vm

vm.$fb = {
  login: jest.fn(() => {
    return new Promise((resolve, reject) => {
      resolve({ userData: 'Firebase Object from login' })
    })
  }),
  createUser: jest.fn(() => {
    return new Promise((resolve, reject) => {
      resolve({ userData: 'Firebase Object from new user creation' })
    })
  })
}

describe('Q-AE-Component', () => {
  it('passes the sanity check and creates a wrapper', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('can navigate to Login', () => {
    wrapper.setData({ $route: { name: 'Login' } })
    expect(wrapper.find('.authentication h4').text()).toBe('Login')
  })

  it('can navigate to Register', () => {
    wrapper.setData({ $route: { name: 'Register' } })
    expect(wrapper.find('.authentication h4').text()).toBe('Register')
  })

  it('will fail with invalid credentials', () => {
    wrapper.setData({ $route: { name: 'Login' } })
    wrapper.find('input[data-cy="email"]').setValue('test@example')
    wrapper.find('input[data-cy="password"]').setValue('newpassword!')
    wrapper.find('button[data-cy="submit"]').trigger('click')
    expect(vm.checkCredentials).toThrow()
  })

  it('will call the login function when routed to \'/login\'', async () => {
    wrapper.setData({ $route: { name: 'Login' } })
    wrapper.find('input[data-cy="email"]').setValue('test@example.com')
    wrapper.find('input[data-cy="password"]').setValue('newpassword!')
    wrapper.find('button[data-cy="submit"]').trigger('click')
    expect(vm.$fb.login).toHaveBeenCalled()
  })

  it.only('will call the createUser function when routed to \'/register\'', async () => {
    wrapper.setData({ $route: { name: 'Register' } })
    wrapper.find('input[data-cy="email"]').setValue('test@example.com')
    wrapper.find('input[data-cy="password"]').setValue('newpassword!')
    wrapper.find('button[data-cy="submit"]').trigger('click')
    expect(vm.$fb.createUser).toHaveBeenCalled()
  })
})

// set localVue to use firebase
// log a user in
// have firebase moch hijack the firebase call
// resolve and set the user to the Vue instanace via prototype
