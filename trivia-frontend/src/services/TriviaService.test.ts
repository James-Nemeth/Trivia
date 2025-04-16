import { describe, it, expect, afterEach, vi } from "vitest";
import MockAdapter from "axios-mock-adapter";
import { TriviaService, apiClient, fetchQuestions } from "./TriviaService";

const mock = new MockAdapter(apiClient);

describe("TriviaService", () => {
  afterEach(() => {
    mock.reset();
    vi.restoreAllMocks();
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

describe("fetchQuestions", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should fetch questions successfully", async () => {
    const mockQuestions = [
      {
        category: "General Knowledge",
        type: "multiple",
        difficulty: "easy",
        question: "What is the capital of France?",
        correct_answer: "Paris",
        incorrect_answers: ["Berlin", "Madrid", "Rome"],
      },
    ];

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ results: mockQuestions }),
    });

    const questions = await fetchQuestions("easy");

    expect(questions).toEqual(mockQuestions);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple"
    );
  });

  it("should retry fetching questions if rate limited", async () => {
    const mockQuestions = [
      {
        category: "Science",
        type: "multiple",
        difficulty: "medium",
        question: "What is the chemical symbol for water?",
        correct_answer: "H2O",
        incorrect_answers: ["O2", "H2", "HO"],
      },
    ];

    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({
        ok: false,
        status: 429,
      })
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ results: mockQuestions }),
      });

    global.fetch = fetchMock;

    const questions = await fetchQuestions("medium");

    expect(questions).toEqual(mockQuestions);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple"
    );
  });

  it("should return an empty array if the server returns an error", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
    });

    const questions = await fetchQuestions("hard");

    expect(questions).toEqual([]);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://opentdb.com/api.php?amount=10&difficulty=hard&type=multiple"
    );
  });

  it("should return an empty array if fetch throws an error", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Network error"));

    const questions = await fetchQuestions("easy");

    expect(questions).toEqual([]);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple"
    );
  });
});
