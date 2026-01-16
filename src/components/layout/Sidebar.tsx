import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Network, 
  Binary, 
  GitBranch, 
  FileText, 
  Shield, 
  Wifi, 
  Wrench,
  Code,
  FileSpreadsheet,
  BookOpen
} from 'lucide-react';
import { cn } from '../../lib/utils';

const modules = [
  { id: 1, name: 'Network Fundamentals', icon: Network, path: '/module/1' },
  { id: 2, name: 'IP Addressing', icon: Binary, path: '/module/2' },
  { id: 3, name: 'Routing & Switching', icon: GitBranch, path: '/module/3' },
  { id: 4, name: 'Network Protocols', icon: FileText, path: '/module/4' },
  { id: 5, name: 'Network Security', icon: Shield, path: '/module/5' },
  { id: 6, name: 'Wireless & VLANs', icon: Wifi, path: '/module/6' },
  { id: 7, name: 'Troubleshooting', icon: Wrench, path: '/module/7' },
];

const tools = [
  { name: 'Playground', icon: Code, path: '/playground' },
  { name: 'Cheat Sheet', icon: FileSpreadsheet, path: '/cheatsheet' },
  { name: 'Glossary', icon: BookOpen, path: '/glossary' },
];

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-net-darker border-r border-net-green/20 flex flex-col z-50">
      {/* Logo */}
      <Link to="/" className="p-6 flex items-center gap-3 border-b border-net-green/20 hover:bg-net-green/5 transition-colors">
        <img src="/network-icon.svg" alt="Network" className="w-10 h-10" />
        <div>
          <h1 className="text-net-green font-bold text-lg">Network</h1>
          <span className="text-gray-400 text-sm">Education</span>
        </div>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        {/* Home */}
        <Link
          to="/"
          className={cn(
            'flex items-center gap-3 px-6 py-3 text-sm transition-all',
            location.pathname === '/'
              ? 'text-net-green bg-net-green/10 border-l-2 border-net-green'
              : 'text-gray-400 hover:text-net-green hover:bg-net-green/5 border-l-2 border-transparent'
          )}
        >
          <Home size={18} />
          <span>Home</span>
        </Link>

        {/* Modules */}
        <div className="mt-6 px-6">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Modules</h3>
          <div className="space-y-1">
            {modules.map((module) => (
              <Link
                key={module.id}
                to={module.path}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all',
                  location.pathname === module.path
                    ? 'text-net-green bg-net-green/10 border-l-2 border-net-green -ml-3 pl-6'
                    : 'text-gray-400 hover:text-net-green hover:bg-net-green/5'
                )}
              >
                <module.icon size={16} />
                <span>
                  <span className="text-net-orange font-mono">{module.id}.</span> {module.name}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Tools */}
        <div className="mt-6 px-6">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Tools</h3>
          <div className="space-y-1">
            {tools.map((tool) => (
              <Link
                key={tool.name}
                to={tool.path}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all',
                  location.pathname === tool.path
                    ? 'text-net-cyan bg-net-cyan/10 border-l-2 border-net-cyan -ml-3 pl-6'
                    : 'text-gray-400 hover:text-net-cyan hover:bg-net-cyan/5'
                )}
              >
                <tool.icon size={16} />
                <span>{tool.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Footer with LinkedIn & Watermark */}
      <div className="p-4 border-t border-net-green/20">
        {/* LinkedIn Button */}
        <a
          href="https://www.linkedin.com/in/donald-jung/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg mb-3 transition-all duration-300 hover:scale-105"
          style={{ 
            background: 'linear-gradient(135deg, #0077b5 0%, #005582 100%)',
            boxShadow: '0 4px 15px rgba(0, 119, 181, 0.3)'
          }}
        >
          <LinkedInIcon />
          <span className="text-white text-sm font-medium">Connect on LinkedIn</span>
        </a>
        
        {/* Watermark */}
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-[0.2em] text-gray-600 mb-1">crafted with ♥ by</p>
          <p 
            className="text-sm font-semibold tracking-wide"
            style={{ 
              background: 'linear-gradient(135deg, #22c55e 0%, #06b6d4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Donald Jung
          </p>
        </div>
      </div>
    </aside>
  );
}
