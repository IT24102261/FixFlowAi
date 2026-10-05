using FixFlow.Application.Interfaces;
using FixFlow.Domain.Constants;
using FixFlow.Domain.Entities;
using FixFlow.Domain.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace FixFlow.Infrastructure.Data;

public sealed class AdminSeeder(
    FixFlowDbContext db,
    IPasswordHasher passwordHasher,
    IConfiguration configuration,
    ILogger<AdminSeeder> logger)
{
    public async Task SeedAsync(CancellationToken cancellationToken = default)
    {
        var email = configuration["AdminSeed:Email"]?.Trim().ToLowerInvariant()
            ?? AppConstants.DemoAdminEmail;
        var password = configuration["AdminSeed:Password"] ?? "Admin123!";
        var displayName = configuration["AdminSeed:DisplayName"] ?? "FixFlow Admin";

        var user = await db.Users.FirstOrDefaultAsync(x => x.Email == email, cancellationToken);
        if (user is null)
        {
            await db.Users.AddAsync(new User
            {
                Email = email,
                PasswordHash = passwordHasher.Hash(password),
                DisplayName = displayName,
                Role = UserRole.Admin,
                IsActive = true
            }, cancellationToken);
            await db.SaveChangesAsync(cancellationToken);
            logger.LogInformation("Seeded admin account {Email}.", email);
            return;
        }

        user.PasswordHash = passwordHasher.Hash(password);
        user.DisplayName = string.IsNullOrWhiteSpace(user.DisplayName) ? displayName : user.DisplayName;
        user.Role = UserRole.Admin;
        user.IsActive = true;
        user.UpdatedAt = DateTimeOffset.UtcNow;
        await db.SaveChangesAsync(cancellationToken);
        logger.LogInformation("Updated admin account {Email}.", email);
    }
}
