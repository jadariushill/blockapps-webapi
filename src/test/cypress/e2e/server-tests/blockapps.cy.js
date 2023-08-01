describe("BlockApp Server API Tests", () => {
  it("should return an error message when a non-existent tagName is provided", () => {
    const nonExistentTagName = "non-existent-tag";
    cy.request({
      method: "GET",
      url: `/release?tagName=${nonExistentTagName}`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(404);
      expect(response.body.errorMsg).to.equal("Tag not found.");
    });
  });

  it("should return an error message when tagName is empty", () => {
    cy.request({
      method: "GET",
      url: "/release?tagName=",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(400);
      expect(response.body.errorMsg).to.equal("Please enter a tag name.");
    });
  });

  it("should return a tag's creation date when a valid tagName is provided", () => {
    const validTagName = "9.0.0";
    cy.request({
      method: "GET",
      url: `/release?tagName=${validTagName}`,
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.creationDate).to.be.a("string");
      expect(response.body.errorMsg).to.be.null;
    });
  });
});
