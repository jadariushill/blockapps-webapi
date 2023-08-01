const express = require("express");
const fetch = require("node-fetch");
const app = express();
const supertest = require("supertest");
const { getReleaseDate } = require("./index.js");

describe("GET /getTagCreationDate", () => {
  
    // Mocking the fetch function
  jest.spyOn(fetch, "Promise").mockImplementation(() =>
    Promise.resolve({
      status: 200,
      json: () => Promise.resolve({ created_at: "2023-08-01T12:34:56Z" }),
    })
  );

  it("should return the correct tag creation date", async () => {
    const response = await supertest(app)
      .get("/getTagCreationDate")
      .set("tag-name", "v1.0.0");

    expect(response.status).toBe(200);
    expect(response.body.created_at).toBe("August 1, 2023, 12:34:56 PM GMT");
    expect(response.body.errorMsg).toBeNull();
  });

  it("should handle tag not found", async () => {
    jest.spyOn(fetch, "Promise").mockImplementation(() =>
      Promise.resolve({
        status: 404,
      })
    );

    const response = await supertest(app)
      .get("/getTagCreationDate")
      .set("tag-name", "non-existent-tag");

    expect(response.status).toBe(200);
    expect(response.body.created_at).toBeNull();
    expect(response.body.errorMsg).toBe("Release tag name not found!");
  });

  it("should handle invalid tag name", async () => {
    const response = await supertest(app).get("/getTagCreationDate");

    expect(response.status).toBe(400);
    expect(response.body.created_at).toBeNull();
    expect(response.body.errorMsg).toBe("Please enter a tag name.");
  });

  it("should handle server error", async () => {
    jest.spyOn(fetch, "Promise").mockImplementation(() =>
      Promise.resolve({
        status: 500,
      })
    );

    const response = await supertest(app)
      .get("/getTagCreationDate")
      .set("tag-name", "server-error-tag");

    expect(response.status).toBe(500);
    expect(response.body.created_at).toBeNull();
    expect(response.body.errorMsg).toBe(
      "Something went wrong. Please try again later."
    );
  });
});
