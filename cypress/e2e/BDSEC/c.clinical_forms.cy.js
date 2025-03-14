
context('Actions', () => {
    beforeEach(() => {
      cy.baseurl()
      cy.login()
      cy.interceptAPI()    
    })
it('Update Clinical forms', () => {
    cy.readFile('cypress/fixtures/patientData.json').then((patientData) => {
      cy.module()
      cy.get('.apps > ul' , { timeout: 20000 })
      .should('be.visible')
      .contains('Clinical')
      .click()
      cy.waitForPageLoad()
     
      const regNumber = patientData.registrationNumber
            cy.get('.active-patient', {timeout: 20000})
            .should('be.visible')
            .each(($el) => {
              cy.wrap($el)
                .find('.patient-id')
                .invoke('text')
                .then((text) => {
                  if (text.trim() === regNumber) {
                    cy.wrap($el).click()
                    return false 
                  }
                })
            }) 
         // })     
     cy.waitForPageLoad()
      

      // Access the consultation template
      cy.get('.dashboard-header', {timeout: 60000})
        .contains('Consultation', {timeout: 20000})
        .should('be.visible').click()
      cy.wait('@PublishedForms').its('response.statusCode').should('eq', 200)
      cy.waitForPageLoad()
      cy.get('#template-control-panel-button').click()
      cy.waitForLoader()
      cy.get('.multi-select-lab-tests ul li', { timeout: 10000 }) 
      .contains('Amsler Grid Test')
      .click()
      
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
      cy.get('#opd-tabs > .opd-header-bottom')
      .contains('Save', {timeout: 20000})
      .should('be.visible')
      .click()
      cy.waitForLoader()
    })
  })

it('Verify the forms have been saved', ()=>{
    cy.readFile('cypress/fixtures/patientData.json').then((patientData) => {
    cy.module()
    cy.get('.apps > ul' , { timeout: 20000 }).should('be.visible').contains('Clinical').click()
      cy.wait('@patientsInqueue').its('response.statusCode').should('eq', 200)
      const regNumber = patientData.registrationNumber
            cy.get('.active-patient').each(($el) => {
              cy.wrap($el)
                .find('.patient-id')
                .invoke('text')
                .then((text) => {
                  if (text.trim() === regNumber) {
                    cy.wrap($el).click()
                    return false 
                  }
                })
            })      
      cy.waitForPageLoad()

      // Access the consultation template
    cy.contains('.form-name', 'Amsler Grid Test', { timeout: 20000 }) 
      .should('be.visible')

    cy.contains('.form-name', 'Registration Details', { timeout: 20000 })
      .should('be.visible')
    })
  })
})