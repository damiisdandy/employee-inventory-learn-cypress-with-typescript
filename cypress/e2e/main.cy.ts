import { slugify } from '../../helper';
import { DEFAULT_EMPLOYEES, NEW_EMPLOYEE } from "../constants";
import Modal from '../interface/Modal';


describe('E2E Test', () => {
  beforeEach(() => {
    cy.task('resetDB');
    cy.task('seedDB');
    cy.visit('/');
  });

  it('Search for Employees', () => {
    cy.dataCy("search-bar").click().type(DEFAULT_EMPLOYEES[0].name);
    cy.dataCy("employee").first()
      .dataCy(`employee-name-${slugify(DEFAULT_EMPLOYEES[0].email)}`)
      .contains(DEFAULT_EMPLOYEES[0].name, { matchCase: false });
  });

  it('Create employee', () => {
    cy.interceptRequest('POST').as('createEmployee');
    const modal = new Modal();
    modal.openModal().selectInputandType('name', NEW_EMPLOYEE.name)
      .selectInputandType('email', NEW_EMPLOYEE.email)
      .selectOccupation(NEW_EMPLOYEE.occupation)
      .clickUpload();
    cy.wait('@createEmployee');
    cy.dataCy('employee').last()
      .dataCy(`employee-name-${slugify(NEW_EMPLOYEE.email)}`).contains(NEW_EMPLOYEE.name, { matchCase: false })
      .dataCy(`employee-email-${slugify(NEW_EMPLOYEE.email)}`).contains(NEW_EMPLOYEE.email, { matchCase: false })
      .dataCy(`employee-occupation-${slugify(NEW_EMPLOYEE.email)}`).contains(NEW_EMPLOYEE.occupation, { matchCase: false })
  });

  it('Delete employee', () => {
    cy.dataCy('employee-delete-button').last().click();
    cy.dataCy('employees').children().should('have.length', DEFAULT_EMPLOYEES.length - 1)
  })

})
