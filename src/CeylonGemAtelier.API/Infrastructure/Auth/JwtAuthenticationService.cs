using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace CeylonGemAtelier.API.Infrastructure.Auth;

/// <summary>
/// Authentication service for JWT token generation and validation.
/// </summary>
public interface IAuthenticationService
{
    string GenerateToken(string userId, string role = "User");
    bool ValidateToken(string token, out ClaimsPrincipal? principal);
}

public class JwtAuthenticationService : IAuthenticationService
{
    private readonly IConfiguration _configuration;
    private readonly ILogger<JwtAuthenticationService> _logger;

    public JwtAuthenticationService(IConfiguration configuration, ILogger<JwtAuthenticationService> logger)
    {
        _configuration = configuration;
        _logger = logger;
    }

    public string GenerateToken(string userId, string role = "User")
    {
        var secretKey = _configuration["Jwt:SecretKey"] 
            ?? throw new InvalidOperationException("Jwt:SecretKey not configured");
        var issuer = _configuration["Jwt:Issuer"] ?? "CeylonGemAtelier";
        var audience = _configuration["Jwt:Audience"] ?? "CeylonGemAtelier.API";
        var expiryMinutes = int.TryParse(_configuration["Jwt:ExpiryMinutes"], out var minutes) 
            ? minutes 
            : 60;

        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, userId),
            new Claim(ClaimTypes.Role, role),
            new Claim("oid", userId)
        };

        var token = new JwtSecurityToken(
            issuer: issuer,
            audience: audience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(expiryMinutes),
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public bool ValidateToken(string token, out ClaimsPrincipal? principal)
    {
        principal = null;

        try
        {
            var secretKey = _configuration["Jwt:SecretKey"];
            if (string.IsNullOrEmpty(secretKey))
            {
                return false;
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var tokenHandler = new JwtSecurityTokenHandler();

            var validationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = key,
                ValidateIssuer = true,
                ValidIssuer = _configuration["Jwt:Issuer"] ?? "CeylonGemAtelier",
                ValidateAudience = true,
                ValidAudience = _configuration["Jwt:Audience"] ?? "CeylonGemAtelier.API",
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero
            };

            principal = tokenHandler.ValidateToken(token, validationParameters, out var validatedToken);
            return true;
        }
        catch (Exception ex)
        {
            _logger.LogWarning("Token validation failed: {Message}", ex.Message);
            return false;
        }
    }
}
