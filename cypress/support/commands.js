Cypress.Commands.add("baseurl", () => {
    //cy.visit("http://102.133.147.40/bahmni/home/index.html#/login");
    cy.visit('https://bdsec.intellisoftkenya.com/bahmni/home/index.html#/login')
})

Cypress.Commands.add('login', () => {
  cy.waitForLoader()
   cy.get('#username').type('superman')
   cy.get('#password').type('Admin123')
   cy.wait(2000)
   cy.get('[ng-hide="showOTP"] > .ng-isolate-scope > .login-body > .form-footer > .confirm').click()
})

Cypress.Commands.add("typeWithClear", { prevSubject: true }, (subject, text) => {
    cy.wrap(subject).then((element) => {
      if (element.val() !== "") {
        cy.wrap(element).clear()
      }
    })
  
    cy.wrap(subject).type(text)
})

Cypress.Commands.add('waitForLoader', (timeout = 5000) => {
    cy.wait(timeout)
    cy.get('.loader', { timeout: 10000 }).should('not.exist')
})

Cypress.Commands.add('module', ()=>{  //handles logins for each script that needs it
  cy.waitForLoader()

  cy.get('#location').select('Registration Desk')
  cy.get('.confirm').click()
  cy.waitForLoader()

})

Cypress.Commands.add('interceptAPI', ()=> {
  cy.intercept('GET','**/openmrs/ws/rest/v1/bahmnicore/sql?location_uuid=*&provider_uuid=*&q=emrapi.sqlSearch.activePatientsByProvider&v=full'
  ).as('patientsInqueue')
  cy.intercept('POST','**openmrs/ws/rest/v1/user/**').as('patientDashboard')
  cy.intercept('GET','**openmrs/ws/rest/v1/bahmniie/form/latestPublishedForms' ).as('PublishedForms')
})


Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})
