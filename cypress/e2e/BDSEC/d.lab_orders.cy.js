context('Actions', () => {
    beforeEach(() => {
      cy.baseurl()
      cy.login()
    })
  it('Make Lab Orders', () => {
    cy.readFile('cypress/fixtures/patientData.json').then((patientData) => {
      cy.module()
      cy.get('.apps > ul').contains('Clinical', { timeout: 10000 }).should('be.visible').click()
      cy.wait('@patientsInqueue').its('response.statusCode').should('eq', 200)
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
      cy.wait('@patientDashboard').its('response.statusCode').should('eq', 200)
      cy.waitForPageLoad()

      // Access the consultation template
      cy.get('.btn--left').click()
      cy.waitForPageLoad()
      cy.contains('Orders').click()
      cy.waitForLoader()      
            cy.get('.orderBtnContainer ul li a.orderBtn') // Select all available orders
            .then(($orders) => {
              const totalOrders = $orders.length

             /* if (totalOrders < 4) {
                throw new Error("Not enough orders available to select 4")
              }*/

              // Generate an array of unique random indexes
              let randomIndexes = [];
              while (randomIndexes.length < 4) {
                let randomIndex = Math.floor(Math.random() * totalOrders)
                if (!randomIndexes.includes(randomIndex)) {
                  randomIndexes.push(randomIndex);
                }
              }

              // Click on the randomly selected orders
              randomIndexes.forEach((index) => {
                cy.wrap($orders.eq(index)).click()
              })
            })

           cy.contains('Save').click()
           cy.waitForLoader()
    })
  })
})