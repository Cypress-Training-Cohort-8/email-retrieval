import { fakerEN_NG as faker } from "@faker-js/faker";
let data
const username = `test${faker.string.uuid()}`
const emailAddress = `${username}@maildrop.cc`
context('Test to verify email link', () => {
    before(() => {
        cy.fixture('selectors').then(ele => {
            data = ele
        })
    })
    it('User should be able to verify the link in the email', () => {
        cy.visit('https://staging.ismojo.com/signup')
        cy.insertText(data.isMojo.useremailFld, emailAddress)
        cy.get('input#term-box').check()
        cy.clickElement(data.isMojo.nextBtn)
        cy.insertOTP(username)
    })
})