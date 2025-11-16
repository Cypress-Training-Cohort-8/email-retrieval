import { fakerEN_NG as faker } from "@faker-js/faker";
let data
const username = `test${faker.string.uuid()}`
const emailAddress = `${username}@maildrop.cc`
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
        cy.insertText(data.qaBrains.emailFld, emailAddress)
        cy.get('select[name="country_id"]').select('Nigeria')
        cy.get("select[name='profession']").select('Personal')
        cy.insertText(data.qaBrains.passwordFld, 'Test@1234')
        cy.insertText(data.qaBrains.confPassFld, 'Test@1234')
        cy.get('input#terms').check()
        cy.clickElement(data.qaBrains.signUpBtn)
        cy.verifyEmailLink(username)
    })
})