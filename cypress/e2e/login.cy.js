describe('OrangeHRM Login', () => {
  beforeEach (() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  })

  it('TC_01 - User able to open login page', () => {

    cy.url().should('include', '/auth/login')
    cy.contains('Login').should('be.visible')
    cy.get('input[name="username"]').should('be.visible')
    cy.get('input[name="password"]').should('be.visible')
    cy.get('button[type="submit"]').should('be.visible')

  })

  it('TC_02 - User able to login with valid username and password', () => {

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/dashboard')
    cy.contains('Dashboard').should('be.visible')

  })

  it('TC_03 - Users unable to login when the username field is left blank', () => {
    
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.contains('Required').should('be.visible')
     
  })

  it('TC_04 - User unable to login when password field is left blank', () => {
    
    cy.get('input[name="username"]').type('Admin')
    cy.get('button[type="submit"]').click()
    cy.contains('Required').should('be.visible')

  })

  it('TC_05 - User unable to login when username and password fields are left blank', () => {

    cy.get('button[type="submit"]').click()
    cy.contains('Required').should('be.visible')

  })

  it('TC_06 - User login with invalid username', () => {
    cy.get('input[name="username"]').type('Wrong User')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.contains('Invalid credentials').should('be.visible')

  })

  it('TC_07 - User login with invalid password', () => {

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('ngasal123')
    cy.get('button[type="submit"]').click()
    cy.contains('Invalid credentials').should('be.visible')

  })

  it('TC_08 - User login with invalid username and password', () => {

    cy.get('input[name="username"]').type('Wrong USer')
    cy.get('input[name="password"]').type('ngasal123')
    cy.get('button[type="submit"]').click()
    cy.contains('Invalid credentials').should('be.visible')

  })

  it('TC_09 - User login is case-sensitive regarding the username (lowercase)', () => {

    cy.get('input[name="username"]').type('admin')
    cy.get('input[name="password"]').type('adminl123')
    cy.get('button[type="submit"]').click()
    cy.contains('Invalid credentials').should('be.visible')

  })

  it('TC_010 - User login is case-sensitive regarding the username (uppercase)', () => {

    cy.get('input[name="username"]').type('ADMIN')
    cy.get('input[name="password"]').type('adminl123')
    cy.get('button[type="submit"]').click()
    cy.contains('Invalid credentials').should('be.visible')

  })

  it('TC_011 - User login with very long text', () => {

    cy.get('input[name="username"]').type('abcdefghijklmnopqrstuvwxyzqwertyuiopasdfghjklzxcvbnm')
    cy.get('input[name="password"]').type('adminl23')
    cy.get('button[type="submit"]').click()
    cy.contains('Invalid credentials').should('be.visible')

  })

  it('TC_012 - User able to access "Forgot your password?"', () => {

    cy.contains('Forgot your password?').click()
    cy.url().should('include', '/auth/requestPasswordResetCode')
    cy.contains('Reset Password').should('be.visible')
    cy.get('input[name="username"]').should('be.visible')

  })


})

