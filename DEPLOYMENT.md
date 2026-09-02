# Ceylon Gem Atelier - Deployment Guide

## Production Deployment Checklist

### 1. **Database Preparation**
- [ ] Create PostgreSQL database on production server
- [ ] Database name: `ceylon_gem_atelier`
- [ ] Run migrations: `dotnet ef database update --project src/CeylonGemAtelier.Infrastructure`
- [ ] Verify all tables created successfully
- [ ] Set up automated daily backups
- [ ] Create read-only replica for reporting (optional)
- [ ] Configure connection pooling (max 20 connections)

### 2. **Configuration Management**
- [ ] Create `appsettings.Production.json` with production values:
  ```json
  {
    "Logging": {
      "LogLevel": {
        "Default": "Warning",
        "Microsoft.AspNetCore": "Error"
      }
    },
    "ConnectionStrings": {
      "DefaultConnection": "Host=prod-db.example.com;Port=5432;Database=ceylon_gem_atelier;Username=app_user;Password=STRONG_PASSWORD_HERE;Connection Timeout=30;Command Timeout=30;"
    },
    "Jwt": {
      "SecretKey": "GENERATE_STRONG_SECRET_KEY_MIN_32_CHARS",
      "Issuer": "CeylonGemAtelier",
      "Audience": "CeylonGemAtelier.API",
      "ExpiryMinutes": 120
    },
    "CorsPolicy": {
      "AllowedOrigins": ["https://atelier.example.com", "https://www.atelier.example.com"]
    }
  }
  ```
- [ ] Store secrets in Azure Key Vault or environment variables, NOT in config files
- [ ] Set environment variable: `ASPNETCORE_ENVIRONMENT=Production`
- [ ] Configure log file paths with adequate disk space
- [ ] Set up log rotation policy (daily, retain 30 days)

### 3. **API Server Deployment**
- [ ] Build release binary: `dotnet publish -c Release -o ./publish`
- [ ] Deploy to hosting (Azure App Service, Docker, IIS, etc.)
- [ ] Configure HTTPS/TLS with valid certificate
- [ ] Set up health check endpoint monitoring
- [ ] Enable detailed error logging to secure location
- [ ] Configure automatic restart on failure
- [ ] Set up performance monitoring (application insights, New Relic, etc.)

### 4. **Frontend Deployment**
- [ ] **Dashboard (Vite + React)**
  - [ ] Update `.env.production`: `VITE_API_BASE_URL=https://api.atelier.example.com`
  - [ ] Build: `npm run build` (outputs to `dist/`)
  - [ ] Deploy to CDN or static hosting
  - [ ] Enable gzip compression
  - [ ] Set cache headers appropriately
  
- [ ] **Public Website (Next.js)**
  - [ ] Update `.env.production`: `NEXT_PUBLIC_API_URL=https://api.atelier.example.com`
  - [ ] Build: `npm run build`
  - [ ] Deploy to Vercel, Azure Static Web Apps, or self-hosted
  - [ ] Configure ISR (Incremental Static Regeneration) for product pages
  - [ ] Set up CDN for static assets

### 5. **Security Hardening**
- [ ] **HTTPS/TLS**
  - [ ] Obtain valid SSL certificate (Let's Encrypt, commercial CA)
  - [ ] Enforce HTTPS redirect (HTTP → HTTPS)
  - [ ] Set HSTS header: `Strict-Transport-Security: max-age=31536000; includeSubDomains`
  
- [ ] **API Security**
  - [ ] Enable CORS only for trusted origins
  - [ ] Implement rate limiting (e.g., 100 requests per minute per IP)
  - [ ] Enable request logging for audit trail
  - [ ] Configure firewall rules to block suspicious traffic
  - [ ] Use API gateway for additional protection
  
- [ ] **Database Security**
  - [ ] Use dedicated database user with limited permissions
  - [ ] Enable SSL for database connections
  - [ ] Regular security patches and updates
  - [ ] Database encryption at rest (if supported by provider)
  - [ ] Restrict database access to application servers only

- [ ] **Secrets Management**
  - [ ] Never commit secrets to version control
  - [ ] Use environment variables or secrets vault
  - [ ] Rotate JWT secret key regularly (restart required)
  - [ ] Monitor for exposed credentials in logs

### 6. **Monitoring & Alerting**
- [ ] Set up application monitoring:
  - [ ] CPU and memory usage
  - [ ] Response time metrics
  - [ ] Error rates and exceptions
  - [ ] Database query performance
  
- [ ] Configure alerts for:
  - [ ] High error rate (>5%)
  - [ ] Response time exceeds 2 seconds
  - [ ] Database connection failures
  - [ ] Disk space running low
  - [ ] Authentication failures (potential attacks)

- [ ] Set up centralized logging:
  - [ ] Application logs (Serilog)
  - [ ] Web server logs
  - [ ] Database audit logs
  - [ ] Access logs for compliance

### 7. **Backup & Disaster Recovery**
- [ ] **Database Backups**
  - [ ] Full backup daily
  - [ ] Transaction logs every 15 minutes
  - [ ] Test restore procedure monthly
  - [ ] Store backups in geographically separate location
  
- [ ] **Application Backups**
  - [ ] Version control all code
  - [ ] Tag all production releases
  - [ ] Maintain rollback plan for each version

- [ ] **Disaster Recovery Plan**
  - [ ] Document RTO (Recovery Time Objective): < 4 hours
  - [ ] Document RPO (Recovery Point Objective): < 1 hour
  - [ ] Test failover procedures quarterly
  - [ ] Maintain runbook for common incidents

### 8. **Load Testing**
```bash
# Using Apache Bench
ab -n 1000 -c 10 https://api.atelier.example.com/api/health

# Using k6 (load testing)
k6 run load-test.js
```

Expected performance targets:
- API response time: <500ms (p95)
- Throughput: >1000 requests/second
- Error rate: <0.1%

### 9. **Smoke Tests** (Post-Deployment)
- [ ] Health check endpoint responds (200 OK)
- [ ] Login endpoint accepts valid credentials
- [ ] Public catalog endpoint returns products
- [ ] Admin endpoints require authentication
- [ ] Protected endpoints reject unauthorized requests
- [ ] Database queries execute successfully
- [ ] Logging is working

### 10. **Post-Deployment Verification**
```bash
# Health check
curl https://api.atelier.example.com/api/health

# Authentication test
curl -X POST https://api.atelier.example.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# Catalog access
curl https://api.atelier.example.com/api/catalog/products

# Admin access (should require auth)
curl -X POST https://api.atelier.example.com/api/catalog/products \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{...}'
```

### 11. **Scaling Considerations**
- **Vertical Scaling**: Increase server RAM/CPU
- **Horizontal Scaling**: Multiple API instances behind load balancer
- **Database Scaling**: Read replicas for reporting queries
- **Caching**: Redis for session management and frequently accessed data
- **CDN**: Content delivery network for frontend assets

### 12. **Maintenance Schedule**
- **Weekly**: Check logs for errors, monitor performance metrics
- **Monthly**: Security patch updates, backup verification
- **Quarterly**: Load testing, disaster recovery drill
- **Annually**: Full security audit, infrastructure review

## Docker Deployment Example

```dockerfile
# Dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime

WORKDIR /app
COPY ./publish .

EXPOSE 80 443
ENV ASPNETCORE_ENVIRONMENT=Production

ENTRYPOINT ["dotnet", "CeylonGemAtelier.API.dll"]
```

```bash
# Build and push
docker build -t ceylongematel/api:1.0 .
docker push ceylongematel/api:1.0

# Run container
docker run -d \
  -p 443:443 \
  -e ConnectionStrings__DefaultConnection="Host=db.example.com;..." \
  -e Jwt__SecretKey="STRONG_SECRET_HERE" \
  -e ASPNETCORE_ENVIRONMENT=Production \
  ceylongematel/api:1.0
```

## Kubernetes Deployment Example

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: api-secrets
type: Opaque
stringData:
  connectionString: "Host=db.example.com;..."
  jwtSecretKey: "STRONG_SECRET_HERE"

---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ceylon-gem-atelier-api
spec:
  replicas: 2
  selector:
    matchLabels:
      app: ceylon-gem-atelier-api
  template:
    metadata:
      labels:
        app: ceylon-gem-atelier-api
    spec:
      containers:
      - name: api
        image: ceylongematel/api:1.0
        ports:
        - containerPort: 80
          name: http
        - containerPort: 443
          name: https
        env:
        - name: ASPNETCORE_ENVIRONMENT
          value: "Production"
        - name: ConnectionStrings__DefaultConnection
          valueFrom:
            secretKeyRef:
              name: api-secrets
              key: connectionString
        - name: Jwt__SecretKey
          valueFrom:
            secretKeyRef:
              name: api-secrets
              key: jwtSecretKey
        livenessProbe:
          httpGet:
            path: /api/health
            port: 80
          initialDelaySeconds: 30
          periodSeconds: 10
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"

---
apiVersion: v1
kind: Service
metadata:
  name: ceylon-gem-atelier-api
spec:
  type: LoadBalancer
  ports:
  - name: https
    port: 443
    targetPort: 443
  - name: http
    port: 80
    targetPort: 80
  selector:
    app: ceylon-gem-atelier-api
```

## Monitoring & Logging Configuration

### Application Insights (Azure)
```csharp
builder.Services.AddApplicationInsightsTelemetry();
```

### Elasticsearch + Kibana
```csharp
builder.Host.UseSerilog((context, config) =>
{
    config
        .WriteTo.Elasticsearch(new ElasticsearchSinkOptions(new Uri("https://elasticsearch:9200"))
        {
            AutoRegisterTemplate = true,
            IndexFormat = "ceylon-gem-atelier-{0:yyyy.MM.dd}"
        });
});
```

## Performance Optimization

1. **Caching Strategy**
   - Cache reference data (shapes, treatments, origins) for 1 hour
   - Cache product catalog for 30 minutes
   - Cache user sessions in Redis

2. **Database Optimization**
   - Add indexes on frequently queried columns (stock number, status)
   - Use database query profiling to identify slow queries
   - Consider materialized views for reports

3. **API Optimization**
   - Enable response compression (gzip)
   - Implement pagination for large collections
   - Use projection to return only needed fields
   - Consider GraphQL for flexible queries

## Rollback Procedure

If issues occur after deployment:
1. Identify the issue through monitoring/logs
2. Stop current deployment
3. Deploy previous stable version
4. Verify functionality
5. Investigate root cause
6. Plan fix and redeploy

## Compliance & Audit

- [ ] GDPR compliance (data privacy)
- [ ] PCI DSS compliance (if handling payments)
- [ ] SOC 2 audit readiness
- [ ] Data retention policies documented
- [ ] Access logs retained for 90 days
- [ ] Regular penetration testing

---

**Last Updated**: 2024
**Deployment Version**: 1.0
**Support**: deployment-support@atelier.example.com
