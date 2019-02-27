
describe('The Login Page', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('Should have a title of Login', () => {
    cy.contains('h4', 'Login')
  })

  it('Should have an email field', () => {
    cy.get('[data-cy=email]')
      .should('contain', 'EMAIL')
  })

  it('Should have a password field', () => {
    cy.get('[data-cy=password]')
      .should('contain', 'PASSWORD')
  })

  it('Should have a LOGIN button', () => {
    cy.get('[data-cy=submit]')
      .should('contain', 'Login')
  })

  it('Should have a link for user registration', () => {
    cy.get('[data-cy=userRegLink]')
      .should('contain', 'Create a new user')
  })

  it('The link should take the user to the registration page.', () => {
    cy.get('[data-cy=userRegLink] a').click()
    cy.hash().should('contains', '/register')
  })

  it('Should require a valid email address', () => {
    cy.get('[data-cy=email] input').type('user@email')
    cy.wait(2500)
    cy.get('[data-cy=email] .q-field__control-container')
      .should('have.css', 'color', 'rgb(193, 0, 21)')
    cy.get('[data-cy=email]')
      .contains('i', 'priority_high')
      .should('have.css', 'color', 'rgb(193, 0, 21)')
  })

  it('Should require a password', () => {
    cy.get('[data-cy=email] input').type('user@email.com')
    cy.get('[data-cy=submit]').click()
    cy.get('.q-notifications__list--bottom .bg-negative .q-notification__message.col')
      .contains('Your credentials are invalid.')
  })

  it('Should log in user', () => {
    cy.get('[data-cy=email] input').type('user@email.com')
    cy.get('[data-cy=password] input').type('newpassword!')
    cy.get('[data-cy=submit]').click()
    cy.get('.q-notifications__list--bottom .bg-positive .q-notification__message.col')
      .contains('Success. Check your console for your current user object.')
  })
})
