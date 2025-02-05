
context('Actions', () => {
    beforeEach(() => {
      cy.baseurl()
      cy.login()
      cy.interceptAPI()
    })
it('Update Clinical forms', () => {
    cy.readFile('cypress/fixtures/patientData.json').then((patientData) => {
      cy.module()
      cy.get('.fa-stethoscope').click()
      cy.wait('@patientsInqueue').its('response.statusCode').should('eq', 200)
      cy.get('#patientIdentifier').should('be.visible').type(patientData.registrationNumber)
      cy.get('.smallImages').click()
      cy.wait('@patientDashboard').its('response.statusCode').should('eq', 200)
      cy.waitForLoader()

      // Access the consultation template
      cy.get('.btn--left').click()
      cy.wait('@PublishedForms').its('response.statusCode').should('eq', 200)
      cy.waitForLoader()
      cy.get('#template-control-panel-button').click()
      //cy.waitForLoader()
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

it('Verify the forms have been saved', ()=>{
    cy.readFile('cypress/fixtures/patientData.json').then((patientData) => {
    cy.module()
    cy.get('.fa-stethoscope').click()
    cy.wait('@patientsInqueue').its('response.statusCode').should('eq', 200)
    cy.get('#patientIdentifier').should('be.visible').type(patientData.registrationNumber)
    cy.get('.smallImages').click()
    cy.wait('@patientDashboard').its('response.statusCode').should('eq', 200)
    cy.contains('.form-name', 'Amsler Grid Test', { timeout: 10000 }) 
      .should('be.visible');

    cy.contains('.form-name', 'Registration Details', { timeout: 10000 })
      .should('be.visible')
    })
  })
})