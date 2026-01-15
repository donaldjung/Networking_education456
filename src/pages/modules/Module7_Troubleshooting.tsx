import { Wrench, Search, Terminal, Activity, FileText, AlertCircle } from 'lucide-react';
import CodeBlock from '../../components/code/CodeBlock';
import FlowDiagram from '../../components/visualizations/FlowDiagram';

const troubleshootFlow = `flowchart TB
    Start[Identify Problem]
    Gather[Gather Information]
    Analyze[Analyze Data]
    Hypothesis[Form Hypothesis]
    Test[Test Solution]
    Verify{Fixed?}
    Document[Document Solution]
    Retry[Try Next Hypothesis]
    
    Start --> Gather
    Gather --> Analyze
    Analyze --> Hypothesis
    Hypothesis --> Test
    Test --> Verify
    Verify -->|Yes| Document
    Verify -->|No| Retry
    Retry --> Hypothesis`;

export default function Module7_Troubleshooting() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Header */}
      <header className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-net-cyan/10 rounded-xl flex items-center justify-center">
            <Wrench className="text-net-cyan" size={24} />
          </div>
          <div>
            <p className="text-net-orange font-mono text-sm">MODULE 7</p>
            <h1 className="text-3xl font-bold text-white">Troubleshooting & Best Practices</h1>
          </div>
        </div>
        <p className="text-gray-400 text-lg">
          Master network troubleshooting methodology, essential diagnostic tools, 
          packet analysis with Wireshark, and enterprise network design patterns.
        </p>
      </header>

      {/* Table of Contents */}
      <nav className="bg-net-terminal border border-net-green/20 rounded-xl p-6">
        <h2 className="text-net-cyan font-semibold mb-4">In This Module</h2>
        <ol className="space-y-2 text-gray-300">
          <li className="flex items-center gap-3">
            <span className="w-6 h-6 bg-net-cyan/20 rounded text-net-cyan text-sm flex items-center justify-center">1</span>
            Troubleshooting Methodology
          </li>
          <li className="flex items-center gap-3">
            <span className="w-6 h-6 bg-net-cyan/20 rounded text-net-cyan text-sm flex items-center justify-center">2</span>
            Essential Diagnostic Tools
          </li>
          <li className="flex items-center gap-3">
            <span className="w-6 h-6 bg-net-cyan/20 rounded text-net-cyan text-sm flex items-center justify-center">3</span>
            Wireshark Packet Analysis
          </li>
          <li className="flex items-center gap-3">
            <span className="w-6 h-6 bg-net-cyan/20 rounded text-net-cyan text-sm flex items-center justify-center">4</span>
            Network Monitoring with SNMP
          </li>
          <li className="flex items-center gap-3">
            <span className="w-6 h-6 bg-net-cyan/20 rounded text-net-cyan text-sm flex items-center justify-center">5</span>
            Documentation & Best Practices
          </li>
        </ol>
      </nav>

      {/* Section 1: Methodology */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-net-cyan flex items-center gap-2">
          <Search size={24} />
          1. Troubleshooting Methodology
        </h2>

        <p className="text-gray-300">
          A systematic approach to troubleshooting ensures efficient problem resolution 
          and prevents random changes that can create new issues.
        </p>

        <FlowDiagram chart={troubleshootFlow} title="Troubleshooting Process" />

        <div className="bg-net-terminal border border-net-green/20 rounded-xl p-6">
          <h4 className="text-net-green font-semibold mb-4">OSI Layer Approach</h4>
          <p className="text-gray-400 text-sm mb-4">
            Start from Layer 1 (Physical) and work up, or start from Layer 7 (Application) and work down:
          </p>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <span className="w-20 text-net-green font-mono">Layer 1</span>
              <span className="text-gray-300">Check cables, ports, link lights, power</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-20 text-net-green font-mono">Layer 2</span>
              <span className="text-gray-300">Verify MAC addresses, VLAN config, STP status</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-20 text-net-green font-mono">Layer 3</span>
              <span className="text-gray-300">Check IP config, routing, ping gateway</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-20 text-net-green font-mono">Layer 4</span>
              <span className="text-gray-300">Verify port connectivity, firewall rules</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-20 text-net-green font-mono">Layer 7</span>
              <span className="text-gray-300">Test application, DNS, authentication</span>
            </div>
          </div>
        </div>

        <div className="bg-net-orange/10 border border-net-orange/30 rounded-lg p-4">
          <h4 className="text-net-orange font-semibold mb-2">Key Questions to Ask</h4>
          <ul className="text-sm space-y-1 text-gray-300">
            <li>• What changed recently?</li>
            <li>• Is the issue affecting one user or many?</li>
            <li>• Can you reproduce the problem?</li>
            <li>• When did the problem start?</li>
            <li>• Has it ever worked before?</li>
          </ul>
        </div>
      </section>

      {/* Section 2: Diagnostic Tools */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-net-cyan flex items-center gap-2">
          <Terminal size={24} />
          2. Essential Diagnostic Tools
        </h2>

        <div className="space-y-4">
          <div className="bg-net-terminal border border-net-green/20 rounded-lg p-5">
            <h4 className="text-net-green font-semibold mb-2">ping</h4>
            <p className="text-gray-400 text-sm mb-3">Tests basic connectivity using ICMP echo requests</p>
            <CodeBlock
              code={`# Basic ping
ping google.com

# Ping with count
ping -c 4 192.168.1.1

# Continuous ping
ping -t 192.168.1.1    # Windows

# Ping with packet size
ping -s 1500 192.168.1.1

# Ping with timeout
ping -W 2 192.168.1.1`}
              title="ping Examples"
              language="bash"
              showLineNumbers={false}
            />
          </div>

          <div className="bg-net-terminal border border-net-cyan/20 rounded-lg p-5">
            <h4 className="text-net-cyan font-semibold mb-2">traceroute / tracert</h4>
            <p className="text-gray-400 text-sm mb-3">Shows the path packets take to reach destination</p>
            <CodeBlock
              code={`# Linux/macOS
traceroute google.com

# Windows
tracert google.com

# TCP traceroute (useful when ICMP blocked)
tcptraceroute google.com 443

# Show AS numbers
traceroute -A google.com`}
              title="traceroute Examples"
              language="bash"
              showLineNumbers={false}
            />
          </div>

          <div className="bg-net-terminal border border-net-orange/20 rounded-lg p-5">
            <h4 className="text-net-orange font-semibold mb-2">netstat / ss</h4>
            <p className="text-gray-400 text-sm mb-3">Shows network connections, routing tables, and statistics</p>
            <CodeBlock
              code={`# Show all connections
netstat -an

# Show listening ports
netstat -tuln
ss -tuln

# Show connections with process
netstat -tulnp
ss -tulnp

# Show routing table
netstat -rn

# Show statistics
netstat -s`}
              title="netstat/ss Examples"
              language="bash"
              showLineNumbers={false}
            />
          </div>

          <div className="bg-net-terminal border border-purple-500/20 rounded-lg p-5">
            <h4 className="text-purple-400 font-semibold mb-2">nslookup / dig</h4>
            <p className="text-gray-400 text-sm mb-3">DNS troubleshooting and query tools</p>
            <CodeBlock
              code={`# Basic lookup
nslookup google.com
dig google.com

# Query specific record type
dig google.com MX
nslookup -type=MX google.com

# Query specific DNS server
nslookup google.com 8.8.8.8
dig @8.8.8.8 google.com

# Reverse lookup
dig -x 8.8.8.8

# Trace DNS resolution
dig +trace google.com`}
              title="DNS Tools"
              language="bash"
              showLineNumbers={false}
            />
          </div>
        </div>
      </section>

      {/* Section 3: Wireshark */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-net-cyan flex items-center gap-2">
          <Activity size={24} />
          3. Wireshark Packet Analysis
        </h2>

        <p className="text-gray-300">
          <strong className="text-net-green">Wireshark</strong> is a powerful network protocol analyzer 
          that captures and inspects packets in real-time.
        </p>

        <div className="bg-net-terminal border border-net-green/20 rounded-xl p-6">
          <h4 className="text-net-green font-semibold mb-4">Common Display Filters</h4>
          <div className="space-y-2 text-sm font-mono">
            <div className="flex justify-between border-b border-net-green/20 pb-2">
              <span className="text-net-cyan">ip.addr == 192.168.1.1</span>
              <span className="text-gray-400">Traffic to/from IP</span>
            </div>
            <div className="flex justify-between border-b border-net-green/20 pb-2">
              <span className="text-net-cyan">tcp.port == 80</span>
              <span className="text-gray-400">HTTP traffic</span>
            </div>
            <div className="flex justify-between border-b border-net-green/20 pb-2">
              <span className="text-net-cyan">dns</span>
              <span className="text-gray-400">DNS queries only</span>
            </div>
            <div className="flex justify-between border-b border-net-green/20 pb-2">
              <span className="text-net-cyan">tcp.flags.syn == 1</span>
              <span className="text-gray-400">TCP SYN packets</span>
            </div>
            <div className="flex justify-between border-b border-net-green/20 pb-2">
              <span className="text-net-cyan">http.request</span>
              <span className="text-gray-400">HTTP requests</span>
            </div>
            <div className="flex justify-between border-b border-net-green/20 pb-2">
              <span className="text-net-cyan">tcp.analysis.retransmission</span>
              <span className="text-gray-400">Retransmissions</span>
            </div>
            <div className="flex justify-between">
              <span className="text-net-cyan">!(arp or icmp or dns)</span>
              <span className="text-gray-400">Exclude common protocols</span>
            </div>
          </div>
        </div>

        <CodeBlock
          code={`# Command-line capture with tcpdump
# Capture all traffic on eth0
tcpdump -i eth0 -w capture.pcap

# Capture HTTP traffic only
tcpdump -i eth0 port 80 -w http.pcap

# Capture with host filter
tcpdump -i eth0 host 192.168.1.100

# Read pcap file
tcpdump -r capture.pcap

# Capture with verbose output
tcpdump -i eth0 -vvv

# tshark (command-line Wireshark)
tshark -i eth0 -f "port 443"`}
          title="Packet Capture Commands"
          language="bash"
        />

        <div className="bg-net-orange/10 border border-net-orange/30 rounded-lg p-4">
          <h4 className="text-net-orange font-semibold mb-2">Analysis Tips</h4>
          <ul className="text-sm space-y-1 text-gray-300">
            <li>• Look for TCP retransmissions (indicates packet loss)</li>
            <li>• Check for RST packets (connection resets)</li>
            <li>• Analyze response times with Statistics → Flow Graph</li>
            <li>• Use "Follow TCP Stream" for full conversation</li>
            <li>• Check for duplicate ACKs (congestion indicator)</li>
          </ul>
        </div>
      </section>

      {/* Section 4: SNMP Monitoring */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-net-cyan flex items-center gap-2">
          <Activity size={24} />
          4. Network Monitoring with SNMP
        </h2>

        <p className="text-gray-300">
          <strong className="text-net-green">SNMP (Simple Network Management Protocol)</strong> enables 
          monitoring of network devices, collecting metrics like bandwidth, CPU, and error counts.
        </p>

        <div className="bg-net-terminal border border-net-green/20 rounded-xl overflow-hidden">
          <div className="grid grid-cols-3 bg-net-dark/50 px-4 py-2 border-b border-net-green/20">
            <span className="text-net-green font-semibold">Version</span>
            <span className="text-net-cyan font-semibold">Security</span>
            <span className="text-net-cyan font-semibold">Notes</span>
          </div>
          <div className="divide-y divide-net-green/10 text-sm">
            <div className="grid grid-cols-3 px-4 py-3">
              <span className="text-white">SNMPv1</span>
              <span className="text-red-400">Community string (plain text)</span>
              <span className="text-gray-400">Avoid in production</span>
            </div>
            <div className="grid grid-cols-3 px-4 py-3">
              <span className="text-white">SNMPv2c</span>
              <span className="text-yellow-400">Community string</span>
              <span className="text-gray-400">Better features, same security</span>
            </div>
            <div className="grid grid-cols-3 px-4 py-3">
              <span className="text-net-green">SNMPv3</span>
              <span className="text-green-400">Authentication + Encryption</span>
              <span className="text-gray-400">Recommended</span>
            </div>
          </div>
        </div>

        <CodeBlock
          code={`# SNMP walk - list all OIDs
snmpwalk -v2c -c public 192.168.1.1

# Get specific OID (sysUpTime)
snmpget -v2c -c public 192.168.1.1 1.3.6.1.2.1.1.3.0

# Get system description
snmpget -v2c -c public 192.168.1.1 sysDescr.0

# Interface statistics
snmpwalk -v2c -c public 192.168.1.1 ifTable

# SNMPv3 with authentication
snmpwalk -v3 -u admin -l authPriv -a SHA -A "authpass" \\
  -x AES -X "privpass" 192.168.1.1`}
          title="SNMP Commands"
          language="bash"
        />

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-net-terminal border border-net-cyan/20 rounded-lg p-4">
            <h4 className="text-net-cyan font-semibold mb-2">Common OIDs</h4>
            <ul className="text-sm space-y-1 text-gray-300 font-mono">
              <li>sysDescr - System description</li>
              <li>sysUpTime - Uptime</li>
              <li>ifInOctets - Bytes in</li>
              <li>ifOutOctets - Bytes out</li>
              <li>ifOperStatus - Interface status</li>
            </ul>
          </div>
          <div className="bg-net-terminal border border-net-green/20 rounded-lg p-4">
            <h4 className="text-net-green font-semibold mb-2">Monitoring Tools</h4>
            <ul className="text-sm space-y-1 text-gray-300">
              <li>• Nagios / Icinga</li>
              <li>• Zabbix</li>
              <li>• PRTG</li>
              <li>• LibreNMS</li>
              <li>• Prometheus + Grafana</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 5: Documentation */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-net-cyan flex items-center gap-2">
          <FileText size={24} />
          5. Documentation & Best Practices
        </h2>

        <p className="text-gray-300">
          Good documentation is essential for efficient troubleshooting and knowledge transfer.
        </p>

        <div className="bg-net-terminal border border-net-green/20 rounded-xl p-6">
          <h4 className="text-net-green font-semibold mb-4">Essential Network Documentation</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-net-green">•</span>
                <span className="text-gray-300">Network topology diagrams</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-net-green">•</span>
                <span className="text-gray-300">IP address management (IPAM)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-net-green">•</span>
                <span className="text-gray-300">VLAN assignments</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-net-green">•</span>
                <span className="text-gray-300">Device configurations (backup)</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-net-cyan">•</span>
                <span className="text-gray-300">Change management logs</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-net-cyan">•</span>
                <span className="text-gray-300">Incident response procedures</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-net-cyan">•</span>
                <span className="text-gray-300">Vendor contact information</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-net-cyan">•</span>
                <span className="text-gray-300">Password/credential management</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-net-terminal border border-net-orange/20 rounded-xl p-6">
          <h4 className="text-net-orange font-semibold mb-4">Network Design Best Practices</h4>
          <div className="space-y-3 text-sm">
            <div className="border-l-2 border-net-green pl-4">
              <p className="text-white font-semibold">Redundancy</p>
              <p className="text-gray-400">Dual uplinks, HSRP/VRRP for gateway, diverse paths</p>
            </div>
            <div className="border-l-2 border-net-cyan pl-4">
              <p className="text-white font-semibold">Scalability</p>
              <p className="text-gray-400">Modular design, proper subnetting, growth planning</p>
            </div>
            <div className="border-l-2 border-net-orange pl-4">
              <p className="text-white font-semibold">Security</p>
              <p className="text-gray-400">Defense in depth, segmentation, monitoring</p>
            </div>
            <div className="border-l-2 border-purple-500 pl-4">
              <p className="text-white font-semibold">Standardization</p>
              <p className="text-gray-400">Consistent naming, configuration templates, policies</p>
            </div>
          </div>
        </div>

        <div className="bg-net-green/10 border border-net-green/30 rounded-lg p-4">
          <h4 className="text-net-green font-semibold mb-2 flex items-center gap-2">
            <AlertCircle size={18} />
            Golden Rule of Troubleshooting
          </h4>
          <p className="text-gray-300 text-sm">
            "Only change one thing at a time." If you make multiple changes simultaneously, 
            you won't know which one fixed the problem—or which one made it worse.
          </p>
        </div>
      </section>

      {/* Summary */}
      <section className="bg-net-cyan/5 border border-net-cyan/20 rounded-xl p-6">
        <h3 className="text-net-cyan font-semibold mb-4">Key Takeaways</h3>
        <ul className="space-y-2 text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-net-cyan mt-1">•</span>
            Use a systematic troubleshooting methodology (OSI layer approach)
          </li>
          <li className="flex items-start gap-2">
            <span className="text-net-cyan mt-1">•</span>
            Master basic tools: ping, traceroute, netstat, nslookup
          </li>
          <li className="flex items-start gap-2">
            <span className="text-net-cyan mt-1">•</span>
            Wireshark is invaluable for deep packet analysis
          </li>
          <li className="flex items-start gap-2">
            <span className="text-net-cyan mt-1">•</span>
            Use SNMPv3 for secure network monitoring
          </li>
          <li className="flex items-start gap-2">
            <span className="text-net-cyan mt-1">•</span>
            Document everything—your future self will thank you
          </li>
        </ul>
      </section>
    </div>
  );
}
