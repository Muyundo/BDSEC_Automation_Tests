context('Actions', () => {
    beforeEach(() => {
      cy.baseurl()
      cy.login()
    })
  it('Make Lab Orders', () => {
    cy.readFile('cypress/fixtures/patientData.json').then((patientData) => {
      cy.module()
      cy.get('.apps > ul' , { timeout: 20000 }).should('be.visible').contains('Clinical').click()
      //  cy.wait('@patientsInqueue').its('response.statusCode').should('eq', 200)
        //cy.get('#patientIdentifier').should('be.visible').type(patientData.registrationNumber)
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
       // cy.wait('@patientDashboard').its('response.statusCode').should('eq', 200)
        cy.waitForPageLoad()
  

      // Access the consultation template
      cy.get('.btn--left').click()
      cy.waitForPageLoad()
      cy.get('#opd-tabs > .opd-header-bottom')
        .contains('Orders', {timeout: 20000})
        .should('be.visible')
        .click()
      cy.waitForPageLoad()
      function clickRandomOrderButtons() {
        cy.get('.orderBtnContainer .orderBtn')
          .should('have.length.gte', 2)
          .then($buttons => {
            const totalButtons = $buttons.length
            const selectedIndices = new Set()
      
            // Randomly select at least 2 distinct buttons
            while (selectedIndices.size < Math.min(2, totalButtons)) {
              const randomIndex = Math.floor(Math.random() * totalButtons)
              selectedIndices.add(randomIndex)
            }
      
            // Click the selected buttons
            selectedIndices.forEach(index => {
              cy.wrap($buttons[index]).scrollIntoView().click()
              cy.log(`Clicked Button: ${$buttons[index].innerText}`)
            })
          })
      }
      
      // Call the function to execute the clicks
      clickRandomOrderButtons()
      

           cy.contains('Save').click()
           cy.waitForPageLoad()
    })
  })
})