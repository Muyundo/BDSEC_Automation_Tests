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
    cy.waitForLoader()
    cy.get('#location').select('Registration Desk')
    cy.get('.confirm').click()
    cy.waitForLoader()
    cy.get('.fa-user').click()
    cy.waitForLoader()

    cy.get('.fa-plus').click({force: true})

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
    cy.contains('Back').click({force: true})

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
    cy.get('.back-btn > .fa').click()
    
  //  cy.contains('Search').click()
    cy.get('@patientData').then((patientData) => {
     // cy.get('#name').type(`${patientData.fname} ${patientData.lname}`)
     // cy.get(':nth-child(4) > .reg-srch-btn > .ng-binding').click()

      // Validate search results
      //cy.get('tr.ng-scope > :nth-child(2)').should('contain', patientData.fname)

     // cy.get('.back-btn > .fa').click()
      cy.wait(1000)
      cy.get('.fa-stethoscope').click()
      cy.waitForLoader()
      cy.get('#patientIdentifier', { timeout: 10000 }).should('be.visible')
      cy.waitForLoader() 
      cy.get('#patientIdentifier').type(`${patientData.fname}`)
    
    cy.waitForLoader()

    cy.get('.smallImages').click()
    cy.waitForLoader()
    cy.get('.loader', { timeout: 10000 }).should('not.exist')
    cy.waitForLoader()

    cy.get('.btn--left').click()
    cy.wait(5000)
    cy.contains('Orders').click()
    cy.waitForLoader()
    cy.contains('Arterial lactate').click({ force: true })
    cy.contains('Bands').click({ force: true })
    cy.contains('RhD screen').click({ force: true })
    cy.contains('Basos').click({ force: true })
    cy.contains('Beta globulin level').click({ force: true })

    cy.get('.confirm > .fa').click()
    cy.waitForLoader()
    cy.get('.opd-header-bottom > :nth-child(1) > bm-back-links > ul > li.ng-scope > #patients-link > .fa').click()
    cy.waitForLoader()
    cy.get('.back-btn > .fa').click()
    cy.visit('https://bdsec.intellisoftkenya.com/')
    cy.get(':nth-child(2) > .launch > a').click()
    cy.waitForLoader()
    cy.get(':nth-child(1) > [colspan="2"] > input').type('admin')
    cy.get(':nth-child(3) > tbody > :nth-child(2) > [colspan="2"] > input').type('adminADMIN!')
    cy.get('#submitButton').click()
    cy.get('#todaySamplesToCollectListContainer-slick-grid > .slick-headerrow > .slick-headerrow-columns > .l1 > input').type(`${patientData.fname}`)
    cy.get('#todaySamplesToCollectListContainer-slick-grid > .slick-viewport > .grid-canvas > [style="top:0px"] > .l8 > a').click()
    cy.get('[width="80%"] > .textButton').click()
    cy.wait(500)
    cy.get('#saveButtonId').click()
    cy.get('#todaySamplesCollectedListContainerId').click()
    cy.get('#todaySamplesCollectedListContainer-slick-grid > .slick-headerrow > .slick-headerrow-columns > .l2 > input').type(`${patientData.fname}`)
    cy.get('[style="top:0px"] > .l12 > #result > #actionIcon').click()
     })
    })
})