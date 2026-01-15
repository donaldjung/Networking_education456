import { cn } from '../../lib/utils';

interface OutputDisplayProps {
  output: string;
  title?: string;
  className?: string;
  success?: boolean;
}

export default function OutputDisplay({
  output,
  title = 'Output',
  className,
  success = true,
}: OutputDisplayProps) {
  const lines = output.trim().split('\n');

  return (
    <div className={cn('terminal-window', className)}>
      <div className="terminal-header">
        <div className="terminal-dot bg-red-500" />
        <div className="terminal-dot bg-yellow-500" />
        <div className="terminal-dot bg-green-500" />
        <span className="ml-3 text-gray-400 text-sm font-mono flex-1">{title}</span>
        <span className={cn(
          'text-xs px-2 py-0.5 rounded',
          success ? 'bg-net-green/20 text-net-green' : 'bg-red-500/20 text-red-400'
        )}>
          {success ? 'Success' : 'Error'}
        </span>
      </div>

      <div className="p-4 overflow-x-auto bg-black/30">
        <pre className="font-mono text-sm leading-relaxed text-gray-300">
          {lines.map((line, index) => (
            <div key={index} className="flex">
              <span className="select-none text-net-green mr-2">$</span>
              <code className="flex-1">{line}</code>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}
