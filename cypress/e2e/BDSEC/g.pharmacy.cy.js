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

     cy.get('.o_MessageList_empty', {timeout: 20000}).should('be.visible')
    // cy.waitForLoader()

     cy.wait('@InventoryDashboard')

     cy.get('.dropdown-toggle > .oi').click()
     cy.get('.o-dropdown--menu', {timeout: 20000}).contains('Sales').click()
     cy.get('.o_menu_sections', {timeout: 20000}).contains('Orders').click()
     cy.get('.o-dropdown--menu', {timeout: 20000}).contains('Quotations').click()
     cy.wait(1000)
     cy.get('.o_searchview_input', { timeout: 20000 })
     .should('be.visible')
     .type(patientData.registrationNumber)
     cy.wait(500)
     cy.get('.o_searchview_input', {timeout: 20000}).type('{Enter}')
     cy.get('.o_list_renderer', {timeout: 20000}).contains(patientData.fname, {timeout: 20000})
     .should('be.visible')
     .click({force: true})
     cy.get('td[name="price_unit"]', {timeout: 20000})
      .should('be.visible')
      .each(($cell) => {
        const randomPrice = Math.floor(Math.random() * 6) * 10 + 50
        cy.wrap($cell).click().type(`${randomPrice}{enter}`); 
      })

     cy.get('.o_form_statusbar', {timeout: 20000})
     cy.get('[data-hotkey="v"]')
      .click()
      cy.get('[name="action_view_invoice"]').click()
      cy.get('.o_form_statusbar', {timeout: 20000}).contains('REGISTER PAYMENT')
      cy.get('.modal-footer').contains('CREATE PAYMENT').click()
    
        
          })
      })
  })