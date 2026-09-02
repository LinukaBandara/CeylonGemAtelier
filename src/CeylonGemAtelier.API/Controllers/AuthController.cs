using CeylonGemAtelier.API.Infrastructure.Auth;
using Microsoft.AspNetCore.Mvc;

namespace CeylonGemAtelier.API.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IAuthenticationService _authService;
    private readonly IConfiguration _configuration;
    private readonly ILogger<AuthController> _logger;

    // Simple hardcoded credentials for development - in production, use a proper user store
    private static readonly Dictionary<string, string> ValidUsers = new()
    {
        { "admin", "admin123" },
        { "manager", "manager123" }
    };

    public AuthController(
        IAuthenticationService authService,
        IConfiguration configuration,
        ILogger<AuthController> logger)
    {
        _authService = authService;
        _configuration = configuration;
        _logger = logger;
    }

    /// <summary>
    /// Login with username and password to receive a JWT token.
    /// Development only - in production, integrate with a proper identity provider.
    /// </summary>
    [HttpPost("login")]
    [ProducesResponseType(typeof(LoginResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(LoginErrorResponse), StatusCodes.Status401Unauthorized)]
    public IActionResult Login([FromBody] LoginRequest request)
    {
        if (request == null || string.IsNullOrWhiteSpace(request.Username))
        {
            return BadRequest(new LoginErrorResponse("Username is required"));
        }

        if (string.IsNullOrWhiteSpace(request.Password))
        {
            return BadRequest(new LoginErrorResponse("Password is required"));
        }

        // Validate credentials (development only)
        if (!ValidUsers.TryGetValue(request.Username, out var storedPassword) 
            || storedPassword != request.Password)
        {
            _logger.LogWarning("Failed login attempt for user: {Username}", request.Username);
            return Unauthorized(new LoginErrorResponse("Invalid username or password"));
        }

        // Determine role based on username (simplistic approach for development)
        var role = request.Username == "admin" ? "Admin" : "Manager";

        try
        {
            var token = _authService.GenerateToken(request.Username, role);
            var expiryMinutes = int.TryParse(
                _configuration["Jwt:ExpiryMinutes"],
                out var minutes) ? minutes : 60;

            _logger.LogInformation("User {Username} logged in successfully", request.Username);

            return Ok(new LoginResponse(
                Token: token,
                TokenType: "Bearer",
                ExpiresIn: expiryMinutes * 60)); // Convert to seconds
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error generating token for user {Username}", request.Username);
            return StatusCode(
                StatusCodes.Status500InternalServerError,
                new LoginErrorResponse("An error occurred during login"));
        }
    }
}
