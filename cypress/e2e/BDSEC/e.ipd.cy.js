context('Actions', () => {
    beforeEach(() => {
      cy.baseurl()
      cy.login()
      cy.interceptAPI()
    })

  it('Patient Disposition', () => {
    cy.readFile('cypress/fixtures/patientData.json').then((patientData) => {
      cy.module()
      cy.get('.fa-stethoscope').click()
      cy.wait('@patientsInqueue').its('response.statusCode').should('eq', 200)
      cy.get('#patientIdentifier').should('be.visible').type(patientData.registrationNumber)
      cy.get('.smallImages').click()
      cy.wait('@patientDashboard').its('response.statusCode').should('eq', 200)

      // Access the consultation section
      cy.get('.btn--left').click()
      //cy.wait('@PublishedForms').its('response.statusCode').should('eq', 200)     
      cy.contains('Disposition').click()
      cy.waitForLoader()      
      cy.get('#dispositionAction')
        .select('Admit Patient') 
        .should('have.value', 'string:ADMIT')
    
      cy.get('#dispositionNotes').type('Admin patient for further monitoring')
      cy.get(':nth-child(3) > .confirm').click()
      cy.waitForLoader()


  })
})

it('Admit Patient', () =>{
    cy.readFile('cypress/fixtures/patientData.json').then((patientData) => {
      cy.module()
      cy.get('.fa-bed').click()
      cy.waitForLoader()
      cy.get('#patientIdentifier').type(patientData.registrationNumber)
      cy.waitForLoader()
      cy.get('.smallImages').click()
      cy.waitForLoader()
      cy.get('.bed-type-selection > :nth-child(2)').click()
    })
})
})