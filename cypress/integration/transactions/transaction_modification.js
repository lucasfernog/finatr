describe('Transaction Modifications Tests', () => {
  beforeEach(() => {
    cy.visit('/flow');
    cy.get('#transactions')
      .contains('Add Transaction')
      .click();

    cy.get('#transactions').within(() => {
      cy.findByLabelText('rtype').select('No Repeating');
      cy.findByLabelText('value').type('{selectall}55');
      cy.findByLabelText('description').type('test transaction');
      cy.get('form').submit();

      cy.findByTestId('transactions-all-transactions')
        .contains('55.00')
        .parent()
        .within(() => cy.findByText('M').click());
    });
  });

  it('switches back to the form', () => {
    cy.findByTestId('transactions-add-transaction')
      .contains('Add a Transaction')
      .should('be.visible');
  });

  it('submits modified transaction', () => {
    cy.get('#transactions').within(() => {
      cy.findByLabelText('value').type('{selectall}59');
      cy.get('form').submit();

      cy.findByTestId('transactions-all-transactions')
        .contains('59.00')
        .should('be.visible');
    });
  });

  it('check income is listed in income tab after submit', () => {
    cy.get('#transactions').within(() => {
      cy.findByLabelText('value').type('{selectall}57');
      cy.get('form').submit();

      cy.contains('Income').click();

      cy.findByTestId('transactions-income')
        .contains('57.00')
        .should('be.visible');
    });
  });
});
