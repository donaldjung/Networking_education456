import { useState } from 'react';
import { Play, Terminal, Calculator, RotateCcw, Copy, Check } from 'lucide-react';

type Tool = 'simulator' | 'subnet' | 'ip-validator';

interface SimulatorOutput {
  command: string;
  output: string;
  success: boolean;
}

export default function Playground() {
  const [activeTool, setActiveTool] = useState<Tool>('simulator');
  const [command, setCommand] = useState('');
  const [outputs, setOutputs] = useState<SimulatorOutput[]>([]);
  
  // Subnet calculator state
  const [subnetIP, setSubnetIP] = useState('192.168.1.0');
  const [subnetCIDR, setSubnetCIDR] = useState('24');
  const [subnetResult, setSubnetResult] = useState<Record<string, string> | null>(null);
  
  // IP validator state
  const [validateIP, setValidateIP] = useState('');
  const [ipValidResult, setIPValidResult] = useState<{ valid: boolean; details: string } | null>(null);
  
  const [copied, setCopied] = useState(false);

  const simulateCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    let output = '';
    let success = true;

    if (trimmedCmd.startsWith('ping ')) {
      const target = cmd.split(' ')[1] || 'unknown';
      output = `PING ${target} (${target === 'google.com' ? '142.250.185.206' : '192.168.1.1'}): 56 data bytes
64 bytes from ${target}: icmp_seq=0 ttl=117 time=12.4 ms
64 bytes from ${target}: icmp_seq=1 ttl=117 time=11.8 ms
64 bytes from ${target}: icmp_seq=2 ttl=117 time=12.1 ms
64 bytes from ${target}: icmp_seq=3 ttl=117 time=11.9 ms

--- ${target} ping statistics ---
4 packets transmitted, 4 packets received, 0.0% packet loss
round-trip min/avg/max/stddev = 11.8/12.1/12.4/0.2 ms`;
    } else if (trimmedCmd.startsWith('traceroute ') || trimmedCmd.startsWith('tracert ')) {
      const target = cmd.split(' ')[1] || 'unknown';
      output = `traceroute to ${target}, 30 hops max, 60 byte packets
 1  192.168.1.1 (192.168.1.1)  1.234 ms  1.123 ms  1.089 ms
 2  10.0.0.1 (10.0.0.1)  8.456 ms  8.234 ms  8.123 ms
 3  72.14.215.85 (72.14.215.85)  9.876 ms  9.654 ms  9.432 ms
 4  108.170.252.129 (108.170.252.129)  10.123 ms  10.234 ms  10.345 ms
 5  ${target === 'google.com' ? '142.250.185.206' : '8.8.8.8'} (${target})  11.234 ms  11.123 ms  11.345 ms`;
    } else if (trimmedCmd === 'ifconfig' || trimmedCmd === 'ip addr' || trimmedCmd === 'ip addr show') {
      output = `eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 192.168.1.100  netmask 255.255.255.0  broadcast 192.168.1.255
        inet6 fe80::1  prefixlen 64  scopeid 0x20<link>
        ether 00:1a:2b:3c:4d:5e  txqueuelen 1000  (Ethernet)
        RX packets 12345678  bytes 9876543210 (9.2 GiB)
        TX packets 8765432  bytes 1234567890 (1.1 GiB)

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        inet6 ::1  prefixlen 128  scopeid 0x10<host>`;
    } else if (trimmedCmd === 'netstat -rn' || trimmedCmd === 'ip route' || trimmedCmd === 'route -n') {
      output = `Kernel IP routing table
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
0.0.0.0         192.168.1.1     0.0.0.0         UG    100    0        0 eth0
192.168.1.0     0.0.0.0         255.255.255.0   U     100    0        0 eth0
172.17.0.0      0.0.0.0         255.255.0.0     U     0      0        0 docker0`;
    } else if (trimmedCmd.startsWith('nslookup ')) {
      const domain = cmd.split(' ')[1] || 'example.com';
      output = `Server:		8.8.8.8
Address:	8.8.8.8#53

Non-authoritative answer:
Name:	${domain}
Address: ${domain === 'google.com' ? '142.250.185.206' : '93.184.216.34'}
Name:	${domain}
Address: ${domain === 'google.com' ? '2607:f8b0:4004:800::200e' : '2606:2800:220:1:248:1893:25c8:1946'}`;
    } else if (trimmedCmd === 'arp -a') {
      output = `? (192.168.1.1) at 00:11:22:33:44:55 [ether] on eth0
? (192.168.1.100) at 00:1a:2b:3c:4d:5e [ether] on eth0
? (192.168.1.50) at aa:bb:cc:dd:ee:ff [ether] on eth0`;
    } else if (trimmedCmd === 'netstat -tuln' || trimmedCmd === 'ss -tuln') {
      output = `Netid State  Recv-Q Send-Q Local Address:Port  Peer Address:Port
tcp   LISTEN 0      128    0.0.0.0:22           0.0.0.0:*
tcp   LISTEN 0      128    0.0.0.0:80           0.0.0.0:*
tcp   LISTEN 0      128    0.0.0.0:443          0.0.0.0:*
udp   UNCONN 0      0      0.0.0.0:53           0.0.0.0:*
udp   UNCONN 0      0      0.0.0.0:68           0.0.0.0:*`;
    } else if (trimmedCmd === 'whoami') {
      output = 'network-admin';
    } else if (trimmedCmd === 'hostname') {
      output = 'network-education-lab';
    } else if (trimmedCmd === 'date') {
      output = new Date().toString();
    } else if (trimmedCmd === 'help') {
      output = `Available commands:
  ping <host>       - Test connectivity
  traceroute <host> - Trace route to host
  tracert <host>    - Trace route (Windows style)
  nslookup <domain> - DNS lookup
  ifconfig          - Show network interfaces
  ip addr           - Show IP addresses
  ip route          - Show routing table
  netstat -rn       - Show routing table
  netstat -tuln     - Show listening ports
  ss -tuln          - Show listening ports
  arp -a            - Show ARP table
  hostname          - Show hostname
  whoami            - Show current user
  clear             - Clear screen`;
    } else if (trimmedCmd === 'clear') {
      setOutputs([]);
      return;
    } else {
      output = `Command not found: ${cmd}\nType 'help' for available commands.`;
      success = false;
    }

    setOutputs(prev => [...prev, { command: cmd, output, success }]);
    setCommand('');
  };

  const calculateSubnet = () => {
    const cidr = parseInt(subnetCIDR);
    if (cidr < 0 || cidr > 32) {
      setSubnetResult({ error: 'CIDR must be between 0 and 32' });
      return;
    }

    const octets = subnetIP.split('.').map(Number);
    if (octets.length !== 4 || octets.some(o => isNaN(o) || o < 0 || o > 255)) {
      setSubnetResult({ error: 'Invalid IP address' });
      return;
    }

    const totalHosts = Math.pow(2, 32 - cidr);
    const usableHosts = cidr >= 31 ? (cidr === 32 ? 1 : 2) : totalHosts - 2;
    
    // Calculate subnet mask
    const maskBits = '1'.repeat(cidr).padEnd(32, '0');
    const subnetMask = [
      parseInt(maskBits.slice(0, 8), 2),
      parseInt(maskBits.slice(8, 16), 2),
      parseInt(maskBits.slice(16, 24), 2),
      parseInt(maskBits.slice(24, 32), 2),
    ].join('.');

    // Calculate network address
    const ipBinary = octets.map(o => o.toString(2).padStart(8, '0')).join('');
    const networkBinary = ipBinary.slice(0, cidr).padEnd(32, '0');
    const networkAddress = [
      parseInt(networkBinary.slice(0, 8), 2),
      parseInt(networkBinary.slice(8, 16), 2),
      parseInt(networkBinary.slice(16, 24), 2),
      parseInt(networkBinary.slice(24, 32), 2),
    ].join('.');

    // Calculate broadcast
    const broadcastBinary = ipBinary.slice(0, cidr).padEnd(32, '1');
    const broadcastAddress = [
      parseInt(broadcastBinary.slice(0, 8), 2),
      parseInt(broadcastBinary.slice(8, 16), 2),
      parseInt(broadcastBinary.slice(16, 24), 2),
      parseInt(broadcastBinary.slice(24, 32), 2),
    ].join('.');

    // First and last usable
    const firstUsable = networkAddress.split('.').map((o, i) => 
      i === 3 ? parseInt(o) + 1 : parseInt(o)
    ).join('.');
    
    const lastUsable = broadcastAddress.split('.').map((o, i) => 
      i === 3 ? parseInt(o) - 1 : parseInt(o)
    ).join('.');

    setSubnetResult({
      'Network Address': networkAddress,
      'Subnet Mask': subnetMask,
      'First Usable Host': firstUsable,
      'Last Usable Host': lastUsable,
      'Broadcast Address': broadcastAddress,
      'Total Hosts': totalHosts.toLocaleString(),
      'Usable Hosts': usableHosts.toLocaleString(),
    });
  };

  const validateIPAddress = () => {
    const ip = validateIP.trim();
    
    // IPv4 validation
    const ipv4Regex = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
    const ipv4Match = ip.match(ipv4Regex);
    
    if (ipv4Match) {
      const octets = ipv4Match.slice(1).map(Number);
      const valid = octets.every(o => o >= 0 && o <= 255);
      
      if (valid) {
        let ipClass = '';
        let ipType = '';
        
        if (octets[0] >= 1 && octets[0] <= 126) {
          ipClass = 'Class A';
        } else if (octets[0] >= 128 && octets[0] <= 191) {
          ipClass = 'Class B';
        } else if (octets[0] >= 192 && octets[0] <= 223) {
          ipClass = 'Class C';
        } else if (octets[0] >= 224 && octets[0] <= 239) {
          ipClass = 'Class D (Multicast)';
        } else if (octets[0] >= 240 && octets[0] <= 255) {
          ipClass = 'Class E (Reserved)';
        }
        
        // Check for private ranges
        if (octets[0] === 10) {
          ipType = 'Private (10.0.0.0/8)';
        } else if (octets[0] === 172 && octets[1] >= 16 && octets[1] <= 31) {
          ipType = 'Private (172.16.0.0/12)';
        } else if (octets[0] === 192 && octets[1] === 168) {
          ipType = 'Private (192.168.0.0/16)';
        } else if (octets[0] === 127) {
          ipType = 'Loopback';
        } else if (octets[0] === 169 && octets[1] === 254) {
          ipType = 'Link-local (APIPA)';
        } else {
          ipType = 'Public';
        }
        
        setIPValidResult({
          valid: true,
          details: `Valid IPv4 address\nClass: ${ipClass}\nType: ${ipType}\nBinary: ${octets.map(o => o.toString(2).padStart(8, '0')).join('.')}`
        });
      } else {
        setIPValidResult({
          valid: false,
          details: 'Invalid: Octets must be between 0 and 255'
        });
      }
    } else {
      setIPValidResult({
        valid: false,
        details: 'Invalid format. Expected: xxx.xxx.xxx.xxx'
      });
    }
  };

  const copyOutput = async () => {
    const text = outputs.map(o => `$ ${o.command}\n${o.output}`).join('\n\n');
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <header className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-net-green/10 rounded-xl flex items-center justify-center">
            <Terminal className="text-net-green" size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Network Playground</h1>
            <p className="text-gray-400">Practice network commands and calculations</p>
          </div>
        </div>
      </header>

      {/* Tool Selector */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTool('simulator')}
          className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
            activeTool === 'simulator'
              ? 'bg-net-green text-black'
              : 'bg-net-terminal border border-net-green/20 text-gray-400 hover:text-net-green'
          }`}
        >
          <Terminal size={18} />
          Command Simulator
        </button>
        <button
          onClick={() => setActiveTool('subnet')}
          className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
            activeTool === 'subnet'
              ? 'bg-net-cyan text-black'
              : 'bg-net-terminal border border-net-cyan/20 text-gray-400 hover:text-net-cyan'
          }`}
        >
          <Calculator size={18} />
          Subnet Calculator
        </button>
        <button
          onClick={() => setActiveTool('ip-validator')}
          className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
            activeTool === 'ip-validator'
              ? 'bg-net-orange text-black'
              : 'bg-net-terminal border border-net-orange/20 text-gray-400 hover:text-net-orange'
          }`}
        >
          <Check size={18} />
          IP Validator
        </button>
      </div>

      {/* Command Simulator */}
      {activeTool === 'simulator' && (
        <div className="terminal-window">
          <div className="terminal-header">
            <div className="terminal-dot bg-red-500" />
            <div className="terminal-dot bg-yellow-500" />
            <div className="terminal-dot bg-green-500" />
            <span className="ml-3 text-gray-400 text-sm font-mono flex-1">
              network-simulator — bash
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setOutputs([])}
                className="p-1.5 text-gray-400 hover:text-net-green hover:bg-net-green/10 rounded transition-all"
                title="Clear"
              >
                <RotateCcw size={14} />
              </button>
              <button
                onClick={copyOutput}
                className="p-1.5 text-gray-400 hover:text-net-green hover:bg-net-green/10 rounded transition-all"
                title="Copy output"
              >
                {copied ? <Check size={14} className="text-net-green" /> : <Copy size={14} />}
              </button>
            </div>
          </div>

          <div className="p-4 h-96 overflow-y-auto font-mono text-sm">
            {outputs.map((item, index) => (
              <div key={index} className="mb-4">
                <div className="flex items-center gap-2 text-net-green">
                  <span>$</span>
                  <span>{item.command}</span>
                </div>
                <pre className={`mt-1 whitespace-pre-wrap ${item.success ? 'text-gray-300' : 'text-red-400'}`}>
                  {item.output}
                </pre>
              </div>
            ))}
            <div className="flex items-center gap-2">
              <span className="text-net-green">$</span>
              <input
                type="text"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && command.trim()) {
                    simulateCommand(command);
                  }
                }}
                className="flex-1 bg-transparent text-gray-200 outline-none"
                placeholder="Type a command... (try 'help')"
                autoFocus
              />
            </div>
          </div>
        </div>
      )}

      {/* Subnet Calculator */}
      {activeTool === 'subnet' && (
        <div className="bg-net-terminal border border-net-cyan/20 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-net-cyan mb-6">Subnet Calculator</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">IP Address</label>
                <input
                  type="text"
                  value={subnetIP}
                  onChange={(e) => setSubnetIP(e.target.value)}
                  className="w-full px-4 py-2 bg-net-dark border border-net-cyan/30 rounded-lg text-white font-mono focus:outline-none focus:border-net-cyan"
                  placeholder="192.168.1.0"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">CIDR Prefix (/{subnetCIDR})</label>
                <input
                  type="range"
                  min="0"
                  max="32"
                  value={subnetCIDR}
                  onChange={(e) => setSubnetCIDR(e.target.value)}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>/0</span>
                  <span>/{subnetCIDR}</span>
                  <span>/32</span>
                </div>
              </div>
              <button
                onClick={calculateSubnet}
                className="w-full py-2 bg-net-cyan text-black font-semibold rounded-lg hover:bg-net-cyan/90 transition-all flex items-center justify-center gap-2"
              >
                <Play size={18} />
                Calculate
              </button>
            </div>

            <div className="bg-net-dark rounded-lg p-4">
              <h3 className="text-net-green font-semibold mb-3">Results</h3>
              {subnetResult ? (
                subnetResult.error ? (
                  <p className="text-red-400">{subnetResult.error}</p>
                ) : (
                  <div className="space-y-2 text-sm">
                    {Object.entries(subnetResult).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-gray-400">{key}:</span>
                        <span className="text-white font-mono">{value}</span>
                      </div>
                    ))}
                  </div>
                )
              ) : (
                <p className="text-gray-500">Enter an IP and CIDR prefix, then click Calculate</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* IP Validator */}
      {activeTool === 'ip-validator' && (
        <div className="bg-net-terminal border border-net-orange/20 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-net-orange mb-6">IP Address Validator</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">IP Address</label>
                <input
                  type="text"
                  value={validateIP}
                  onChange={(e) => setValidateIP(e.target.value)}
                  className="w-full px-4 py-2 bg-net-dark border border-net-orange/30 rounded-lg text-white font-mono focus:outline-none focus:border-net-orange"
                  placeholder="192.168.1.100"
                />
              </div>
              <button
                onClick={validateIPAddress}
                className="w-full py-2 bg-net-orange text-black font-semibold rounded-lg hover:bg-net-orange/90 transition-all flex items-center justify-center gap-2"
              >
                <Check size={18} />
                Validate
              </button>
            </div>

            <div className="bg-net-dark rounded-lg p-4">
              <h3 className="text-net-green font-semibold mb-3">Results</h3>
              {ipValidResult ? (
                <div>
                  <div className={`flex items-center gap-2 mb-3 ${ipValidResult.valid ? 'text-green-400' : 'text-red-400'}`}>
                    {ipValidResult.valid ? <Check size={18} /> : <span>✗</span>}
                    <span>{ipValidResult.valid ? 'Valid' : 'Invalid'}</span>
                  </div>
                  <pre className="text-sm text-gray-300 whitespace-pre-wrap">{ipValidResult.details}</pre>
                </div>
              ) : (
                <p className="text-gray-500">Enter an IP address to validate</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Quick Reference */}
      <div className="bg-net-terminal border border-net-green/20 rounded-xl p-6">
        <h3 className="text-net-green font-semibold mb-4">Quick Command Reference</h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-gray-400 mb-2">Connectivity</p>
            <ul className="space-y-1 font-mono text-gray-300">
              <li>ping google.com</li>
              <li>traceroute 8.8.8.8</li>
            </ul>
          </div>
          <div>
            <p className="text-gray-400 mb-2">Network Info</p>
            <ul className="space-y-1 font-mono text-gray-300">
              <li>ifconfig</li>
              <li>ip route</li>
              <li>arp -a</li>
            </ul>
          </div>
          <div>
            <p className="text-gray-400 mb-2">DNS & Ports</p>
            <ul className="space-y-1 font-mono text-gray-300">
              <li>nslookup domain.com</li>
              <li>netstat -tuln</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
