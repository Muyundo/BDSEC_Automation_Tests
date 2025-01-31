context('Actions', () => {
 
  it('Review and approve orders in the Lab', () => {
    cy.readFile('cypress/fixtures/patientData.json').then((patientData) => {
    cy.visit('https://bdsec.intellisoftkenya.com/')
    cy.waitForLoader()
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