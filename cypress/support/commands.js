// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


const base_url = 'https://api.maildrop.cc/graphql'
let data


before(() => {
    cy.fixture('selectors').then(ele => {
        data = ele
    })
})
Cypress.Commands.add('clickElement', (element) => {
    cy.get(element).should('exist').and('be.visible').click()
})

Cypress.Commands.add('insertText', (textFld, text) => {
    cy.get(textFld).should('exist').and('be.visible').type(text)
})

Cypress.Commands.add('insertOTP', (username) => {

    cy.wait(20000)
    cy.request({
        method: 'POST',
        url: base_url,
        headers: {
            "Content-Type": "application/json"
        },
        body: {
            query: `query Example { inbox(mailbox:"${username}") { id headerfrom subject date} }`,
            variables: {}
        }
    }).then(resp => {
        const inboxID = resp.body.data.inbox[0].id

        return cy.request({
            method: 'POST',
            url: base_url,
            headers: {
                "Content-Type": "application/json"
            },
            body: {
                query: `query Example {
  message(mailbox:"${username}", id:"${inboxID}") {html}
}`,
                variables: {}
            }
        }).then(resp => {
            const messageBody = resp.body.data.message.html
            const parse = new DOMParser()
            const doc = parse.parseFromString(messageBody, 'text/html')
            const code = doc.querySelector('tbody>tr:nth-of-type(3) span').textContent
            cy.insertText(data.isMojo.otpFld, code)
            cy.clickElement(data.isMojo.verifyBtn)
        })
    })
})