import { Occupation, Employee } from "@prisma/client";

export default class Modal {
  openModal() {
    cy.dataCy('modal-open-button').click();
    return this;
  }

  selectInputandType(name: keyof Omit<Employee, 'id' | 'occupation'>, value: string) {
    cy.dataCy(`modal-input-${name}`).click().type(value);
    return this;
  }

  selectOccupation(value: Occupation) {
    cy.dataCy(`modal-input-occupation`).select(value);
    return this;
  }

  clickUpload() {
    cy.dataCy('modal-button').click();
    return this;
  }
}