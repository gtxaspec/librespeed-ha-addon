ARG BUILD_FROM
FROM ${BUILD_FROM}

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Set LibreSpeed version
ARG LIBRESPEED_VERSION="v1.3.8"

# Install dependencies
RUN \
    apt-get update \
    && apt-get install -y --no-install-recommends \
        ca-certificates \
        curl \
        xz-utils \
    && rm -rf /var/lib/apt/lists/*

# Download and install LibreSpeed binary based on architecture
RUN \
    ARCH=$(uname -m) \
    && if [ "${ARCH}" = "x86_64" ]; then \
        LIBRESPEED_ARCH="x86_64-unknown-linux-gnu"; \
    elif [ "${ARCH}" = "aarch64" ]; then \
        LIBRESPEED_ARCH="aarch64-unknown-linux-gnu"; \
    else \
        echo "Unsupported architecture: ${ARCH}" && exit 1; \
    fi \
    && echo "Downloading LibreSpeed ${LIBRESPEED_VERSION} for ${LIBRESPEED_ARCH}..." \
    && curl -L -o /tmp/librespeed.tar.xz \
        "https://github.com/librespeed/speedtest-rust/releases/download/${LIBRESPEED_VERSION}/librespeed-rs-${LIBRESPEED_ARCH}.tar.xz" \
    && tar -xf /tmp/librespeed.tar.xz -C /tmp \
    && mv /tmp/librespeed-rs /usr/local/bin/librespeed-rs \
    && chmod +x /usr/local/bin/librespeed-rs \
    && rm -f /tmp/librespeed.tar.xz

# Copy rootfs
COPY rootfs /

# Fix permissions for s6 scripts and /tmp
RUN chmod +x /etc/services.d/librespeed/run \
    && chmod +x /etc/cont-init.d/* \
    && chmod 1777 /tmp \
    && chown root:root /tmp

# Build arguments
ARG BUILD_DATE
ARG BUILD_REF
ARG BUILD_VERSION

# Labels
LABEL \
    io.hass.name="LibreSpeed" \
    io.hass.description="Self-hosted speed test server powered by LibreSpeed Rust backend" \
    io.hass.arch="${BUILD_ARCH}" \
    io.hass.type="addon" \
    io.hass.version=${BUILD_VERSION} \
    maintainer="Home Assistant Community" \
    org.opencontainers.image.title="LibreSpeed" \
    org.opencontainers.image.description="Self-hosted speed test server powered by LibreSpeed Rust backend" \
    org.opencontainers.image.vendor="Home Assistant Community" \
    org.opencontainers.image.authors="Home Assistant Community" \
    org.opencontainers.image.licenses="LGPL-3.0" \
    org.opencontainers.image.created=${BUILD_DATE} \
    org.opencontainers.image.revision=${BUILD_REF} \
    org.opencontainers.image.version=${BUILD_VERSION}

# No ENTRYPOINT or CMD - let base image handle init