describe('API Automation - Categories', () => {

  it('TC_01 - Get all categories', () => {
    cy.request('GET', 'https://api.escuelajs.co/api/v1/categories')
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.be.an('array')
      })
  })

  it('TC_02 - Get category ID 1', () => {
    cy.request('GET', 'https://api.escuelajs.co/api/v1/categories/1')
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.id).to.eq(1)
      })
  })

  it('TC_03 - Get category ID 2', () => {
    cy.request('GET', 'https://api.escuelajs.co/api/v1/categories/2')
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.id).to.eq(2)
      })
  })

  it('TC_04 - Get category ID 3', () => {
    cy.request('GET', 'https://api.escuelajs.co/api/v1/categories/3')
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.id).to.eq(3)
      })
  })

  it('TC_05 - Get category ID 4 and validate response body', () => {
  cy.request('GET', 'https://api.escuelajs.co/api/v1/categories/4')
    .then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.id).to.eq(4)
      expect(response.body).to.have.property('name')
      expect(response.body).to.have.property('image')
    })
})

  it('TC_06 - Get products from category ID 1', () => {
    cy.request('GET', 'https://api.escuelajs.co/api/v1/categories/1/products')
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.be.an('array')
      })
  })

  it('TC_07 - Get products from category ID 2', () => {
    cy.request('GET', 'https://api.escuelajs.co/api/v1/categories/2/products')
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.be.an('array')
      })
  })

  it('TC_08 - Get products from category ID 3', () => {
    cy.request('GET', 'https://api.escuelajs.co/api/v1/categories/3/products')
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.be.an('array')
      })
  })

  it('TC_09 - Create new category', () => {

  const categoryName = `Elysa Cypress Category ${Date.now()}`

  cy.request({
    method: 'POST',
    url: 'https://api.escuelajs.co/api/v1/categories/',
    body: {
      name: categoryName,
      image: 'https://placehold.co/600x400'
    }
  }).then((response) => {
    expect(response.status).to.eq(201)
    expect(response.body.name).to.eq(categoryName)
  })

})

  it('TC_10 - Get categories with limit 5', () => {
    cy.request('GET', 'https://api.escuelajs.co/api/v1/categories?offset=0&limit=5')
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.be.an('array')
      })
  })

  it('TC_11 - Get category and check name property', () => {
    cy.request('GET', 'https://api.escuelajs.co/api/v1/categories/1')
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('name')
      })
  })

  it('TC_12 - Get category and check image property', () => {
    cy.request('GET', 'https://api.escuelajs.co/api/v1/categories/2')
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('image')
      })
  })

})