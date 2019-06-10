describe('User can view user page', () => {

  beforeEach(function () {
    cy.server();
    cy.route({
      method: 'GET',
      url: 'http://localhost:3002/api/v1/articles',
      response: 'fixture:list_of_articles.json',
      status: 200
    })
    cy.route({
      method: 'GET',
      url: 'http://localhost:3002/api/v1/categories',
      response: 'fixture:categories_list.json',
      status: 200
    })
    cy.route({
      method: 'POST',
      url: 'http://localhost:3002/api/v1/auth/sign_in',
      response: 'fixture:successful_login.json',
      headers: {
        "uid": "boa@mail.com"
      }
    })
    cy.visit('http://localhost:3001')
  })

  it('after he logs in and clicks on Welcome link', () => {

    cy.get("#login").click()
    cy.get('#login-form').within(() => {
      cy.get('#email').type('boa@mail.com')
      cy.get('#password').type('password')
    })
    cy.get('#login_form_button').click()
    cy.wait(3000)
    cy.get('#welcome').click()
    cy.contains('Hello Boa. This is your private page.')
    cy.get('#published_articles').within(() => {
      cy.contains('Your published articles')
      cy.contains('A Day in Rome')
      cy.contains('A Day in Thessaloniki')
    })
    cy.get('#unpublished_articles').within(() => {
      cy.contains('Your unpublished articles')
      cy.contains('Rainy day')
    })
    cy.get('#declined_articles').within(() => {
      cy.contains('Your declined articles')
      cy.contains('A Day in Paris')
    })
  })
})
