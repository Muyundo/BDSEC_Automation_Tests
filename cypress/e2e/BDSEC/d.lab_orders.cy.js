context('Actions', () => {
    beforeEach(() => {
      cy.baseurl()
      cy.login()
    })
  it('Make Lab Orders', () => {
    cy.readFile('cypress/fixtures/patientData.json').then((patientData) => {
      cy.module()
      cy.get('.fa-stethoscope').click()
      cy.waitForLoader()
      cy.get('#patientIdentifier').should('be.visible').type(patientData.registrationNumber)
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
      cy.get('.opd-header-bottom > :nth-child(1) > bm-back-links > ul > li.ng-scope > #patients-link > .fa').click()
      cy.waitForLoader()
     

    })
  })
})