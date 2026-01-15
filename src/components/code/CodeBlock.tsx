import React, { useState } from 'react';
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

  const highlightCLI = (line: string): React.ReactNode[] => {
    // Handle comments
    if (line.trim().startsWith('#') || line.trim().startsWith('//')) {
      return [<span key="comment" style={{ color: COLORS.comment, fontStyle: 'italic' }}>{line}</span>];
    }

    // Network commands pattern
    const commandPattern = /\b(ping|traceroute|tracert|netstat|nslookup|dig|ifconfig|ipconfig|arp|route|nmap|tcpdump|wireshark|ssh|telnet|ftp|curl|wget|nc|netcat|snmpwalk|snmpget|tshark|openvpn|iptables|ip|ss|nmcli|wg-quick|wg)\b/gi;
    
    // Cisco/Network keywords
    const keywordPattern = /\b(show|configure|terminal|interface|address|subnet|mask|gateway|vlan|router|switch|enable|disable|shutdown|description|hostname|spanning-tree|ospf|bgp|eigrp|rip|access-list|permit|deny|nat|acl|sudo)\b/gi;

    // Process the line character by character, identifying patterns
    const tokens: { text: string; type: 'command' | 'keyword' | 'option' | 'ip' | 'string' | 'number' | 'default' }[] = [];
    
    // Split by spaces and process each token
    const parts = line.split(/(\s+)/);
    
    parts.forEach(part => {
      if (part.match(/^\s+$/)) {
        tokens.push({ text: part, type: 'default' });
      } else if (part.match(commandPattern)) {
        tokens.push({ text: part, type: 'command' });
      } else if (part.match(keywordPattern)) {
        tokens.push({ text: part, type: 'keyword' });
      } else if (part.match(/^-{1,2}[a-zA-Z][\w-]*/)) {
        tokens.push({ text: part, type: 'option' });
      } else if (part.match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(\/\d{1,2})?$/)) {
        tokens.push({ text: part, type: 'ip' });
      } else if (part.match(/^["'].*["']$/)) {
        tokens.push({ text: part, type: 'string' });
      } else if (part.match(/^\d+$/)) {
        tokens.push({ text: part, type: 'number' });
      } else {
        tokens.push({ text: part, type: 'default' });
      }
    });

    return tokens.map((token, idx) => {
      const style: React.CSSProperties = {};
      
      switch (token.type) {
        case 'command':
          style.color = COLORS.command;
          style.fontWeight = 600;
          break;
        case 'keyword':
          style.color = COLORS.keyword;
          style.fontWeight = 600;
          break;
        case 'option':
          style.color = COLORS.option;
          break;
        case 'ip':
          style.color = COLORS.ip;
          break;
        case 'string':
          style.color = COLORS.string;
          break;
        case 'number':
          style.color = COLORS.number;
          break;
        default:
          style.color = COLORS.default;
      }

      return <span key={idx} style={style}>{token.text}</span>;
    });
  };

  return (
    <div className={cn('terminal-window', className)}>
      <div className="terminal-header">
        <div className="terminal-dot" style={{ backgroundColor: '#ef4444' }} />
        <div className="terminal-dot" style={{ backgroundColor: '#eab308' }} />
        <div className="terminal-dot" style={{ backgroundColor: '#22c55e' }} />
        <span style={{ marginLeft: '0.75rem', color: '#9ca3af', fontSize: '0.875rem', fontFamily: 'monospace', flex: 1 }}>
          {title || `${language.toUpperCase()}`}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {onRun && (
            <button
              onClick={onRun}
              style={{ padding: '0.375rem', color: '#9ca3af', borderRadius: '0.25rem', background: 'transparent', border: 'none', cursor: 'pointer' }}
              title="Run command"
            >
              <Play size={14} />
            </button>
          )}
          <button
            onClick={handleCopy}
            style={{ padding: '0.375rem', color: '#9ca3af', borderRadius: '0.25rem', background: 'transparent', border: 'none', cursor: 'pointer' }}
            title="Copy code"
          >
            {copied ? <Check size={14} style={{ color: COLORS.keyword }} /> : <Copy size={14} />}
          </button>
        </div>
      </div>

      <div style={{ padding: '1rem', overflowX: 'auto' }}>
        <pre style={{ fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.625' }}>
          {lines.map((line, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                ...(highlightLines.includes(index + 1) ? { backgroundColor: 'rgba(34, 197, 94, 0.1)', margin: '0 -1rem', padding: '0 1rem' } : {})
              }}
            >
              {showLineNumbers && (
                <span style={{ userSelect: 'none', color: '#4b5563', width: '2rem', textAlign: 'right', marginRight: '1rem', flexShrink: 0 }}>
                  {index + 1}
                </span>
              )}
              <code style={{ flex: 1 }}>
                {highlightCLI(line)}
              </code>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}
