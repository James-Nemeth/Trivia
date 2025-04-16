import { describe, it, expect, afterEach } from "vitest";
import MockAdapter from "axios-mock-adapter";
import { TriviaService, apiClient } from "./TriviaService";

const mock = new MockAdapter(apiClient);

describe("TriviaService", () => {
  afterEach(() => {
    mock.reset();
  });

  it("should sign up a new user", async () => {
    const mockResponse = {
      message: "User registered successfully",
      username: "newuser",
      role: "PLAYER",
    };

    mock.onPost("/signup").reply(201, mockResponse);

    const response = await TriviaService.signup("newuser", "password123");

    expect(response).toEqual(mockResponse);
  });

  it("should log in a user and set the auth token", async () => {
    const mockResponse = {
      token: "mocked-jwt-token",
      username: "testuser",
    };

    mock.onPost("/login").reply(200, mockResponse);

    const response = await TriviaService.login("testuser", "password123");

    expect(response).toEqual(mockResponse);
    expect(localStorage.getItem("jwtToken")).toBe("mocked-jwt-token");
  });

  it("should fetch scores for a user", async () => {
    const mockScores = [
      { id: 1, score: 15, timestamp: "2025-04-01T10:00:00Z" },
      { id: 2, score: 20, timestamp: "2025-04-02T10:00:00Z" },
    ];

    mock.onGet("/scores/testuser").reply(200, mockScores);

    const scores = await TriviaService.getScores("testuser");

    expect(scores).toEqual(mockScores);
  });

  it("should save a user's score", async () => {
    const mockResponse = {
      message: "Score saved successfully",
      username: "testuser",
      score: 25,
    };

    mock.onPost("/scores").reply(201, mockResponse);

    const response = await TriviaService.saveScore("testuser", 25);

    expect(response).toEqual(mockResponse);
  });
});
