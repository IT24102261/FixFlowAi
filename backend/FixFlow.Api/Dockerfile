FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY FixFlow.sln ./
COPY backend/FixFlow.Api/FixFlow.Api.csproj backend/FixFlow.Api/
COPY backend/FixFlow.Application/FixFlow.Application.csproj backend/FixFlow.Application/
COPY backend/FixFlow.Domain/FixFlow.Domain.csproj backend/FixFlow.Domain/
COPY backend/FixFlow.Infrastructure/FixFlow.Infrastructure.csproj backend/FixFlow.Infrastructure/
COPY backend/FixFlow.Tests/FixFlow.Tests.csproj backend/FixFlow.Tests/

RUN dotnet restore backend/FixFlow.Api/FixFlow.Api.csproj

COPY backend/ backend/
RUN dotnet publish backend/FixFlow.Api/FixFlow.Api.csproj -c Release -o /app/publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 8080
ENTRYPOINT ["dotnet", "FixFlow.Api.dll"]
