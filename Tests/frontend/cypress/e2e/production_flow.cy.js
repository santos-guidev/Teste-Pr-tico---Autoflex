describe('Fluxo de Produção Autoflex', () => {
  beforeEach(() => {
    // Mock das APIs para garantir que o teste seja independente do backend real
    cy.intercept('GET', '**/materials', {
      body: [
        { id: 1, name: 'Madeira', stockQuantity: 100, unit: 'm2' },
        { id: 2, name: 'Ferro', stockQuantity: 50, unit: 'kg' }
      ]
    }).as('getMaterials');

    cy.intercept('GET', '**/products', {
      body: [
        { 
          id: 1, 
          name: 'Mesa', 
          price: 150.0, 
          materials: [
            { rawMaterial: { id: 1 }, quantityNeeded: 2 }
          ] 
        }
      ]
    }).as('getProducts');

    cy.intercept('GET', '**/production/suggest', {
      body: {
        suggestedProducts: [
          { productName: 'Mesa', quantity: 50, unitPrice: 150.0, subtotal: 7500.0 }
        ],
        totalValue: 7500.0
      }
    }).as('getSuggestion');

    cy.visit('/');
  });

  it('deve carregar a página inicial e navegar para produção', () => {
    cy.contains('Autoflex').should('be.visible');
    
    // Navegar para a página de produção
    cy.get('nav').contains('Produção').click();
    
    // Verificar se a sugestão de produção é exibida
    cy.wait('@getSuggestion');
    cy.contains('Sugestão de Produção').should('be.visible');
    cy.contains('Mesa').should('be.visible');
    cy.contains('50').should('be.visible');
    cy.contains('R$ 7.500,00').should('be.visible');
  });

  it('deve listar os materiais corretamente', () => {
    cy.get('nav').contains('Materiais').click();
    cy.wait('@getMaterials');
    cy.contains('Madeira').should('be.visible');
    cy.contains('100 m2').should('be.visible');
  });
});
