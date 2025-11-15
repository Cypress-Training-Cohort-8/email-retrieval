const base_url = 'https://petstore.swagger.io/v2'
let id
describe('api testing demo', () => {
    it('sample request', () => {

        cy.request({
            method: 'POST',
            url: `${base_url}/pet`,
            headers: {
                "Content-Type": "application/json"
            },
            body: {
                "id": 0,
                "category": {
                    "id": 0,
                    "name": "string"
                },
                "name": "doggie",
                "photoUrls": [
                    "string"
                ],
                "tags": [
                    {
                        "id": 0,
                        "name": "string"
                    }
                ],
                "status": "available"
            }
        }).then((resp)=>{
            expect(resp.status).to.eq(200)
            id = resp.body.name
            cy.log(`the name of the dog within the request is: ${id}`)
            cy.writeFile('cypress/fixtures/info.json', `{ "dog_name": "${id}"}` )
        })
        
            cy.log(`the name of the dog outside the request is: ${id}`)
    })
})