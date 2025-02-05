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
      cy.contains('X-ray of mandible (Panorex)').click({ force: true })
      cy.contains('X-ray of skull, four views').click({ force: true })
      cy.get('.confirm > .fa').click()
      cy.waitForLoader()
      cy.get('.opd-header-bottom > :nth-child(1) > bm-back-links > ul > li.ng-scope > #patients-link > .fa').click()
      cy.waitForLoader()
     

    })
  })
})