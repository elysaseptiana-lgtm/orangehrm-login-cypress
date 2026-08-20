class FinalRecruitmentPage {

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

  recruitmentMenu() {
    return cy.contains('Recruitment')
  }

  jobTitleDropdown() {
    return cy.contains('label', 'Job Title').parent().parent().find('.oxd-select-text')
  }

  vacancyDropdown() {
    return cy.contains('label', 'Vacancy').parent().parent().find('.oxd-select-text')
  }

  statusDropdown() {
    return cy.contains('label', 'Status').parent().parent().find('.oxd-select-text')
  }

  keywordsInput() {
    return cy.contains('label', 'Keywords').parent().parent().find('input')
  }

  dateFromInput() {
    return cy.get('.oxd-date-input input').eq(0)
}

  dateToInput() {
    return cy.get('.oxd-date-input input').eq(1)
}

  searchButton() {
    return cy.get('button[type="submit"]')
  }

  resetButton() {
    return cy.contains('button', 'Reset')
  }

  login(username, password) {
    this.usernameInput().type(username)
    this.passwordInput().type(password)
    this.loginButton().click()
  }

  openRecruitment() {
    this.recruitmentMenu().click()
  }

}

export default FinalRecruitmentPage