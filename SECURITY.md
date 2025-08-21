# Security Policy

## Security Rating

This add-on has a security rating of **5-6** (High Security):

- Base rating: 5 (protection mode enabled)
- AppArmor profile: +1
- No dangerous permissions: Maintains high rating
- Ingress enabled: Additional isolation

## Security Features

### ✅ Protection Mode: ENABLED
The add-on runs in protection mode, preventing system-level access.

### ✅ Network Isolation
- **host_network**: FALSE - Add-on uses Docker network isolation
- **Ingress**: TRUE - Traffic proxied through Home Assistant

### ✅ Limited Permissions
- **hassio_api**: FALSE - No Supervisor API access
- **homeassistant_api**: FALSE - No Home Assistant API access
- **auth_api**: FALSE - No authentication API access
- **privileged**: NONE - No privileged containers

### ✅ AppArmor Profile
Custom AppArmor profile restricts:
- File system access to only necessary paths
- Network capabilities to required protocols
- Prevents access to sensitive system resources

### ✅ Read-Only Mounts
- SSL certificates mounted read-only
- No write access to Home Assistant configuration

### ✅ Data Protection
- Optional IP address redaction
- Password-protected statistics page
- TLS/HTTPS support for encrypted connections

## Security Best Practices

### For Users
1. Set a strong `stats_password` to protect statistics
2. Enable `redact_ip_addresses` if privacy is a concern
3. Use TLS certificates for HTTPS when exposed externally
4. Regularly update the add-on for security patches

### For Developers
1. This add-on follows principle of least privilege
2. No unnecessary API access requested
3. All external assets served locally (no CDN dependencies)
4. Input validation on all configuration options

## Vulnerability Reporting

Report security vulnerabilities to:
- Create a private security advisory on GitHub
- Do NOT create public issues for security vulnerabilities

## Compliance

This add-on complies with Home Assistant security guidelines:
- Runs as non-root user (via S6-overlay)
- No host namespace access
- Proper secrets handling (no logging of passwords/API keys)
- Secure defaults (protection mode enabled)