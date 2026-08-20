import FinalRecruitmentPage from '../../pages/FinalRecruitmentPage'
import finalRecruitmentData from '../../fixtures/finalRecruitmentData.json'

describe('OrangeHRM Recruitment', () => {

  const recruitmentPage = new FinalRecruitmentPage()

  beforeEach(() => {
    cy.intercept('GET', '**/api/v2/recruitment/candidates*').as('getCandidates')
    recruitmentPage.visitLoginPage()
    recruitmentPage.login(finalRecruitmentData.validUsername, finalRecruitmentData.validPassword)
    cy.url().should('include', '/dashboard')
    recruitmentPage.openRecruitment()
    cy.url().should('include', '/recruitment')
    cy.wait('@getCandidates').then((interception) => {
      expect(interception.response.statusCode).to.eq(200)
    })
  })

  it('TC_25 - Search candidate by Job Title', () => {
    recruitmentPage.jobTitleDropdown().click()
    cy.get('.oxd-select-option').contains(finalRecruitmentData.jobTitle).click()
    recruitmentPage.searchButton().click()
    cy.wait('@getCandidates').then((interception) => {
      expect(interception.response.statusCode).to.eq(200)
    })
  })

  it('TC_26 - Search candidate by Vacancy', () => {
    recruitmentPage.vacancyDropdown().click()
    cy.get('.oxd-select-option').contains(finalRecruitmentData.vacancy).click()
    recruitmentPage.searchButton().click()
    cy.wait('@getCandidates').then((interception) => {
      expect(interception.response.statusCode).to.eq(200)
    })
  })

  it('TC_27 - Search candidate by Status', () => {
    recruitmentPage.statusDropdown().click()
    cy.get('.oxd-select-option').contains(finalRecruitmentData.status).click()
    recruitmentPage.searchButton().click()
    cy.wait('@getCandidates').then((interception) => {
      expect(interception.response.statusCode).to.eq(200)
    })
  })

  it('TC_29 - Search using Job Title and Status', () => {
    recruitmentPage.jobTitleDropdown().click()
    cy.get('.oxd-select-option').contains(finalRecruitmentData.jobTitle).click()
    recruitmentPage.statusDropdown().click()
    cy.get('.oxd-select-option').contains(finalRecruitmentData.interviewStatus).click()
    recruitmentPage.searchButton().click()
    cy.wait('@getCandidates').then((interception) => {
      expect(interception.response.statusCode).to.eq(200)
    })
  })

  it('TC_30 - Search without filling any filter', () => {
    recruitmentPage.searchButton().click()
    cy.wait('@getCandidates').then((interception) => {
      expect(interception.response.statusCode).to.eq(200)
    })
    cy.contains('Records Found', { timeout: 10000 }).should('be.visible')
  })

  it('TC_31 - Search with an invalid Date Range', () => {
    recruitmentPage.dateFromInput().clear().type(finalRecruitmentData.dateFrom)
    recruitmentPage.dateToInput().clear().type(finalRecruitmentData.dateTo).type('{esc}')
    recruitmentPage.searchButton().click({ force: true })
    cy.contains('To date should be after from date', { timeout: 10000 }).should('be.visible')
  })

  it('TC_32 - Search with a non-existent Keyword', () => {
    recruitmentPage.keywordsInput().type(finalRecruitmentData.invalidKeyword)
    recruitmentPage.searchButton().click()
    cy.wait('@getCandidates')
    cy.contains('No Records Found', { timeout: 10000 }).should('be.visible')
  })

  it('TC_33 - Reset button function', () => {
    recruitmentPage.jobTitleDropdown().click()
    cy.get('.oxd-select-option').contains(finalRecruitmentData.jobTitle).click()
    recruitmentPage.statusDropdown().click()
    cy.get('.oxd-select-option').contains(finalRecruitmentData.status).click()
    recruitmentPage.resetButton().click()
    recruitmentPage.jobTitleDropdown().should('contain', '-- Select --')
    recruitmentPage.statusDropdown().should('contain', '-- Select --')
  })

})