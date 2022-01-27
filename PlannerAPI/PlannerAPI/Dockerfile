FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["PlannerAPI.csproj", ""]
RUN dotnet restore "PlannerAPI.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "PlannerAPI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "PlannerAPI.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
#ENTRYPOINT ["dotnet", "PlannerAPI.dll"]
ARG ConnectionString
ARG DataBaseName

CMD ASPNETCORE_URLS=http://*:$PORT ConnectionString=$ConnectionString Database=$Database dotnet PlannerAPI.dll