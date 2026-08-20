import FinalDirectoryPage from '../../pages/FinalDirectoryPage'
import finalDirectoryData from '../../fixtures/finalDirectoryData.json'

describe('OrangeHRM Directory', () => {

  const directoryPage = new FinalDirectoryPage()

  beforeEach(() => {
    cy.intercept('GET', '**/api/v2/directory/employees*').as('getEmployees')
    directoryPage.visitLoginPage()
    directoryPage.login(finalDirectoryData.validUsername, finalDirectoryData.validPassword)
    cy.url().should('include', '/dashboard')
    directoryPage.openDirectory()
    cy.url().should('include', '/directory')
    cy.wait('@getEmployees').then((interception) => {
      expect(interception.response.statusCode).to.eq(200)
    })
  })

  it('TC_13 - Employee search by valid employee name', () => {
    cy.contains('Directory').should('be.visible')
    directoryPage.employeeNameInput().type(finalDirectoryData.employeeKeyword)
    cy.contains(finalDirectoryData.validEmployee, { timeout: 10000 }).should('be.visible').click()
    directoryPage.searchButton().click()
    cy.contains(finalDirectoryData.validEmployee, { timeout: 10000 }).should('be.visible')
  })

  it('TC_14 - Autocomplete on Employee Name field', () => {
    directoryPage.employeeNameInput().type(finalDirectoryData.autocompleteKeyword)
    cy.contains(finalDirectoryData.validEmployee, { timeout: 10000 }).should('be.visible')
  })

  it('TC_15 - Employee search by job title', () => {
    directoryPage.jobTitleDropdown().click()
    cy.get('.oxd-select-option').contains(finalDirectoryData.jobTitle).click()
    directoryPage.searchButton().click()
    cy.wait('@getEmployees').then((interception) => {
      expect(interception.response.statusCode).to.eq(200)
    })
  })

  it('TC_16 - Search employee by Location', () => {
    directoryPage.locationDropdown().click()
    cy.get('.oxd-select-option').contains(finalDirectoryData.location).click()
    directoryPage.searchButton().click()
    cy.wait('@getEmployees').then((interception) => {
      expect(interception.response.statusCode).to.eq(200)
    })
  })

  it('TC_17 - Search employee using Job Title and Location', () => {
    directoryPage.jobTitleDropdown().click()
    cy.get('.oxd-select-option').contains(finalDirectoryData.jobTitle).click()
    directoryPage.locationDropdown().click()
    cy.get('.oxd-select-option').contains(finalDirectoryData.location).click()
    directoryPage.searchButton().click()
    cy.wait('@getEmployees').then((interception) => {
      expect(interception.response.statusCode).to.eq(200)
    })
  })

  it('TC_18 - Search without filling any filter', () => {
    directoryPage.searchButton().click()
    cy.wait('@getEmployees').then((interception) => {
      expect(interception.response.statusCode).to.eq(200)
    })
    cy.contains('Records Found', { timeout: 10000 }).should('be.visible')
  })

  it('TC_19 - Search with a non-existent employee name', () => {
    directoryPage.employeeNameInput().type(finalDirectoryData.invalidEmployee)
    cy.contains('No Records Found', { timeout: 10000 }).should('be.visible')
  })

  it('TC_20 - Click Reset button', () => {
    directoryPage.employeeNameInput().type(finalDirectoryData.employeeKeyword)
    cy.contains(finalDirectoryData.validEmployee, { timeout: 10000 }).click()
    directoryPage.jobTitleDropdown().click()
    cy.get('.oxd-select-option').contains(finalDirectoryData.jobTitle).click()
    directoryPage.resetButton().click()
    directoryPage.employeeNameInput().should('have.value', '')
    directoryPage.jobTitleDropdown().should('contain', '-- Select --')
  })

})