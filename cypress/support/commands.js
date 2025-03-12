Cypress.Commands.add("baseurl", () => {
  //cy.visit("http://102.133.147.40/bahmni/home/index.html#/login");
 cy.visit('https://bdsec.intellisoftkenya.com/bahmni/home/index.html#/login')
})

      Cypress.Commands.add('login', () => {
          cy.log("USERNAME: ", Cypress.env("USERNAME"));
          cy.get("#username").type(Cypress.env("USERNAME"))
          cy.get("#password").type(Cypress.env("CYPRESS_PASSWORD"))
          cy.get('[ng-hide="showOTP"] > .ng-isolate-scope > .login-body', {timeout: 10000})
            .contains('Login')
            .should('be.visible')
            .click()
        })
        


      Cypress.Commands.add('waitForLoader', (timeout = 5000) => {
          cy.wait(timeout)
          cy.get('.loader', { timeout: 10000 }).should('not.exist')
      })


      Cypress.Commands.add('module', ()=>{ 
        cy.waitForPageLoad()
        cy.get('#location', {timeout: 20000})
        .should('be.visible')
        .select('Registration Desk')
        cy.get('.confirm').click()
        cy.waitForPageLoad()
      })


      Cypress.Commands.add('interceptAPI', ()=> {
        cy.intercept('GET','**/openmrs/ws/rest/v1/bahmnicore/sql?location_uuid=*&provider_uuid=*&q=emrapi.sqlSearch.activePatientsByProvider&v=full'
        ).as('patientsInqueue')
        cy.intercept('POST','**openmrs/ws/rest/v1/user/**').as('patientDashboard')
        cy.intercept('GET','**openmrs/ws/rest/v1/bahmniie/form/latestPublishedForms' ).as('PublishedForms')
        cy.intercept('GET', '**/website/translations/**').as('InventoryDashboard')
        cy.intercept('GET', '**/openmrs/ws/rest/v1/patientImage?patientUuid=**').as('cssComponents')
      })


      Cypress.Commands.add('waitForPageLoad', (options = {}) => {
        const timeout = options.timeout || 60000
        return cy.window({ timeout }).should((window) => {
          expect(window.document.readyState).to.equal('complete')
          if (window.jQuery) {
            expect(window.jQuery.active).to.equal(0);
          }
          const spinners = window.document.querySelectorAll('.loading, .spinner, .loader, .o_loading');
          expect(spinners.length).to.equal(0);
        })
      })


      Cypress.on('uncaught:exception', (err, runnable) => {
          return false
      })
