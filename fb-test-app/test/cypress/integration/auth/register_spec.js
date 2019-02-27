describe('The Register Page', () => {
  beforeEach(() => {
    cy.visit('/register')
  })

  it('Should have a title of Register', () => {
    cy.contains('h4', 'Register')
  })

  it('Should have an email field', () => {
    cy.get('[data-cy=email]')
      .should('contain', 'EMAIL')
  })

  it('Should have a password field', () => {
    cy.get('[data-cy=password]')
      .should('contain', 'PASSWORD')
  })

  it('Should have a verify password field', () => {
    cy.get('[data-cy=verifyPassword]')
      .should('contain', 'VERIFY PASSWORD')
  })

  it('Should have a Register button', () => {
    cy.get('[data-cy=submit]')
      .should('contain', 'Register')
  })

  it('Should have a link for user login', () => {
    cy.get('[data-cy=loginLink]')
      .should('contain', 'Log In')
  })

  it('The link should take the user to the login page.', () => {
    cy.get('[data-cy=loginLink] a').click()
    cy.hash().should('contains', '/login')
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

  it('Should detect non-matching passwords', () => {
    cy.get('[data-cy=password] input').type('abcd')
    cy.get('[data-cy=verifyPassword] input').type('efgh')
    cy.wait(2500)
    cy.get('[data-cy=verifyPassword] .q-field__control-container')
      .should('have.css', 'color', 'rgb(193, 0, 21)')
    cy.get('[data-cy=verifyPassword]')
      .contains('i', 'priority_high')
      .should('have.css', 'color', 'rgb(193, 0, 21)')
  })

  it.only('Should register a new user', () => {
    cy.get('[data-cy=email] input').type('user@email.com')
    cy.get('[data-cy=password] input').type('newpassword!')
    cy.get('[data-cy=verifyPassword] input').type('newpassword!')
    cy.get('[data-cy=submit]').click()
    cy.get('.q-notifications__list--bottom .bg-positive .q-notification__message.col')
      .contains('Success. Check your console for your current user object.')
  })
})
