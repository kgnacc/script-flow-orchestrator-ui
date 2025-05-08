
import { Catalog } from '../types/catalog';

export const catalogData: Catalog = {
  categories: [
    {
      id: 'network',
      name: 'Network Automation',
      children: [
        {
          id: 'monitoring',
          name: 'Monitoring',
          scripts: [
            {
              id: 'net-monitor-1',
              name: 'Network Status Check',
              description: 'Check the status of network devices',
              category: 'monitoring',
              actions: [
                {
                  id: 'check-status',
                  name: 'Check Status',
                  endpoint: '/api/network/status',
                  method: 'POST',
                  description: 'Check current status of network devices',
                  parameters: [
                    {
                      id: 'device_ip',
                      name: 'device_ip',
                      label: 'Device IP Address',
                      type: 'text',
                      required: true,
                      validation: {
                        pattern: '^\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}$',
                        errorMessage: 'Please enter a valid IP address'
                      }
                    },
                    {
                      id: 'timeout',
                      name: 'timeout',
                      label: 'Timeout (seconds)',
                      type: 'number',
                      required: false,
                      default: 5,
                      validation: {
                        min: 1,
                        max: 60,
                        errorMessage: 'Timeout must be between 1 and 60 seconds'
                      }
                    },
                    {
                      id: 'check_type',
                      name: 'check_type',
                      label: 'Check Type',
                      type: 'select',
                      required: true,
                      options: [
                        { label: 'Ping', value: 'ping' },
                        { label: 'TCP Port', value: 'tcp' },
                        { label: 'HTTP', value: 'http' }
                      ]
                    }
                  ]
                },
                {
                  id: 'run-diagnostics',
                  name: 'Run Diagnostics',
                  endpoint: '/api/network/diagnostics',
                  method: 'POST',
                  description: 'Run comprehensive diagnostics on network devices',
                  parameters: [
                    {
                      id: 'device_ip',
                      name: 'device_ip',
                      label: 'Device IP Address',
                      type: 'text',
                      required: true,
                      validation: {
                        pattern: '^\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}$',
                        errorMessage: 'Please enter a valid IP address'
                      }
                    },
                    {
                      id: 'diagnostic_level',
                      name: 'diagnostic_level',
                      label: 'Diagnostic Level',
                      type: 'select',
                      required: true,
                      options: [
                        { label: 'Basic', value: 'basic' },
                        { label: 'Advanced', value: 'advanced' },
                        { label: 'Comprehensive', value: 'comprehensive' }
                      ]
                    },
                    {
                      id: 'include_logs',
                      name: 'include_logs',
                      label: 'Include Logs',
                      type: 'boolean',
                      required: false,
                      default: true
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 'configuration',
          name: 'Configuration',
          scripts: [
            {
              id: 'net-config-1',
              name: 'Router Configuration',
              description: 'Configure network routers',
              category: 'configuration',
              actions: [
                {
                  id: 'update-config',
                  name: 'Update Configuration',
                  endpoint: '/api/network/config/update',
                  method: 'POST',
                  description: 'Update router configuration',
                  parameters: [
                    {
                      id: 'router_id',
                      name: 'router_id',
                      label: 'Router ID',
                      type: 'text',
                      required: true
                    },
                    {
                      id: 'config_file',
                      name: 'config_file',
                      label: 'Configuration Template',
                      type: 'select',
                      required: true,
                      options: [
                        { label: 'Default Template', value: 'default' },
                        { label: 'High Security', value: 'security' },
                        { label: 'High Performance', value: 'performance' }
                      ]
                    },
                    {
                      id: 'parameters',
                      name: 'parameters',
                      label: 'Configuration Parameters',
                      type: 'textarea',
                      required: false,
                      validation: {
                        minLength: 10,
                        errorMessage: 'Configuration must be at least 10 characters long'
                      }
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'system',
      name: 'System Administration',
      children: [
        {
          id: 'maintenance',
          name: 'Maintenance',
          scripts: [
            {
              id: 'sys-maint-1',
              name: 'Disk Cleanup',
              description: 'Clean up disk space on servers',
              category: 'maintenance',
              actions: [
                {
                  id: 'analyze-space',
                  name: 'Analyze Disk Space',
                  endpoint: '/api/system/disk/analyze',
                  method: 'POST',
                  description: 'Analyze disk space usage',
                  parameters: [
                    {
                      id: 'hostname',
                      name: 'hostname',
                      label: 'Host Name',
                      type: 'text',
                      required: true
                    },
                    {
                      id: 'path',
                      name: 'path',
                      label: 'Directory Path',
                      type: 'text',
                      required: false,
                      default: '/'
                    }
                  ]
                },
                {
                  id: 'cleanup',
                  name: 'Run Disk Cleanup',
                  endpoint: '/api/system/disk/cleanup',
                  method: 'POST',
                  description: 'Clean up disk space',
                  parameters: [
                    {
                      id: 'hostname',
                      name: 'hostname',
                      label: 'Host Name',
                      type: 'text',
                      required: true
                    },
                    {
                      id: 'path',
                      name: 'path',
                      label: 'Directory Path',
                      type: 'text',
                      required: true
                    },
                    {
                      id: 'older_than',
                      name: 'older_than',
                      label: 'Files Older Than (days)',
                      type: 'number',
                      required: false,
                      default: 30,
                      validation: {
                        min: 1,
                        max: 365,
                        errorMessage: 'Age must be between 1 and 365 days'
                      }
                    },
                    {
                      id: 'file_types',
                      name: 'file_types',
                      label: 'File Types to Remove',
                      type: 'multiselect',
                      required: false,
                      options: [
                        { label: 'Log Files', value: 'log' },
                        { label: 'Temporary Files', value: 'tmp' },
                        { label: 'Backup Files', value: 'bak' },
                        { label: 'Cache Files', value: 'cache' }
                      ]
                    },
                    {
                      id: 'dry_run',
                      name: 'dry_run',
                      label: 'Dry Run (No Deletion)',
                      type: 'boolean',
                      required: false,
                      default: true
                    }
                  ]
                }
              ]
            },
            {
              id: 'sys-maint-2',
              name: 'Service Management',
              description: 'Manage system services',
              category: 'maintenance',
              actions: [
                {
                  id: 'service-status',
                  name: 'Check Service Status',
                  endpoint: '/api/system/service/status',
                  method: 'POST',
                  description: 'Check the status of system services',
                  parameters: [
                    {
                      id: 'hostname',
                      name: 'hostname',
                      label: 'Host Name',
                      type: 'text',
                      required: true
                    },
                    {
                      id: 'service_name',
                      name: 'service_name',
                      label: 'Service Name',
                      type: 'text',
                      required: true
                    }
                  ]
                },
                {
                  id: 'service-action',
                  name: 'Service Action',
                  endpoint: '/api/system/service/action',
                  method: 'POST',
                  description: 'Perform action on system service',
                  parameters: [
                    {
                      id: 'hostname',
                      name: 'hostname',
                      label: 'Host Name',
                      type: 'text',
                      required: true
                    },
                    {
                      id: 'service_name',
                      name: 'service_name',
                      label: 'Service Name',
                      type: 'text',
                      required: true
                    },
                    {
                      id: 'action',
                      name: 'action',
                      label: 'Action',
                      type: 'select',
                      required: true,
                      options: [
                        { label: 'Start', value: 'start' },
                        { label: 'Stop', value: 'stop' },
                        { label: 'Restart', value: 'restart' }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'security',
      name: 'Security Operations',
      scripts: [
        {
          id: 'sec-scan-1',
          name: 'Security Scan',
          description: 'Scan systems for security vulnerabilities',
          category: 'security',
          actions: [
            {
              id: 'run-scan',
              name: 'Run Security Scan',
              endpoint: '/api/security/scan',
              method: 'POST',
              description: 'Execute a security vulnerability scan',
              parameters: [
                {
                  id: 'target',
                  name: 'target',
                  label: 'Target IP or Hostname',
                  type: 'text',
                  required: true
                },
                {
                  id: 'scan_type',
                  name: 'scan_type',
                  label: 'Scan Type',
                  type: 'select',
                  required: true,
                  options: [
                    { label: 'Quick Scan', value: 'quick' },
                    { label: 'Full Scan', value: 'full' },
                    { label: 'Port Scan', value: 'port' },
                    { label: 'Vulnerability Scan', value: 'vuln' }
                  ]
                },
                {
                  id: 'scan_options',
                  name: 'scan_options',
                  label: 'Scan Options',
                  type: 'multiselect',
                  required: false,
                  options: [
                    { label: 'OS Detection', value: 'os' },
                    { label: 'Service Version Detection', value: 'version' },
                    { label: 'Script Scan', value: 'script' },
                    { label: 'Fast Mode', value: 'fast' }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
