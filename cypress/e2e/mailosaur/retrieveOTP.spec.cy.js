import { fakerEN_NG as faker } from "@faker-js/faker";
let data
const emailDomain = '@qpusqxp6.mailosaur.net'
const serverID = 'qpusqxp6'
let emailAddress
context('Test to verify email link', ()=>{
    before(()=>{
        cy.fixture('selectors').then(ele=>{
            data = ele
        })
    })
    it('User should be able to verify the link in the email', ()=>{
        cy.visit('https://staging.ismojo.com/signup')
        emailAddress = `test${faker.string.uuid()}${emailDomain}`
        cy.insertText(data.isMojo.useremailFld, emailAddress)
        cy.get('input#term-box').check()
        cy.clickElement(data.isMojo.nextBtn)
        cy.mailosaurGetMessage(serverID, { sentTo: emailAddress})
        .then((email)=>{
            expect(email.subject).to.equal('Your OTP')
            const otpCode = email.html.codes[0].value
            cy.insertText(data.isMojo.otpFld, otpCode)
            cy.clickElement(data.isMojo.verifyBtn)
        })
    })
})