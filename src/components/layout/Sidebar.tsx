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

      {/* Footer */}
      <div className="p-4 border-t border-net-green/20">
        <p className="text-xs text-gray-500">IT Professional</p>
        <p className="text-xs text-gray-600">Training Platform v1.0</p>
      </div>
    </aside>
  );
}
