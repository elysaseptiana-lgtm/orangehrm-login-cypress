class FinalDirectoryPage {

  visitLoginPage() {
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

  directoryMenu() {
    return cy.contains('Directory')
  }

   employeeNameInput() {
    return cy.get("input[placeholder='Type for hints...']")
  }

  searchButton() {
    return cy.get("button[type='submit']")
  }

  login(username, password) {
    this.usernameInput().type(username)
    this.passwordInput().type(password)
    this.loginButton().click()
  }

  openDirectory() {
    this.directoryMenu().click()
  }

  jobTitleDropdown() {
    return cy.contains('label', 'Job Title').parent().parent().find('.oxd-select-text')
  }
  
  locationDropdown() {
    return cy.contains('label', 'Location').parent().parent().find('.oxd-select-text')
  }
 
  resetButton() {
    return cy.contains('button', 'Reset')
}

}

export default FinalDirectoryPage