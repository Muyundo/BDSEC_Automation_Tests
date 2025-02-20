context('Actions', () => {
    beforeEach(() => {
      cy.baseurl()
      cy.login()
    })
  it('Make Lab Orders', () => {
    cy.readFile('cypress/fixtures/patientData.json').then((patientData) => {
      cy.module()
      cy.get('.apps > ul' , { timeout: 20000 }).should('be.visible').contains('Clinical').click()
      cy.waitForLoader()
      cy.location('href', { timeout: 60000 }).should('include', '/default/patient/search');
      
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
        cy.waitForPageLoad()
  

      // Access the consultation template
      cy.get('.dashboard-header', {timeout: 60000})
      .contains('Consultation', {timeout: 20000})
      .should('be.visible').click()
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