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
    /// Login using credentials supplied through configuration/environment variables.
    /// Configure Auth:Users as a JSON object containing username, password and role.
    /// Production deployments must use a secret manager or environment variables.
    /// </summary>
    [HttpPost("login")]
    [ProducesResponseType(typeof(LoginResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(LoginErrorResponse), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(LoginErrorResponse), StatusCodes.Status401Unauthorized)]
    public IActionResult Login([FromBody] LoginRequest request)
    {
        if (request == null || string.IsNullOrWhiteSpace(request.Username))
            return BadRequest(new LoginErrorResponse("Username is required"));

        if (string.IsNullOrWhiteSpace(request.Password))
            return BadRequest(new LoginErrorResponse("Password is required"));

        var configuredUsers = _configuration.GetSection("Auth:Users").Get<List<ConfiguredUser>>();
        var user = configuredUsers?.FirstOrDefault(x =>
            string.Equals(x.Username, request.Username, StringComparison.Ordinal));

        if (user == null || string.IsNullOrEmpty(user.Password) || user.Password != request.Password)
        {
            _logger.LogWarning("Failed login attempt for user: {Username}", request.Username);
            return Unauthorized(new LoginErrorResponse("Invalid username or password"));
        }

        try
        {
            var role = string.IsNullOrWhiteSpace(user.Role) ? "Manager" : user.Role;
            var token = _authService.GenerateToken(user.Username, role);
            var expiryMinutes = int.TryParse(_configuration["Jwt:ExpiryMinutes"], out var minutes)
                ? minutes
                : 60;

            _logger.LogInformation("User {Username} logged in successfully", user.Username);

            return Ok(new LoginResponse(
                Token: token,
                TokenType: "Bearer",
                ExpiresIn: expiryMinutes * 60));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error generating token for user {Username}", request.Username);
            return StatusCode(
                StatusCodes.Status500InternalServerError,
                new LoginErrorResponse("An error occurred during login"));
        }
    }

    private sealed class ConfiguredUser
    {
        public string Username { get; init; } = string.Empty;
        public string Password { get; init; } = string.Empty;
        public string Role { get; init; } = "Manager";
    }
}
