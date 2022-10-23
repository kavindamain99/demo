describe('home and lists', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('user can add items to shopping cart and check it out', () => {
    cy.findByRole('heading', { name: /hello, there/i }).should('exist')
    // pick a product
    cy.wait(11000)
    cy.get(
      ':nth-child(1) > .MuiTypography-inherit > .MuiPaper-root > .MuiButtonBase-root > .MuiCardContent-root > .css-1ban81u-MuiTypography-root'
    ).click()
    // Add product to cart
    cy.findByRole('button', { name: /add to cart/i }).click()
    cy.findByRole('link', { name: /red album/i }).should('exist')
    cy.findByRole('button', { name: /proceed to checkout/i }).click()

    //login
    cy.findByRole('textbox', { name: /email address/i }).type(
      'john@example.com'
    )
    cy.get('#outlined-adornment-password').type('123456')
    cy.findByRole('button', { name: /login/i }).click()
    cy.wait(500)

    // insert shipping details
    cy.findByRole('textbox', { name: /address/i }).type('347 Riverwood Drive')
    cy.findByRole('textbox', { name: /city/i }).type('Chico')
    cy.findByRole('textbox', { name: /postal code/i }).type('95926')
    cy.findByRole('textbox', { name: /country/i }).type('United States')
    cy.wait(100)
    cy.findByRole('button', { name: /continue/i }).click()
    // place order
    cy.findByRole('button', { name: /place order/i }).click()
  })
})
