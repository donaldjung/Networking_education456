import { FileText, Repeat, Globe, Server, Lock, Mail } from 'lucide-react';
import CodeBlock from '../../components/code/CodeBlock';
import FlowDiagram from '../../components/visualizations/FlowDiagram';

const dnsProcess = `flowchart LR
    Client[Client]
    Resolver[DNS Resolver]
    Root[Root DNS]
    TLD[TLD DNS]
    Auth[Authoritative DNS]
    
    Client -->|1. Query| Resolver
    Resolver -->|2. Query| Root
    Root -->|3. Refer to .com| Resolver
    Resolver -->|4. Query| TLD
    TLD -->|5. Refer to NS| Resolver
    Resolver -->|6. Query| Auth
    Auth -->|7. IP Address| Resolver
    Resolver -->|8. Response| Client`;

export default function Module4_Protocols() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Header */}
      <header className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-net-cyan/10 rounded-xl flex items-center justify-center">
            <FileText className="text-net-cyan" size={24} />
          </div>
          <div>
            <p className="text-net-orange font-mono text-sm">MODULE 4</p>
            <h1 className="text-3xl font-bold text-white">Network Protocols</h1>
          </div>
        </div>
        <p className="text-gray-400 text-lg">
          Deep dive into essential network protocols: TCP vs UDP, DNS resolution, 
          DHCP lease process, HTTP/HTTPS, and common application layer protocols.
        </p>
      </header>

      {/* Table of Contents */}
      <nav className="bg-net-terminal border border-net-green/20 rounded-xl p-6">
        <h2 className="text-net-cyan font-semibold mb-4">In This Module</h2>
        <ol className="space-y-2 text-gray-300">
          <li className="flex items-center gap-3">
            <span className="w-6 h-6 bg-net-cyan/20 rounded text-net-cyan text-sm flex items-center justify-center">1</span>
            TCP vs UDP
          </li>
          <li className="flex items-center gap-3">
            <span className="w-6 h-6 bg-net-cyan/20 rounded text-net-cyan text-sm flex items-center justify-center">2</span>
            DNS (Domain Name System)
          </li>
          <li className="flex items-center gap-3">
            <span className="w-6 h-6 bg-net-cyan/20 rounded text-net-cyan text-sm flex items-center justify-center">3</span>
            DHCP (Dynamic Host Configuration)
          </li>
          <li className="flex items-center gap-3">
            <span className="w-6 h-6 bg-net-cyan/20 rounded text-net-cyan text-sm flex items-center justify-center">4</span>
            HTTP/HTTPS and TLS
          </li>
          <li className="flex items-center gap-3">
            <span className="w-6 h-6 bg-net-cyan/20 rounded text-net-cyan text-sm flex items-center justify-center">5</span>
            Other Application Protocols
          </li>
        </ol>
      </nav>

      {/* Section 1: TCP vs UDP */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-net-cyan flex items-center gap-2">
          <Repeat size={24} />
          1. TCP vs UDP
        </h2>

        <p className="text-gray-300">
          <strong className="text-net-green">TCP (Transmission Control Protocol)</strong> and 
          <strong className="text-net-cyan"> UDP (User Datagram Protocol)</strong> are the two main 
          transport layer protocols, each suited for different applications.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-net-terminal border border-net-green/20 rounded-lg p-5">
            <h4 className="text-net-green font-semibold mb-3">TCP - Connection-Oriented</h4>
            <ul className="text-sm space-y-2 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-net-green">✓</span>
                Reliable delivery with acknowledgments
              </li>
              <li className="flex items-start gap-2">
                <span className="text-net-green">✓</span>
                In-order packet delivery
              </li>
              <li className="flex items-start gap-2">
                <span className="text-net-green">✓</span>
                Flow control and congestion control
              </li>
              <li className="flex items-start gap-2">
                <span className="text-net-green">✓</span>
                Error detection and retransmission
              </li>
            </ul>
            <p className="text-gray-500 text-xs mt-3">Use cases: HTTP, FTP, SSH, Email</p>
          </div>

          <div className="bg-net-terminal border border-net-cyan/20 rounded-lg p-5">
            <h4 className="text-net-cyan font-semibold mb-3">UDP - Connectionless</h4>
            <ul className="text-sm space-y-2 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-net-cyan">✓</span>
                Low latency, no handshake
              </li>
              <li className="flex items-start gap-2">
                <span className="text-net-cyan">✓</span>
                Minimal protocol overhead
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">✗</span>
                No guaranteed delivery
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">✗</span>
                No ordering guarantees
              </li>
            </ul>
            <p className="text-gray-500 text-xs mt-3">Use cases: DNS, VoIP, Gaming, Streaming</p>
          </div>
        </div>

        <div className="bg-net-terminal border border-net-green/20 rounded-xl p-6">
          <h4 className="text-net-green font-semibold mb-4">TCP Three-Way Handshake</h4>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-4">
              <span className="w-20 text-net-cyan font-mono">SYN</span>
              <span className="text-gray-300">Client initiates connection, sends sequence number</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-20 text-net-cyan font-mono">SYN-ACK</span>
              <span className="text-gray-300">Server acknowledges and sends its own sequence number</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-20 text-net-cyan font-mono">ACK</span>
              <span className="text-gray-300">Client acknowledges, connection established</span>
            </div>
          </div>
        </div>

        <CodeBlock
          code={`# View TCP connections
netstat -an | grep ESTABLISHED

# View TCP connection states
ss -tan

# Capture TCP handshake with tcpdump
tcpdump -i eth0 'tcp[tcpflags] & (tcp-syn|tcp-ack) != 0'

# Check open ports
netstat -tuln`}
          title="TCP/UDP Commands"
          language="bash"
        />
      </section>

      {/* Section 2: DNS */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-net-cyan flex items-center gap-2">
          <Globe size={24} />
          2. DNS (Domain Name System)
        </h2>

        <p className="text-gray-300">
          <strong className="text-net-green">DNS</strong> translates human-readable domain names 
          (like google.com) into IP addresses. It uses a hierarchical, distributed database.
        </p>

        <FlowDiagram chart={dnsProcess} title="DNS Resolution Process" />

        <div className="bg-net-terminal border border-net-green/20 rounded-xl overflow-hidden">
          <div className="grid grid-cols-3 bg-net-dark/50 px-4 py-2 border-b border-net-green/20">
            <span className="text-net-green font-semibold">Record Type</span>
            <span className="text-net-cyan font-semibold">Purpose</span>
            <span className="text-net-cyan font-semibold">Example</span>
          </div>
          <div className="divide-y divide-net-green/10 text-sm">
            <div className="grid grid-cols-3 px-4 py-3">
              <span className="text-net-green font-mono">A</span>
              <span className="text-gray-300">IPv4 address</span>
              <span className="text-gray-400 font-mono">192.168.1.1</span>
            </div>
            <div className="grid grid-cols-3 px-4 py-3">
              <span className="text-net-cyan font-mono">AAAA</span>
              <span className="text-gray-300">IPv6 address</span>
              <span className="text-gray-400 font-mono">2001:db8::1</span>
            </div>
            <div className="grid grid-cols-3 px-4 py-3">
              <span className="text-net-orange font-mono">CNAME</span>
              <span className="text-gray-300">Alias record</span>
              <span className="text-gray-400 font-mono">www → example.com</span>
            </div>
            <div className="grid grid-cols-3 px-4 py-3">
              <span className="text-purple-400 font-mono">MX</span>
              <span className="text-gray-300">Mail server</span>
              <span className="text-gray-400 font-mono">mail.example.com</span>
            </div>
            <div className="grid grid-cols-3 px-4 py-3">
              <span className="text-yellow-400 font-mono">NS</span>
              <span className="text-gray-300">Name server</span>
              <span className="text-gray-400 font-mono">ns1.example.com</span>
            </div>
            <div className="grid grid-cols-3 px-4 py-3">
              <span className="text-pink-400 font-mono">TXT</span>
              <span className="text-gray-300">Text record</span>
              <span className="text-gray-400 font-mono">SPF, DKIM records</span>
            </div>
          </div>
        </div>

        <CodeBlock
          code={`# Basic DNS lookup
nslookup google.com

# Detailed DNS query
dig google.com

# Query specific record type
dig google.com MX
dig google.com NS
dig google.com TXT

# Reverse DNS lookup
dig -x 8.8.8.8

# Use specific DNS server
nslookup google.com 8.8.8.8

# Clear DNS cache (Linux)
sudo systemd-resolve --flush-caches

# Clear DNS cache (macOS)
sudo dscacheutil -flushcache`}
          title="DNS Commands"
          language="bash"
        />
      </section>

      {/* Section 3: DHCP */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-net-cyan flex items-center gap-2">
          <Server size={24} />
          3. DHCP (Dynamic Host Configuration)
        </h2>

        <p className="text-gray-300">
          <strong className="text-net-green">DHCP</strong> automatically assigns IP addresses and 
          network configuration to devices on a network.
        </p>

        <div className="bg-net-terminal border border-net-green/20 rounded-xl p-6">
          <h4 className="text-net-green font-semibold mb-4">DORA Process</h4>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <span className="w-24 text-net-cyan font-mono font-bold">Discover</span>
              <span className="text-gray-300">Client broadcasts "I need an IP address"</span>
            </div>
            <div className="flex items-start gap-4">
              <span className="w-24 text-net-orange font-mono font-bold">Offer</span>
              <span className="text-gray-300">DHCP server offers an available IP address</span>
            </div>
            <div className="flex items-start gap-4">
              <span className="w-24 text-net-green font-mono font-bold">Request</span>
              <span className="text-gray-300">Client requests the offered IP address</span>
            </div>
            <div className="flex items-start gap-4">
              <span className="w-24 text-purple-400 font-mono font-bold">Acknowledge</span>
              <span className="text-gray-300">Server confirms the lease</span>
            </div>
          </div>
        </div>

        <div className="bg-net-orange/10 border border-net-orange/30 rounded-lg p-4">
          <h4 className="text-net-orange font-semibold mb-2">DHCP Provides</h4>
          <ul className="grid md:grid-cols-2 gap-2 text-sm text-gray-300">
            <li>• IP Address</li>
            <li>• Subnet Mask</li>
            <li>• Default Gateway</li>
            <li>• DNS Servers</li>
            <li>• Lease Duration</li>
            <li>• Domain Name</li>
          </ul>
        </div>

        <CodeBlock
          code={`# Release current DHCP lease (Linux)
sudo dhclient -r

# Request new DHCP lease
sudo dhclient

# View DHCP lease info (Linux)
cat /var/lib/dhcp/dhclient.leases

# Windows commands
ipconfig /release
ipconfig /renew

# View DHCP server on Cisco
show ip dhcp binding
show ip dhcp pool`}
          title="DHCP Commands"
          language="bash"
        />
      </section>

      {/* Section 4: HTTP/HTTPS */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-net-cyan flex items-center gap-2">
          <Lock size={24} />
          4. HTTP/HTTPS and TLS
        </h2>

        <p className="text-gray-300">
          <strong className="text-net-green">HTTP (Hypertext Transfer Protocol)</strong> is the foundation 
          of web communication. <strong className="text-net-cyan">HTTPS</strong> adds encryption via TLS.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-net-terminal border border-red-500/20 rounded-lg p-5">
            <h4 className="text-red-400 font-semibold mb-3">HTTP (Port 80)</h4>
            <ul className="text-sm space-y-1 text-gray-300">
              <li>• Plain text transmission</li>
              <li>• No encryption</li>
              <li>• Vulnerable to MITM attacks</li>
              <li>• Data can be intercepted</li>
            </ul>
          </div>

          <div className="bg-net-terminal border border-net-green/20 rounded-lg p-5">
            <h4 className="text-net-green font-semibold mb-3">HTTPS (Port 443)</h4>
            <ul className="text-sm space-y-1 text-gray-300">
              <li>• TLS/SSL encryption</li>
              <li>• Server authentication</li>
              <li>• Data integrity</li>
              <li>• Required for sensitive data</li>
            </ul>
          </div>
        </div>

        <div className="bg-net-terminal border border-net-cyan/20 rounded-xl overflow-hidden">
          <div className="grid grid-cols-3 bg-net-dark/50 px-4 py-2 border-b border-net-cyan/20">
            <span className="text-net-cyan font-semibold">HTTP Method</span>
            <span className="text-net-cyan font-semibold">Purpose</span>
            <span className="text-net-cyan font-semibold">Idempotent</span>
          </div>
          <div className="divide-y divide-net-cyan/10 text-sm">
            <div className="grid grid-cols-3 px-4 py-3">
              <span className="text-net-green font-mono">GET</span>
              <span className="text-gray-300">Retrieve resource</span>
              <span className="text-green-400">Yes</span>
            </div>
            <div className="grid grid-cols-3 px-4 py-3">
              <span className="text-net-orange font-mono">POST</span>
              <span className="text-gray-300">Submit data</span>
              <span className="text-red-400">No</span>
            </div>
            <div className="grid grid-cols-3 px-4 py-3">
              <span className="text-net-cyan font-mono">PUT</span>
              <span className="text-gray-300">Update/replace resource</span>
              <span className="text-green-400">Yes</span>
            </div>
            <div className="grid grid-cols-3 px-4 py-3">
              <span className="text-red-400 font-mono">DELETE</span>
              <span className="text-gray-300">Remove resource</span>
              <span className="text-green-400">Yes</span>
            </div>
          </div>
        </div>

        <CodeBlock
          code={`# Make HTTP request
curl http://example.com

# Make HTTPS request with verbose output
curl -v https://example.com

# View TLS certificate
openssl s_client -connect example.com:443

# Check certificate expiration
echo | openssl s_client -connect example.com:443 2>/dev/null | openssl x509 -noout -dates

# Test specific TLS version
curl --tlsv1.2 https://example.com`}
          title="HTTP/HTTPS Commands"
          language="bash"
        />
      </section>

      {/* Section 5: Other Protocols */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-net-cyan flex items-center gap-2">
          <Mail size={24} />
          5. Other Application Protocols
        </h2>

        <div className="bg-net-terminal border border-net-green/20 rounded-xl overflow-hidden">
          <div className="grid grid-cols-4 bg-net-dark/50 px-4 py-2 border-b border-net-green/20 text-sm">
            <span className="text-net-green font-semibold">Protocol</span>
            <span className="text-net-cyan font-semibold">Port</span>
            <span className="text-net-cyan font-semibold">Transport</span>
            <span className="text-net-cyan font-semibold">Purpose</span>
          </div>
          <div className="divide-y divide-net-green/10 text-sm">
            <div className="grid grid-cols-4 px-4 py-3">
              <span className="text-net-green font-mono">FTP</span>
              <span className="text-white">20, 21</span>
              <span className="text-gray-400">TCP</span>
              <span className="text-gray-400">File transfer</span>
            </div>
            <div className="grid grid-cols-4 px-4 py-3">
              <span className="text-net-cyan font-mono">SSH</span>
              <span className="text-white">22</span>
              <span className="text-gray-400">TCP</span>
              <span className="text-gray-400">Secure remote access</span>
            </div>
            <div className="grid grid-cols-4 px-4 py-3">
              <span className="text-net-orange font-mono">Telnet</span>
              <span className="text-white">23</span>
              <span className="text-gray-400">TCP</span>
              <span className="text-gray-400">Remote access (insecure)</span>
            </div>
            <div className="grid grid-cols-4 px-4 py-3">
              <span className="text-purple-400 font-mono">SMTP</span>
              <span className="text-white">25, 587</span>
              <span className="text-gray-400">TCP</span>
              <span className="text-gray-400">Send email</span>
            </div>
            <div className="grid grid-cols-4 px-4 py-3">
              <span className="text-yellow-400 font-mono">POP3</span>
              <span className="text-white">110, 995</span>
              <span className="text-gray-400">TCP</span>
              <span className="text-gray-400">Receive email</span>
            </div>
            <div className="grid grid-cols-4 px-4 py-3">
              <span className="text-pink-400 font-mono">IMAP</span>
              <span className="text-white">143, 993</span>
              <span className="text-gray-400">TCP</span>
              <span className="text-gray-400">Email access</span>
            </div>
            <div className="grid grid-cols-4 px-4 py-3">
              <span className="text-blue-400 font-mono">SNMP</span>
              <span className="text-white">161, 162</span>
              <span className="text-gray-400">UDP</span>
              <span className="text-gray-400">Network monitoring</span>
            </div>
            <div className="grid grid-cols-4 px-4 py-3">
              <span className="text-green-400 font-mono">NTP</span>
              <span className="text-white">123</span>
              <span className="text-gray-400">UDP</span>
              <span className="text-gray-400">Time synchronization</span>
            </div>
          </div>
        </div>

        <CodeBlock
          code={`# SSH into a server
ssh user@192.168.1.100

# SCP file transfer
scp file.txt user@server:/path/

# FTP connection
ftp server.example.com

# Test SMTP connection
telnet mail.example.com 25

# Check NTP sync status
ntpq -p

# SNMP query
snmpwalk -v2c -c public 192.168.1.1`}
          title="Protocol Commands"
          language="bash"
        />
      </section>

      {/* Summary */}
      <section className="bg-net-cyan/5 border border-net-cyan/20 rounded-xl p-6">
        <h3 className="text-net-cyan font-semibold mb-4">Key Takeaways</h3>
        <ul className="space-y-2 text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-net-cyan mt-1">•</span>
            TCP is reliable (handshake, ACKs); UDP is fast (no overhead)
          </li>
          <li className="flex items-start gap-2">
            <span className="text-net-cyan mt-1">•</span>
            DNS uses hierarchical resolution; learn common record types (A, CNAME, MX)
          </li>
          <li className="flex items-start gap-2">
            <span className="text-net-cyan mt-1">•</span>
            DHCP uses DORA process (Discover, Offer, Request, Acknowledge)
          </li>
          <li className="flex items-start gap-2">
            <span className="text-net-cyan mt-1">•</span>
            HTTPS (TLS) is essential for secure web communication
          </li>
        </ul>
      </section>
    </div>
  );
}
