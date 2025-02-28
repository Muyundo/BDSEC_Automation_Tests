
context('Actions', () => {
  const randomNumberOfKeyPresses = Math.floor(Math.random() * 5) + 1;

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
      cy.get('#opd-tabs > .opd-header-bottom', {timeout: 20000})
        .contains('Medications')
        .click( {force: true})
        cy.get('#drug-name', {timeout: 20000})
        .type('drop ')
        .get('.ui-menu-item', {timeout: 20000})
        .then(($options) => {
          const randomIndex = Math.floor(Math.random() * $options.length); // Pick a random index
          cy.wrap($options[randomIndex]).click(); 

          cy.get('#uniform-dose').type(4)
          cy.get('#uniform-dose-unit').select('Drop')
          cy.get('#frequency').select('Thrice a day')
          cy.get('#duration').type('4')
          cy.get('.add-drug-btn').click()
          cy.get('#opd-tabs > .opd-header-bottom').contains('Save').click()
          cy.waitForLoader()

  })
})
})
})