import { FileSpreadsheet, Network, Binary, Shield, Terminal } from 'lucide-react';

export default function CheatSheet() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <header className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-net-cyan/10 rounded-xl flex items-center justify-center">
            <FileSpreadsheet className="text-net-cyan" size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Network Cheat Sheet</h1>
            <p className="text-gray-400">Quick reference for networking essentials</p>
          </div>
        </div>
      </header>

      {/* Subnet Masks */}
      <section className="bg-net-terminal border border-net-green/20 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-net-green flex items-center gap-2 mb-4">
          <Binary size={20} />
          Subnet Mask Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-net-green/20">
                <th className="text-left py-2 px-3 text-net-cyan">CIDR</th>
                <th className="text-left py-2 px-3 text-net-cyan">Subnet Mask</th>
                <th className="text-left py-2 px-3 text-net-cyan">Wildcard</th>
                <th className="text-left py-2 px-3 text-net-cyan">Hosts</th>
                <th className="text-left py-2 px-3 text-net-cyan">Binary</th>
              </tr>
            </thead>
            <tbody className="text-gray-300 font-mono">
              <tr className="border-b border-net-green/10 hover:bg-net-green/5">
                <td className="py-2 px-3">/8</td>
                <td className="py-2 px-3">255.0.0.0</td>
                <td className="py-2 px-3">0.255.255.255</td>
                <td className="py-2 px-3">16,777,214</td>
                <td className="py-2 px-3 text-xs">11111111.00000000.00000000.00000000</td>
              </tr>
              <tr className="border-b border-net-green/10 hover:bg-net-green/5">
                <td className="py-2 px-3">/16</td>
                <td className="py-2 px-3">255.255.0.0</td>
                <td className="py-2 px-3">0.0.255.255</td>
                <td className="py-2 px-3">65,534</td>
                <td className="py-2 px-3 text-xs">11111111.11111111.00000000.00000000</td>
              </tr>
              <tr className="border-b border-net-green/10 hover:bg-net-green/5">
                <td className="py-2 px-3">/24</td>
                <td className="py-2 px-3">255.255.255.0</td>
                <td className="py-2 px-3">0.0.0.255</td>
                <td className="py-2 px-3">254</td>
                <td className="py-2 px-3 text-xs">11111111.11111111.11111111.00000000</td>
              </tr>
              <tr className="border-b border-net-green/10 hover:bg-net-green/5">
                <td className="py-2 px-3">/25</td>
                <td className="py-2 px-3">255.255.255.128</td>
                <td className="py-2 px-3">0.0.0.127</td>
                <td className="py-2 px-3">126</td>
                <td className="py-2 px-3 text-xs">11111111.11111111.11111111.10000000</td>
              </tr>
              <tr className="border-b border-net-green/10 hover:bg-net-green/5">
                <td className="py-2 px-3">/26</td>
                <td className="py-2 px-3">255.255.255.192</td>
                <td className="py-2 px-3">0.0.0.63</td>
                <td className="py-2 px-3">62</td>
                <td className="py-2 px-3 text-xs">11111111.11111111.11111111.11000000</td>
              </tr>
              <tr className="border-b border-net-green/10 hover:bg-net-green/5">
                <td className="py-2 px-3">/27</td>
                <td className="py-2 px-3">255.255.255.224</td>
                <td className="py-2 px-3">0.0.0.31</td>
                <td className="py-2 px-3">30</td>
                <td className="py-2 px-3 text-xs">11111111.11111111.11111111.11100000</td>
              </tr>
              <tr className="border-b border-net-green/10 hover:bg-net-green/5">
                <td className="py-2 px-3">/28</td>
                <td className="py-2 px-3">255.255.255.240</td>
                <td className="py-2 px-3">0.0.0.15</td>
                <td className="py-2 px-3">14</td>
                <td className="py-2 px-3 text-xs">11111111.11111111.11111111.11110000</td>
              </tr>
              <tr className="border-b border-net-green/10 hover:bg-net-green/5">
                <td className="py-2 px-3">/29</td>
                <td className="py-2 px-3">255.255.255.248</td>
                <td className="py-2 px-3">0.0.0.7</td>
                <td className="py-2 px-3">6</td>
                <td className="py-2 px-3 text-xs">11111111.11111111.11111111.11111000</td>
              </tr>
              <tr className="border-b border-net-green/10 hover:bg-net-green/5">
                <td className="py-2 px-3">/30</td>
                <td className="py-2 px-3">255.255.255.252</td>
                <td className="py-2 px-3">0.0.0.3</td>
                <td className="py-2 px-3">2</td>
                <td className="py-2 px-3 text-xs">11111111.11111111.11111111.11111100</td>
              </tr>
              <tr className="hover:bg-net-green/5">
                <td className="py-2 px-3">/32</td>
                <td className="py-2 px-3">255.255.255.255</td>
                <td className="py-2 px-3">0.0.0.0</td>
                <td className="py-2 px-3">1</td>
                <td className="py-2 px-3 text-xs">11111111.11111111.11111111.11111111</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Common Ports */}
      <section className="bg-net-terminal border border-net-cyan/20 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-net-cyan flex items-center gap-2 mb-4">
          <Network size={20} />
          Common Port Numbers
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <h3 className="text-net-green font-semibold mb-3">Well-Known Ports (0-1023)</h3>
            <table className="w-full text-sm">
              <tbody className="text-gray-300">
                <tr className="border-b border-net-cyan/10">
                  <td className="py-1.5 font-mono text-net-cyan">20-21</td>
                  <td className="py-1.5">FTP</td>
                </tr>
                <tr className="border-b border-net-cyan/10">
                  <td className="py-1.5 font-mono text-net-cyan">22</td>
                  <td className="py-1.5">SSH</td>
                </tr>
                <tr className="border-b border-net-cyan/10">
                  <td className="py-1.5 font-mono text-net-cyan">23</td>
                  <td className="py-1.5">Telnet</td>
                </tr>
                <tr className="border-b border-net-cyan/10">
                  <td className="py-1.5 font-mono text-net-cyan">25</td>
                  <td className="py-1.5">SMTP</td>
                </tr>
                <tr className="border-b border-net-cyan/10">
                  <td className="py-1.5 font-mono text-net-cyan">53</td>
                  <td className="py-1.5">DNS</td>
                </tr>
                <tr className="border-b border-net-cyan/10">
                  <td className="py-1.5 font-mono text-net-cyan">67-68</td>
                  <td className="py-1.5">DHCP</td>
                </tr>
                <tr className="border-b border-net-cyan/10">
                  <td className="py-1.5 font-mono text-net-cyan">80</td>
                  <td className="py-1.5">HTTP</td>
                </tr>
                <tr className="border-b border-net-cyan/10">
                  <td className="py-1.5 font-mono text-net-cyan">110</td>
                  <td className="py-1.5">POP3</td>
                </tr>
                <tr className="border-b border-net-cyan/10">
                  <td className="py-1.5 font-mono text-net-cyan">123</td>
                  <td className="py-1.5">NTP</td>
                </tr>
                <tr className="border-b border-net-cyan/10">
                  <td className="py-1.5 font-mono text-net-cyan">143</td>
                  <td className="py-1.5">IMAP</td>
                </tr>
                <tr className="border-b border-net-cyan/10">
                  <td className="py-1.5 font-mono text-net-cyan">161-162</td>
                  <td className="py-1.5">SNMP</td>
                </tr>
                <tr>
                  <td className="py-1.5 font-mono text-net-cyan">443</td>
                  <td className="py-1.5">HTTPS</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <h3 className="text-net-orange font-semibold mb-3">Registered Ports</h3>
            <table className="w-full text-sm">
              <tbody className="text-gray-300">
                <tr className="border-b border-net-orange/10">
                  <td className="py-1.5 font-mono text-net-orange">587</td>
                  <td className="py-1.5">SMTP (submission)</td>
                </tr>
                <tr className="border-b border-net-orange/10">
                  <td className="py-1.5 font-mono text-net-orange">993</td>
                  <td className="py-1.5">IMAPS</td>
                </tr>
                <tr className="border-b border-net-orange/10">
                  <td className="py-1.5 font-mono text-net-orange">995</td>
                  <td className="py-1.5">POP3S</td>
                </tr>
                <tr className="border-b border-net-orange/10">
                  <td className="py-1.5 font-mono text-net-orange">1433</td>
                  <td className="py-1.5">MS SQL</td>
                </tr>
                <tr className="border-b border-net-orange/10">
                  <td className="py-1.5 font-mono text-net-orange">1521</td>
                  <td className="py-1.5">Oracle DB</td>
                </tr>
                <tr className="border-b border-net-orange/10">
                  <td className="py-1.5 font-mono text-net-orange">3306</td>
                  <td className="py-1.5">MySQL</td>
                </tr>
                <tr className="border-b border-net-orange/10">
                  <td className="py-1.5 font-mono text-net-orange">3389</td>
                  <td className="py-1.5">RDP</td>
                </tr>
                <tr className="border-b border-net-orange/10">
                  <td className="py-1.5 font-mono text-net-orange">5432</td>
                  <td className="py-1.5">PostgreSQL</td>
                </tr>
                <tr className="border-b border-net-orange/10">
                  <td className="py-1.5 font-mono text-net-orange">5900</td>
                  <td className="py-1.5">VNC</td>
                </tr>
                <tr>
                  <td className="py-1.5 font-mono text-net-orange">8080</td>
                  <td className="py-1.5">HTTP Alt</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <h3 className="text-net-green font-semibold mb-3">Protocol Numbers</h3>
            <table className="w-full text-sm">
              <tbody className="text-gray-300">
                <tr className="border-b border-net-green/10">
                  <td className="py-1.5 font-mono text-net-green">1</td>
                  <td className="py-1.5">ICMP</td>
                </tr>
                <tr className="border-b border-net-green/10">
                  <td className="py-1.5 font-mono text-net-green">6</td>
                  <td className="py-1.5">TCP</td>
                </tr>
                <tr className="border-b border-net-green/10">
                  <td className="py-1.5 font-mono text-net-green">17</td>
                  <td className="py-1.5">UDP</td>
                </tr>
                <tr className="border-b border-net-green/10">
                  <td className="py-1.5 font-mono text-net-green">47</td>
                  <td className="py-1.5">GRE</td>
                </tr>
                <tr className="border-b border-net-green/10">
                  <td className="py-1.5 font-mono text-net-green">50</td>
                  <td className="py-1.5">ESP</td>
                </tr>
                <tr className="border-b border-net-green/10">
                  <td className="py-1.5 font-mono text-net-green">51</td>
                  <td className="py-1.5">AH</td>
                </tr>
                <tr className="border-b border-net-green/10">
                  <td className="py-1.5 font-mono text-net-green">89</td>
                  <td className="py-1.5">OSPF</td>
                </tr>
                <tr>
                  <td className="py-1.5 font-mono text-net-green">132</td>
                  <td className="py-1.5">SCTP</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Private IP Ranges */}
      <section className="bg-net-terminal border border-net-orange/20 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-net-orange flex items-center gap-2 mb-4">
          <Shield size={20} />
          Private IP Address Ranges (RFC 1918)
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-net-dark rounded-lg p-4">
            <h3 className="text-net-green font-semibold mb-2">Class A</h3>
            <p className="text-white font-mono">10.0.0.0 - 10.255.255.255</p>
            <p className="text-gray-400 text-sm mt-1">10.0.0.0/8 (16,777,216 hosts)</p>
          </div>
          <div className="bg-net-dark rounded-lg p-4">
            <h3 className="text-net-cyan font-semibold mb-2">Class B</h3>
            <p className="text-white font-mono">172.16.0.0 - 172.31.255.255</p>
            <p className="text-gray-400 text-sm mt-1">172.16.0.0/12 (1,048,576 hosts)</p>
          </div>
          <div className="bg-net-dark rounded-lg p-4">
            <h3 className="text-net-orange font-semibold mb-2">Class C</h3>
            <p className="text-white font-mono">192.168.0.0 - 192.168.255.255</p>
            <p className="text-gray-400 text-sm mt-1">192.168.0.0/16 (65,536 hosts)</p>
          </div>
        </div>
        <div className="mt-4 grid md:grid-cols-2 gap-4">
          <div className="bg-net-dark rounded-lg p-4">
            <h3 className="text-gray-400 font-semibold mb-2">Loopback</h3>
            <p className="text-white font-mono">127.0.0.0 - 127.255.255.255</p>
            <p className="text-gray-400 text-sm mt-1">127.0.0.0/8</p>
          </div>
          <div className="bg-net-dark rounded-lg p-4">
            <h3 className="text-gray-400 font-semibold mb-2">Link-Local (APIPA)</h3>
            <p className="text-white font-mono">169.254.0.0 - 169.254.255.255</p>
            <p className="text-gray-400 text-sm mt-1">169.254.0.0/16</p>
          </div>
        </div>
      </section>

      {/* Commands Quick Reference */}
      <section className="bg-net-terminal border border-net-green/20 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-net-green flex items-center gap-2 mb-4">
          <Terminal size={20} />
          Essential Commands
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-net-cyan font-semibold mb-3">Linux/macOS</h3>
            <div className="space-y-2 text-sm font-mono">
              <div className="bg-net-dark rounded p-2">
                <span className="text-net-green">ping</span> <span className="text-gray-400">host</span>
              </div>
              <div className="bg-net-dark rounded p-2">
                <span className="text-net-green">traceroute</span> <span className="text-gray-400">host</span>
              </div>
              <div className="bg-net-dark rounded p-2">
                <span className="text-net-green">ip addr show</span>
              </div>
              <div className="bg-net-dark rounded p-2">
                <span className="text-net-green">ip route</span>
              </div>
              <div className="bg-net-dark rounded p-2">
                <span className="text-net-green">ss -tuln</span>
              </div>
              <div className="bg-net-dark rounded p-2">
                <span className="text-net-green">dig</span> <span className="text-gray-400">domain</span>
              </div>
              <div className="bg-net-dark rounded p-2">
                <span className="text-net-green">tcpdump -i</span> <span className="text-gray-400">eth0</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-net-orange font-semibold mb-3">Windows</h3>
            <div className="space-y-2 text-sm font-mono">
              <div className="bg-net-dark rounded p-2">
                <span className="text-net-orange">ping</span> <span className="text-gray-400">host</span>
              </div>
              <div className="bg-net-dark rounded p-2">
                <span className="text-net-orange">tracert</span> <span className="text-gray-400">host</span>
              </div>
              <div className="bg-net-dark rounded p-2">
                <span className="text-net-orange">ipconfig /all</span>
              </div>
              <div className="bg-net-dark rounded p-2">
                <span className="text-net-orange">route print</span>
              </div>
              <div className="bg-net-dark rounded p-2">
                <span className="text-net-orange">netstat -an</span>
              </div>
              <div className="bg-net-dark rounded p-2">
                <span className="text-net-orange">nslookup</span> <span className="text-gray-400">domain</span>
              </div>
              <div className="bg-net-dark rounded p-2">
                <span className="text-net-orange">ipconfig /flushdns</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OSI Model Quick Reference */}
      <section className="bg-net-terminal border border-net-cyan/20 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-net-cyan flex items-center gap-2 mb-4">
          OSI Model Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-net-cyan/20">
                <th className="text-left py-2 px-3 text-net-green">Layer</th>
                <th className="text-left py-2 px-3 text-net-cyan">Name</th>
                <th className="text-left py-2 px-3 text-net-cyan">PDU</th>
                <th className="text-left py-2 px-3 text-net-cyan">Protocols</th>
                <th className="text-left py-2 px-3 text-net-cyan">Devices</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-net-cyan/10">
                <td className="py-2 px-3 font-mono text-net-green">7</td>
                <td className="py-2 px-3">Application</td>
                <td className="py-2 px-3">Data</td>
                <td className="py-2 px-3">HTTP, FTP, DNS, SMTP</td>
                <td className="py-2 px-3">Gateway, Firewall</td>
              </tr>
              <tr className="border-b border-net-cyan/10">
                <td className="py-2 px-3 font-mono text-net-green">6</td>
                <td className="py-2 px-3">Presentation</td>
                <td className="py-2 px-3">Data</td>
                <td className="py-2 px-3">SSL/TLS, JPEG, ASCII</td>
                <td className="py-2 px-3">-</td>
              </tr>
              <tr className="border-b border-net-cyan/10">
                <td className="py-2 px-3 font-mono text-net-green">5</td>
                <td className="py-2 px-3">Session</td>
                <td className="py-2 px-3">Data</td>
                <td className="py-2 px-3">NetBIOS, RPC</td>
                <td className="py-2 px-3">-</td>
              </tr>
              <tr className="border-b border-net-cyan/10">
                <td className="py-2 px-3 font-mono text-net-cyan">4</td>
                <td className="py-2 px-3">Transport</td>
                <td className="py-2 px-3">Segment</td>
                <td className="py-2 px-3">TCP, UDP</td>
                <td className="py-2 px-3">Load Balancer</td>
              </tr>
              <tr className="border-b border-net-cyan/10">
                <td className="py-2 px-3 font-mono text-net-orange">3</td>
                <td className="py-2 px-3">Network</td>
                <td className="py-2 px-3">Packet</td>
                <td className="py-2 px-3">IP, ICMP, OSPF, BGP</td>
                <td className="py-2 px-3">Router</td>
              </tr>
              <tr className="border-b border-net-cyan/10">
                <td className="py-2 px-3 font-mono text-purple-400">2</td>
                <td className="py-2 px-3">Data Link</td>
                <td className="py-2 px-3">Frame</td>
                <td className="py-2 px-3">Ethernet, 802.11, STP</td>
                <td className="py-2 px-3">Switch, Bridge</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-mono text-gray-400">1</td>
                <td className="py-2 px-3">Physical</td>
                <td className="py-2 px-3">Bits</td>
                <td className="py-2 px-3">Cables, Signals</td>
                <td className="py-2 px-3">Hub, Repeater</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
