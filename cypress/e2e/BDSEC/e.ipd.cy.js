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
      cy.waitForLoader()
      cy.get('.smallImages').click()
      cy.wait('@patientDashboard').its('response.statusCode').should('eq', 200)
      cy.waitForLoader()
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

it('Admit a patient into a random ward', () => {
  cy.readFile('cypress/fixtures/patientData.json').then((patientData) => {
    cy.module()
    cy.get('.fa-bed').click()
    cy.waitForLoader()
    cy.get('#patientIdentifier').type(patientData.registrationNumber)
    cy.waitForLoader()
    cy.get('.smallImages').click()
    cy.waitForLoader()
  
    function selectRandomWard() {
      cy.get('.bed-type-selection button')
        .should('exist') // Ensure wards exist before proceeding
        .then(($wards) => {
          const totalWards = $wards.length
          if (totalWards > 0) {
            const randomIndex = Math.floor(Math.random() * totalWards)
            cy.get('.bed-type-selection button').eq(randomIndex).click() // Corrected selection
            cy.log(`Selected ward: ${$wards[randomIndex].innerText}`)
          } else {
            cy.log('No wards found, retrying...')
            selectRandomWard() // Retry if no wards exist
          }
        })
  
      cy.get('.room-info-wrapper')
        .should('exist')
        .then(($rooms) => {
          const totalRooms = $rooms.length
          if (totalRooms > 0) {
            const randomIndex = Math.floor(Math.random() * totalRooms)
            cy.get('.room-info-wrapper').eq(randomIndex).click() // Corrected selection
            cy.log(`Selected room: ${$rooms[randomIndex].innerText}`)
          } else {
            cy.log('No rooms found, retrying...')
            selectRandomWard()
          }
        })
  
      cy.get('.bed-layout-row')
        .should('exist')
        .then(($beds) => {
          const totalBeds = $beds.length
          if (totalBeds > 0) {
            const randomIndex = Math.floor(Math.random() * totalBeds)
            cy.get('.bed-layout-row').eq(randomIndex).click() // Corrected selection
            cy.log(`Selected bed: ${$beds[randomIndex].innerText}`)
          } else {
            cy.log('No beds found, retrying...')
            selectRandomWard()
          }
        })
    }
  
    // Retry ward selection up to 3 times if it fails
    Cypress._.times(3, () => {
      selectRandomWard()
    })
  cy.get('.adt-admit').click()
  cy.wait(500)
  cy.get('.ngdialog-content').contains('Yes').click()
})

})
})
