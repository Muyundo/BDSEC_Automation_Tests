///<reference types="cypress" />

import faker from 'faker'
let patientData;
context('Actions', () => {
    beforeEach(() => {
        cy.baseurl();
        cy.login();
    })

    it('.type() - Register Patient', () => {
      const fname = faker.name.firstName()
      const mname = faker.name.firstName()
      const lname = faker.name.lastName()

      // Generate a valid phone number starting with 07 and up to 10 digits
      const phone = '07' + Math.floor(Math.random() * 1000000000); // Generate a number between 07 and 0799999999

      const genders = ['Male', 'Female']
      const randomGender = genders[Math.floor(Math.random() * genders.length)];
      const randomAge = Math.floor(Math.random() * 50) + 1;

      // Start filling the form
      cy.get('#location').select('Registration Desk')
      cy.get('.confirm').click()
      cy.get('.fa-user').click()
      cy.get('.fa-plus').click()

      // Type in the fields
      cy.get('#givenName').type(fname)
      cy.get('#middleName').type(mname)
      cy.get('#familyName').type(lname)
      cy.get('#gender').select(randomGender)
      cy.get('#ageYears').type(randomAge)
      cy.get('#phoneNumber').type(phone)

      // Toggle and select a random visit
      cy.get('button.toggle-button').click();  // toggle visits 
      cy.get('.options > li').then(($options) => { // display visits
       const totalOptions = $options.length;
       const randomIndex = Math.floor(Math.random() * totalOptions);
       cy.wrap($options[randomIndex]).find('button').click(); // select a random visit
      })
      cy.wait(1000)

      // Submit the form
     cy.contains('Save').click();

      /* Uncomment and use this to log patient details or for additional actions
      cy.get('#patientIdentifierValue')
        .invoke('text')
        .then((registrationNumber) => {
          patientData = {
            fname,
            mname,
            lname,
            phone,
            registrationNumber: registrationNumber.trim() 
          };

          cy.log(`Registered patient: ${patientData.fname} ${patientData.mname} ${patientData.lname} ${patientData.phone} with ID: ${patientData.registrationNumber}`);
        });
      */
    })
})
