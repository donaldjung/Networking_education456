import { Link } from 'react-router-dom';
import { 
  Network, 
  Binary, 
  GitBranch, 
  FileText, 
  Shield, 
  Wifi, 
  Wrench,
  ArrowRight,
  BookOpen,
  Code,
  Zap
} from 'lucide-react';
import CodeBlock from '../components/code/CodeBlock';

const modules = [
  {
    id: 1,
    title: 'Network Fundamentals',
    description: 'OSI model, TCP/IP, network devices and topologies',
    icon: Network,
    color: 'net-green',
  },
  {
    id: 2,
    title: 'IP Addressing',
    description: 'IPv4/IPv6 addressing, subnetting, and CIDR notation',
    icon: Binary,
    color: 'net-cyan',
  },
  {
    id: 3,
    title: 'Routing & Switching',
    description: 'Routing protocols, switching, and STP',
    icon: GitBranch,
    color: 'net-green',
  },
  {
    id: 4,
    title: 'Network Protocols',
    description: 'TCP/UDP, DNS, DHCP, HTTP/HTTPS, and more',
    icon: FileText,
    color: 'net-cyan',
  },
  {
    id: 5,
    title: 'Network Security',
    description: 'Firewalls, VPNs, IDS/IPS, and security practices',
    icon: Shield,
    color: 'net-orange',
  },
  {
    id: 6,
    title: 'Wireless & VLANs',
    description: 'WiFi standards, wireless security, and VLANs',
    icon: Wifi,
    color: 'net-green',
  },
  {
    id: 7,
    title: 'Troubleshooting',
    description: 'Diagnostic tools, Wireshark, and best practices',
    icon: Wrench,
    color: 'net-cyan',
  },
];

const sampleCode = `# Check network connectivity
ping -c 4 8.8.8.8

# Trace route to destination
traceroute google.com

# Display network interfaces
ifconfig -a

# Show routing table
netstat -rn

# DNS lookup
nslookup example.com`;

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12">
        <div className="flex items-center justify-center gap-4 mb-6">
          <img src="/network-icon.svg" alt="Network" className="w-16 h-16" />
          <div className="text-left">
            <h1 className="text-4xl font-bold text-net-green">Network Education</h1>
            <p className="text-gray-400 font-mono">IT Professional Training Platform</p>
          </div>
        </div>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
          Master computer networking from fundamentals to advanced enterprise configurations. 
          Learn protocols, security, troubleshooting, and industry best practices.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            to="/module/1"
            className="inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-lg transition-all"
            style={{ backgroundColor: '#22c55e', color: '#000' }}
          >
            <BookOpen size={20} />
            Start Learning
            <ArrowRight size={18} />
          </Link>
          <Link
            to="/playground"
            className="inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-lg transition-all"
            style={{ border: '1px solid #06b6d4', color: '#06b6d4' }}
          >
            <Code size={20} />
            Open Playground
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-3 gap-6">
        <div className="bg-net-terminal border border-net-green/20 rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-net-green/10 rounded-lg flex items-center justify-center mx-auto mb-4">
            <BookOpen className="text-net-green" size={24} />
          </div>
          <p className="text-3xl font-bold text-white mb-1">7</p>
          <p className="text-gray-400 text-sm">Learning Modules</p>
        </div>
        <div className="bg-net-terminal border border-net-cyan/20 rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-net-cyan/10 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Code className="text-net-cyan" size={24} />
          </div>
          <p className="text-3xl font-bold text-white mb-1">50+</p>
          <p className="text-gray-400 text-sm">Command Examples</p>
        </div>
        <div className="bg-net-terminal border border-net-orange/20 rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-net-orange/10 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Zap className="text-net-orange" size={24} />
          </div>
          <p className="text-3xl font-bold text-white mb-1">TCP/IP</p>
          <p className="text-gray-400 text-sm">Protocol Focus</p>
        </div>
      </section>

      {/* Sample Code */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-net-cyan">What You'll Learn</h2>
        <CodeBlock
          code={sampleCode}
          title="network_diagnostics.sh"
          language="bash"
        />
        <p className="text-gray-400">
          By the end of this course, you'll confidently use these commands and understand the networking concepts behind them.
        </p>
      </section>

      {/* Learning Path */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-net-cyan">Learning Path</h2>
        <div className="space-y-4">
          {modules.map((module) => (
            <Link
              key={module.id}
              to={`/module/${module.id}`}
              className="block group"
            >
              <div className={`bg-net-terminal border border-${module.color}/20 rounded-xl p-6 hover:border-${module.color}/50 transition-all`}>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 bg-${module.color}/10 rounded-lg flex items-center justify-center`}>
                    <module.icon className={`text-${module.color}`} size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-net-orange font-mono text-sm">Module {module.id}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-net-green transition-colors">
                      {module.title}
                    </h3>
                    <p className="text-gray-400 text-sm">{module.description}</p>
                  </div>
                  <ArrowRight className="text-gray-600 group-hover:text-net-green transition-colors" size={20} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Networking */}
      <section className="grid md:grid-cols-2 gap-8">
        <div className="bg-net-terminal border border-net-green/20 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-net-green mb-4">Foundation of IT</h3>
          <p className="text-gray-300 mb-4">
            Computer networking is the backbone of modern IT infrastructure. Whether you're working in 
            cloud computing, cybersecurity, or system administration, understanding networks is essential.
          </p>
          <ul className="space-y-2 text-gray-400">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-net-green rounded-full" />
              Essential for cloud and DevOps roles
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-net-green rounded-full" />
              Required for security certifications
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-net-green rounded-full" />
              Critical for troubleshooting skills
            </li>
          </ul>
        </div>
        <div className="bg-net-terminal border border-net-cyan/20 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-net-cyan mb-4">Career Advancement</h3>
          <p className="text-gray-300 mb-4">
            Network knowledge opens doors to various career paths and certifications like CCNA, 
            Network+, and AWS networking specializations.
          </p>
          <ul className="space-y-2 text-gray-400">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-net-cyan rounded-full" />
              Network Engineer/Administrator
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-net-cyan rounded-full" />
              Security Analyst/Engineer
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-net-cyan rounded-full" />
              Cloud/DevOps Engineer
            </li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-8 rounded-xl" style={{ backgroundColor: '#0d1a0d', border: '1px solid rgba(34, 197, 94, 0.2)' }}>
        <p className="text-gray-400 mb-4">Ready to build your networking expertise?</p>
        <Link
          to="/module/1"
          className="inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-lg transition-all"
          style={{ backgroundColor: '#22c55e', color: '#000' }}
        >
          Begin with Fundamentals
          <ArrowRight size={18} />
        </Link>
      </section>
    </div>
  );
}
