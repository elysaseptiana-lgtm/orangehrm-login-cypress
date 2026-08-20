import FinalLoginPage from '../../pages/FinalLoginPage'
import finalLoginData from '../../fixtures/finalLoginData.json'

describe('OrangeHRM Login', () => {

  const loginPage = new FinalLoginPage()

  beforeEach(() => {

    cy.intercept('GET', '**/core/i18n/messages*').as('getMessages')

    loginPage.visit()

    cy.wait('@getMessages').then((interception) => {
        expect(interception.response.statusCode).to.eq(200)
    })

})

  it('TC_01 - User is able to open login page', () => {

    cy.url().should('include', '/auth/login')
    cy.contains('Login').should('be.visible')

    loginPage.usernameInput().should('be.visible')
    loginPage.passwordInput().should('be.visible')
    loginPage.loginButton().should('be.visible')

  })

  it('TC_02 - User is able to login with valid username and password', () => {

    loginPage.usernameInput().type(finalLoginData.validUsername)
    loginPage.passwordInput().type(finalLoginData.validPassword)
    loginPage.loginButton().click()

    cy.url().should('include', '/dashboard')
    cy.contains('Dashboard').should('be.visible')

  })

  it('TC_03 - User is unable to login when the username field is left blank', () => {

    loginPage.passwordInput().type(finalLoginData.validPassword)
    loginPage.loginButton().click()

    cy.contains('Required').should('be.visible')

  })

  it('TC_04 - User is unable to login when password field is left blank', () => {

    loginPage.usernameInput().type(finalLoginData.validUsername)
    loginPage.loginButton().click()

    cy.contains('Required').should('be.visible')

  })

  it('TC_05 - User is unable to login when username and password fields are left blank', () => {

    loginPage.loginButton().click()

    cy.contains('Required').should('be.visible')

  })

  it('TC_06 - User is login with invalid username', () => {

    loginPage.usernameInput().type(finalLoginData.invalidUsername)
    loginPage.passwordInput().type(finalLoginData.validPassword)
    loginPage.loginButton().click()

    cy.contains('Invalid credentials').should('be.visible')

  })

  it('TC_07 - User is login with invalid password', () => {

    loginPage.usernameInput().type(finalLoginData.validUsername)
    loginPage.passwordInput().type(finalLoginData.invalidPassword)
    loginPage.loginButton().click()

    cy.contains('Invalid credentials', {timeout: 10000}).should('be.visible')

  })

  it('TC_08 - User is login with invalid username and password', () => {

    loginPage.usernameInput().type(finalLoginData.invalidUsername)
    loginPage.passwordInput().type(finalLoginData.invalidPassword)
    loginPage.loginButton().click()

    cy.contains('Invalid credentials').should('be.visible')

  })

  it('TC_11 - User is login with very long text', () => {

    loginPage.usernameInput().type(finalLoginData.longUsername)
    loginPage.passwordInput().type(finalLoginData.validPassword)
    loginPage.loginButton().click()

    cy.contains('Invalid credentials').should('be.visible')

  })

  it('TC_12 - User is able to access "Forgot your password?"', () => {

    cy.contains('Forgot your password?').click()

    cy.url().should('include', '/auth/requestPasswordResetCode')
    cy.contains('Reset Password').should('be.visible')

  })

})