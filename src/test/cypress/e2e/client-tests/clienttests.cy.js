describe("BlockApps WebAPI React Tests", () => {
    beforeEach(() => {
      cy.visit("/");
    });
    it("Displays Header", () => {
        cy.get("h1").should("have.text", "BlockApps Release WebAPI");
      });
    it("Displays Text Input", () => {
        cy.get(".MuiInputBase-root").should('be.visible')
    });
    it("Displays Submit Button", () => {
        cy.get(".MuiButtonBase-root").should('be.visible')
    });
    it("Should Display Time When Valid Input", () => {
        cy.get(".MuiInputBase-root").type('9.0.0')
        cy.get(".MuiButtonBase-root").click()

        cy.get("p").should(
            "contain.text",
            "The release tagged with 9.0.0 was created September 14, 2022"
          );
    });
    it("Should Display Help Text When Tag Input is Not Found", () => {
        cy.get(".MuiInputBase-root").type('invalid')
        cy.get(".MuiButtonBase-root").click()
        cy.get(".MuiFormHelperText-root").should("have.text","Tag not found.")
    });
    
});
  
  
