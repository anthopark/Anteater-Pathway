# Running Planner API (APS.NET Core 6)

## Prerequisite

### Install .NET 6 SDK 

Install [.NET 6 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/6.0), which provides the runtime environment and the development kit for .NET 6 applications.

Check dotnet installation by running the following command.

``` Bash
$ dotnet --version
6.0.201
```

### secret.json

The `secret.json` file includes some sensitive configuration values, the backend DB URI, and the Firebase Auth private key for authorizing the endpoints. This file will be provided through Slack, and should be kept safely.

These are credentials for the development purpose backend DB and Firebase Auth service.

You can place `secret.json` under `Anteater-Pathway/PlannerAPI/PlannerAPI`. This file will not be tracked by Git (`.gitignore` lists this file.)

In order to set user secrets for PlannerAPI based on this file, run the following commands:

```Bash
# Assuming current directory is at 'Anteater-Pathway/PlannerAPI/PlannerAPI'

# on Linux/macOS
$ cat ./secret.json | dotnet user-secrets set

# on Windows
> type ./secret.json | dotnet user-secrets set
```

## Running Planner API

Once .NET 6 SDK and `secret.json` is in place, you can use `dotnet run` commands to build and run the project.

``` Bash
# Assuming current directory is at 'Anteater-Pathway/PlannerAPI/PlannerAPI'
$ dotnet run
```

This command will install dependency packages for Planner API and build the project and run the application.

The Next JS in development environment will now be able to make HTTP requests to Planner API at `http://localhost:5006`.