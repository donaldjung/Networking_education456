import { Search, Terminal, Bell, X, FileText, Code, BookOpen, ArrowRight } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const searchData = [
  { 
    title: 'Network Fundamentals', 
    path: '/module/1', 
    type: 'module',
    keywords: ['osi', 'tcp/ip', 'topology', 'router', 'switch', 'hub', 'layers', 'model'],
    description: 'OSI model, TCP/IP, network devices and topologies'
  },
  { 
    title: 'IP Addressing', 
    path: '/module/2', 
    type: 'module',
    keywords: ['ipv4', 'ipv6', 'subnet', 'cidr', 'mask', 'private', 'public', 'addressing'],
    description: 'IPv4/IPv6 addressing, subnetting, and CIDR notation'
  },
  { 
    title: 'Routing & Switching', 
    path: '/module/3', 
    type: 'module',
    keywords: ['routing', 'ospf', 'bgp', 'rip', 'eigrp', 'stp', 'spanning tree', 'static'],
    description: 'Routing protocols, switching, and STP'
  },
  { 
    title: 'Network Protocols', 
    path: '/module/4', 
    type: 'module',
    keywords: ['tcp', 'udp', 'dns', 'dhcp', 'http', 'https', 'ftp', 'ssh', 'smtp'],
    description: 'TCP/UDP, DNS, DHCP, HTTP/HTTPS, and more'
  },
  { 
    title: 'Network Security', 
    path: '/module/5', 
    type: 'module',
    keywords: ['firewall', 'vpn', 'ipsec', 'ids', 'ips', 'ddos', 'encryption', 'nac'],
    description: 'Firewalls, VPNs, IDS/IPS, and security best practices'
  },
  { 
    title: 'Wireless & VLANs', 
    path: '/module/6', 
    type: 'module',
    keywords: ['wifi', 'wlan', '802.11', 'wpa', 'vlan', 'trunk', 'segmentation'],
    description: 'WiFi standards, wireless security, and VLANs'
  },
  { 
    title: 'Troubleshooting', 
    path: '/module/7', 
    type: 'module',
    keywords: ['ping', 'traceroute', 'netstat', 'wireshark', 'debug', 'diagnose', 'snmp'],
    description: 'Diagnostic tools, Wireshark, and troubleshooting methodology'
  },
  { 
    title: 'Playground', 
    path: '/playground', 
    type: 'tool',
    keywords: ['simulator', 'practice', 'commands', 'calculator', 'subnet'],
    description: 'Network command simulator and subnet calculator'
  },
  { 
    title: 'Cheat Sheet', 
    path: '/cheatsheet', 
    type: 'tool',
    keywords: ['reference', 'quick', 'ports', 'commands', 'syntax'],
    description: 'Quick reference for ports, subnets, and commands'
  },
  { 
    title: 'Glossary', 
    path: '/glossary', 
    type: 'tool',
    keywords: ['terms', 'definitions', 'acronyms', 'vocabulary'],
    description: 'Networking terminology and acronyms'
  },
]

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const searchResults = searchQuery.trim() === '' 
    ? searchData 
    : searchData.filter(item => {
        const query = searchQuery.toLowerCase()
        return (
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.keywords.some(keyword => keyword.toLowerCase().includes(query))
        )
      })

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen(true)
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false)
        setSearchQuery('')
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isSearchOpen])

  useEffect(() => {
    setSelectedIndex(0)
  }, [searchQuery])

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => Math.min(prev + 1, searchResults.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => Math.max(prev - 1, 0))
    } else if (e.key === 'Enter' && searchResults[selectedIndex]) {
      e.preventDefault()
      navigateToResult(searchResults[selectedIndex].path)
    }
  }

  const navigateToResult = (path: string) => {
    navigate(path)
    setIsSearchOpen(false)
    setSearchQuery('')
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'module': return <FileText size={16} className="text-net-green" />
      case 'tool': return <Code size={16} className="text-net-cyan" />
      default: return <BookOpen size={16} className="text-gray-400" />
    }
  }

  return (
    <>
      <header className="sticky top-0 z-40 h-16 bg-net-darker/80 backdrop-blur-md border-b border-net-green/20 px-8 flex items-center justify-between">
        <button 
          onClick={() => setIsSearchOpen(true)}
          className="relative w-96 flex items-center"
        >
          <Search className="absolute left-3 text-gray-500" size={18} />
          <div className="w-full pl-10 pr-4 py-2 bg-net-terminal border border-net-green/20 rounded-lg text-gray-500 text-left font-mono text-sm cursor-pointer hover:border-net-green/40 transition-all">
            Search documentation...
          </div>
          <kbd className="absolute right-3 px-2 py-0.5 bg-net-dark rounded text-xs text-gray-500 border border-gray-700">
            ⌘K
          </kbd>
        </button>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-net-green/10 rounded-full border border-net-green/30">
            <div className="w-2 h-2 rounded-full bg-net-green animate-pulse" />
            <span className="text-net-green text-xs font-mono">CONNECTED</span>
          </div>

          <button className="p-2 text-gray-400 hover:text-net-green hover:bg-net-green/10 rounded-lg transition-all">
            <Terminal size={20} />
          </button>

          <button className="p-2 text-gray-400 hover:text-net-cyan hover:bg-net-cyan/10 rounded-lg transition-all relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-net-orange rounded-full" />
          </button>

          <div className="px-3 py-1 bg-net-terminal rounded-md border border-net-green/20">
            <span className="text-xs font-mono text-net-orange">TCP/IP</span>
          </div>
        </div>
      </header>

      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24">
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => {
              setIsSearchOpen(false)
              setSearchQuery('')
            }}
          />
          
          <div className="relative w-full max-w-2xl bg-net-darker border border-net-green/30 rounded-xl shadow-2xl shadow-net-green/10 overflow-hidden">
            <div className="flex items-center px-4 border-b border-net-green/20">
              <Search className="text-net-green" size={20} />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search modules, tools, and documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                className="flex-1 px-4 py-4 bg-transparent text-gray-200 placeholder-gray-500 focus:outline-none font-mono"
              />
              <button 
                onClick={() => {
                  setIsSearchOpen(false)
                  setSearchQuery('')
                }}
                className="p-1.5 text-gray-500 hover:text-gray-300 hover:bg-net-green/10 rounded transition-all"
              >
                <X size={18} />
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {searchResults.length === 0 ? (
                <div className="px-4 py-8 text-center text-gray-500">
                  <Search size={40} className="mx-auto mb-3 opacity-30" />
                  <p>No results found for "{searchQuery}"</p>
                </div>
              ) : (
                <div className="py-2">
                  {searchResults.map((result, index) => (
                    <button
                      key={result.path}
                      onClick={() => navigateToResult(result.path)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full px-4 py-3 flex items-center gap-3 text-left transition-all ${
                        index === selectedIndex 
                          ? 'bg-net-green/10 border-l-2 border-net-green' 
                          : 'hover:bg-net-green/5 border-l-2 border-transparent'
                      }`}
                    >
                      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-net-terminal rounded-lg">
                        {getIcon(result.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-200 font-medium truncate">{result.title}</span>
                          <span className={`text-xs px-1.5 py-0.5 rounded ${
                            result.type === 'module' 
                              ? 'bg-net-green/20 text-net-green' 
                              : 'bg-net-cyan/20 text-net-cyan'
                          }`}>
                            {result.type}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 truncate">{result.description}</p>
                      </div>
                      <ArrowRight size={16} className={`flex-shrink-0 transition-opacity ${
                        index === selectedIndex ? 'text-net-green opacity-100' : 'opacity-0'
                      }`} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="px-4 py-2 border-t border-net-green/20 flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-net-terminal rounded border border-gray-700">↑</kbd>
                <kbd className="px-1.5 py-0.5 bg-net-terminal rounded border border-gray-700">↓</kbd>
                to navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-net-terminal rounded border border-gray-700">↵</kbd>
                to select
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-net-terminal rounded border border-gray-700">esc</kbd>
                to close
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
