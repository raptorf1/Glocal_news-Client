describe('User can sign up', () => {
  it('successfully', () => {
    cy.server()
    cy.route({
      method: 'GET',
      url: 'http://localhost:3002/api/v1/articles',
      response: 'fixture:list_of_articles.json',
    })
    cy.route({
      method: 'POST',
      url: 'http://localhost:3002/api/v1/auth',
      status: 200,
      response: 'fixture:successful_signup.json'
    })
    cy.visit('http://localhost:3001')
    cy.get('#sign_up').click()
    cy.get('#signup-form').within(() => {
      cy.get('#email').type('zane@mail.com')
      cy.get('#password').type('password')
      cy.get('#password_confirmation').type('password')
    })
    cy.get('button').click()
    cy.contains('Welcome Zane Mail Com')
  })

  it('and gets error message if email is not valid and/or passwords do not match', () => {
    cy.server();
    cy.route({
      method: 'GET',
      url: 'http://localhost:3002/api/v1/articles',
      response: 'fixture:list_of_articles.json',
    })
    cy.route({
      method: 'POST',
      url: 'http://localhost:3002/api/v1/auth',
      status: "401",
      response: 'fixture:unsuccessful_login.json',
    })
    cy.visit('http://localhost:3001')
    cy.get('#login').click()
    cy.get('#login-form').within(() => {
      cy.get('#email').type('boa@mail.com')
      cy.get('#password').type('wrongpassword')
      cy.get('button').click()
    })
    cy.contains('Invalid login credentials. Please try again.')
  })
})
