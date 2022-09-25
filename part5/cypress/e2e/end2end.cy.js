describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:3000')
    cy.request('POST','http://localhost:3001/api/users',{user:'string',password:'string',name:'string'})

  })
  it('  Login form is shown', function() {
    cy.get('input[placeholder="password"]')
    cy.get('input[placeholder="username"]')
    cy.get('button').contains('login')
  })

  describe('Login', function(){

    it(' failed Login', function() {
      cy.get('#form').get('input:first').type('String')
      cy.get('#form').get('input:last').type('String')
      cy.get('#form').get('button').click()
      cy.contains('invalid')
  
    })
    it(' success Login', function() {
      cy.get('#form').get('input:first').type('string')
      cy.get('#form').get('input:last').type('string')
      cy.get('#form').get('button').click()
      cy.contains('logout')
  
    })

    describe('Blog app',function ()
    { beforeEach(function(){
      cy.request('POST','http://localhost:3001/api/login',{user:'string',password:'string'})
      .then(res=>{
        
        localStorage.setItem('login',JSON.stringify(res.body))
      })
      cy.visit('http://localhost:3000')
        })
      
    it('A blog can be created', function() {
     cy.get('button:first').click()
     cy.get('input[placeholder="title"]').as('p').type('Nuevo')
     cy.get('input[placeholder="author"]').type('Yo')
     cy.get('input[placeholder="url"]').type('google')
      cy.get('@p').parent().get('button').contains('enviar').click()
     cy.contains('add new')
     cy.contains('Yo')
    })

    describe('Edit blog',function(){

      beforeEach(function(){
        cy.login({title:'Nuevo',author:'Yo',url:'google'})

      })

      it('Can likes blog',function(){

        cy.contains('view').click()
        cy.contains('0')
        cy.contains('likes').click()
        cy.contains('1')
      })


      it('Can delete',function(){
        cy.contains('view').click()
        cy.contains('Nuevo')
        cy.contains('remove').click()
        cy.get('html').should('not.contain','Nuevo')
       
      })


        describe('order likes', function(){
          beforeEach(function(){
            cy.login({title:'Nuevo',author:'Yo',url:'google',likes:7})
            cy.login({title:'Nuevo',author:'Yo',url:'google',likes:18})
            cy.login({title:'Nuevo',author:'Yo',url:'google',likes:2 })

          })

          it.only('view top',function(){
            cy.get('.likes').then($element=>{
              
               var list=  [...$element].map(span=> span.innerText)
              
               cy.wrap(list).should("equal", list.sort());      });
                     


      
      
      
      
      
      
      
      
      
      })
      
      
      
      
      })



    })




    }
    )




  })
  
})