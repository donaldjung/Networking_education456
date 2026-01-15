import { Wifi, Radio, Layers, Lock, Network } from 'lucide-react';
import CodeBlock from '../../components/code/CodeBlock';
import FlowDiagram from '../../components/visualizations/FlowDiagram';

const vlanDiagram = `flowchart TB
    subgraph Switch[Layer 2 Switch]
        VLAN10[VLAN 10: Sales]
        VLAN20[VLAN 20: Engineering]
        VLAN30[VLAN 30: Management]
    end
    
    Router[Layer 3 Router]
    
    VLAN10 --> Router
    VLAN20 --> Router
    VLAN30 --> Router
    
    PC1[PC1] --> VLAN10
    PC2[PC2] --> VLAN10
    PC3[PC3] --> VLAN20
    PC4[PC4] --> VLAN30`;

export default function Module6_Wireless() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Header */}
      <header className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-net-green/10 rounded-xl flex items-center justify-center">
            <Wifi className="text-net-green" size={24} />
          </div>
          <div>
            <p className="text-net-orange font-mono text-sm">MODULE 6</p>
            <h1 className="text-3xl font-bold text-white">Wireless Networks & VLANs</h1>
          </div>
        </div>
        <p className="text-gray-400 text-lg">
          Explore WiFi standards, wireless security protocols, VLAN configuration, 
          trunking, and network segmentation strategies.
        </p>
      </header>

      {/* Table of Contents */}
      <nav className="bg-net-terminal border border-net-green/20 rounded-xl p-6">
        <h2 className="text-net-cyan font-semibold mb-4">In This Module</h2>
        <ol className="space-y-2 text-gray-300">
          <li className="flex items-center gap-3">
            <span className="w-6 h-6 bg-net-green/20 rounded text-net-green text-sm flex items-center justify-center">1</span>
            WiFi Standards (802.11)
          </li>
          <li className="flex items-center gap-3">
            <span className="w-6 h-6 bg-net-green/20 rounded text-net-green text-sm flex items-center justify-center">2</span>
            Wireless Security
          </li>
          <li className="flex items-center gap-3">
            <span className="w-6 h-6 bg-net-green/20 rounded text-net-green text-sm flex items-center justify-center">3</span>
            VLAN Concepts
          </li>
          <li className="flex items-center gap-3">
            <span className="w-6 h-6 bg-net-green/20 rounded text-net-green text-sm flex items-center justify-center">4</span>
            Inter-VLAN Routing
          </li>
          <li className="flex items-center gap-3">
            <span className="w-6 h-6 bg-net-green/20 rounded text-net-green text-sm flex items-center justify-center">5</span>
            Network Segmentation
          </li>
        </ol>
      </nav>

      {/* Section 1: WiFi Standards */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-net-cyan flex items-center gap-2">
          <Radio size={24} />
          1. WiFi Standards (802.11)
        </h2>

        <p className="text-gray-300">
          <strong className="text-net-green">IEEE 802.11</strong> is the family of wireless LAN 
          standards. Each generation offers improved speed, range, and features.
        </p>

        <div className="bg-net-terminal border border-net-green/20 rounded-xl overflow-hidden">
          <div className="grid grid-cols-5 bg-net-dark/50 px-4 py-2 border-b border-net-green/20 text-sm">
            <span className="text-net-green font-semibold">Standard</span>
            <span className="text-net-cyan font-semibold">Name</span>
            <span className="text-net-cyan font-semibold">Frequency</span>
            <span className="text-net-cyan font-semibold">Max Speed</span>
            <span className="text-net-cyan font-semibold">Year</span>
          </div>
          <div className="divide-y divide-net-green/10 text-sm">
            <div className="grid grid-cols-5 px-4 py-3">
              <span className="text-white font-mono">802.11b</span>
              <span className="text-gray-400">-</span>
              <span className="text-gray-400">2.4 GHz</span>
              <span className="text-gray-400">11 Mbps</span>
              <span className="text-gray-400">1999</span>
            </div>
            <div className="grid grid-cols-5 px-4 py-3">
              <span className="text-white font-mono">802.11a</span>
              <span className="text-gray-400">-</span>
              <span className="text-gray-400">5 GHz</span>
              <span className="text-gray-400">54 Mbps</span>
              <span className="text-gray-400">1999</span>
            </div>
            <div className="grid grid-cols-5 px-4 py-3">
              <span className="text-white font-mono">802.11g</span>
              <span className="text-gray-400">-</span>
              <span className="text-gray-400">2.4 GHz</span>
              <span className="text-gray-400">54 Mbps</span>
              <span className="text-gray-400">2003</span>
            </div>
            <div className="grid grid-cols-5 px-4 py-3">
              <span className="text-net-cyan font-mono">802.11n</span>
              <span className="text-net-cyan">WiFi 4</span>
              <span className="text-gray-400">2.4/5 GHz</span>
              <span className="text-gray-400">600 Mbps</span>
              <span className="text-gray-400">2009</span>
            </div>
            <div className="grid grid-cols-5 px-4 py-3">
              <span className="text-net-green font-mono">802.11ac</span>
              <span className="text-net-green">WiFi 5</span>
              <span className="text-gray-400">5 GHz</span>
              <span className="text-gray-400">3.5 Gbps</span>
              <span className="text-gray-400">2014</span>
            </div>
            <div className="grid grid-cols-5 px-4 py-3">
              <span className="text-net-orange font-mono">802.11ax</span>
              <span className="text-net-orange">WiFi 6</span>
              <span className="text-gray-400">2.4/5/6 GHz</span>
              <span className="text-gray-400">9.6 Gbps</span>
              <span className="text-gray-400">2019</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-net-terminal border border-net-cyan/20 rounded-lg p-4">
            <h4 className="text-net-cyan font-semibold mb-2">2.4 GHz Band</h4>
            <ul className="text-sm space-y-1 text-gray-300">
              <li>• Better range/wall penetration</li>
              <li>• More interference (crowded)</li>
              <li>• 3 non-overlapping channels</li>
              <li>• Slower speeds</li>
            </ul>
          </div>
          <div className="bg-net-terminal border border-net-green/20 rounded-lg p-4">
            <h4 className="text-net-green font-semibold mb-2">5 GHz Band</h4>
            <ul className="text-sm space-y-1 text-gray-300">
              <li>• Higher speeds</li>
              <li>• Less interference</li>
              <li>• 24 non-overlapping channels</li>
              <li>• Shorter range</li>
            </ul>
          </div>
        </div>

        <CodeBlock
          code={`# Scan for WiFi networks (Linux)
sudo iwlist wlan0 scan

# View connected network info
iwconfig wlan0

# List available networks
nmcli device wifi list

# Connect to a network
nmcli device wifi connect "SSID" password "password"

# View WiFi channel usage
sudo iwlist wlan0 channel`}
          title="WiFi Commands"
          language="bash"
        />
      </section>

      {/* Section 2: Wireless Security */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-net-cyan flex items-center gap-2">
          <Lock size={24} />
          2. Wireless Security
        </h2>

        <p className="text-gray-300">
          Wireless security has evolved significantly. Using strong encryption and authentication 
          is critical to protect against unauthorized access.
        </p>

        <div className="bg-net-terminal border border-net-green/20 rounded-xl overflow-hidden">
          <div className="grid grid-cols-4 bg-net-dark/50 px-4 py-2 border-b border-net-green/20">
            <span className="text-net-green font-semibold">Protocol</span>
            <span className="text-net-cyan font-semibold">Encryption</span>
            <span className="text-net-cyan font-semibold">Status</span>
            <span className="text-net-cyan font-semibold">Notes</span>
          </div>
          <div className="divide-y divide-net-green/10 text-sm">
            <div className="grid grid-cols-4 px-4 py-3">
              <span className="text-red-400 font-mono">WEP</span>
              <span className="text-gray-400">RC4</span>
              <span className="text-red-400">Broken</span>
              <span className="text-gray-400">Never use</span>
            </div>
            <div className="grid grid-cols-4 px-4 py-3">
              <span className="text-yellow-400 font-mono">WPA</span>
              <span className="text-gray-400">TKIP</span>
              <span className="text-yellow-400">Deprecated</span>
              <span className="text-gray-400">Avoid if possible</span>
            </div>
            <div className="grid grid-cols-4 px-4 py-3">
              <span className="text-net-green font-mono">WPA2</span>
              <span className="text-gray-400">AES-CCMP</span>
              <span className="text-green-400">Secure</span>
              <span className="text-gray-400">Current standard</span>
            </div>
            <div className="grid grid-cols-4 px-4 py-3">
              <span className="text-net-cyan font-mono">WPA3</span>
              <span className="text-gray-400">AES-GCMP</span>
              <span className="text-green-400">Most Secure</span>
              <span className="text-gray-400">SAE handshake</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-net-terminal border border-net-green/20 rounded-lg p-4">
            <h4 className="text-net-green font-semibold mb-2">WPA2-Personal (PSK)</h4>
            <ul className="text-sm space-y-1 text-gray-300">
              <li>• Pre-shared key authentication</li>
              <li>• Good for home/small office</li>
              <li>• All users share same password</li>
              <li>• Use strong passphrase (12+ chars)</li>
            </ul>
          </div>
          <div className="bg-net-terminal border border-net-cyan/20 rounded-lg p-4">
            <h4 className="text-net-cyan font-semibold mb-2">WPA2-Enterprise (802.1X)</h4>
            <ul className="text-sm space-y-1 text-gray-300">
              <li>• RADIUS server authentication</li>
              <li>• Individual user credentials</li>
              <li>• Certificate-based option</li>
              <li>• Best for organizations</li>
            </ul>
          </div>
        </div>

        <div className="bg-net-orange/10 border border-net-orange/30 rounded-lg p-4">
          <h4 className="text-net-orange font-semibold mb-2">WPA3 Improvements</h4>
          <ul className="text-sm space-y-1 text-gray-300">
            <li><strong className="text-net-cyan">SAE (Simultaneous Authentication of Equals):</strong> Protects against offline dictionary attacks</li>
            <li><strong className="text-net-cyan">Forward Secrecy:</strong> Past sessions can't be decrypted if key is compromised</li>
            <li><strong className="text-net-cyan">192-bit encryption:</strong> For enterprise environments (WPA3-Enterprise)</li>
          </ul>
        </div>
      </section>

      {/* Section 3: VLAN Concepts */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-net-cyan flex items-center gap-2">
          <Layers size={24} />
          3. VLAN Concepts
        </h2>

        <p className="text-gray-300">
          A <strong className="text-net-green">VLAN (Virtual Local Area Network)</strong> logically 
          segments a physical network into separate broadcast domains, improving security and performance.
        </p>

        <FlowDiagram chart={vlanDiagram} title="VLAN Network Segmentation" />

        <div className="bg-net-terminal border border-net-green/20 rounded-xl p-6">
          <h4 className="text-net-green font-semibold mb-4">VLAN Benefits</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-net-green">✓</span>
                <span className="text-gray-300">Security: Isolate sensitive systems</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-net-green">✓</span>
                <span className="text-gray-300">Performance: Reduce broadcast domain size</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-net-green">✓</span>
                <span className="text-gray-300">Flexibility: Logical grouping regardless of location</span>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-net-green">✓</span>
                <span className="text-gray-300">Cost: Use existing infrastructure</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-net-green">✓</span>
                <span className="text-gray-300">Management: Easier network administration</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-net-green">✓</span>
                <span className="text-gray-300">QoS: Prioritize traffic by VLAN</span>
              </div>
            </div>
          </div>
        </div>

        <CodeBlock
          code={`# Create VLAN (Cisco)
Switch(config)# vlan 10
Switch(config-vlan)# name Sales
Switch(config-vlan)# exit

# Assign port to VLAN (Access mode)
Switch(config)# interface GigabitEthernet0/1
Switch(config-if)# switchport mode access
Switch(config-if)# switchport access vlan 10

# Configure trunk port
Switch(config)# interface GigabitEthernet0/24
Switch(config-if)# switchport mode trunk
Switch(config-if)# switchport trunk allowed vlan 10,20,30

# View VLAN info
Switch# show vlan brief
Switch# show interfaces trunk`}
          title="VLAN Configuration (Cisco)"
          language="bash"
        />
      </section>

      {/* Section 4: Inter-VLAN Routing */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-net-cyan flex items-center gap-2">
          <Network size={24} />
          4. Inter-VLAN Routing
        </h2>

        <p className="text-gray-300">
          VLANs are separate broadcast domains, so routing is required for communication 
          between them. This can be done via a router or a Layer 3 switch.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-net-terminal border border-net-green/20 rounded-lg p-4">
            <h4 className="text-net-green font-semibold mb-2">Router-on-a-Stick</h4>
            <ul className="text-sm space-y-1 text-gray-300">
              <li>• Single physical interface</li>
              <li>• Subinterfaces for each VLAN</li>
              <li>• Uses 802.1Q trunking</li>
              <li>• Good for small networks</li>
            </ul>
          </div>
          <div className="bg-net-terminal border border-net-cyan/20 rounded-lg p-4">
            <h4 className="text-net-cyan font-semibold mb-2">Layer 3 Switch (SVI)</h4>
            <ul className="text-sm space-y-1 text-gray-300">
              <li>• Routing in hardware</li>
              <li>• Switch Virtual Interfaces</li>
              <li>• Better performance</li>
              <li>• Preferred for enterprise</li>
            </ul>
          </div>
        </div>

        <CodeBlock
          code={`# Router-on-a-Stick Configuration
Router(config)# interface GigabitEthernet0/0
Router(config-if)# no shutdown

# Create subinterface for VLAN 10
Router(config)# interface GigabitEthernet0/0.10
Router(config-subif)# encapsulation dot1Q 10
Router(config-subif)# ip address 192.168.10.1 255.255.255.0

# Create subinterface for VLAN 20
Router(config)# interface GigabitEthernet0/0.20
Router(config-subif)# encapsulation dot1Q 20
Router(config-subif)# ip address 192.168.20.1 255.255.255.0

# Layer 3 Switch SVI Configuration
Switch(config)# ip routing
Switch(config)# interface vlan 10
Switch(config-if)# ip address 192.168.10.1 255.255.255.0
Switch(config-if)# no shutdown`}
          title="Inter-VLAN Routing"
          language="bash"
        />
      </section>

      {/* Section 5: Network Segmentation */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-net-cyan flex items-center gap-2">
          <Layers size={24} />
          5. Network Segmentation Strategies
        </h2>

        <p className="text-gray-300">
          Effective network segmentation improves security by containing threats and 
          limiting lateral movement within the network.
        </p>

        <div className="bg-net-terminal border border-net-green/20 rounded-xl p-6">
          <h4 className="text-net-green font-semibold mb-4">Common Segmentation Approaches</h4>
          <div className="space-y-4 text-sm">
            <div className="border-l-2 border-net-green pl-4">
              <p className="text-white font-semibold">Functional Segmentation</p>
              <p className="text-gray-400">Separate by department: HR, Finance, Engineering</p>
            </div>
            <div className="border-l-2 border-net-cyan pl-4">
              <p className="text-white font-semibold">Security Zone Segmentation</p>
              <p className="text-gray-400">DMZ, Internal, Guest, Management networks</p>
            </div>
            <div className="border-l-2 border-net-orange pl-4">
              <p className="text-white font-semibold">Compliance Segmentation</p>
              <p className="text-gray-400">PCI-DSS cardholder data, HIPAA health data</p>
            </div>
            <div className="border-l-2 border-purple-500 pl-4">
              <p className="text-white font-semibold">Microsegmentation</p>
              <p className="text-gray-400">Application-level isolation, zero trust</p>
            </div>
          </div>
        </div>

        <div className="bg-net-orange/10 border border-net-orange/30 rounded-lg p-4">
          <h4 className="text-net-orange font-semibold mb-2">Best Practices</h4>
          <ul className="text-sm space-y-1 text-gray-300">
            <li>• Document all VLANs and their purposes</li>
            <li>• Use ACLs to control inter-VLAN traffic</li>
            <li>• Implement network monitoring per segment</li>
            <li>• Regularly audit VLAN assignments</li>
            <li>• Use separate VLANs for IoT devices</li>
          </ul>
        </div>
      </section>

      {/* Summary */}
      <section className="bg-net-green/5 border border-net-green/20 rounded-xl p-6">
        <h3 className="text-net-green font-semibold mb-4">Key Takeaways</h3>
        <ul className="space-y-2 text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-net-green mt-1">•</span>
            WiFi 6 (802.11ax) offers the best performance; use 5 GHz when possible
          </li>
          <li className="flex items-start gap-2">
            <span className="text-net-green mt-1">•</span>
            Always use WPA2 or WPA3; never use WEP or WPA/TKIP
          </li>
          <li className="flex items-start gap-2">
            <span className="text-net-green mt-1">•</span>
            VLANs segment networks logically; use trunks to carry multiple VLANs
          </li>
          <li className="flex items-start gap-2">
            <span className="text-net-green mt-1">•</span>
            Layer 3 switches provide better inter-VLAN routing performance
          </li>
        </ul>
      </section>
    </div>
  );
}
