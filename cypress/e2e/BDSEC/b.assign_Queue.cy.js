import faker from 'faker'
const numberOfDownArrowPresses = Cypress._.random(1, 10)

context('Actions', () => {
  beforeEach(() => {
    cy.baseurl()
    cy.login()
  })
it('Start the patient visit', () => {
    cy.readFile('cypress/fixtures/patientData.json').then((patientData) => {
      cy.log(`Retrieved Registration Number: ${patientData.registrationNumber}`)

      cy.waitForLoader()
      cy.get('#location').select('Registration Desk')
      cy.get('.confirm').click()
      cy.waitForLoader()
      cy.get('.fa-user').click()
      cy.waitForLoader()

      // Use the captured registration number
      cy.get('#registrationNumber').should('be.visible').type(patientData.registrationNumber)
      cy.wait(2000)
      
      cy.get('.search-patient-id > .reg-srch-btn > .ng-binding').click()
      cy.waitForLoader()
      cy.contains('Start OPD visit').click()
      cy.waitForLoader()

      const Fees = Math.floor(Math.random() * 51) * 10 + 500
      cy.get(':nth-child(1) > .form-builder-column-wrapper > .form-builder-column > .form-field-wrap > .form-field-content-wrap > .obs-control-field > .fl > input').type(Fees)
      cy.get(':nth-child(3) > .form-builder-column-wrapper > .form-builder-column > .form-field-wrap > .form-field-content-wrap > .obs-control-field > .fl > input').type(Fees)
      cy.contains('Save').click({ force: true })
      cy.wait(1000)
    })
  })
})