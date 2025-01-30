
context('Actions', () => {
    beforeEach(() => {
      cy.baseurl()
      cy.login()
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
})