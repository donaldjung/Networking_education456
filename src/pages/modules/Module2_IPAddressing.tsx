import { Binary, Hash, Globe, Divide, Calculator } from 'lucide-react';
import CodeBlock from '../../components/code/CodeBlock';
import FlowDiagram from '../../components/visualizations/FlowDiagram';

const subnetDiagram = `flowchart LR
    subgraph Network[192.168.1.0/24]
        Subnet1[Subnet 1: 192.168.1.0/26<br/>Hosts: 1-62]
        Subnet2[Subnet 2: 192.168.1.64/26<br/>Hosts: 65-126]
        Subnet3[Subnet 3: 192.168.1.128/26<br/>Hosts: 129-190]
        Subnet4[Subnet 4: 192.168.1.192/26<br/>Hosts: 193-254]
    end`;

export default function Module2_IPAddressing() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Header */}
      <header className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-net-cyan/10 rounded-xl flex items-center justify-center">
            <Binary className="text-net-cyan" size={24} />
          </div>
          <div>
            <p className="text-net-orange font-mono text-sm">MODULE 2</p>
            <h1 className="text-3xl font-bold text-white">IP Addressing & Subnetting</h1>
          </div>
        </div>
        <p className="text-gray-400 text-lg">
          Learn IPv4 and IPv6 addressing, subnet mask calculations, CIDR notation, 
          and how to efficiently divide networks into smaller subnets.
        </p>
      </header>

      {/* Table of Contents */}
      <nav className="bg-net-terminal border border-net-green/20 rounded-xl p-6">
        <h2 className="text-net-cyan font-semibold mb-4">In This Module</h2>
        <ol className="space-y-2 text-gray-300">
          <li className="flex items-center gap-3">
            <span className="w-6 h-6 bg-net-cyan/20 rounded text-net-cyan text-sm flex items-center justify-center">1</span>
            IPv4 Address Structure
          </li>
          <li className="flex items-center gap-3">
            <span className="w-6 h-6 bg-net-cyan/20 rounded text-net-cyan text-sm flex items-center justify-center">2</span>
            Address Classes and Private Ranges
          </li>
          <li className="flex items-center gap-3">
            <span className="w-6 h-6 bg-net-cyan/20 rounded text-net-cyan text-sm flex items-center justify-center">3</span>
            Subnet Masks and CIDR
          </li>
          <li className="flex items-center gap-3">
            <span className="w-6 h-6 bg-net-cyan/20 rounded text-net-cyan text-sm flex items-center justify-center">4</span>
            Subnetting Calculations
          </li>
          <li className="flex items-center gap-3">
            <span className="w-6 h-6 bg-net-cyan/20 rounded text-net-cyan text-sm flex items-center justify-center">5</span>
            IPv6 Introduction
          </li>
        </ol>
      </nav>

      {/* Section 1: IPv4 Structure */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-net-cyan flex items-center gap-2">
          <Hash size={24} />
          1. IPv4 Address Structure
        </h2>

        <p className="text-gray-300">
          An <strong className="text-net-green">IPv4 address</strong> is a 32-bit number divided into 
          4 octets (bytes), each ranging from 0 to 255, separated by dots (dotted decimal notation).
        </p>

        <div className="bg-net-terminal border border-net-green/20 rounded-xl p-6">
          <h4 className="text-net-green font-semibold mb-4">IPv4 Address Breakdown</h4>
          <div className="font-mono text-center mb-4">
            <span className="text-3xl text-white">192</span>
            <span className="text-net-orange text-3xl">.</span>
            <span className="text-3xl text-white">168</span>
            <span className="text-net-orange text-3xl">.</span>
            <span className="text-3xl text-white">1</span>
            <span className="text-net-orange text-3xl">.</span>
            <span className="text-3xl text-white">100</span>
          </div>
          <div className="grid grid-cols-4 gap-2 text-center text-sm">
            <div className="bg-net-green/10 border border-net-green/30 rounded p-2">
              <p className="text-net-green font-mono">11000000</p>
              <p className="text-gray-400">192</p>
            </div>
            <div className="bg-net-green/10 border border-net-green/30 rounded p-2">
              <p className="text-net-green font-mono">10101000</p>
              <p className="text-gray-400">168</p>
            </div>
            <div className="bg-net-green/10 border border-net-green/30 rounded p-2">
              <p className="text-net-green font-mono">00000001</p>
              <p className="text-gray-400">1</p>
            </div>
            <div className="bg-net-green/10 border border-net-green/30 rounded p-2">
              <p className="text-net-green font-mono">01100100</p>
              <p className="text-gray-400">100</p>
            </div>
          </div>
          <p className="text-gray-400 text-sm text-center mt-4">
            Total: 32 bits = 4 octets × 8 bits
          </p>
        </div>

        <CodeBlock
          code={`# View your IP address (Linux)
ip addr show
hostname -I

# View IP address (Windows)
ipconfig

# View IP address (macOS)
ifconfig en0 | grep "inet "

# Test connectivity with IP
ping 192.168.1.1`}
          title="IP Address Commands"
          language="bash"
        />
      </section>

      {/* Section 2: Address Classes */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-net-cyan flex items-center gap-2">
          <Globe size={24} />
          2. Address Classes & Private Ranges
        </h2>

        <p className="text-gray-300">
          IPv4 addresses are divided into classes (A, B, C, D, E) based on the first octet. 
          Each class has different network and host portions.
        </p>

        <div className="bg-net-terminal border border-net-green/20 rounded-xl overflow-hidden">
          <div className="grid grid-cols-5 bg-net-dark/50 px-4 py-2 border-b border-net-green/20 text-sm">
            <span className="text-net-green font-semibold">Class</span>
            <span className="text-net-cyan font-semibold">First Octet</span>
            <span className="text-net-cyan font-semibold">Default Mask</span>
            <span className="text-net-cyan font-semibold">Networks</span>
            <span className="text-net-cyan font-semibold">Hosts/Network</span>
          </div>
          <div className="divide-y divide-net-green/10 text-sm">
            <div className="grid grid-cols-5 px-4 py-3">
              <span className="text-net-green font-bold">A</span>
              <span className="text-white">1-126</span>
              <span className="text-gray-400">255.0.0.0</span>
              <span className="text-gray-400">126</span>
              <span className="text-gray-400">16,777,214</span>
            </div>
            <div className="grid grid-cols-5 px-4 py-3">
              <span className="text-net-cyan font-bold">B</span>
              <span className="text-white">128-191</span>
              <span className="text-gray-400">255.255.0.0</span>
              <span className="text-gray-400">16,384</span>
              <span className="text-gray-400">65,534</span>
            </div>
            <div className="grid grid-cols-5 px-4 py-3">
              <span className="text-net-orange font-bold">C</span>
              <span className="text-white">192-223</span>
              <span className="text-gray-400">255.255.255.0</span>
              <span className="text-gray-400">2,097,152</span>
              <span className="text-gray-400">254</span>
            </div>
            <div className="grid grid-cols-5 px-4 py-3">
              <span className="text-purple-400 font-bold">D</span>
              <span className="text-white">224-239</span>
              <span className="text-gray-400 col-span-3">Multicast (not for hosts)</span>
            </div>
            <div className="grid grid-cols-5 px-4 py-3">
              <span className="text-gray-400 font-bold">E</span>
              <span className="text-white">240-255</span>
              <span className="text-gray-400 col-span-3">Experimental/Reserved</span>
            </div>
          </div>
        </div>

        <div className="bg-net-orange/10 border border-net-orange/30 rounded-lg p-4">
          <h4 className="text-net-orange font-semibold mb-3">Private IP Ranges (RFC 1918)</h4>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-net-green font-mono">Class A</p>
              <p className="text-white">10.0.0.0 - 10.255.255.255</p>
              <p className="text-gray-400">10.0.0.0/8</p>
            </div>
            <div>
              <p className="text-net-cyan font-mono">Class B</p>
              <p className="text-white">172.16.0.0 - 172.31.255.255</p>
              <p className="text-gray-400">172.16.0.0/12</p>
            </div>
            <div>
              <p className="text-net-orange font-mono">Class C</p>
              <p className="text-white">192.168.0.0 - 192.168.255.255</p>
              <p className="text-gray-400">192.168.0.0/16</p>
            </div>
          </div>
        </div>

        <div className="bg-net-green/10 border border-net-green/30 rounded-lg p-4">
          <h4 className="text-net-green font-semibold mb-2">Special Addresses</h4>
          <ul className="text-sm space-y-1 text-gray-300">
            <li><strong className="text-net-cyan">127.0.0.0/8</strong> - Loopback (localhost)</li>
            <li><strong className="text-net-cyan">169.254.0.0/16</strong> - APIPA (Link-local)</li>
            <li><strong className="text-net-cyan">0.0.0.0</strong> - Default route / All networks</li>
            <li><strong className="text-net-cyan">255.255.255.255</strong> - Limited broadcast</li>
          </ul>
        </div>
      </section>

      {/* Section 3: Subnet Masks and CIDR */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-net-cyan flex items-center gap-2">
          <Divide size={24} />
          3. Subnet Masks & CIDR Notation
        </h2>

        <p className="text-gray-300">
          A <strong className="text-net-green">subnet mask</strong> determines which portion of an IP address 
          is the network and which is the host. <strong className="text-net-cyan">CIDR</strong> (Classless 
          Inter-Domain Routing) provides a shorthand notation.
        </p>

        <div className="bg-net-terminal border border-net-green/20 rounded-xl overflow-hidden">
          <div className="grid grid-cols-3 bg-net-dark/50 px-4 py-2 border-b border-net-green/20">
            <span className="text-net-green font-semibold">CIDR</span>
            <span className="text-net-cyan font-semibold">Subnet Mask</span>
            <span className="text-net-cyan font-semibold">Usable Hosts</span>
          </div>
          <div className="divide-y divide-net-green/10 text-sm font-mono">
            <div className="grid grid-cols-3 px-4 py-2">
              <span className="text-white">/8</span>
              <span className="text-gray-300">255.0.0.0</span>
              <span className="text-gray-400">16,777,214</span>
            </div>
            <div className="grid grid-cols-3 px-4 py-2">
              <span className="text-white">/16</span>
              <span className="text-gray-300">255.255.0.0</span>
              <span className="text-gray-400">65,534</span>
            </div>
            <div className="grid grid-cols-3 px-4 py-2">
              <span className="text-white">/24</span>
              <span className="text-gray-300">255.255.255.0</span>
              <span className="text-gray-400">254</span>
            </div>
            <div className="grid grid-cols-3 px-4 py-2">
              <span className="text-white">/25</span>
              <span className="text-gray-300">255.255.255.128</span>
              <span className="text-gray-400">126</span>
            </div>
            <div className="grid grid-cols-3 px-4 py-2">
              <span className="text-white">/26</span>
              <span className="text-gray-300">255.255.255.192</span>
              <span className="text-gray-400">62</span>
            </div>
            <div className="grid grid-cols-3 px-4 py-2">
              <span className="text-white">/27</span>
              <span className="text-gray-300">255.255.255.224</span>
              <span className="text-gray-400">30</span>
            </div>
            <div className="grid grid-cols-3 px-4 py-2">
              <span className="text-white">/28</span>
              <span className="text-gray-300">255.255.255.240</span>
              <span className="text-gray-400">14</span>
            </div>
            <div className="grid grid-cols-3 px-4 py-2">
              <span className="text-white">/30</span>
              <span className="text-gray-300">255.255.255.252</span>
              <span className="text-gray-400">2</span>
            </div>
          </div>
        </div>

        <div className="bg-net-green/10 border border-net-green/30 rounded-lg p-4">
          <h4 className="text-net-green font-semibold mb-2">🔢 Formula</h4>
          <p className="text-gray-300 font-mono">
            Usable Hosts = 2<sup className="text-net-cyan">(32 - CIDR)</sup> - 2
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Subtract 2 for network address and broadcast address
          </p>
        </div>
      </section>

      {/* Section 4: Subnetting Calculations */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-net-cyan flex items-center gap-2">
          <Calculator size={24} />
          4. Subnetting Calculations
        </h2>

        <p className="text-gray-300">
          Subnetting divides a network into smaller, more manageable subnetworks. 
          This example shows dividing 192.168.1.0/24 into four /26 subnets.
        </p>

        <FlowDiagram chart={subnetDiagram} title="Subnetting 192.168.1.0/24 into /26 Subnets" />

        <div className="bg-net-terminal border border-net-green/20 rounded-xl p-6">
          <h4 className="text-net-green font-semibold mb-4">Subnet Calculation Example</h4>
          <p className="text-gray-400 mb-4">Given: 192.168.1.0/26</p>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between border-b border-net-green/20 pb-2">
              <span className="text-gray-400">Network Address:</span>
              <span className="text-net-green font-mono">192.168.1.0</span>
            </div>
            <div className="flex justify-between border-b border-net-green/20 pb-2">
              <span className="text-gray-400">First Usable Host:</span>
              <span className="text-net-cyan font-mono">192.168.1.1</span>
            </div>
            <div className="flex justify-between border-b border-net-green/20 pb-2">
              <span className="text-gray-400">Last Usable Host:</span>
              <span className="text-net-cyan font-mono">192.168.1.62</span>
            </div>
            <div className="flex justify-between border-b border-net-green/20 pb-2">
              <span className="text-gray-400">Broadcast Address:</span>
              <span className="text-net-orange font-mono">192.168.1.63</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Usable Hosts:</span>
              <span className="text-white font-mono">62 (2^6 - 2)</span>
            </div>
          </div>
        </div>

        <CodeBlock
          code={`# Calculate subnet info using ipcalc
ipcalc 192.168.1.0/26

# Network:   192.168.1.0/26
# Netmask:   255.255.255.192
# Broadcast: 192.168.1.63
# HostMin:   192.168.1.1
# HostMax:   192.168.1.62
# Hosts/Net: 62

# Quick binary conversion
echo "obase=2;192" | bc  # Outputs: 11000000`}
          title="Subnet Calculation Commands"
          language="bash"
        />
      </section>

      {/* Section 5: IPv6 */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-net-cyan flex items-center gap-2">
          <Globe size={24} />
          5. IPv6 Introduction
        </h2>

        <p className="text-gray-300">
          <strong className="text-net-green">IPv6</strong> uses 128-bit addresses (vs IPv4's 32-bit), 
          written in hexadecimal and separated by colons. It provides virtually unlimited addresses.
        </p>

        <div className="bg-net-terminal border border-net-green/20 rounded-xl p-6">
          <h4 className="text-net-green font-semibold mb-4">IPv6 Address Format</h4>
          <div className="font-mono text-center mb-4">
            <p className="text-xl text-white break-all">2001:0db8:85a3:0000:0000:8a2e:0370:7334</p>
          </div>
          <div className="text-sm space-y-2">
            <p className="text-gray-400">Compressed form (remove leading zeros, use :: for consecutive zeros):</p>
            <p className="text-net-cyan font-mono text-center">2001:db8:85a3::8a2e:370:7334</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-net-terminal border border-net-green/20 rounded-lg p-4">
            <h4 className="text-net-green font-semibold mb-2">IPv6 Types</h4>
            <ul className="text-sm space-y-1 text-gray-300">
              <li><strong className="text-net-cyan">::1</strong> - Loopback</li>
              <li><strong className="text-net-cyan">::</strong> - Unspecified</li>
              <li><strong className="text-net-cyan">fe80::/10</strong> - Link-local</li>
              <li><strong className="text-net-cyan">2000::/3</strong> - Global unicast</li>
            </ul>
          </div>
          <div className="bg-net-terminal border border-net-cyan/20 rounded-lg p-4">
            <h4 className="text-net-cyan font-semibold mb-2">IPv6 Benefits</h4>
            <ul className="text-sm space-y-1 text-gray-300">
              <li>• 340 undecillion addresses</li>
              <li>• No NAT required</li>
              <li>• Built-in IPsec support</li>
              <li>• Simplified header</li>
            </ul>
          </div>
        </div>

        <CodeBlock
          code={`# View IPv6 addresses
ip -6 addr show

# Ping IPv6 address
ping6 ::1

# Ping IPv6 host
ping6 google.com

# View IPv6 routing table
ip -6 route show`}
          title="IPv6 Commands"
          language="bash"
        />
      </section>

      {/* Summary */}
      <section className="bg-net-cyan/5 border border-net-cyan/20 rounded-xl p-6">
        <h3 className="text-net-cyan font-semibold mb-4">Key Takeaways</h3>
        <ul className="space-y-2 text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-net-cyan mt-1">•</span>
            IPv4 uses 32-bit addresses; IPv6 uses 128-bit addresses
          </li>
          <li className="flex items-start gap-2">
            <span className="text-net-cyan mt-1">•</span>
            Private IP ranges: 10.x.x.x, 172.16-31.x.x, 192.168.x.x
          </li>
          <li className="flex items-start gap-2">
            <span className="text-net-cyan mt-1">•</span>
            CIDR notation (/24) is shorthand for subnet masks
          </li>
          <li className="flex items-start gap-2">
            <span className="text-net-cyan mt-1">•</span>
            Usable hosts = 2^(32-CIDR) - 2 for network and broadcast
          </li>
        </ul>
      </section>
    </div>
  );
}
