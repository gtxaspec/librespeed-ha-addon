# LibreSpeed Home Assistant Add-on Documentation

## About

LibreSpeed is a self-hosted network speed test server that allows you to test your internet connection speed without relying on external services. This add-on runs the LibreSpeed Rust backend, providing accurate speed testing directly from your Home Assistant instance.

## Installation

1. Navigate to **Settings** → **Add-ons** → **Add-on Store**
2. Add this repository URL: `https://github.com/gtxaspec/librespeed-ha-addon`
3. Install the **LibreSpeed** add-on
4. Configure the add-on (see Configuration section below)
5. Start the add-on
6. Click "Open Web UI" or access via sidebar if ingress is enabled

## Configuration

All configuration options have user-friendly names and descriptions in the Home Assistant UI. Here's what each option does:

### Basic Options

- **Base URL Path**: The URL path prefix for API endpoints (default: "backend")
  - Usually doesn't need changing unless you have routing conflicts

- **Update IP Database on Startup**: Enable to download/update the offline IPInfo database
  - Provides ISP detection without needing an API key
  - Database is ~60MB and stored persistently

- **IPInfo.io API Key**: Optional API key for enhanced geolocation data
  - Get a free key at [ipinfo.io](https://ipinfo.io/signup)
  - Provides more detailed location and ISP information

- **Statistics Page Password**: Password to access the /backend/stats page
  - Without a password, the statistics page is completely inaccessible
  - Protects your speed test history

- **Redact IP Addresses**: Hide IP addresses in test results for privacy
  - When enabled, all IPs show as 0.0.0.0

- **Result Image Theme**: Color theme for generated result images
  - Choose between "light" or "dark" themes

### Database Options

- **Database Type**: Storage backend for test results
  - `sqlite`: Persistent local storage (default) - Survives restarts
  - `memory`: Temporary storage - Lost on restart
  - `mysql`: Use MariaDB add-on - Auto-discovers if installed
  - `postgres`: Use PostgreSQL database
  - `none`: Disable result storage - No history kept

- **SQLite Database File**: Path to SQLite database (default: "/data/speedtest.db")
  - Only used when database type is "sqlite"

For MySQL/PostgreSQL, additional options appear:
- **Database Hostname**: Server address (auto-filled for MariaDB add-on)
- **Database Name**: Name of the database to use
- **Database Username**: Database login username
- **Database Password**: Database login password

### TLS/HTTPS Options

- **Enable HTTPS/TLS**: Turn on HTTPS support
  - Requires valid certificate files

- **TLS Certificate File**: Path to your SSL certificate
  - Example: `/ssl/fullchain.pem`

- **TLS Key File**: Path to your SSL private key
  - Example: `/ssl/privkey.pem`

## Usage

### Running Speed Tests

1. Open the LibreSpeed interface
2. Click "Start" to begin testing
3. View your:
   - Download speed
   - Upload speed
   - Ping (latency)
   - Jitter
   - IP address and ISP information

### Viewing Statistics

Access the statistics page at: `http://your-ha:8181/backend/stats`
(Password required if configured)

### IPv6 Support

The add-on prioritizes IPv6 connections while maintaining IPv4 compatibility. For full IPv6 support:

```bash
ha docker options --ipv6=true
ha supervisor restart
```

**Note**: When using ingress (sidebar), connections appear as IPv4 due to HA's proxy. Use direct access for true IPv6 testing.

## ISP Detection

Two methods are available:

1. **Offline Database** (Recommended)
   - Enable `update_ipdb_on_start`
   - No API key required
   - No rate limits

2. **Online API**
   - Get free API key from [ipinfo.io](https://ipinfo.io/signup)
   - More detailed information
   - Subject to rate limits

## MariaDB Integration

If you have the MariaDB add-on installed:
1. Set `database_type: mysql`
2. The add-on will auto-discover MariaDB
3. Configure database name, username, and password

## Troubleshooting

### Add-on won't start
- Check the logs: **Settings** → **Add-ons** → **LibreSpeed** → **Logs**
- Verify port 8181 is not in use
- Ensure configuration is valid

### No servers available
- Restart the add-on
- Check if the backend is running: `http://your-ha:8181/backend/getIP`

### IPv6 not working
- Enable IPv6 in Docker: `ha docker options --ipv6=true`
- Restart supervisor: `ha supervisor restart`

### Database errors
- For SQLite: Ensure `/data` directory is writable
- For MySQL: Verify MariaDB add-on is running and credentials are correct

## Support

- **Add-on Issues**: [GitHub Issues](https://github.com/gtxaspec/librespeed-ha-addon/issues)
- **LibreSpeed Issues**: [Upstream Project](https://github.com/librespeed/speedtest-rust)

## License

This add-on is provided under the LGPL-3.0 license, same as the LibreSpeed project.

## Credits

- LibreSpeed Project: [https://github.com/librespeed/speedtest-rust](https://github.com/librespeed/speedtest-rust)
- Home Assistant Community