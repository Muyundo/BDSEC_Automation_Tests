///<reference types="cypress" />

import faker from 'faker'
context('Actions', () => {
  beforeEach(() => {
    cy.baseurl()
    cy.login()
  })

  it('Register Patient', () => {
    const fname = faker.name.firstName()
    const mname = faker.name.firstName()
    const lname = faker.name.lastName()
    const randomName = faker.name.findName()
    const email = faker.internet.email()

    const phone = '07' + Math.floor(Math.random() * 1000000000) // Generate a phone number
    const genders = ['Male', 'Female']
    const randomGender = genders[Math.floor(Math.random() * genders.length)]
    const randomAge = Math.floor(Math.random() * 50) + 1

    cy.module()
    cy.waitForNetworkIdle()
    cy.waitForNetworkIdle()
    cy.get('.apps > ul', { timeout: 20000 })
        .should('be.visible')
        .contains('Registration', { timeout: 20000 })
        .should('be.visible')
        .click()
    cy.waitForLoader()
    cy.get('.fa-plus', {wait: 10000}).should('be.visible').click({ force: true })
    cy.waitForLoader()

    // Type in the fields
    cy.get('#givenName').type(fname)
    cy.get('#middleName').type(mname)
    cy.get('#familyName').type(lname)
    cy.get('#gender').select(randomGender)
    cy.get('#ageYears').type(randomAge.toString())
    cy.get('#phoneNumber').type(phone)
    cy.get('#email').type(email)
    cy.contains('Next of Kin Details').click()
    cy.get('#nextofKinName').type(randomName)
    cy.get('#nextOfKinEmail').type(email)
    cy.get('.submit-btn').click()

    // Capture and store patient data
    cy.get('#patientIdentifierValue', { timeout: 10000 })
      .should('be.visible')
      .invoke('text')
      .then((registrationNumber) => {
        const patientData = {
          fname,
          mname,
          lname,
          phone,
          registrationNumber: registrationNumber.trim()
        }

        cy.log(`Captured Registration Number: ${patientData.registrationNumber}`)
        cy.writeFile('cypress/fixtures/patientData.json', patientData)
      })
    })

    it('Start the patient visit', () => {
      cy.readFile('cypress/fixtures/patientData.json').then((patientData) => {
        cy.module()
    cy.waitForNetworkIdle()
    cy.waitForNetworkIdle()
    cy.get('.apps > ul', { timeout: 20000 })
        .should('be.visible')
        .contains('Registration', { timeout: 20000 })
        .should('be.visible')
        .click()
        cy.waitForNetworkIdle()
        cy.waitForPageLoad()
        cy.get('#registrationNumber', {timeout: 10000}).should('be.visible').type(patientData.registrationNumber)
        cy.wait(2000)
        
        cy.get('.search-patient-id > .reg-srch-btn > .ng-binding').click()
        cy.waitForLoader()
       // cy.contains('Start OPD visit').click()
cy.get('.submit-btn-container')
  .first()
  .within(() => {
    cy.get('.toggle-button', {timeout: 10000})
      .should('be.visible')
      .should('not.be.disabled')
      .click()
    cy.get('.secondaryOption')
      .should('be.visible')
      .should('have.length.gt', 0)
      .find('button')
      .then($options => {
        // Filter out any disabled options
        const enabledOptions = $options.filter(':not(:disabled)')
        const randomIndex = Math.floor(Math.random() * enabledOptions.length)        
        cy.wrap(enabledOptions[randomIndex])
          .scrollIntoView()
          .click({force: true})
          .then($clicked => {
            cy.log(`Selected queue: ${$clicked.text().trim()}`)
          })
      })
  })

        cy.waitForLoader()
  
        const Fees = Math.floor(Math.random() * 51) * 10 + 500
        cy.get(':nth-child(1) > .form-builder-column-wrapper > .form-builder-column > .form-field-wrap > .form-field-content-wrap > .obs-control-field > .fl > input', {timeout: 10000}).should('be.visible').type(Fees)
        cy.get(':nth-child(3) > .form-builder-column-wrapper > .form-builder-column > .form-field-wrap > .form-field-content-wrap > .obs-control-field > .fl > input', {timeout: 10000}).should('be.visible').type(Fees)
        cy.contains('Save').click({ force: true })
        cy.wait(1000)
      })
    })
  })
  





