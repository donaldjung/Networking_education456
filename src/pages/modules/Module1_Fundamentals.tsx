import { Network, Layers, Server, Monitor, Router, Cable } from 'lucide-react';
import CodeBlock from '../../components/code/CodeBlock';
import FlowDiagram from '../../components/visualizations/FlowDiagram';

const osiDiagram = `flowchart TB
    subgraph OSI[OSI Model - 7 Layers]
        L7[Layer 7: Application]
        L6[Layer 6: Presentation]
        L5[Layer 5: Session]
        L4[Layer 4: Transport]
        L3[Layer 3: Network]
        L2[Layer 2: Data Link]
        L1[Layer 1: Physical]
    end
    
    L7 --> L6
    L6 --> L5
    L5 --> L4
    L4 --> L3
    L3 --> L2
    L2 --> L1
    
    L7 -.- D7[HTTP, FTP, DNS, SMTP]
    L4 -.- D4[TCP, UDP]
    L3 -.- D3[IP, ICMP, OSPF]
    L2 -.- D2[Ethernet, MAC]
    L1 -.- D1[Cables, Signals]`;

const topologyDiagram = `flowchart TB
    subgraph Star[Star Topology]
        S_Hub[Hub/Switch]
        S_A[PC A] --> S_Hub
        S_B[PC B] --> S_Hub
        S_C[PC C] --> S_Hub
        S_D[PC D] --> S_Hub
    end`;

export default function Module1_Fundamentals() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Header */}
      <header className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-net-green/10 rounded-xl flex items-center justify-center">
            <Network className="text-net-green" size={24} />
          </div>
          <div>
            <p className="text-net-orange font-mono text-sm">MODULE 1</p>
            <h1 className="text-3xl font-bold text-white">Network Fundamentals</h1>
          </div>
        </div>
        <p className="text-gray-400 text-lg">
          Master the foundational concepts of computer networking including the OSI model, 
          TCP/IP protocol suite, network topologies, and essential network devices.
        </p>
      </header>

      {/* Table of Contents */}
      <nav className="bg-net-terminal border border-net-green/20 rounded-xl p-6">
        <h2 className="text-net-cyan font-semibold mb-4">In This Module</h2>
        <ol className="space-y-2 text-gray-300">
          <li className="flex items-center gap-3">
            <span className="w-6 h-6 bg-net-green/20 rounded text-net-green text-sm flex items-center justify-center">1</span>
            OSI Reference Model
          </li>
          <li className="flex items-center gap-3">
            <span className="w-6 h-6 bg-net-green/20 rounded text-net-green text-sm flex items-center justify-center">2</span>
            TCP/IP Protocol Suite
          </li>
          <li className="flex items-center gap-3">
            <span className="w-6 h-6 bg-net-green/20 rounded text-net-green text-sm flex items-center justify-center">3</span>
            Network Topologies
          </li>
          <li className="flex items-center gap-3">
            <span className="w-6 h-6 bg-net-green/20 rounded text-net-green text-sm flex items-center justify-center">4</span>
            Network Devices
          </li>
          <li className="flex items-center gap-3">
            <span className="w-6 h-6 bg-net-green/20 rounded text-net-green text-sm flex items-center justify-center">5</span>
            Data Encapsulation
          </li>
        </ol>
      </nav>

      {/* Section 1: OSI Model */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-net-cyan flex items-center gap-2">
          <Layers size={24} />
          1. OSI Reference Model
        </h2>
        
        <p className="text-gray-300">
          The <strong className="text-net-green">Open Systems Interconnection (OSI)</strong> model is a conceptual 
          framework that standardizes network communication into seven distinct layers. Each layer has specific 
          responsibilities and communicates with adjacent layers.
        </p>

        <FlowDiagram chart={osiDiagram} title="OSI Model Layers" />

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-net-terminal border border-net-green/20 rounded-lg p-4">
            <h4 className="text-net-green font-semibold mb-2">Upper Layers (7-5)</h4>
            <ul className="text-gray-300 text-sm space-y-2">
              <li><strong>Application:</strong> User interface, HTTP, FTP, DNS</li>
              <li><strong>Presentation:</strong> Data formatting, encryption, compression</li>
              <li><strong>Session:</strong> Connection management, authentication</li>
            </ul>
          </div>
          <div className="bg-net-terminal border border-net-cyan/20 rounded-lg p-4">
            <h4 className="text-net-cyan font-semibold mb-2">Lower Layers (4-1)</h4>
            <ul className="text-gray-300 text-sm space-y-2">
              <li><strong>Transport:</strong> TCP/UDP, port numbers, segmentation</li>
              <li><strong>Network:</strong> IP addressing, routing, logical addressing</li>
              <li><strong>Data Link:</strong> MAC addressing, switches, frames</li>
              <li><strong>Physical:</strong> Cables, signals, bit transmission</li>
            </ul>
          </div>
        </div>

        <div className="bg-net-orange/10 border border-net-orange/30 rounded-lg p-4">
          <h4 className="text-net-orange font-semibold mb-2">💡 Memory Trick</h4>
          <p className="text-gray-300 text-sm">
            <strong>"All People Seem To Need Data Processing"</strong> (Application → Physical) or 
            <strong> "Please Do Not Throw Sausage Pizza Away"</strong> (Physical → Application)
          </p>
        </div>
      </section>

      {/* Section 2: TCP/IP Model */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-net-cyan flex items-center gap-2">
          <Server size={24} />
          2. TCP/IP Protocol Suite
        </h2>

        <p className="text-gray-300">
          The <strong className="text-net-green">TCP/IP model</strong> is the practical implementation used on the Internet. 
          It has four layers that map to the OSI model's seven layers.
        </p>

        <div className="bg-net-terminal border border-net-green/20 rounded-xl overflow-hidden">
          <div className="grid grid-cols-2 bg-net-dark/50 px-4 py-2 border-b border-net-green/20">
            <span className="text-net-green font-semibold">TCP/IP Layer</span>
            <span className="text-net-cyan font-semibold">OSI Equivalent</span>
          </div>
          <div className="divide-y divide-net-green/10">
            <div className="grid grid-cols-2 px-4 py-3">
              <span className="text-white">Application</span>
              <span className="text-gray-400">Application, Presentation, Session</span>
            </div>
            <div className="grid grid-cols-2 px-4 py-3">
              <span className="text-white">Transport</span>
              <span className="text-gray-400">Transport</span>
            </div>
            <div className="grid grid-cols-2 px-4 py-3">
              <span className="text-white">Internet</span>
              <span className="text-gray-400">Network</span>
            </div>
            <div className="grid grid-cols-2 px-4 py-3">
              <span className="text-white">Network Access</span>
              <span className="text-gray-400">Data Link, Physical</span>
            </div>
          </div>
        </div>

        <CodeBlock
          code={`# View TCP/IP configuration on Linux
ip addr show

# View on Windows
ipconfig /all

# View active TCP connections
netstat -an | grep ESTABLISHED

# Show routing table
ip route show`}
          title="TCP/IP Commands"
          language="bash"
        />
      </section>

      {/* Section 3: Network Topologies */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-net-cyan flex items-center gap-2">
          <Monitor size={24} />
          3. Network Topologies
        </h2>

        <p className="text-gray-300">
          Network topology refers to the physical or logical arrangement of devices on a network. 
          The choice of topology affects performance, fault tolerance, and cost.
        </p>

        <FlowDiagram chart={topologyDiagram} title="Star Topology" />

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-net-terminal border border-net-green/20 rounded-lg p-4 space-y-3">
            <h4 className="text-net-green font-semibold">Star Topology</h4>
            <p className="text-gray-400 text-sm">All devices connect to a central hub or switch.</p>
            <ul className="text-sm space-y-1">
              <li className="text-green-400">✓ Easy to add/remove devices</li>
              <li className="text-green-400">✓ Single device failure doesn't affect others</li>
              <li className="text-red-400">✗ Central point of failure</li>
            </ul>
          </div>

          <div className="bg-net-terminal border border-net-cyan/20 rounded-lg p-4 space-y-3">
            <h4 className="text-net-cyan font-semibold">Mesh Topology</h4>
            <p className="text-gray-400 text-sm">Every device connects to every other device.</p>
            <ul className="text-sm space-y-1">
              <li className="text-green-400">✓ High redundancy and reliability</li>
              <li className="text-green-400">✓ No single point of failure</li>
              <li className="text-red-400">✗ Expensive, complex cabling</li>
            </ul>
          </div>

          <div className="bg-net-terminal border border-net-orange/20 rounded-lg p-4 space-y-3">
            <h4 className="text-net-orange font-semibold">Bus Topology</h4>
            <p className="text-gray-400 text-sm">All devices share a single communication line.</p>
            <ul className="text-sm space-y-1">
              <li className="text-green-400">✓ Simple and inexpensive</li>
              <li className="text-red-400">✗ Single cable failure affects all</li>
              <li className="text-red-400">✗ Limited scalability</li>
            </ul>
          </div>

          <div className="bg-net-terminal border border-gray-500/20 rounded-lg p-4 space-y-3">
            <h4 className="text-gray-300 font-semibold">Ring Topology</h4>
            <p className="text-gray-400 text-sm">Devices form a closed loop, data travels in one direction.</p>
            <ul className="text-sm space-y-1">
              <li className="text-green-400">✓ Equal access for all devices</li>
              <li className="text-green-400">✓ Predictable performance</li>
              <li className="text-red-400">✗ Single break disrupts entire network</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 4: Network Devices */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-net-cyan flex items-center gap-2">
          <Router size={24} />
          4. Network Devices
        </h2>

        <div className="space-y-4">
          <div className="bg-net-terminal border border-net-green/20 rounded-lg p-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-net-green/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Router className="text-net-green" size={20} />
              </div>
              <div>
                <h4 className="text-net-green font-semibold">Router</h4>
                <p className="text-gray-300 text-sm mt-1">
                  Operates at <strong>Layer 3 (Network)</strong>. Routes packets between different networks 
                  using IP addresses. Makes forwarding decisions based on routing tables.
                </p>
                <p className="text-gray-500 text-xs mt-2">Use case: Connecting your home network to the Internet</p>
              </div>
            </div>
          </div>

          <div className="bg-net-terminal border border-net-cyan/20 rounded-lg p-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-net-cyan/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Network className="text-net-cyan" size={20} />
              </div>
              <div>
                <h4 className="text-net-cyan font-semibold">Switch</h4>
                <p className="text-gray-300 text-sm mt-1">
                  Operates at <strong>Layer 2 (Data Link)</strong>. Forwards frames based on MAC addresses. 
                  Learns MAC addresses and builds a MAC address table.
                </p>
                <p className="text-gray-500 text-xs mt-2">Use case: Connecting multiple devices in a LAN</p>
              </div>
            </div>
          </div>

          <div className="bg-net-terminal border border-net-orange/20 rounded-lg p-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-net-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Cable className="text-net-orange" size={20} />
              </div>
              <div>
                <h4 className="text-net-orange font-semibold">Hub (Legacy)</h4>
                <p className="text-gray-300 text-sm mt-1">
                  Operates at <strong>Layer 1 (Physical)</strong>. Simple repeater that broadcasts 
                  all traffic to all ports. Creates a single collision domain.
                </p>
                <p className="text-gray-500 text-xs mt-2">Note: Largely replaced by switches in modern networks</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Data Encapsulation */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-net-cyan flex items-center gap-2">
          <Layers size={24} />
          5. Data Encapsulation
        </h2>

        <p className="text-gray-300">
          As data travels down the OSI layers, each layer adds its own header (and sometimes trailer) 
          to the data. This process is called <strong className="text-net-green">encapsulation</strong>.
        </p>

        <div className="bg-net-terminal border border-net-green/20 rounded-xl overflow-hidden">
          <div className="bg-net-dark/50 px-4 py-2 border-b border-net-green/20">
            <span className="text-net-green font-semibold">Protocol Data Units (PDUs)</span>
          </div>
          <div className="p-4 space-y-3">
            <div className="flex items-center gap-4 text-sm">
              <span className="w-24 text-gray-400">Application</span>
              <div className="flex-1 bg-net-green/20 border border-net-green/40 rounded px-3 py-2 text-center text-net-green">
                Data
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="w-24 text-gray-400">Transport</span>
              <div className="flex-1 bg-net-cyan/20 border border-net-cyan/40 rounded px-3 py-2 text-center text-net-cyan">
                Segment (TCP) / Datagram (UDP)
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="w-24 text-gray-400">Network</span>
              <div className="flex-1 bg-net-orange/20 border border-net-orange/40 rounded px-3 py-2 text-center text-net-orange">
                Packet
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="w-24 text-gray-400">Data Link</span>
              <div className="flex-1 bg-purple-500/20 border border-purple-500/40 rounded px-3 py-2 text-center text-purple-400">
                Frame
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="w-24 text-gray-400">Physical</span>
              <div className="flex-1 bg-gray-500/20 border border-gray-500/40 rounded px-3 py-2 text-center text-gray-400">
                Bits
              </div>
            </div>
          </div>
        </div>

        <CodeBlock
          code={`# Capture packets to see encapsulation
tcpdump -i eth0 -v

# Use Wireshark for detailed analysis
wireshark &

# View frame details
tcpdump -i eth0 -e -v`}
          title="Examining Encapsulation"
          language="bash"
        />
      </section>

      {/* Summary */}
      <section className="bg-net-green/5 border border-net-green/20 rounded-xl p-6">
        <h3 className="text-net-green font-semibold mb-4">Key Takeaways</h3>
        <ul className="space-y-2 text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-net-green mt-1">•</span>
            The OSI model has 7 layers, TCP/IP has 4 practical layers
          </li>
          <li className="flex items-start gap-2">
            <span className="text-net-green mt-1">•</span>
            Routers operate at Layer 3 (IP), Switches at Layer 2 (MAC)
          </li>
          <li className="flex items-start gap-2">
            <span className="text-net-green mt-1">•</span>
            Star topology is most common in modern LANs
          </li>
          <li className="flex items-start gap-2">
            <span className="text-net-green mt-1">•</span>
            Data encapsulation adds headers at each layer going down
          </li>
        </ul>
      </section>
    </div>
  );
}
