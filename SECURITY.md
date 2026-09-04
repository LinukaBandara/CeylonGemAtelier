# Security Policy

## Supported Versions

Security fixes are applied to the current `main` branch.

## Reporting a Vulnerability

Please do not disclose suspected vulnerabilities in a public issue.

Report security issues privately to the repository owner through GitHub. Include:

- A clear description of the issue
- Steps to reproduce it
- The affected component or endpoint
- Any relevant logs or screenshots that do not contain secrets

Do not include passwords, API keys, tokens, database credentials, or other sensitive information in a report.

## Secrets

Production credentials, JWT signing keys, database connection strings, and configured authentication users must be supplied through environment variables or a secret manager and must not be committed to source control.
