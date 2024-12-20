///<reference types="cypress" />

import faker from 'faker'

context('Actions', () => {
  beforeEach(() => {
    cy.baseurl()
    cy.login()
  })

  it('.type() - Register Patient', () => {
    const fname = faker.name.firstName()
    const mname = faker.name.firstName()
    const lname = faker.name.lastName()

    const phone = '07' + Math.floor(Math.random() * 1000000000) // Generate a valid phone number
    const genders = ['Male', 'Female']
    const randomGender = genders[Math.floor(Math.random() * genders.length)]
    const randomAge = Math.floor(Math.random() * 50) + 1

    // Start filling the form
    cy.get('#location').select('Registration Desk')
    cy.get('.confirm').click()
    cy.waitForLoader()
    cy.get('.fa-user').click()
    cy.waitForLoader()

    cy.get('.fa-plus').click()

    // Type in the fields
    cy.get('#givenName').type(fname)
    cy.get('#middleName').type(mname)
    cy.get('#familyName').type(lname)
    cy.get('#gender').select(randomGender)
    cy.get('#ageYears').type(randomAge)
    cy.get('#phoneNumber').type(phone)

    // Toggle and select a random visit
    cy.get('button.toggle-button').click() // toggle visits
    cy.get('.options > li').then(($options) => {
      const totalOptions = $options.length
      const randomIndex = Math.floor(Math.random() * totalOptions)
      cy.wrap($options[randomIndex]).find('button').click() // select a random visit
    })
    cy.waitForLoader()

    // Submit the form
    cy.contains('Save').click({ force: true })
    cy.wait(1000)
    cy.contains('Back').click()

    // Capture patient data for reuse
    cy.get('#patientIdentifierValue')
      .invoke('text')
      .then((registrationNumber) => {
        const patientData = {
          fname,
          mname,
          lname,
          phone,
          registrationNumber: registrationNumber.trim()
        }

        // Wrap patientData in a Cypress alias for later use
        cy.wrap(patientData).as('patientData')
        cy.log(`Registered patient: ${patientData.fname} ${patientData.mname} ${patientData.lname} with ID: ${patientData.registrationNumber}`)
      })

    // Search for Registered Patient
    cy.contains('Search').click()
    cy.get('@patientData').then((patientData) => {
      cy.get('#name').type(`${patientData.fname} ${patientData.lname}`)
      cy.get(':nth-child(4) > .reg-srch-btn > .ng-binding').click()

      // Validate search results
      cy.get('tr.ng-scope > :nth-child(2)').should('contain', patientData.fname)

      cy.get('.back-btn > .fa').click()
      cy.wait(1000)
      cy.get('.fa-stethoscope').click()
      cy.waitForLoader()
      cy.get('#patientIdentifier', { timeout: 10000 }).should('be.visible')
      cy.get('#patientIdentifier').type(`${patientData.fname}`)
    })

    cy.get('.smallImages').click()
    cy.wait(1000)
    cy.get('.loader', { timeout: 10000 }).should('not.exist')
    cy.contains('onsultation').click()
    cy.contains('Orders').click()
    cy.waitForLoader()
    cy.get(':nth-child(5) > .grid-row-element').click({ force: true })
    cy.get(':nth-child(6) > .grid-row-element').click({ force: true })
    cy.get(':nth-child(7) > .grid-row-element').click({ force: true })
    cy.get(':nth-child(8) > .grid-row-element').click({ force: true })
    cy.get(':nth-child(9) > .grid-row-element').click({ force: true })
    cy.get('.confirm > .fa')
  })
})
