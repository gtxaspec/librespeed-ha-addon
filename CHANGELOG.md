# Changelog

## 1.0.0 - 2025-08-21
- Release version 1.0.0

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-08-21

### Added
- Initial release of LibreSpeed Home Assistant Add-on
- Based on LibreSpeed Rust backend v1.3.8
- Full IPv6 support with automatic prioritization
- Offline IPInfo database for ISP detection without API key
- SQLite database as default for storing test results
- Statistics page with password protection
- Home Assistant ingress integration for sidebar access
- Multi-architecture support (amd64, aarch64)
- MariaDB auto-discovery for database storage
- TLS/HTTPS support with custom certificates
- IP address redaction option for privacy
- Result image generation with light/dark themes
- Translations in 9 languages (EN, DE, ES, FR, IT, NL, PL, PT, RU)
- User-friendly configuration names and descriptions
- Watchdog and health check endpoints for reliability
- AppArmor security profile

### Security
- Runs as non-privileged container
- Read-only access to SSL certificates
- Optional IP address redaction
- Password-protected statistics page

### Known Issues
- IPv6 shows as IPv4 through ingress due to HA proxy limitations (architectural limitation, not a bug)
