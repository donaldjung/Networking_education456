import { useState } from 'react';
import { BookOpen, Search } from 'lucide-react';

const glossaryTerms = [
  { term: 'ACL', definition: 'Access Control List - A set of rules that filter network traffic by permitting or denying packets based on source/destination IP, port, or protocol.' },
  { term: 'ARP', definition: 'Address Resolution Protocol - Resolves IP addresses to MAC addresses on a local network segment.' },
  { term: 'AS', definition: 'Autonomous System - A collection of networks under a single administrative domain that shares a common routing policy.' },
  { term: 'Bandwidth', definition: 'The maximum rate of data transfer across a network path, typically measured in bits per second (bps).' },
  { term: 'BGP', definition: 'Border Gateway Protocol - The routing protocol of the Internet, used to exchange routing information between autonomous systems.' },
  { term: 'Broadcast', definition: 'A network transmission sent to all devices on a network segment simultaneously.' },
  { term: 'CIDR', definition: 'Classless Inter-Domain Routing - A method for allocating IP addresses and routing that replaces the older classful addressing system.' },
  { term: 'Collision Domain', definition: 'A network segment where data packets can collide with one another. Switches separate collision domains.' },
  { term: 'DHCP', definition: 'Dynamic Host Configuration Protocol - Automatically assigns IP addresses and network configuration to devices on a network.' },
  { term: 'DMZ', definition: 'Demilitarized Zone - A network segment that sits between an internal network and the Internet, hosting public-facing services.' },
  { term: 'DNS', definition: 'Domain Name System - Translates human-readable domain names into IP addresses.' },
  { term: 'EIGRP', definition: 'Enhanced Interior Gateway Routing Protocol - A Cisco proprietary advanced distance-vector routing protocol.' },
  { term: 'Encapsulation', definition: 'The process of wrapping data with protocol headers as it moves down the OSI model layers.' },
  { term: 'Ethernet', definition: 'The most common LAN technology, defining wiring and signaling standards for the physical and data link layers.' },
  { term: 'Firewall', definition: 'A network security device that monitors and controls incoming and outgoing network traffic based on predetermined rules.' },
  { term: 'Frame', definition: 'A Layer 2 data unit that includes the header, payload, and trailer for transmission over a local network.' },
  { term: 'FTP', definition: 'File Transfer Protocol - A protocol for transferring files between systems over TCP ports 20 and 21.' },
  { term: 'Full Duplex', definition: 'A communication mode where data can be transmitted and received simultaneously in both directions.' },
  { term: 'Gateway', definition: 'A device that connects two different networks, often providing protocol translation or routing services.' },
  { term: 'Half Duplex', definition: 'A communication mode where data can only flow in one direction at a time.' },
  { term: 'HSRP', definition: 'Hot Standby Router Protocol - A Cisco protocol providing network redundancy by allowing multiple routers to work together.' },
  { term: 'HTTP', definition: 'Hypertext Transfer Protocol - The foundation of data communication on the World Wide Web, operating on port 80.' },
  { term: 'HTTPS', definition: 'HTTP Secure - HTTP encrypted with TLS/SSL, providing secure web communication on port 443.' },
  { term: 'ICMP', definition: 'Internet Control Message Protocol - Used for network diagnostics and error reporting (e.g., ping, traceroute).' },
  { term: 'IDS', definition: 'Intrusion Detection System - Monitors network traffic for suspicious activity and alerts administrators.' },
  { term: 'IGMP', definition: 'Internet Group Management Protocol - Manages multicast group membership on IPv4 networks.' },
  { term: 'IPS', definition: 'Intrusion Prevention System - Monitors network traffic and can actively block detected threats.' },
  { term: 'IPSec', definition: 'Internet Protocol Security - A protocol suite for securing IP communications through authentication and encryption.' },
  { term: 'IPv4', definition: 'Internet Protocol version 4 - The fourth version of IP, using 32-bit addresses (e.g., 192.168.1.1).' },
  { term: 'IPv6', definition: 'Internet Protocol version 6 - The latest version of IP, using 128-bit addresses for a vastly larger address space.' },
  { term: 'Jitter', definition: 'Variation in packet arrival times, particularly problematic for real-time applications like VoIP.' },
  { term: 'Latency', definition: 'The time delay for data to travel from source to destination, typically measured in milliseconds.' },
  { term: 'MAC Address', definition: 'Media Access Control address - A unique 48-bit hardware identifier assigned to network interface cards.' },
  { term: 'MTU', definition: 'Maximum Transmission Unit - The largest size of a packet that can be transmitted without fragmentation.' },
  { term: 'Multicast', definition: 'A network transmission sent to a specific group of devices rather than all devices or a single device.' },
  { term: 'NAT', definition: 'Network Address Translation - Modifies IP address information in packet headers, commonly used to share one public IP among multiple private IPs.' },
  { term: 'NIC', definition: 'Network Interface Card - Hardware that connects a device to a network.' },
  { term: 'NTP', definition: 'Network Time Protocol - Synchronizes system clocks across a network.' },
  { term: 'OSI Model', definition: 'Open Systems Interconnection - A seven-layer conceptual framework for understanding network communication.' },
  { term: 'OSPF', definition: 'Open Shortest Path First - A link-state routing protocol commonly used in enterprise networks.' },
  { term: 'Packet', definition: 'A unit of data at Layer 3 (Network layer), containing source and destination IP addresses.' },
  { term: 'Ping', definition: 'A network utility that tests connectivity between devices using ICMP echo requests and replies.' },
  { term: 'Port', definition: 'A logical endpoint for network communication, identified by a 16-bit number (0-65535).' },
  { term: 'QoS', definition: 'Quality of Service - Techniques for managing network resources to prioritize certain types of traffic.' },
  { term: 'RADIUS', definition: 'Remote Authentication Dial-In User Service - A protocol providing centralized authentication and accounting.' },
  { term: 'RIP', definition: 'Routing Information Protocol - A distance-vector routing protocol using hop count as its metric (max 15 hops).' },
  { term: 'Router', definition: 'A Layer 3 device that forwards packets between different networks based on IP addresses.' },
  { term: 'RSTP', definition: 'Rapid Spanning Tree Protocol - An enhanced version of STP with faster convergence times.' },
  { term: 'Segment', definition: 'A Layer 4 data unit (TCP) or a portion of a network separated by routers or switches.' },
  { term: 'SNMP', definition: 'Simple Network Management Protocol - Used for monitoring and managing network devices.' },
  { term: 'SSH', definition: 'Secure Shell - A cryptographic protocol for secure remote access and command execution.' },
  { term: 'SSL', definition: 'Secure Sockets Layer - A deprecated cryptographic protocol, replaced by TLS for secure communications.' },
  { term: 'STP', definition: 'Spanning Tree Protocol - Prevents Layer 2 loops by blocking redundant paths in a switched network.' },
  { term: 'Subnet', definition: 'A logical subdivision of an IP network, created by borrowing bits from the host portion of an address.' },
  { term: 'Switch', definition: 'A Layer 2 device that forwards frames based on MAC addresses, creating separate collision domains per port.' },
  { term: 'TCP', definition: 'Transmission Control Protocol - A reliable, connection-oriented transport protocol with guaranteed delivery.' },
  { term: 'TCP/IP', definition: 'Transmission Control Protocol/Internet Protocol - The fundamental protocol suite of the Internet.' },
  { term: 'TLS', definition: 'Transport Layer Security - A cryptographic protocol providing secure communications over a network.' },
  { term: 'Traceroute', definition: 'A network diagnostic tool that displays the path packets take to reach a destination.' },
  { term: 'Trunk', definition: 'A link that carries multiple VLAN traffic using tagging (802.1Q) between switches or to a router.' },
  { term: 'TTL', definition: 'Time To Live - A counter in IP packets that limits their lifetime, preventing infinite loops.' },
  { term: 'UDP', definition: 'User Datagram Protocol - A connectionless transport protocol with low overhead but no guaranteed delivery.' },
  { term: 'Unicast', definition: 'A network transmission from one source to one specific destination.' },
  { term: 'VLAN', definition: 'Virtual Local Area Network - A logical grouping of devices on different physical LAN segments into one broadcast domain.' },
  { term: 'VPN', definition: 'Virtual Private Network - Creates an encrypted tunnel over a public network for secure communication.' },
  { term: 'VRRP', definition: 'Virtual Router Redundancy Protocol - An open standard protocol for router failover similar to HSRP.' },
  { term: 'WAN', definition: 'Wide Area Network - A network spanning a large geographic area, connecting multiple LANs.' },
  { term: 'Wildcard Mask', definition: 'The inverse of a subnet mask, used in ACLs and routing protocols to match IP address ranges.' },
  { term: 'WPA', definition: 'Wi-Fi Protected Access - A wireless security protocol (WPA2 and WPA3 are current standards).' },
];

export default function Glossary() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTerms = glossaryTerms.filter(
    (item) =>
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group terms by first letter
  const groupedTerms = filteredTerms.reduce((acc, item) => {
    const firstLetter = item.term[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(item);
    return acc;
  }, {} as Record<string, typeof glossaryTerms>);

  const letters = Object.keys(groupedTerms).sort();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <header className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-net-orange/10 rounded-xl flex items-center justify-center">
            <BookOpen className="text-net-orange" size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Network Glossary</h1>
            <p className="text-gray-400">Comprehensive networking terminology reference</p>
          </div>
        </div>
      </header>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
        <input
          type="text"
          placeholder="Search terms..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-net-terminal border border-net-green/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-net-green/50"
        />
      </div>

      {/* Letter Navigation */}
      <div className="flex flex-wrap gap-2">
        {letters.map((letter) => (
          <a
            key={letter}
            href={`#letter-${letter}`}
            className="w-8 h-8 flex items-center justify-center bg-net-terminal border border-net-green/20 rounded text-net-green hover:bg-net-green/10 transition-all text-sm font-mono"
          >
            {letter}
          </a>
        ))}
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 text-sm text-gray-400">
        <span>{filteredTerms.length} terms</span>
        {searchTerm && <span>matching "{searchTerm}"</span>}
      </div>

      {/* Terms */}
      <div className="space-y-8">
        {letters.map((letter) => (
          <section key={letter} id={`letter-${letter}`}>
            <h2 className="text-2xl font-bold text-net-green mb-4 border-b border-net-green/20 pb-2">
              {letter}
            </h2>
            <div className="space-y-4">
              {groupedTerms[letter].map((item) => (
                <div
                  key={item.term}
                  className="bg-net-terminal border border-net-green/20 rounded-lg p-4 hover:border-net-green/40 transition-all"
                >
                  <h3 className="text-net-cyan font-semibold text-lg">{item.term}</h3>
                  <p className="text-gray-300 mt-1">{item.definition}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* No results */}
      {filteredTerms.length === 0 && (
        <div className="text-center py-12">
          <Search className="mx-auto text-gray-600 mb-4" size={48} />
          <p className="text-gray-400">No terms found matching "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
}
