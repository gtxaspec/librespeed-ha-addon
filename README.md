# Home Assistant Add-on: LibreSpeed

Self-hosted speed test server powered by LibreSpeed Rust backend.

## About

This add-on runs a LibreSpeed server on your Home Assistant instance, allowing you to test your network speed from any device on your local network or remotely through Home Assistant's ingress feature. It's based on the [speedtest-rust](https://github.com/librespeed/speedtest-rust) project, providing a lightweight, fast, and accurate speed testing solution. All settings are fully configurable through the Home Assistant UI - no manual file editing required.

## Features

- **No Flash, No Java, No WebSocket, No Bullshit** - Pure HTML5/JavaScript frontend
- Download speed testing
- Upload speed testing
- Ping and jitter measurements
- IP address and ISP information display
- Optional telemetry and results storage
- Multi-architecture support (amd64, aarch64)
- **Full IPv6 priority** - Always prefers IPv6

## Installation

1. Add this repository to your Home Assistant Add-on Store
2. Install the "LibreSpeed" add-on
3. Configure the add-on options (see Configuration section)
4. Start the add-on
5. Access the web interface at `http://homeassistant.local:8181`

## Configuration

All configuration options appear with user-friendly names and descriptions in the Home Assistant UI, making setup intuitive.

### Main Options

- **Base URL Path**: API endpoint prefix (default: "backend")
- **Update IP Database on Startup**: Download/update offline IPInfo database for ISP detection without API key
- **IPInfo.io API Key**: Optional API key for enhanced geolocation data
- **Statistics Page Password**: Required password to access the stats page (page is inaccessible without it)
- **Redact IP Addresses**: Hide IP addresses in results for privacy (shows as 0.0.0.0)
- **Result Image Theme**: Choose "light" or "dark" theme for result images

### Database Options

- **Database Type**: Choose storage backend (default: "sqlite")
  - `sqlite`: Persistent local storage
  - `memory`: Temporary storage (lost on restart)
  - `mysql`: Use MariaDB add-on (auto-discovers if installed)
  - `postgres`: Use PostgreSQL
  - `none`: Disable result storage
- **SQLite Database File**: Path to database file (default: "/data/speedtest.db")
- **Database connection settings**: For MySQL/PostgreSQL - hostname, database name, username, and password

#### Using Home Assistant's MariaDB Add-on

If you have the official MariaDB add-on installed, you can configure LibreSpeed to use it:

1. Install the MariaDB add-on from the Home Assistant Add-on Store
2. In the MariaDB add-on configuration, create a database and user for LibreSpeed:
   ```yaml
   databases:
     - librespeed
   logins:
     - username: librespeed
       password: your_secure_password
   rights:
     - username: librespeed
       database: librespeed
   ```
3. Configure LibreSpeed to use MariaDB:
   ```yaml
   database_type: "mysql"
   database_hostname: "core-mariadb"
   database_name: "librespeed"
   database_username: "librespeed"
   database_password: "your_secure_password"
   ```

**Note**: The hostname `core-mariadb` is the internal Docker hostname for the official MariaDB add-on. If you're using a different MariaDB/MySQL instance, use its appropriate hostname or IP address.

### TLS/HTTPS Options

- **Enable HTTPS/TLS**: Turn on HTTPS support (default: false)
- **TLS Certificate File**: Path to SSL certificate (e.g., `/ssl/fullchain.pem`)
- **TLS Key File**: Path to SSL private key (e.g., `/ssl/privkey.pem`)

### Example Configuration

```yaml
base_url: "backend"
update_ipdb_on_start: true  # Enable offline ISP detection
ipinfo_api_key: ""  # Optional: Add API key for enhanced data
stats_password: "mysecretpassword"
redact_ip_addresses: false
result_image_theme: "light"
database_type: "sqlite"
database_file: "/data/speedtest.db"
# For MySQL/PostgreSQL:
# database_type: "postgres"
# database_hostname: "localhost"
# database_name: "speedtest"
# database_username: "speedtest_user"
# database_password: "secure_password"
# For HTTPS:
# enable_tls: true
# tls_cert_file: "/ssl/fullchain.pem"
# tls_key_file: "/ssl/privkey.pem"
```

### IPv6 Support

The add-on always binds to `::` which listens on all IPv6 addresses and also accepts IPv4 connections via IPv4-mapped IPv6 addresses. This ensures the add-on prioritizes IPv6 while maintaining full IPv4 compatibility.

**Note:** Home Assistant must have IPv6 enabled for containers (`ha docker options --enable-ipv6=true`) for full IPv6 support. When properly configured, clients connecting via IPv6 will see their IPv6 address in the test results.

**Ingress Limitation:** When accessing through Home Assistant's ingress (sidebar), connections always appear as IPv4 due to HA's internal proxy. For true IPv6 testing, use direct access on port 8181.

### ISP Detection & Geolocation

LibreSpeed supports two methods for ISP detection:

#### Option 1: Offline Database (Recommended)
Enable `update_ipdb_on_start` to automatically download and update the IPInfo offline database on add-on startup. This provides ISP detection without needing an API key or making external requests for each test.

- **Pros**: No API key needed, faster response, no rate limits
- **Cons**: Database needs periodic updates, uses ~60MB disk space

#### Option 2: Online API
Configure `ipinfo_api_key` with an IPInfo.io API token for enhanced geolocation:

1. Sign up for a free account at [ipinfo.io](https://ipinfo.io/signup)
2. Get your API token (free tier includes 50,000 requests/month)
3. Add the token to your add-on configuration as `ipinfo_api_key`

- **Pros**: Always up-to-date, more detailed information
- **Cons**: Requires API key, subject to rate limits

**Note**: You can use both methods together. The offline database will be used as a fallback when the API is unavailable or rate-limited.

## Usage

Once the add-on is running, you can access the LibreSpeed interface by:

1. Opening your web browser
2. Navigating to `http://homeassistant.local:8181` (replace with your HA IP if needed)
3. Click "Start" to begin the speed test

### Statistics Page

If you've set a `stats_password`, you can access the statistics page at:
`http://homeassistant.local:8181/stats` (you'll be prompted for the password)

## Network Requirements

- The add-on needs to be accessible from devices you want to test from
- For accurate results, ensure your Home Assistant host has sufficient network bandwidth
- Testing from wireless devices may show lower speeds due to WiFi limitations

## Troubleshooting

### Port Already in Use

If port 8181 is already in use, change the port in the configuration and update the port mapping.

### Cannot Access the Interface

1. Check that the add-on is running
2. Verify the port configuration
3. Ensure no firewall is blocking the port
4. Check the add-on logs for errors

### Slow Speed Results

- Remember that speeds are limited by your local network and the device running Home Assistant
- Wired connections typically provide more accurate results than WiFi
- Other network activity can affect test results

## Support

For issues or questions about this add-on, please open an issue on the [GitHub repository](https://github.com/gtxaspec/librespeed-ha-addon).

For issues with LibreSpeed itself, refer to the [upstream project](https://github.com/librespeed/speedtest-rust).

## License

This add-on is provided under the same license as the LibreSpeed project (LGPL-3.0).
