#!/bin/bash

# Ceylon Gem Atelier - Production Build and Deploy Script
# Usage: ./deploy.sh [environment]
# Example: ./deploy.sh production

set -e

ENVIRONMENT=${1:-development}
BUILD_DIR="./publish"
PROJECT_NAME="CeylonGemAtelier.API"
VERSION=$(date +%Y%m%d.%H%M%S)

echo "🚀 Building Ceylon Gem Atelier for $ENVIRONMENT..."
echo "Version: $VERSION"

# Clean previous build
if [ -d "$BUILD_DIR" ]; then
    echo "Cleaning previous build..."
    rm -rf "$BUILD_DIR"
fi

# Restore dependencies
echo "Restoring dependencies..."
dotnet restore

# Run tests
echo "Running tests..."
dotnet test tests/CeylonGemAtelier.UnitTests -c Release --no-restore --logger "console;verbosity=normal"

# Build solution
echo "Building application..."
dotnet build -c Release --no-restore

# Publish release
echo "Publishing application..."
dotnet publish src/CeylonGemAtelier.API/CeylonGemAtelier.API.csproj \
    -c Release \
    -o "$BUILD_DIR" \
    --no-build \
    --self-contained false

# Create deployment package
echo "Creating deployment package..."
PACKAGE_NAME="${PROJECT_NAME}.${VERSION}.zip"
cd "$BUILD_DIR"
zip -r "../$PACKAGE_NAME" . -q
cd ..

echo ""
echo "✅ Build completed successfully!"
echo "📦 Package: $PACKAGE_NAME"
echo "📁 Location: $(pwd)/$PACKAGE_NAME"
echo ""

case $ENVIRONMENT in
    development)
        echo "🔧 Development deployment instructions:"
        echo "1. Extract $PACKAGE_NAME"
        echo "2. Update appsettings.Development.json"
        echo "3. Run: dotnet CeylonGemAtelier.API.dll"
        ;;
    staging)
        echo "🔧 Staging deployment instructions:"
        echo "1. Upload $PACKAGE_NAME to staging server"
        echo "2. Extract and verify appsettings.Staging.json"
        echo "3. Restart application service"
        ;;
    production)
        echo "🔧 Production deployment instructions:"
        echo "1. ⚠️  Create backup of current database"
        echo "2. Upload $PACKAGE_NAME to production server"
        echo "3. Extract to secure location"
        echo "4. Verify appsettings.Production.json"
        echo "5. Run database migrations if needed"
        echo "6. Update load balancer to point to new version"
        echo "7. Monitor logs and metrics"
        echo "8. Keep previous version for quick rollback"
        ;;
    *)
        echo "Unknown environment: $ENVIRONMENT"
        exit 1
        ;;
esac

echo ""
echo "🔒 Pre-deployment checklist:"
echo "[ ] Database backups taken"
echo "[ ] Configuration values verified"
echo "[ ] HTTPS certificate valid"
echo "[ ] API key/secrets configured"
echo "[ ] Log destinations available"
echo "[ ] Monitoring alerts configured"
echo "[ ] Rollback plan documented"
