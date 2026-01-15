import { useState } from 'react';
import { Copy, Check, Play } from 'lucide-react';
import { cn } from '../../lib/utils';

interface CodeBlockProps {
  code: string;
  title?: string;
  language?: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
  className?: string;
  onRun?: () => void;
}

const COLORS = {
  keyword: '#22c55e',
  command: '#06b6d4',
  option: '#f97316',
  string: '#fbbf24',
  number: '#a78bfa',
  comment: '#6b7280',
  ip: '#22d3ee',
  default: '#e5e7eb',
};

export default function CodeBlock({
  code,
  title,
  language = 'bash',
  showLineNumbers = true,
  highlightLines = [],
  className,
  onRun,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.trim().split('\n');

  const highlightCLI = (line: string): string => {
    if (line.trim().startsWith('#') || line.trim().startsWith('//')) {
      return `<span style="color: ${COLORS.comment}; font-style: italic;">${escapeHtml(line)}</span>`;
    }

    let result = escapeHtml(line);

    const tokens: { regex: RegExp; style: string }[] = [
      // Network commands
      { regex: /\b(ping|traceroute|tracert|netstat|nslookup|dig|ifconfig|ipconfig|arp|route|nmap|tcpdump|wireshark|ssh|telnet|ftp|curl|wget|nc|netcat)\b/gi, style: `color: ${COLORS.command}; font-weight: 600;` },
      // Cisco/Network keywords
      { regex: /\b(show|configure|terminal|interface|ip|address|subnet|mask|gateway|vlan|router|switch|enable|disable|shutdown|no shutdown|description|hostname|spanning-tree|ospf|bgp|eigrp|rip|access-list|permit|deny|nat|acl)\b/gi, style: `color: ${COLORS.keyword}; font-weight: 600;` },
      // Options/flags
      { regex: /\s(-[a-zA-Z]+|--[a-zA-Z-]+)\b/g, style: `color: ${COLORS.option};` },
      // IP addresses
      { regex: /\b(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(\/\d{1,2})?)\b/g, style: `color: ${COLORS.ip};` },
      // MAC addresses
      { regex: /\b([0-9A-Fa-f]{2}[:-]){5}[0-9A-Fa-f]{2}\b/g, style: `color: ${COLORS.ip};` },
      // Numbers
      { regex: /\b(\d+)\b/g, style: `color: ${COLORS.number};` },
      // Strings in quotes
      { regex: /"([^"]*)"/g, style: `color: ${COLORS.string};` },
      { regex: /'([^']*)'/g, style: `color: ${COLORS.string};` },
    ];

    tokens.forEach(({ regex, style }) => {
      result = result.replace(regex, (match) => `<span style="${style}">${match}</span>`);
    });

    return result;
  };

  const escapeHtml = (text: string): string => {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  };

  return (
    <div className={cn('terminal-window', className)}>
      <div className="terminal-header">
        <div className="terminal-dot bg-red-500" />
        <div className="terminal-dot bg-yellow-500" />
        <div className="terminal-dot bg-green-500" />
        <span className="ml-3 text-gray-400 text-sm font-mono flex-1">
          {title || `${language.toUpperCase()}`}
        </span>
        <div className="flex items-center gap-2">
          {onRun && (
            <button
              onClick={onRun}
              className="p-1.5 text-gray-400 hover:text-net-green hover:bg-net-green/10 rounded transition-all"
              title="Run command"
            >
              <Play size={14} />
            </button>
          )}
          <button
            onClick={handleCopy}
            className="p-1.5 text-gray-400 hover:text-net-green hover:bg-net-green/10 rounded transition-all"
            title="Copy code"
          >
            {copied ? <Check size={14} style={{ color: COLORS.keyword }} /> : <Copy size={14} />}
          </button>
        </div>
      </div>

      <div className="p-4 overflow-x-auto">
        <pre className="font-mono text-sm leading-relaxed">
          {lines.map((line, index) => (
            <div
              key={index}
              className={cn(
                'flex',
                highlightLines.includes(index + 1) && 'bg-net-green/10 -mx-4 px-4'
              )}
            >
              {showLineNumbers && (
                <span className="select-none text-gray-600 w-8 text-right mr-4 flex-shrink-0">
                  {index + 1}
                </span>
              )}
              <code
                className="flex-1"
                dangerouslySetInnerHTML={{
                  __html: highlightCLI(line),
                }}
              />
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}
