describe('OrangeHRM Login', () => {
  beforeEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  })

  it('TC_01 - User is able to open login page', () => {

    cy.intercept('GET', '**/auth/login').as('loginPage')
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.wait('@loginPage').its('response.statusCode').should('eq', 200)

    cy.url().should('include', '/auth/login')
    cy.contains('Login').should('be.visible')
    cy.get('input[name="username"]').should('be.visible')
    cy.get('input[name="password"]').should('be.visible')
    cy.get('button[type="submit"]').should('be.visible')

  })

  it('TC_02 - User is able to login with valid username and password', () => {

    cy.intercept('POST', '**/auth/validate').as('loginPage')

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.wait('@loginPage').its('response.statusCode').should('eq', 302)
    cy.url().should('include', '/dashboard')
    cy.contains('Dashboard').should('be.visible')

  })

  it('TC_03 - User is unable to login when the username field is left blank', () => {
    
    cy.intercept('POST', '**/auth/validate').as('loginPage')

    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.contains('Required').should('be.visible')
    cy.get('@loginPage.all').should('have.length', 0)
    cy.get('input[name="username"]').should('have.class', 'oxd-input--error')
     
  })

  it('TC_04 - User is unable to login when password field is left blank', () => {
    
    cy.intercept('POST', '**/auth/validate').as('loginPage')

    cy.get('input[name="username"]').type('Admin')
    cy.get('button[type="submit"]').click()
    cy.contains('Required').should('be.visible')
    cy.get('@loginPage.all').should('have.length', 0)
    cy.url().should('include', '/auth/login')

  })

  it('TC_05 - User is unable to login when username and password fields are left blank', () => {

    cy.intercept('POST', '**/auth/validate').as('loginPage')

    cy.get('button[type="submit"]').click()
    cy.contains('Required').should('be.visible')
    cy.get('@loginPage.all').should('have.length', 0)
    cy.get('input[name="username"]').should('be.visible')

  })

  it('TC_06 - User is login with invalid username', () => {

    cy.intercept('POST', '**/auth/validate').as('loginPage')

    cy.get('input[name="username"]').type('Wrong User')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.wait('@loginPage').its('response.statusCode').should('eq', 302)
    cy.url().should('not.include', '/dashboard')
    cy.contains('Invalid credentials').should('be.visible')

  })

  it('TC_07 - User is login with invalid password', () => {

    cy.intercept('POST', '**/auth/validate').as('loginPage')

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('ngasal123')
    cy.get('button[type="submit"]').click()
    cy.wait('@loginPage').its('response.statusCode').should('eq', 302)
    cy.url().should('include', '/auth/login')
    cy.contains('Invalid credentials').should('be.visible')

  })

  it('TC_08 - User is login with invalid username and password', () => {

    cy.intercept('POST', '**/auth/validate').as('loginPage')
    cy.get('input[name="username"]').type('Wrong User')
    cy.get('input[name="password"]').type('ngasal123')
    cy.get('button[type="submit"]').click()
    cy.wait('@loginPage').its('request.body').should('include', 'Wrong+User')
    cy.contains('Invalid credentials').should('be.visible')

  })

  it('TC_11 - User is login with very long text', () => {

    cy.intercept('POST', '**/auth/validate').as('loginPage')
    cy.get('input[name="username"]').type('abcdefghijklmnopqrstuvwxyzqwertyuiopasdfghjklzxcvbnm')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.wait('@loginPage').its('request.url').should('include', '/auth/validate')
    cy.contains('Invalid credentials').should('be.visible')

  })

  it('TC_12 - User is able to access "Forgot your password?"', () => {

    cy.intercept('GET', '**/auth/requestPasswordResetCode').as('ForgotPasswordPage')
    cy.contains('Forgot your password?').click()

    cy.wait('@ForgotPasswordPage').its('response.statusCode').should('eq', 200)
    cy.url().should('include', '/auth/requestPasswordResetCode')
    cy.contains('Reset Password').should('be.visible')
    cy.get('input[name="username"]').should('be.visible')

  })


})