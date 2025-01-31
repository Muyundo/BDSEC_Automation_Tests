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
    cy.get('.fa-user').click()
    cy.get('.fa-plus').click({ force: true })
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
  })
  





