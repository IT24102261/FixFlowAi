using FixFlow.Api.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace FixFlow.Tests.Unit;

public class HealthControllerTests
{
    [Fact]
    public void Get_ReturnsHealthyStatus()
    {
        var controller = new HealthController();

        var result = controller.Get();

        var okResult = Assert.IsType<OkObjectResult>(result);
        Assert.NotNull(okResult.Value);
    }
}
