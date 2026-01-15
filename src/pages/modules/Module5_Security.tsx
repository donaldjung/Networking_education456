import { Shield, Lock, Key, AlertTriangle, Eye, Fingerprint } from 'lucide-react';
import CodeBlock from '../../components/code/CodeBlock';
import FlowDiagram from '../../components/visualizations/FlowDiagram';

const firewallDiagram = `flowchart LR
    Internet[Internet]
    FW[Firewall]
    DMZ[DMZ]
    LAN[Internal LAN]
    
    Internet -->|Filtered| FW
    FW -->|Port 80/443| DMZ
    FW -->|Trusted| LAN
    DMZ -.->|Limited| LAN`;

const vpnDiagram = `flowchart LR
    Remote[Remote User]
    Internet[Internet]
    VPN[VPN Gateway]
    Corporate[Corporate Network]
    
    Remote -->|Encrypted Tunnel| Internet
    Internet -->|IPSec/SSL| VPN
    VPN -->|Decrypted| Corporate`;

export default function Module5_Security() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Header */}
      <header className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-net-orange/10 rounded-xl flex items-center justify-center">
            <Shield className="text-net-orange" size={24} />
          </div>
          <div>
            <p className="text-net-orange font-mono text-sm">MODULE 5</p>
            <h1 className="text-3xl font-bold text-white">Network Security</h1>
          </div>
        </div>
        <p className="text-gray-400 text-lg">
          Learn essential network security concepts including firewalls, VPNs, IDS/IPS, 
          common attack types, and defense strategies.
        </p>
      </header>

      {/* Table of Contents */}
      <nav className="bg-net-terminal border border-net-orange/20 rounded-xl p-6">
        <h2 className="text-net-cyan font-semibold mb-4">In This Module</h2>
        <ol className="space-y-2 text-gray-300">
          <li className="flex items-center gap-3">
            <span className="w-6 h-6 bg-net-orange/20 rounded text-net-orange text-sm flex items-center justify-center">1</span>
            Firewall Types and Rules
          </li>
          <li className="flex items-center gap-3">
            <span className="w-6 h-6 bg-net-orange/20 rounded text-net-orange text-sm flex items-center justify-center">2</span>
            VPN Technologies
          </li>
          <li className="flex items-center gap-3">
            <span className="w-6 h-6 bg-net-orange/20 rounded text-net-orange text-sm flex items-center justify-center">3</span>
            IDS/IPS Systems
          </li>
          <li className="flex items-center gap-3">
            <span className="w-6 h-6 bg-net-orange/20 rounded text-net-orange text-sm flex items-center justify-center">4</span>
            Common Network Attacks
          </li>
          <li className="flex items-center gap-3">
            <span className="w-6 h-6 bg-net-orange/20 rounded text-net-orange text-sm flex items-center justify-center">5</span>
            Security Best Practices
          </li>
        </ol>
      </nav>

      {/* Section 1: Firewalls */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-net-cyan flex items-center gap-2">
          <Shield size={24} />
          1. Firewall Types and Rules
        </h2>

        <p className="text-gray-300">
          A <strong className="text-net-green">firewall</strong> monitors and controls incoming and 
          outgoing network traffic based on predetermined security rules. It acts as a barrier 
          between trusted and untrusted networks.
        </p>

        <FlowDiagram chart={firewallDiagram} title="Firewall Architecture with DMZ" />

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-net-terminal border border-net-green/20 rounded-lg p-5">
            <h4 className="text-net-green font-semibold mb-3">Packet Filtering</h4>
            <p className="text-gray-400 text-sm mb-2">Operates at Layer 3-4</p>
            <ul className="text-sm space-y-1 text-gray-300">
              <li>• Filters based on IP, port, protocol</li>
              <li>• Fast but limited inspection</li>
              <li>• Stateless or stateful</li>
            </ul>
          </div>

          <div className="bg-net-terminal border border-net-cyan/20 rounded-lg p-5">
            <h4 className="text-net-cyan font-semibold mb-3">Application Layer</h4>
            <p className="text-gray-400 text-sm mb-2">Operates at Layer 7</p>
            <ul className="text-sm space-y-1 text-gray-300">
              <li>• Deep packet inspection</li>
              <li>• Understands protocols (HTTP, FTP)</li>
              <li>• Can block specific content</li>
            </ul>
          </div>

          <div className="bg-net-terminal border border-net-orange/20 rounded-lg p-5">
            <h4 className="text-net-orange font-semibold mb-3">Stateful Inspection</h4>
            <p className="text-gray-400 text-sm mb-2">Tracks connection state</p>
            <ul className="text-sm space-y-1 text-gray-300">
              <li>• Maintains connection table</li>
              <li>• Allows return traffic automatically</li>
              <li>• More secure than stateless</li>
            </ul>
          </div>

          <div className="bg-net-terminal border border-purple-500/20 rounded-lg p-5">
            <h4 className="text-purple-400 font-semibold mb-3">Next-Gen Firewall (NGFW)</h4>
            <p className="text-gray-400 text-sm mb-2">All-in-one security</p>
            <ul className="text-sm space-y-1 text-gray-300">
              <li>• IPS integration</li>
              <li>• Application awareness</li>
              <li>• User identity awareness</li>
            </ul>
          </div>
        </div>

        <CodeBlock
          code={`# Linux iptables - Basic rules
# Allow established connections
iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# Allow SSH (port 22)
iptables -A INPUT -p tcp --dport 22 -j ACCEPT

# Allow HTTP/HTTPS
iptables -A INPUT -p tcp --dport 80 -j ACCEPT
iptables -A INPUT -p tcp --dport 443 -j ACCEPT

# Drop all other incoming traffic
iptables -A INPUT -j DROP

# View current rules
iptables -L -v -n

# Save rules
iptables-save > /etc/iptables.rules`}
          title="iptables Firewall Rules"
          language="bash"
        />
      </section>

      {/* Section 2: VPN */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-net-cyan flex items-center gap-2">
          <Lock size={24} />
          2. VPN Technologies
        </h2>

        <p className="text-gray-300">
          A <strong className="text-net-green">VPN (Virtual Private Network)</strong> creates an 
          encrypted tunnel over a public network, allowing secure remote access to private resources.
        </p>

        <FlowDiagram chart={vpnDiagram} title="VPN Encrypted Tunnel" />

        <div className="bg-net-terminal border border-net-green/20 rounded-xl overflow-hidden">
          <div className="grid grid-cols-3 bg-net-dark/50 px-4 py-2 border-b border-net-green/20">
            <span className="text-net-green font-semibold">VPN Type</span>
            <span className="text-net-cyan font-semibold">Protocol</span>
            <span className="text-net-cyan font-semibold">Use Case</span>
          </div>
          <div className="divide-y divide-net-green/10 text-sm">
            <div className="grid grid-cols-3 px-4 py-3">
              <span className="text-net-green">Site-to-Site</span>
              <span className="text-white">IPSec</span>
              <span className="text-gray-400">Connect office networks</span>
            </div>
            <div className="grid grid-cols-3 px-4 py-3">
              <span className="text-net-cyan">Remote Access</span>
              <span className="text-white">SSL/TLS</span>
              <span className="text-gray-400">Employee work-from-home</span>
            </div>
            <div className="grid grid-cols-3 px-4 py-3">
              <span className="text-net-orange">Client-to-Site</span>
              <span className="text-white">WireGuard</span>
              <span className="text-gray-400">Individual connections</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-net-terminal border border-net-cyan/20 rounded-lg p-4">
            <h4 className="text-net-cyan font-semibold mb-2">IPSec</h4>
            <ul className="text-sm space-y-1 text-gray-300">
              <li>• AH (Authentication Header)</li>
              <li>• ESP (Encapsulating Security Payload)</li>
              <li>• IKE for key exchange</li>
              <li>• Operates at Layer 3</li>
            </ul>
          </div>
          <div className="bg-net-terminal border border-net-green/20 rounded-lg p-4">
            <h4 className="text-net-green font-semibold mb-2">WireGuard</h4>
            <ul className="text-sm space-y-1 text-gray-300">
              <li>• Modern, fast protocol</li>
              <li>• Simple configuration</li>
              <li>• Uses ChaCha20 encryption</li>
              <li>• Built into Linux kernel</li>
            </ul>
          </div>
        </div>

        <CodeBlock
          code={`# OpenVPN - Connect to VPN
openvpn --config client.ovpn

# WireGuard - Bring up interface
wg-quick up wg0

# View WireGuard status
wg show

# IPSec status (strongSwan)
ipsec statusall

# Check VPN connection
ip route show table all | grep vpn`}
          title="VPN Commands"
          language="bash"
        />
      </section>

      {/* Section 3: IDS/IPS */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-net-cyan flex items-center gap-2">
          <Eye size={24} />
          3. IDS/IPS Systems
        </h2>

        <p className="text-gray-300">
          <strong className="text-net-green">IDS (Intrusion Detection System)</strong> monitors 
          network traffic for suspicious activity. <strong className="text-net-cyan">IPS 
          (Intrusion Prevention System)</strong> can also block detected threats.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-net-terminal border border-net-green/20 rounded-lg p-5">
            <h4 className="text-net-green font-semibold mb-3">IDS - Detection Only</h4>
            <ul className="text-sm space-y-2 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-net-green">✓</span>
                Monitors traffic passively
              </li>
              <li className="flex items-start gap-2">
                <span className="text-net-green">✓</span>
                Alerts on suspicious activity
              </li>
              <li className="flex items-start gap-2">
                <span className="text-net-green">✓</span>
                No network latency impact
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">✗</span>
                Cannot block attacks
              </li>
            </ul>
          </div>

          <div className="bg-net-terminal border border-net-orange/20 rounded-lg p-5">
            <h4 className="text-net-orange font-semibold mb-3">IPS - Prevention</h4>
            <ul className="text-sm space-y-2 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-net-orange">✓</span>
                Inline deployment
              </li>
              <li className="flex items-start gap-2">
                <span className="text-net-orange">✓</span>
                Can drop malicious packets
              </li>
              <li className="flex items-start gap-2">
                <span className="text-net-orange">✓</span>
                Real-time protection
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">✗</span>
                May add latency
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-net-terminal border border-net-cyan/20 rounded-lg p-4">
          <h4 className="text-net-cyan font-semibold mb-2">Detection Methods</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-white font-medium">Signature-Based</p>
              <p className="text-gray-400">Matches known attack patterns</p>
            </div>
            <div>
              <p className="text-white font-medium">Anomaly-Based</p>
              <p className="text-gray-400">Detects deviations from baseline</p>
            </div>
            <div>
              <p className="text-white font-medium">Heuristic</p>
              <p className="text-gray-400">Uses rules to identify suspicious behavior</p>
            </div>
            <div>
              <p className="text-white font-medium">Behavioral</p>
              <p className="text-gray-400">Learns normal behavior patterns</p>
            </div>
          </div>
        </div>

        <CodeBlock
          code={`# Snort IDS - Run in detection mode
snort -A console -q -c /etc/snort/snort.conf -i eth0

# View Snort alerts
tail -f /var/log/snort/alert

# Suricata IDS
suricata -c /etc/suricata/suricata.yaml -i eth0

# Update Snort rules
snort -T -c /etc/snort/snort.conf`}
          title="IDS Commands"
          language="bash"
        />
      </section>

      {/* Section 4: Common Attacks */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-net-cyan flex items-center gap-2">
          <AlertTriangle size={24} />
          4. Common Network Attacks
        </h2>

        <div className="space-y-4">
          <div className="bg-net-terminal border border-red-500/20 rounded-lg p-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="text-red-400" size={20} />
              </div>
              <div>
                <h4 className="text-red-400 font-semibold">DDoS (Distributed Denial of Service)</h4>
                <p className="text-gray-300 text-sm mt-1">
                  Overwhelms target with traffic from multiple sources, making services unavailable.
                </p>
                <p className="text-gray-500 text-xs mt-2">
                  Defense: Rate limiting, CDN, DDoS mitigation services
                </p>
              </div>
            </div>
          </div>

          <div className="bg-net-terminal border border-net-orange/20 rounded-lg p-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-net-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Eye className="text-net-orange" size={20} />
              </div>
              <div>
                <h4 className="text-net-orange font-semibold">Man-in-the-Middle (MITM)</h4>
                <p className="text-gray-300 text-sm mt-1">
                  Attacker intercepts communication between two parties to eavesdrop or modify data.
                </p>
                <p className="text-gray-500 text-xs mt-2">
                  Defense: TLS/SSL encryption, certificate pinning, VPN
                </p>
              </div>
            </div>
          </div>

          <div className="bg-net-terminal border border-yellow-500/20 rounded-lg p-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Fingerprint className="text-yellow-400" size={20} />
              </div>
              <div>
                <h4 className="text-yellow-400 font-semibold">ARP Spoofing</h4>
                <p className="text-gray-300 text-sm mt-1">
                  Sends fake ARP messages to associate attacker's MAC with legitimate IP addresses.
                </p>
                <p className="text-gray-500 text-xs mt-2">
                  Defense: Static ARP entries, Dynamic ARP Inspection (DAI), 802.1X
                </p>
              </div>
            </div>
          </div>

          <div className="bg-net-terminal border border-purple-500/20 rounded-lg p-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Key className="text-purple-400" size={20} />
              </div>
              <div>
                <h4 className="text-purple-400 font-semibold">DNS Spoofing/Poisoning</h4>
                <p className="text-gray-300 text-sm mt-1">
                  Corrupts DNS cache to redirect users to malicious websites.
                </p>
                <p className="text-gray-500 text-xs mt-2">
                  Defense: DNSSEC, DNS over HTTPS (DoH), secure DNS servers
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Best Practices */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-net-cyan flex items-center gap-2">
          <Key size={24} />
          5. Security Best Practices
        </h2>

        <div className="bg-net-terminal border border-net-green/20 rounded-xl p-6">
          <h4 className="text-net-green font-semibold mb-4">Defense in Depth</h4>
          <ol className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-net-green/20 rounded-full text-net-green flex items-center justify-center flex-shrink-0">1</span>
              <div>
                <span className="text-white font-semibold">Network Segmentation</span>
                <p className="text-gray-400">Use VLANs and firewalls to separate sensitive systems</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-net-green/20 rounded-full text-net-green flex items-center justify-center flex-shrink-0">2</span>
              <div>
                <span className="text-white font-semibold">Principle of Least Privilege</span>
                <p className="text-gray-400">Grant minimum access necessary for each user/system</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-net-green/20 rounded-full text-net-green flex items-center justify-center flex-shrink-0">3</span>
              <div>
                <span className="text-white font-semibold">Regular Updates</span>
                <p className="text-gray-400">Keep all systems and firmware patched</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-net-green/20 rounded-full text-net-green flex items-center justify-center flex-shrink-0">4</span>
              <div>
                <span className="text-white font-semibold">Monitoring & Logging</span>
                <p className="text-gray-400">Implement SIEM, log analysis, and alerting</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-net-green/20 rounded-full text-net-green flex items-center justify-center flex-shrink-0">5</span>
              <div>
                <span className="text-white font-semibold">Encryption</span>
                <p className="text-gray-400">Encrypt data at rest and in transit</p>
              </div>
            </li>
          </ol>
        </div>

        <CodeBlock
          code={`# Check for open ports
nmap -sV -sC target.com

# Verify SSL/TLS configuration
nmap --script ssl-enum-ciphers -p 443 target.com

# Check password strength
fail2ban-client status

# Monitor authentication logs
tail -f /var/log/auth.log

# Audit firewall rules
iptables -L -v -n --line-numbers`}
          title="Security Audit Commands"
          language="bash"
        />
      </section>

      {/* Summary */}
      <section className="bg-net-orange/5 border border-net-orange/20 rounded-xl p-6">
        <h3 className="text-net-orange font-semibold mb-4">Key Takeaways</h3>
        <ul className="space-y-2 text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-net-orange mt-1">•</span>
            Firewalls control traffic; NGFWs add application awareness and IPS
          </li>
          <li className="flex items-start gap-2">
            <span className="text-net-orange mt-1">•</span>
            VPNs create encrypted tunnels; use IPSec for site-to-site, WireGuard for client
          </li>
          <li className="flex items-start gap-2">
            <span className="text-net-orange mt-1">•</span>
            IDS detects threats; IPS can block them inline
          </li>
          <li className="flex items-start gap-2">
            <span className="text-net-orange mt-1">•</span>
            Defense in depth: multiple layers of security controls
          </li>
        </ul>
      </section>
    </div>
  );
}
