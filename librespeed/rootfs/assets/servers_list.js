function get_servers() {
    // Detect if we're running through HA ingress
    const pathname = window.location.pathname;
    const isIngress = pathname.includes('/api/hassio_ingress/');
    
    // For ingress, we need the full path including the ingress token
    // For direct access, we use relative paths
    let server, dlURL, ulURL, pingURL, getIpURL;
    
    if (isIngress) {
        // Extract the ingress base path (everything up to and including the token)
        const ingressPath = pathname.substring(0, pathname.lastIndexOf('/') + 1);
        server = window.location.origin + ingressPath;
        dlURL = "backend/garbage";
        ulURL = "backend/empty";
        pingURL = "backend/empty";
        getIpURL = "backend/getIP";
    } else {
        // Direct access - use simple relative paths
        server = window.location.origin;
        dlURL = "backend/garbage";
        ulURL = "backend/empty";
        pingURL = "backend/empty";
        getIpURL = "backend/getIP";
    }
    
    return [
        {
            name : "Home Assistant Local",
            server : server,
            dlURL: dlURL,
            ulURL: ulURL,
            pingURL: pingURL,
            getIpURL: getIpURL
        }
    ]
}