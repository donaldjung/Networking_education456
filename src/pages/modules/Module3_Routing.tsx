import { GitBranch, Route, Map, Shuffle, Share2 } from 'lucide-react';
import CodeBlock from '../../components/code/CodeBlock';
import FlowDiagram from '../../components/visualizations/FlowDiagram';

const routingDiagram = `flowchart LR
    subgraph Network1[Network A: 192.168.1.0/24]
        PC1[PC: 192.168.1.10]
    end
    
    R1[Router 1]
    R2[Router 2]
    
    subgraph Network2[Network B: 10.0.0.0/24]
        Server[Server: 10.0.0.5]
    end
    
    PC1 --> R1
    R1 --> R2
    R2 --> Server`;

const stpDiagram = `flowchart TB
    Root[Root Bridge<br/>Priority: 24576]
    SW1[Switch 1<br/>Root Port: Gi0/1]
    SW2[Switch 2<br/>Root Port: Gi0/1]
    
    Root -->|Designated| SW1
    Root -->|Designated| SW2
    SW1 -.->|Blocked| SW2`;

export default function Module3_Routing() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Header */}
      <header className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-net-green/10 rounded-xl flex items-center justify-center">
            <GitBranch className="text-net-green" size={24} />
          </div>
          <div>
            <p className="text-net-orange font-mono text-sm">MODULE 3</p>
            <h1 className="text-3xl font-bold text-white">Routing & Switching</h1>
          </div>
        </div>
        <p className="text-gray-400 text-lg">
          Understand how routers make forwarding decisions, learn dynamic routing protocols 
          (OSPF, BGP, EIGRP), and master Layer 2 switching concepts including STP.
        </p>
      </header>

      {/* Table of Contents */}
      <nav className="bg-net-terminal border border-net-green/20 rounded-xl p-6">
        <h2 className="text-net-cyan font-semibold mb-4">In This Module</h2>
        <ol className="space-y-2 text-gray-300">
          <li className="flex items-center gap-3">
            <span className="w-6 h-6 bg-net-green/20 rounded text-net-green text-sm flex items-center justify-center">1</span>
            How Routers Work
          </li>
          <li className="flex items-center gap-3">
            <span className="w-6 h-6 bg-net-green/20 rounded text-net-green text-sm flex items-center justify-center">2</span>
            Static vs Dynamic Routing
          </li>
          <li className="flex items-center gap-3">
            <span className="w-6 h-6 bg-net-green/20 rounded text-net-green text-sm flex items-center justify-center">3</span>
            Routing Protocols
          </li>
          <li className="flex items-center gap-3">
            <span className="w-6 h-6 bg-net-green/20 rounded text-net-green text-sm flex items-center justify-center">4</span>
            Layer 2 Switching
          </li>
          <li className="flex items-center gap-3">
            <span className="w-6 h-6 bg-net-green/20 rounded text-net-green text-sm flex items-center justify-center">5</span>
            Spanning Tree Protocol
          </li>
        </ol>
      </nav>

      {/* Section 1: How Routers Work */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-net-cyan flex items-center gap-2">
          <Route size={24} />
          1. How Routers Work
        </h2>

        <p className="text-gray-300">
          A <strong className="text-net-green">router</strong> is a Layer 3 device that forwards packets 
          between networks based on IP addresses. It uses a <strong className="text-net-cyan">routing table</strong> 
          to determine the best path to a destination.
        </p>

        <FlowDiagram chart={routingDiagram} title="Basic Routing Between Networks" />

        <div className="bg-net-terminal border border-net-green/20 rounded-xl p-6">
          <h4 className="text-net-green font-semibold mb-4">Routing Table Components</h4>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <span className="text-net-cyan font-mono w-32">Destination</span>
              <span className="text-gray-300">The target network/host IP address</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-net-cyan font-mono w-32">Subnet Mask</span>
              <span className="text-gray-300">Defines the network portion</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-net-cyan font-mono w-32">Next Hop</span>
              <span className="text-gray-300">IP of the next router in the path</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-net-cyan font-mono w-32">Interface</span>
              <span className="text-gray-300">Exit interface for the packet</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-net-cyan font-mono w-32">Metric</span>
              <span className="text-gray-300">Cost/distance to reach destination</span>
            </div>
          </div>
        </div>

        <CodeBlock
          code={`# View routing table (Linux)
ip route show
netstat -rn
route -n

# View routing table (Cisco)
show ip route

# Sample output:
# Destination     Gateway         Genmask         Flags Metric Iface
# 0.0.0.0         192.168.1.1     0.0.0.0         UG    100    eth0
# 10.0.0.0        10.0.0.1        255.255.255.0   UG    0      eth1
# 192.168.1.0     0.0.0.0         255.255.255.0   U     100    eth0`}
          title="Viewing Routing Tables"
          language="bash"
        />
      </section>

      {/* Section 2: Static vs Dynamic */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-net-cyan flex items-center gap-2">
          <Map size={24} />
          2. Static vs Dynamic Routing
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-net-terminal border border-net-green/20 rounded-lg p-5">
            <h4 className="text-net-green font-semibold mb-3">Static Routing</h4>
            <p className="text-gray-400 text-sm mb-3">
              Manually configured routes that don't change unless an admin modifies them.
            </p>
            <ul className="text-sm space-y-1">
              <li className="text-green-400">✓ Low CPU/memory overhead</li>
              <li className="text-green-400">✓ Predictable routing paths</li>
              <li className="text-green-400">✓ More secure (no routing updates)</li>
              <li className="text-red-400">✗ No automatic failover</li>
              <li className="text-red-400">✗ Doesn't scale well</li>
            </ul>
          </div>

          <div className="bg-net-terminal border border-net-cyan/20 rounded-lg p-5">
            <h4 className="text-net-cyan font-semibold mb-3">Dynamic Routing</h4>
            <p className="text-gray-400 text-sm mb-3">
              Routes learned automatically through routing protocols.
            </p>
            <ul className="text-sm space-y-1">
              <li className="text-green-400">✓ Automatic route discovery</li>
              <li className="text-green-400">✓ Adapts to network changes</li>
              <li className="text-green-400">✓ Automatic failover</li>
              <li className="text-red-400">✗ Higher CPU/memory usage</li>
              <li className="text-red-400">✗ More complex configuration</li>
            </ul>
          </div>
        </div>

        <CodeBlock
          code={`# Add a static route (Linux)
ip route add 10.0.0.0/24 via 192.168.1.1

# Add default gateway
ip route add default via 192.168.1.1

# Delete a route
ip route del 10.0.0.0/24

# Cisco static route
Router(config)# ip route 10.0.0.0 255.255.255.0 192.168.1.1

# Cisco default route
Router(config)# ip route 0.0.0.0 0.0.0.0 192.168.1.1`}
          title="Static Route Configuration"
          language="bash"
        />
      </section>

      {/* Section 3: Routing Protocols */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-net-cyan flex items-center gap-2">
          <Share2 size={24} />
          3. Routing Protocols
        </h2>

        <p className="text-gray-300">
          Dynamic routing protocols allow routers to exchange information about network topology 
          and automatically calculate the best paths.
        </p>

        <div className="bg-net-terminal border border-net-green/20 rounded-xl overflow-hidden">
          <div className="grid grid-cols-4 bg-net-dark/50 px-4 py-2 border-b border-net-green/20 text-sm">
            <span className="text-net-green font-semibold">Protocol</span>
            <span className="text-net-cyan font-semibold">Type</span>
            <span className="text-net-cyan font-semibold">Metric</span>
            <span className="text-net-cyan font-semibold">Use Case</span>
          </div>
          <div className="divide-y divide-net-green/10 text-sm">
            <div className="grid grid-cols-4 px-4 py-3">
              <span className="text-net-green font-bold">RIP</span>
              <span className="text-white">Distance Vector</span>
              <span className="text-gray-400">Hop Count (max 15)</span>
              <span className="text-gray-400">Small networks</span>
            </div>
            <div className="grid grid-cols-4 px-4 py-3">
              <span className="text-net-cyan font-bold">OSPF</span>
              <span className="text-white">Link State</span>
              <span className="text-gray-400">Cost (bandwidth)</span>
              <span className="text-gray-400">Enterprise</span>
            </div>
            <div className="grid grid-cols-4 px-4 py-3">
              <span className="text-net-orange font-bold">EIGRP</span>
              <span className="text-white">Hybrid</span>
              <span className="text-gray-400">Composite metric</span>
              <span className="text-gray-400">Cisco environments</span>
            </div>
            <div className="grid grid-cols-4 px-4 py-3">
              <span className="text-purple-400 font-bold">BGP</span>
              <span className="text-white">Path Vector</span>
              <span className="text-gray-400">AS Path, policies</span>
              <span className="text-gray-400">Internet/ISPs</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-net-terminal border border-net-cyan/20 rounded-lg p-4">
            <h4 className="text-net-cyan font-semibold mb-2">OSPF (Open Shortest Path First)</h4>
            <ul className="text-sm space-y-1 text-gray-300">
              <li>• Uses Dijkstra's SPF algorithm</li>
              <li>• Divides networks into areas</li>
              <li>• Fast convergence</li>
              <li>• Supports VLSM and CIDR</li>
              <li>• Administrative Distance: 110</li>
            </ul>
          </div>
          <div className="bg-net-terminal border border-purple-500/20 rounded-lg p-4">
            <h4 className="text-purple-400 font-semibold mb-2">BGP (Border Gateway Protocol)</h4>
            <ul className="text-sm space-y-1 text-gray-300">
              <li>• The routing protocol of the Internet</li>
              <li>• Routes between Autonomous Systems</li>
              <li>• Policy-based routing decisions</li>
              <li>• Highly scalable</li>
              <li>• Administrative Distance: 20 (eBGP)</li>
            </ul>
          </div>
        </div>

        <CodeBlock
          code={`# Cisco OSPF Configuration
Router(config)# router ospf 1
Router(config-router)# network 192.168.1.0 0.0.0.255 area 0
Router(config-router)# network 10.0.0.0 0.0.0.255 area 0

# Verify OSPF
Router# show ip ospf neighbor
Router# show ip ospf database
Router# show ip route ospf

# View OSPF interface status
Router# show ip ospf interface brief`}
          title="OSPF Configuration (Cisco)"
          language="bash"
        />
      </section>

      {/* Section 4: Layer 2 Switching */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-net-cyan flex items-center gap-2">
          <Shuffle size={24} />
          4. Layer 2 Switching
        </h2>

        <p className="text-gray-300">
          <strong className="text-net-green">Switches</strong> operate at Layer 2 and forward frames 
          based on MAC addresses. They learn MAC addresses dynamically and build a MAC address table.
        </p>

        <div className="bg-net-terminal border border-net-green/20 rounded-xl p-6">
          <h4 className="text-net-green font-semibold mb-4">Switch Operation</h4>
          <ol className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-net-green/20 rounded-full text-net-green flex items-center justify-center flex-shrink-0">1</span>
              <div>
                <span className="text-white font-semibold">Learn</span>
                <p className="text-gray-400">Switch learns source MAC addresses and associates them with ports</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-net-green/20 rounded-full text-net-green flex items-center justify-center flex-shrink-0">2</span>
              <div>
                <span className="text-white font-semibold">Forward</span>
                <p className="text-gray-400">If destination MAC is known, forward to that specific port</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-net-green/20 rounded-full text-net-green flex items-center justify-center flex-shrink-0">3</span>
              <div>
                <span className="text-white font-semibold">Flood</span>
                <p className="text-gray-400">If destination MAC is unknown, flood frame to all ports except source</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-net-green/20 rounded-full text-net-green flex items-center justify-center flex-shrink-0">4</span>
              <div>
                <span className="text-white font-semibold">Filter</span>
                <p className="text-gray-400">Drop frames destined for the same port they came from</p>
              </div>
            </li>
          </ol>
        </div>

        <CodeBlock
          code={`# View MAC address table (Cisco)
Switch# show mac address-table

# View specific port
Switch# show mac address-table interface Gi0/1

# Clear MAC table
Switch# clear mac address-table dynamic

# View ARP table (to correlate MAC to IP)
arp -a`}
          title="Switch MAC Table Commands"
          language="bash"
        />
      </section>

      {/* Section 5: Spanning Tree */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-net-cyan flex items-center gap-2">
          <GitBranch size={24} />
          5. Spanning Tree Protocol (STP)
        </h2>

        <p className="text-gray-300">
          <strong className="text-net-green">STP (IEEE 802.1D)</strong> prevents Layer 2 loops by blocking 
          redundant paths. It elects a root bridge and calculates the best path to it.
        </p>

        <FlowDiagram chart={stpDiagram} title="STP Port States" />

        <div className="bg-net-terminal border border-net-green/20 rounded-xl overflow-hidden">
          <div className="grid grid-cols-3 bg-net-dark/50 px-4 py-2 border-b border-net-green/20">
            <span className="text-net-green font-semibold">Port Role</span>
            <span className="text-net-cyan font-semibold">Description</span>
            <span className="text-net-cyan font-semibold">State</span>
          </div>
          <div className="divide-y divide-net-green/10 text-sm">
            <div className="grid grid-cols-3 px-4 py-3">
              <span className="text-net-green">Root Port</span>
              <span className="text-gray-300">Best path to root bridge</span>
              <span className="text-green-400">Forwarding</span>
            </div>
            <div className="grid grid-cols-3 px-4 py-3">
              <span className="text-net-cyan">Designated Port</span>
              <span className="text-gray-300">Best port on each segment</span>
              <span className="text-green-400">Forwarding</span>
            </div>
            <div className="grid grid-cols-3 px-4 py-3">
              <span className="text-net-orange">Blocked Port</span>
              <span className="text-gray-300">Prevents loops</span>
              <span className="text-red-400">Blocking</span>
            </div>
          </div>
        </div>

        <div className="bg-net-orange/10 border border-net-orange/30 rounded-lg p-4">
          <h4 className="text-net-orange font-semibold mb-2">STP Port States</h4>
          <div className="flex gap-2 flex-wrap text-sm">
            <span className="px-2 py-1 bg-net-dark rounded text-gray-300">Blocking</span>
            <span className="text-net-orange">→</span>
            <span className="px-2 py-1 bg-net-dark rounded text-gray-300">Listening</span>
            <span className="text-net-orange">→</span>
            <span className="px-2 py-1 bg-net-dark rounded text-gray-300">Learning</span>
            <span className="text-net-orange">→</span>
            <span className="px-2 py-1 bg-net-green/20 rounded text-net-green">Forwarding</span>
          </div>
          <p className="text-gray-400 text-sm mt-2">Convergence time: ~50 seconds (use RSTP for faster)</p>
        </div>

        <CodeBlock
          code={`# View STP status (Cisco)
Switch# show spanning-tree

# View detailed STP info
Switch# show spanning-tree detail

# Configure root bridge
Switch(config)# spanning-tree vlan 1 root primary

# Or manually set priority (lower = better)
Switch(config)# spanning-tree vlan 1 priority 24576

# Enable Rapid STP (RSTP)
Switch(config)# spanning-tree mode rapid-pvst`}
          title="STP Configuration Commands"
          language="bash"
        />
      </section>

      {/* Summary */}
      <section className="bg-net-green/5 border border-net-green/20 rounded-xl p-6">
        <h3 className="text-net-green font-semibold mb-4">Key Takeaways</h3>
        <ul className="space-y-2 text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-net-green mt-1">•</span>
            Routers use routing tables (destination, next hop, metric) to forward packets
          </li>
          <li className="flex items-start gap-2">
            <span className="text-net-green mt-1">•</span>
            OSPF is the most common enterprise routing protocol; BGP routes the Internet
          </li>
          <li className="flex items-start gap-2">
            <span className="text-net-green mt-1">•</span>
            Switches learn MAC addresses and build forwarding tables
          </li>
          <li className="flex items-start gap-2">
            <span className="text-net-green mt-1">•</span>
            STP prevents loops by blocking redundant paths; use RSTP for faster convergence
          </li>
        </ul>
      </section>
    </div>
  );
}
