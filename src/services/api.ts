
import { toast } from "sonner";

interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
  output?: string;
}

export async function executeScript(
  endpoint: string, 
  method: string, 
  payload: Record<string, any>
): Promise<ApiResponse> {
  // In a real app, this would make an actual API call
  console.log(`Making ${method} request to ${endpoint} with payload:`, payload);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Generate mock CLI output based on the endpoint and payload
  let output = '';
  let success = true;

  // Random chance of error for demo purposes
  const randomError = Math.random() < 0.2;
  
  if (randomError) {
    success = false;
    output = `[ERROR] Failed to execute script\n`;
    output += `[ERROR] Connection to server timed out\n`;
    output += `[ERROR] Please check your network connection and try again\n`;
    toast.error("Script execution failed");
    return { success, error: "Connection timeout", output };
  }

  // Generate mock output based on the endpoint
  if (endpoint.includes('/network/status')) {
    output = generateNetworkStatusOutput(payload);
  } else if (endpoint.includes('/network/diagnostics')) {
    output = generateNetworkDiagnosticsOutput(payload);
  } else if (endpoint.includes('/network/config/update')) {
    output = generateConfigUpdateOutput(payload);
  } else if (endpoint.includes('/system/disk/analyze')) {
    output = generateDiskAnalysisOutput(payload);
  } else if (endpoint.includes('/system/disk/cleanup')) {
    output = generateDiskCleanupOutput(payload);
  } else if (endpoint.includes('/system/service/status')) {
    output = generateServiceStatusOutput(payload);
  } else if (endpoint.includes('/system/service/action')) {
    output = generateServiceActionOutput(payload);
  } else if (endpoint.includes('/security/scan')) {
    output = generateSecurityScanOutput(payload);
  } else {
    output = `[INFO] Executing script at ${endpoint}\n`;
    output += `[INFO] Parameters: ${JSON.stringify(payload)}\n`;
    output += `[SUCCESS] Script executed successfully\n`;
  }
  
  toast.success("Script executed successfully");
  return { success, data: payload, output };
}

function generateNetworkStatusOutput(payload: Record<string, any>): string {
  let output = '';
  const { device_ip, check_type, timeout } = payload;
  
  output += `[INFO] Checking network status for device ${device_ip}\n`;
  output += `[INFO] Check type: ${check_type}, Timeout: ${timeout}s\n`;
  output += `[INFO] Initializing connection...\n`;
  
  if (check_type === 'ping') {
    output += `[INFO] PING ${device_ip} (${device_ip}) 56(84) bytes of data.\n`;
    output += `[INFO] 64 bytes from ${device_ip}: icmp_seq=1 ttl=64 time=0.045 ms\n`;
    output += `[INFO] 64 bytes from ${device_ip}: icmp_seq=2 ttl=64 time=0.046 ms\n`;
    output += `[INFO] 64 bytes from ${device_ip}: icmp_seq=3 ttl=64 time=0.042 ms\n`;
    output += `[INFO] 64 bytes from ${device_ip}: icmp_seq=4 ttl=64 time=0.044 ms\n`;
    output += `[SUCCESS] --- ${device_ip} ping statistics ---\n`;
    output += `[SUCCESS] 4 packets transmitted, 4 received, 0% packet loss, time 3060ms\n`;
    output += `[SUCCESS] rtt min/avg/max/mdev = 0.042/0.044/0.046/0.001 ms\n`;
  } else if (check_type === 'tcp') {
    output += `[INFO] Attempting to establish TCP connection to ${device_ip}...\n`;
    output += `[INFO] Connection established successfully.\n`;
    output += `[INFO] Running port scan...\n`;
    output += `[SUCCESS] Port 22 (SSH): OPEN\n`;
    output += `[SUCCESS] Port 80 (HTTP): OPEN\n`;
    output += `[SUCCESS] Port 443 (HTTPS): OPEN\n`;
    output += `[WARNING] Port 3389 (RDP): OPEN - Consider closing if not in use\n`;
  } else {
    output += `[INFO] Sending HTTP request to ${device_ip}...\n`;
    output += `[INFO] HTTP/1.1 200 OK\n`;
    output += `[SUCCESS] Response received in 235ms\n`;
    output += `[SUCCESS] Server is up and running\n`;
  }
  
  return output;
}

function generateNetworkDiagnosticsOutput(payload: Record<string, any>): string {
  let output = '';
  const { device_ip, diagnostic_level, include_logs } = payload;
  
  output += `[INFO] Running ${diagnostic_level} diagnostics on ${device_ip}\n`;
  output += `[INFO] Log collection: ${include_logs ? 'Enabled' : 'Disabled'}\n\n`;
  
  output += `[INFO] Phase 1: Connectivity Check\n`;
  output += `[INFO] Testing ICMP connectivity...\n`;
  output += `[SUCCESS] ICMP connectivity: OK\n`;
  
  output += `[INFO] Phase 2: Interface Status\n`;
  output += `[INFO] Checking interface status...\n`;
  output += `[INFO] eth0: UP\n`;
  output += `[INFO] eth1: UP\n`;
  
  if (diagnostic_level === 'advanced' || diagnostic_level === 'comprehensive') {
    output += `\n[INFO] Phase 3: Route Analysis\n`;
    output += `[INFO] Analyzing routing table...\n`;
    output += `[INFO] Default route: 192.168.1.1\n`;
    output += `[INFO] Static routes: 2\n`;
    output += `[INFO] Dynamic routes: 5\n`;
  }
  
  if (diagnostic_level === 'comprehensive') {
    output += `\n[INFO] Phase 4: Deep Packet Inspection\n`;
    output += `[INFO] Capturing packets on eth0...\n`;
    output += `[INFO] Analyzing packet loss...\n`;
    output += `[WARNING] 1.2% packet loss detected on eth0\n`;
    output += `[INFO] Analyzing network latency...\n`;
    output += `[INFO] Average latency: 3.5ms\n`;
  }
  
  if (include_logs) {
    output += `\n[INFO] Phase 5: Log Collection\n`;
    output += `[INFO] Collecting system logs...\n`;
    output += `[INFO] Retrieved 256 log entries\n`;
    output += `[WARNING] Found 3 warning events in logs\n`;
    output += `[ERROR] Found 1 error event in logs\n`;
  }
  
  output += `\n[SUCCESS] Diagnostics completed successfully\n`;
  
  return output;
}

function generateConfigUpdateOutput(payload: Record<string, any>): string {
  let output = '';
  const { router_id, config_file, parameters } = payload;
  
  output += `[INFO] Connecting to router ${router_id}...\n`;
  output += `[INFO] Connection established\n`;
  output += `[INFO] Loading ${config_file} configuration template\n`;
  
  if (parameters) {
    output += `[INFO] Applying custom parameters\n`;
    output += `[INFO] Validating parameters...\n`;
    output += `[SUCCESS] Parameters validated successfully\n`;
  }
  
  output += `[INFO] Backing up current configuration...\n`;
  output += `[SUCCESS] Backup saved to /backups/${router_id}-${new Date().toISOString().split('T')[0]}.cfg\n`;
  
  output += `[INFO] Applying new configuration...\n`;
  output += `[INFO] Updating routing tables...\n`;
  output += `[INFO] Updating firewall rules...\n`;
  output += `[INFO] Updating QoS settings...\n`;
  
  output += `[SUCCESS] Configuration updated successfully\n`;
  output += `[INFO] Testing new configuration...\n`;
  output += `[SUCCESS] All tests passed\n`;
  
  return output;
}

function generateDiskAnalysisOutput(payload: Record<string, any>): string {
  let output = '';
  const { hostname, path } = payload;
  
  output += `[INFO] Connecting to ${hostname}...\n`;
  output += `[INFO] Analyzing disk usage for ${path}\n\n`;
  
  output += `[INFO] Filesystem      Size  Used  Avail  Use%  Mounted on\n`;
  output += `[INFO] /dev/sda1       100G   76G    24G   76%  ${path}\n\n`;
  
  output += `[INFO] Top disk space consumers:\n`;
  output += `[INFO] 24G  /var/log\n`;
  output += `[INFO] 18G  /var/lib/docker\n`;
  output += `[INFO] 15G  /home\n`;
  output += `[INFO] 12G  /usr\n`;
  output += `[WARNING] /var/log consuming 24% of disk space\n\n`;
  
  output += `[INFO] Files by age:\n`;
  output += `[INFO] > 1 year old:  15G\n`;
  output += `[INFO] 6-12 months:   22G\n`;
  output += `[INFO] 1-6 months:    30G\n`;
  output += `[INFO] < 1 month:     9G\n\n`;
  
  output += `[SUCCESS] Analysis completed\n`;
  
  return output;
}

function generateDiskCleanupOutput(payload: Record<string, any>): string {
  let output = '';
  const { hostname, path, older_than, file_types, dry_run } = payload;
  
  output += `[INFO] Connecting to ${hostname}...\n`;
  output += `[INFO] Initializing cleanup for ${path}\n`;
  output += `[INFO] Parameters: Files older than ${older_than} days, Types: ${file_types?.join(', ') || 'all'}\n`;
  output += dry_run ? `[INFO] DRY RUN MODE - No files will be deleted\n\n` : `[WARNING] LIVE MODE - Files will be permanently deleted\n\n`;
  
  output += `[INFO] Scanning for files...\n`;
  output += `[INFO] Found 1,245 matching files (8.5GB)\n\n`;
  
  if (file_types?.includes('log')) {
    output += `[INFO] Processing log files...\n`;
    output += `[INFO] Found 863 log files (5.2GB)\n`;
    if (!dry_run) output += `[SUCCESS] Deleted 863 log files (5.2GB)\n\n`;
    else output += `[INFO] Would delete 863 log files (5.2GB)\n\n`;
  }
  
  if (file_types?.includes('tmp')) {
    output += `[INFO] Processing temporary files...\n`;
    output += `[INFO] Found 215 temporary files (1.8GB)\n`;
    if (!dry_run) output += `[SUCCESS] Deleted 215 temporary files (1.8GB)\n\n`;
    else output += `[INFO] Would delete 215 temporary files (1.8GB)\n\n`;
  }
  
  if (file_types?.includes('bak')) {
    output += `[INFO] Processing backup files...\n`;
    output += `[INFO] Found 42 backup files (1.2GB)\n`;
    if (!dry_run) output += `[SUCCESS] Deleted 42 backup files (1.2GB)\n\n`;
    else output += `[INFO] Would delete 42 backup files (1.2GB)\n\n`;
  }
  
  if (file_types?.includes('cache')) {
    output += `[INFO] Processing cache files...\n`;
    output += `[INFO] Found 125 cache files (0.3GB)\n`;
    if (!dry_run) output += `[SUCCESS] Deleted 125 cache files (0.3GB)\n\n`;
    else output += `[INFO] Would delete 125 cache files (0.3GB)\n\n`;
  }
  
  output += dry_run 
    ? `[SUCCESS] Dry run completed. Would free 8.5GB of space if executed\n`
    : `[SUCCESS] Cleanup completed. Freed 8.5GB of disk space\n`;
  
  return output;
}

function generateServiceStatusOutput(payload: Record<string, any>): string {
  let output = '';
  const { hostname, service_name } = payload;
  
  output += `[INFO] Connecting to ${hostname}...\n`;
  output += `[INFO] Checking status of service '${service_name}'...\n\n`;
  
  const statuses = ['active (running)', 'inactive (dead)', 'active (exited)', 'failed'];
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
  
  output += `[INFO] ● ${service_name}.service - ${service_name} Service\n`;
  output += `[INFO]    Loaded: loaded (/lib/systemd/system/${service_name}.service; enabled; vendor preset: enabled)\n`;
  output += `[INFO]    Active: ${randomStatus} since ${new Date().toISOString()}\n`;
  
  if (randomStatus === 'active (running)') {
    output += `[INFO]  Process: 1234 ExecStart=/usr/bin/${service_name} --config /etc/${service_name}/config.yml\n`;
    output += `[INFO]    Memory: 125.6M (limit: 500.0M)\n`;
    output += `[INFO]      CPU: 2.5%\n\n`;
    output += `[SUCCESS] Service is running normally\n`;
  } else if (randomStatus === 'failed') {
    output += `[ERROR] Process: 1234 ExecStart=/usr/bin/${service_name} --config /etc/${service_name}/config.yml\n`;
    output += `[ERROR] Exit Code: 1\n\n`;
    output += `[ERROR] Service has failed\n`;
  } else {
    output += `[WARNING] Service is not running\n`;
  }
  
  return output;
}

function generateServiceActionOutput(payload: Record<string, any>): string {
  let output = '';
  const { hostname, service_name, action } = payload;
  
  output += `[INFO] Connecting to ${hostname}...\n`;
  output += `[INFO] Executing '${action}' on service '${service_name}'...\n\n`;
  
  output += `[INFO] Executing: systemctl ${action} ${service_name}\n`;
  
  if (action === 'start') {
    output += `[INFO] Starting ${service_name}.service...\n`;
    output += `[SUCCESS] Started ${service_name}.service\n\n`;
    output += `[INFO] ● ${service_name}.service - ${service_name} Service\n`;
    output += `[INFO]    Active: active (running) since ${new Date().toISOString()}\n`;
    output += `[INFO]    Process: 1234 ExecStart=/usr/bin/${service_name}\n`;
    output += `[SUCCESS] Service started successfully\n`;
  } else if (action === 'stop') {
    output += `[INFO] Stopping ${service_name}.service...\n`;
    output += `[SUCCESS] Stopped ${service_name}.service\n\n`;
    output += `[INFO] ● ${service_name}.service - ${service_name} Service\n`;
    output += `[INFO]    Active: inactive (dead) since ${new Date().toISOString()}\n`;
    output += `[SUCCESS] Service stopped successfully\n`;
  } else if (action === 'restart') {
    output += `[INFO] Stopping ${service_name}.service...\n`;
    output += `[INFO] Stopped ${service_name}.service\n`;
    output += `[INFO] Starting ${service_name}.service...\n`;
    output += `[SUCCESS] Started ${service_name}.service\n\n`;
    output += `[INFO] ● ${service_name}.service - ${service_name} Service\n`;
    output += `[INFO]    Active: active (running) since ${new Date().toISOString()}\n`;
    output += `[INFO]    Process: 1235 ExecStart=/usr/bin/${service_name}\n`;
    output += `[SUCCESS] Service restarted successfully\n`;
  }
  
  return output;
}

function generateSecurityScanOutput(payload: Record<string, any>): string {
  let output = '';
  const { target, scan_type, scan_options } = payload;
  
  output += `[INFO] Initializing ${scan_type} security scan on target: ${target}\n`;
  output += scan_options?.length ? `[INFO] Scan options: ${scan_options.join(', ')}\n\n` : `[INFO] No additional scan options specified\n\n`;
  
  output += `[INFO] Phase 1: Host Discovery\n`;
  output += `[INFO] Target is up and running\n`;
  output += `[INFO] MAC Address: 00:1A:2B:3C:4D:5E\n\n`;
  
  output += `[INFO] Phase 2: Port Scanning\n`;
  
  if (scan_type === 'quick') {
    output += `[INFO] Scanning top 100 ports...\n`;
    output += `[INFO] 22/tcp   open   ssh\n`;
    output += `[INFO] 80/tcp   open   http\n`;
    output += `[INFO] 443/tcp  open   https\n`;
    output += `[WARNING] 3389/tcp open   rdp     (Consider closing if not required)\n\n`;
  } else if (scan_type === 'full' || scan_type === 'port') {
    output += `[INFO] Scanning all 65535 ports (this may take some time)...\n`;
    output += `[INFO] 22/tcp     open   ssh\n`;
    output += `[INFO] 80/tcp     open   http\n`;
    output += `[INFO] 443/tcp    open   https\n`;
    output += `[INFO] 3306/tcp   open   mysql\n`;
    output += `[WARNING] 3389/tcp   open   rdp     (Consider closing if not required)\n`;
    output += `[WARNING] 5432/tcp   open   postgres\n`;
    output += `[WARNING] 8080/tcp   open   http-alt\n`;
    output += `[ERROR] 21/tcp     open   ftp     (Insecure protocol, recommend disabling)\n\n`;
  }
  
  if (scan_options?.includes('os')) {
    output += `[INFO] Phase 3: OS Detection\n`;
    output += `[INFO] OS: Linux 5.4.0 (Ubuntu 20.04 LTS)\n`;
    output += `[INFO] Confidence: 98%\n\n`;
  }
  
  if (scan_options?.includes('version')) {
    output += `[INFO] Phase 4: Service Version Detection\n`;
    output += `[INFO] 22/tcp: OpenSSH 8.2p1\n`;
    output += `[INFO] 80/tcp: nginx 1.18.0\n`;
    output += `[INFO] 443/tcp: nginx 1.18.0\n`;
    output += `[WARNING] OpenSSH 8.2p1 has known vulnerabilities\n\n`;
  }
  
  if (scan_type === 'vuln' || scan_options?.includes('script')) {
    output += `[INFO] Phase 5: Vulnerability Scanning\n`;
    output += `[INFO] Running vulnerability scripts...\n`;
    output += `[WARNING] CVE-2021-28041: OpenSSH 8.2p1 vulnerable to memory corruption\n`;
    output += `[WARNING] CVE-2021-44228: Log4j vulnerability detected in web service\n`;
    output += `[ERROR] CVE-2022-0778: Critical OpenSSL vulnerability detected\n\n`;
  }
  
  output += `[SUCCESS] Security scan completed\n`;
  output += `[INFO] Found 4 warnings and 2 critical issues\n`;
  
  return output;
}
