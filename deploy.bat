@echo off
REM Ceylon Gem Atelier - Windows Production Build and Deploy Script
REM Usage: deploy.bat [environment]
REM Example: deploy.bat production

setlocal enabledelayedexpansion

set ENVIRONMENT=%1
if "%ENVIRONMENT%"=="" set ENVIRONMENT=development

for /f "tokens=2-4 delims=/ " %%a in ('date /t') do (set mydate=%%c%%a%%b)
for /f "tokens=1-2 delims=/:" %%a in ('time /t') do (set mytime=%%a%%b)
set VERSION=!mydate!.!mytime!

set BUILD_DIR=publish
set PROJECT_NAME=CeylonGemAtelier.API

echo.
echo ==================================================
echo   Ceylon Gem Atelier - Build and Deploy
echo ==================================================
echo Environment: %ENVIRONMENT%
echo Version: %VERSION%
echo.

REM Clean previous build
if exist "%BUILD_DIR%" (
    echo Cleaning previous build...
    rmdir /s /q "%BUILD_DIR%"
)

REM Restore dependencies
echo Restoring dependencies...
dotnet restore
if errorlevel 1 goto error

REM Run tests
echo Running tests...
dotnet test tests/CeylonGemAtelier.UnitTests -c Release --no-restore
if errorlevel 1 goto error

REM Build solution
echo Building application...
dotnet build -c Release --no-restore
if errorlevel 1 goto error

REM Publish release
echo Publishing application...
dotnet publish src/CeylonGemAtelier.API/CeylonGemAtelier.API.csproj ^
    -c Release ^
    -o "%BUILD_DIR%" ^
    --no-build ^
    --self-contained false
if errorlevel 1 goto error

REM Create deployment package
echo Creating deployment package...
set PACKAGE_NAME=%PROJECT_NAME%.%VERSION%.zip
powershell -Command "Add-Type -Assembly 'System.IO.Compression.FileSystem'; [System.IO.Compression.ZipFile]::CreateFromDirectory('%BUILD_DIR%', '%PACKAGE_NAME%')"

echo.
echo ==================================================
echo   Build Completed Successfully!
echo ==================================================
echo Package: %PACKAGE_NAME%
echo Location: %CD%\%PACKAGE_NAME%
echo.

if /i "%ENVIRONMENT%"=="development" (
    echo Development deployment instructions:
    echo 1. Extract %PACKAGE_NAME%
    echo 2. Update appsettings.Development.json
    echo 3. Run: dotnet CeylonGemAtelier.API.dll
) else if /i "%ENVIRONMENT%"=="staging" (
    echo Staging deployment instructions:
    echo 1. Upload %PACKAGE_NAME% to staging server
    echo 2. Extract and verify appsettings.Staging.json
    echo 3. Restart application service
) else if /i "%ENVIRONMENT%"=="production" (
    echo Production deployment instructions:
    echo 1. WARNING - Create backup of current database
    echo 2. Upload %PACKAGE_NAME% to production server
    echo 3. Extract to secure location
    echo 4. Verify appsettings.Production.json
    echo 5. Run database migrations if needed
    echo 6. Update load balancer to point to new version
    echo 7. Monitor logs and metrics
    echo 8. Keep previous version for quick rollback
)

echo.
echo Pre-deployment checklist:
echo [ ] Database backups taken
echo [ ] Configuration values verified
echo [ ] HTTPS certificate valid
echo [ ] API key/secrets configured
echo [ ] Log destinations available
echo [ ] Monitoring alerts configured
echo [ ] Rollback plan documented
echo.

goto end

:error
echo.
echo ==================================================
echo   ERROR - Build Failed!
echo ==================================================
echo Please check the error messages above.
exit /b 1

:end
