describe('Note app', function() {
  beforeEach(function(){
    cy.request('POST','http://localhost:3001/api/testing/reset')
    const user ={
      name : 'String',
      username: 'String',
      password: 'String'
    }
    cy.request('POST','http://localhost:3001/api/users/',user)
    cy.visit('http://localhost:3000')
  })
  it('front page can be opened', function() {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2020')
  })
  it('login form can be opened',function(){
    cy.contains('login').click()
  })
  it('user can login ',function (){
    cy.contains('login').click()
    cy.get('#username').type('String')
    cy.get('#password').type('String')
    cy.get('#login-button').click()
    cy.contains('new note')
  })

  it('user login  error ',function (){
    cy.contains('login').click()
    cy.get('#username').type('String')
    cy.get('#password').type('Strings')
    cy.get('#login-button').click()
    cy.get('.error').should('contain', 'Wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'Matti Luukkainen logged in')

  })

  describe('when logged in',function(){
    beforeEach(function(){
      cy.login({ username: 'String', password: 'String' })
    })
    it('a new note can be created',function(){
      cy.contains('new note').click()
      cy.get('input').type('a note created by cypress')
      cy.contains('save').click()
      cy.contains('a note created by cypress')
    })
    describe('add a note exists',function(){
      beforeEach(function(){
        cy.createNote({ content: 'first note', important: false })
        cy.createNote({ content: 'second note', important: false })
        cy.createNote({ content: 'third note', important: false })
      })
      it('one of those can be made important', function () {
        cy.contains('second note').parent().find('button').as('theButton')
        cy.get('@theButton').click()
        cy.get('@theButton').should('contain', 'make not important')
      })
    })


  })


})
