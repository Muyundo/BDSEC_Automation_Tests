///<reference types="cypress" />

import faker from 'faker'
const numberOfDownArrowPresses = Cypress._.random(1, 10)

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

    // Start filling the form
    cy.waitForLoader()
    cy.get('#location').select('Registration Desk')
    cy.get('.confirm').click()
    cy.waitForLoader()
    cy.get('.fa-user').click()
    cy.waitForLoader()

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
    cy.get('#patientIdentifierValue')
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

        // Write to JSON file for later use
        cy.writeFile('cypress/fixtures/patientData.json', patientData)
      })
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

  it('Update Clinical forms', () => {
    cy.readFile('cypress/fixtures/patientData.json').then((patientData) => {
      cy.waitForLoader()
      cy.get('#location').select('Registration Desk')
      cy.get('.confirm').click()
      cy.waitForLoader()
      cy.get('.fa-stethoscope').click()
      cy.waitForLoader()

      // Search for the registered patient
      cy.get('#patientIdentifier').should('be.visible').type(patientData.fname)
      cy.waitForLoader()
      cy.get('.smallImages').click()
      cy.waitForLoader()
      cy.get('.loader').should('not.exist')
      cy.waitForLoader()

      // Access the consultation template
      cy.get('.btn--left').click()
      cy.wait(5000)
      cy.get('#template-control-panel-button').click()
      cy.waitForLoader()
      cy.get('#Amsler_Grid_Test').click()

      function selectRandomOptionsForAllDropdowns() {
        cy.get('.obs-control-select-wrapper').each(($dropdown) => {
          cy.wrap($dropdown).find('.Select-control').click()
          cy.get('.Select-menu')
            .find('[role="option"]')
            .then((options) => {
              const totalOptions = options.length
              const randomIndex = Math.floor(Math.random() * totalOptions)
              cy.wrap(options[randomIndex]).click()
            })
        })
      }

      selectRandomOptionsForAllDropdowns()
      cy.get(':nth-child(3) > .confirm').click()
      cy.waitForLoader()
    })
  })

  it('Make Lab Orders', () => {
    cy.readFile('cypress/fixtures/patientData.json').then((patientData) => {
      cy.waitForLoader()
      cy.get('#location').select('Registration Desk')
      cy.get('.confirm').click()
      cy.waitForLoader()
      cy.get('.fa-stethoscope').click()
      cy.waitForLoader()

      // Search for the registered patient
      cy.get('#patientIdentifier').should('be.visible').type(patientData.fname)
      cy.waitForLoader()
      cy.get('.smallImages').click()
      cy.waitForLoader()
      cy.get('.loader').should('not.exist')
      cy.waitForLoader()

      // Access the consultation template
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
      cy.get('.l12 > #result > #actionIcon').click()
      cy.get('#results_1').type('10')
      cy.get('#results_3').type('25')
      cy.get('#saveButtonId').click()
      cy.waitForLoader()
      cy.get('[style="top:0px"] > .l12 > #validate > #actionIcon').click()
        // Accept lab results
        cy.get('table tbody tr').each(($row, index, $rows) => {
          cy.wrap($row).find('td').eq(4).find('input[type="checkbox"]').then(($checkbox) => {
            if (!$checkbox.prop('disabled')) {
              cy.wrap($checkbox).click()
            }
          })
        })     
      cy.get('#saveButtonId').click()

    })
  })
})
