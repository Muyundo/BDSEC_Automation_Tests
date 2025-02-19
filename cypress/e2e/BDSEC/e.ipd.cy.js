context('Actions', () => {
    beforeEach(() => {
      cy.baseurl()
      cy.login()
    })

 it('Patient Disposition',  {retries: 4},() => {
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
      //cy.wait('@patientDashboard').its('response.statusCode').should('eq', 200)
      cy.waitForPageLoad()
      cy.get('.grouped-buttons', { timeout: 10000 }).should('be.visible').contains('Consultation').click()
      //cy.wait('@PublishedForms').its('response.statusCode').should('eq', 200)     
      cy.contains('Disposition').click()
      cy.waitForPageLoad()
      cy.get('#dispositionAction')
        .select('Admit Patient') 
        .should('have.value', 'string:ADMIT')
    
      cy.get('#dispositionNotes').type('Admin patient for further monitoring')
      cy.get('#opd-tabs > .opd-header-bottom')
      .contains('Save', {timeout: 20000})
      .should('be.visible')
      .click()
      cy.waitForLoader()     
      


  })
})

it('Admit a patient into a random ward', () => {
  /*if (!firstTestPassed) {
    this.skip(); // Skip if the first test failed
  }*/
  cy.readFile('cypress/fixtures/patientData.json').then((patientData) => {
    cy.module()
    cy.get('.apps > ul' , { timeout: 20000 }).should('be.visible').contains('Bed Management').click()
    cy.waitForPageLoad()
    //cy.get('#patientIdentifier').type(patientData.registrationNumber)
    //cy.waitForPageLoad()
    const regNumber = patientData.registrationNumber
            cy.get('.active-patient', {timeout: 20000}).should('be.visible').each(($el) => {
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
    //cy.get('.smallImages').click()
    cy.waitForPageLoad()
    function selectRandomWardAndBed() {
      // Select a random ward
      cy.get('.bed-type-selection button')
        .should('be.visible')
        .should('have.length.gt', 0)
        .then($buttons => {
          const randomIndex = Math.floor(Math.random() * $buttons.length)
          cy.wrap($buttons[randomIndex])
            .scrollIntoView()
            .should('be.visible')
            .click()
          cy.log(`Selected Ward: ${$buttons[randomIndex].innerText}`)
        })
    
      // Select a random room within the ward
      cy.get('.room-info-wrapper')
        .should('exist')
        .then(($rooms) => {
          const totalRooms = $rooms.length
          if (totalRooms > 0) {
            const randomIndex = Math.floor(Math.random() * totalRooms)
            cy.wrap($rooms[randomIndex]).scrollIntoView().click()
            cy.log(`Selected Room: ${$rooms[randomIndex].innerText}`)
          } else {
            cy.log('No rooms found, retrying...')
            selectRandomWardAndBed() // Retry
          }
        })
    
      // Select a random bed within the room
      cy.get('.bed-layout-row')
        .should('exist')
        .then(($beds) => {
          const totalBeds = $beds.length
          if (totalBeds > 0) {
            const randomIndex = Math.floor(Math.random() * totalBeds)
            cy.wrap($beds[randomIndex]).scrollIntoView().click()
            cy.log(`Selected Bed: ${$beds[randomIndex].innerText}`)
          } else {
            cy.log('No beds found, retrying...')
            selectRandomWardAndBed() // Retry
          }
        })
    }
    
    // Call the function once
    selectRandomWardAndBed()
    
    // Proceed to admission
    cy.get('.adt-admit').click()
    cy.wait(500)
    
    // Handle confirmation popup if it appears
    cy.get('body').then($body => {
      if ($body.find('.ngdialog-content').length > 0) {
        cy.get('.ngdialog-content').contains('Admit').click()
      } else {
        cy.log('No confirmation popup appeared, continuing...')
      }
    })
    
    // Add observation and finalize admission
    cy.get('#observation_1', {timeout: 10000}).should('be.visible').type('Patient admitted')
    cy.get('#modal-revise-button1').click()
  })
})
})