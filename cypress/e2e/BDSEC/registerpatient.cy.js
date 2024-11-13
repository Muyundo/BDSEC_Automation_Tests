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
      const phone = faker.phone.phoneNumber();


      const genders = ['Male', 'Female']
      const randomGender = genders[Math.floor(Math.random() * genders.length)];
      const randomAge = Math.floor(Math.random() * 50) + 1;

      cy.wait(5000)
      cy.get('#location').select('Registration Desk')
      cy.wait(5000)
      cy.get('.confirm').click()
      cy.wait(5000)
      cy.get('.fa-user').click()
      cy.get('.fa-plus').click()

      cy.get('#givenName').type(fname)
      cy.get('#middleName').type(mname)
      cy.get('#familyName').type(lname)
      cy.get('#gender').select(randomGender)
      cy.get('#ageYears').type(randomAge)
      cy.get('#phoneNumber').type(phone)
      cy.get('.submit-btn').click()

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


      //cy.get('#phoneNumber').type(phone)
     // cy.get('.back-btn > .fa').click()
})

   /* it('.type() - Search Registered Patient using their ID',()=>{
      cy.get('.fa-user').click()
      cy.get('#registrationNumber').type(patientData.registrationNumber)
         })

    it('.type() - Search Registered Patient using their name',()=>{
          cy.get('#givenName').click()
          cy.get('#givenName').type(patientData.fname)
             })

    it('.type() - Search Registered Patient using their Number',()=>{
          cy.get('.#phoneNumber').click()
          cy.get('#phoneNumber').type(patientData.phone)
                 })*/
})


