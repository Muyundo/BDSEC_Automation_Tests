context('Actions', () => {
    beforeEach(() => {
        //cy.interceptAPI()
      })
    it('Review and approve orders in the Lab', () => {
      cy.readFile('cypress/fixtures/patientData.json').then((patientData) => {
      //cy.visit('https://bdsec.intellisoftkenya.com/')
     // cy.waitForLoader()
     cy.visit('https://erp-bdsec.intellisoftkenya.com/web/login')
     cy.get('form').should('be.visible'); // Wait for form to be visible
     cy.get('#login').type('admin')
     cy.get('#password').type('admin')
     cy.wait(500)
     cy.contains('Log in').click()
        
    


          })
      })
  })