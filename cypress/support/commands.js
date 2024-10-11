Cypress.Commands.add("baseurl", () => {
  //cy.clearCookies();

    
    cy.visit("https://bdsec.intellisoftkenya.com/home");
  })
  
  Cypress.Commands.add('login', () => {
    cy.wait(2000)
    //cy.get(':nth-child(1) > .launch > a ').click()
   cy.get('#username').type('superman')
   cy.get('#password').type('Admin123')
   cy.wait(2000)
   cy.get('[ng-hide="showOTP"] > .ng-isolate-scope > .login-body > .form-footer > .confirm').click()
  })
  Cypress.Commands.add("typeWithClear", { prevSubject: true }, (subject, text) => {
    // Clear the field using cy.clear() if it already has data
    cy.wrap(subject).then((element) => {
      if (element.val() !== "") {
        cy.wrap(element).clear();
      }
    });
  
    // Type the specified text into the field
    cy.wrap(subject).type(text);
  });
  
  Cypress.on('uncaught:exception', (err, runnable) => {
    // Suppress uncaught exceptions
    return false;
  })