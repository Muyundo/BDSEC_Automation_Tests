context('Actions', () => {
    beforeEach(() => {
        cy.interceptAPI()
        cy.waitForPageLoad()
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
     cy.waitForPageLoad()

     cy.get('.o_MessageList_empty', {timeout: 10000}).should('be.visible')
    // cy.waitForLoader()

     cy.wait('@InventoryDashboard')

     cy.get('.dropdown-toggle > .oi').click()
     cy.wait(500)
     cy.get('.o-dropdown--menu').contains('Sales').click()
     cy.wait(500)
     cy.get('.o_menu_sections').contains('Orders').click()
     cy.wait(500)
     cy.get('.o-dropdown--menu').contains('Quotations').click()
     cy.wait(5000)
     cy.get('.o_searchview_input', { timeout: 10000 }).should('be.visible').type(patientData.registrationNumber)
     cy.wait(500)
     cy.get('.o_searchview_input').type('{Enter}')
     
        
          })
      })
  })