Cypress.Commands.add("baseurl", () => {
  //cy.visit("http://102.133.147.40/bahmni/home/index.html#/login");
  cy.visit('https://bdsec.intellisoftkenya.com/bahmni/home/index.html#/login')
})

Cypress.Commands.add('login', () => {
  cy.waitForLoader()
   cy.get('#username').type('superman')
   cy.get('#password').type('Admin123')
   cy.wait(500)
   cy.get('[ng-hide="showOTP"] > .ng-isolate-scope > .login-body > .form-footer > .confirm').click()
})


Cypress.Commands.add('waitForLoader', (timeout = 5000) => {
    cy.wait(timeout)
    cy.get('.loader', { timeout: 10000 }).should('not.exist')
})

Cypress.Commands.add('module', ()=>{  //handles logins for each script that needs it
  cy.waitForLoader()

  cy.get('#location', {timeout: 10000}).should('be.visible').select('Registration Desk')
  cy.get('.confirm').click()
  cy.waitForPageLoad()
  cy.waitForNetworkIdle()
})

Cypress.Commands.add('interceptAPI', ()=> {
  cy.intercept('GET','**/openmrs/ws/rest/v1/bahmnicore/sql?location_uuid=*&provider_uuid=*&q=emrapi.sqlSearch.activePatientsByProvider&v=full'
  ).as('patientsInqueue')
  cy.intercept('POST','**openmrs/ws/rest/v1/user/**').as('patientDashboard')
  cy.intercept('GET','**openmrs/ws/rest/v1/bahmniie/form/latestPublishedForms' ).as('PublishedForms')
  cy.intercept('GET', '**/website/translations/**').as('InventoryDashboard')
})


Cypress.Commands.add('waitForPageLoad', (options = {}) => {
  const timeout = options.timeout || 60000
  return cy.window({ timeout }).should((window) => {
    // Check document ready state
    expect(window.document.readyState).to.equal('complete')

    // Check if jQuery is being used and all AJAX requests are complete
    if (window.jQuery) {
      expect(window.jQuery.active).to.equal(0);
    }

    // Check for loading spinners (adjust selectors based on your app)
    const spinners = window.document.querySelectorAll('.loading, .spinner, .loader, .o_loading');
    expect(spinners.length).to.equal(0);
  })
})


// Additional command for network idle
Cypress.Commands.add('waitForNetworkIdle', (options = {}) => {
  const timeout = options.timeout || 10000;
  let pendingRequests = 0;

  cy.intercept({ url: '**' }, (req) => {
    pendingRequests++;
    req.on('response', () => {
      pendingRequests--
    })
  })


})

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})
