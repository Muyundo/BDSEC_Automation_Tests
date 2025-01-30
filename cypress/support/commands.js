Cypress.Commands.add("baseurl", () => {
   // cy.visit("http://102.133.147.40/bahmni/home/index.html#/login");
    cy.visit('https://bdsec.intellisoftkenya.com/bahmni/home/')
});

Cypress.Commands.add('login', () => {
   cy.wait(2000)
   cy.get('#username').type('superman')
   cy.get('#password').type('Admin123')
   cy.wait(2000)
   cy.get('[ng-hide="showOTP"] > .ng-isolate-scope > .login-body > .form-footer > .confirm').click()
});

Cypress.Commands.add("typeWithClear", { prevSubject: true }, (subject, text) => {
    cy.wrap(subject).then((element) => {
      if (element.val() !== "") {
        cy.wrap(element).clear();
      }
    });
  
    cy.wrap(subject).type(text);
});

Cypress.Commands.add('waitForLoader', (timeout = 5000) => {
    cy.wait(timeout)
    cy.get('.loader', { timeout: 10000 }).should('not.exist'); // Ensure loader disappears
});

Cypress.on('uncaught:exception', (err, runnable) => {
    // Suppress uncaught exceptions
    return false;
});
