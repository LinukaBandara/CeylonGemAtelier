namespace CeylonGemAtelier.API.Infrastructure.Auth;

public record LoginRequest(string Username, string Password);

public record LoginResponse(string Token, string TokenType, int ExpiresIn);

public record LoginErrorResponse(string Message, string? Details = null);
