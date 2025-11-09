import { fakerEN_NG as faker } from "@faker-js/faker";
let data
const emailDomain = '@wtzlsjfo.mailosaur.net'
const serverID = 'wtzlsjfo'
let emailAddress
context('Test to verify email link', ()=>{
    before(()=>{
        cy.fixture('selectors').then(ele=>{
            data = ele
        })
    })
    it('User should be able to verify the link in the email', ()=>{
        cy.visit('https://qabrains.com/')
        cy.clickElement(data.qaBrains.signInBtn)
        cy.clickElement(data.qaBrains.signUpLnk)
        cy.insertText(data.qaBrains.nameFld, faker.person.fullName())
        emailAddress = `test${faker.string.uuid()}${emailDomain}`
        cy.insertText(data.qaBrains.emailFld, emailAddress)
        cy.get('select[name="country_id"]').select('Nigeria')
        cy.get("select[name='profession']").select('Personal')
        cy.insertText(data.qaBrains.passwordFld, 'Test@1234')
        cy.insertText(data.qaBrains.confPassFld, 'Test@1234')
        cy.get('input#terms').check()
        cy.clickElement(data.qaBrains.signUpBtn)
        cy.mailosaurGetMessage(serverID, { sentTo: emailAddress})
        .then((email)=>{
            expect(email.subject).to.include('Welcome to QA Brains! Think Quality, Think QA Brains.')
            const verifyLink = email.html.links[0].href
            cy.visit(verifyLink)
        })
    })
})