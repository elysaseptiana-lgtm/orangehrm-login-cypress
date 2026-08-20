class FinalLoginPage {

  visit() {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  }

  usernameInput() {
    return cy.get('input[placeholder="Username"]')
  }

  passwordInput() {
    return cy.get('input[placeholder="Password"]')
  }

  loginButton() {
    return cy.get('button[type="submit"]')
  }

  forgotPassword() {
    return cy.get('.orangehrm-login-forgot-header')
  }
  
}

export default FinalLoginPage