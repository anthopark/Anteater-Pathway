FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["api-server/api-server.csproj", "api-server/"]
RUN dotnet restore "api-server/api-server.csproj"
COPY . .
WORKDIR "/src/api-server"
RUN dotnet build "api-server.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "api-server.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "api-server.dll"]
