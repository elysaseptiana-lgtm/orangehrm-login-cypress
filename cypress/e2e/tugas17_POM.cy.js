import LoginPage from '../pages/LoginPage'
import loginData from '../fixtures/loginData.json'

const loginPage = new LoginPage()

describe('OrangeHRM Login', () => {
  beforeEach(() => {
    loginPage.visit()
  })

  it('TC_01 - User is able to open login page', () => {

    cy.url().should('include', '/auth/login')
    cy.contains('Login').should('be.visible')
    cy.get('input[name="username"]').should('be.visible')
    cy.get('input[name="password"]').should('be.visible')
    cy.get('button[type="submit"]').should('be.visible')

  })

  it('TC_02 - User is able to login with valid username and password', () => {

    loginPage.inputUsername(loginData.valid.username)
    loginPage.inputPassword(loginData.valid.password)
    loginPage.clickLogin()

    cy.url().should('include', '/dashboard')
    cy.contains('Dashboard').should('be.visible')

  })

  it('TC_03 - User is unable to login when the username field is left blank', () => {
    
    loginPage.inputPassword(loginData.valid.password)
    loginPage.clickLogin()
    cy.contains('Required').should('be.visible')
     
  })

  it('TC_04 - User is unable to login when password field is left blank', () => {
    
    loginPage.inputUsername(loginData.valid.username)
    loginPage.clickLogin()
    cy.contains('Required').should('be.visible')

  })

  it('TC_05 - User is unable to login when username and password fields are left blank', () => {

    loginPage.clickLogin()
    cy.contains('Required').should('be.visible')

  })

  it('TC_06 - User is login with invalid username', () => {

    loginPage.inputUsername(loginData.invalidUsername.username)
    loginPage.inputPassword(loginData.invalidUsername.password)
    loginPage.clickLogin()
    cy.contains('Invalid credentials').should('be.visible')

  })

  it('TC_07 - User is login with invalid password', () => {

    loginPage.inputUsername(loginData.invalidPassword.username)
    loginPage.inputPassword(loginData.invalidPassword.password)
    loginPage.clickLogin()
    cy.contains('Invalid credentials').should('be.visible')

  })

  it('TC_08 - User is login with invalid username and password', () => {

    loginPage.inputUsername(loginData.invalidBoth.username)
    loginPage.inputPassword(loginData.invalidBoth.password)
    loginPage.clickLogin()
    cy.contains('Invalid credentials').should('be.visible')

  })

  it('TC_11 - User is login with very long text', () => {

    loginPage.inputUsername(loginData.longText.username)
    loginPage.inputPassword(loginData.valid.password)
    loginPage.clickLogin()
    cy.contains('Invalid credentials').should('be.visible')

  })

  it('TC_12 - User is able to access "Forgot your password?"', () => {

    loginPage.clickForgotPassword()

    cy.url().should('include', '/auth/requestPasswordResetCode')
    cy.contains('Reset Password').should('be.visible')
    cy.get('input[name="username"]').should('be.visible')

  })


})