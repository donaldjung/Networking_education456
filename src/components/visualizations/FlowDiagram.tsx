import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import { cn } from '../../lib/utils';

interface FlowDiagramProps {
  chart: string;
  title?: string;
  className?: string;
}

export default function FlowDiagram({ chart, title, className }: FlowDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'dark',
      securityLevel: 'loose',
      fontFamily: 'monospace',
      flowchart: {
        curve: 'basis',
        padding: 20,
      },
      themeVariables: {
        primaryColor: '#22c55e',
        primaryTextColor: '#e5e7eb',
        primaryBorderColor: '#16a34a',
        lineColor: '#06b6d4',
        secondaryColor: '#1e3a2f',
        tertiaryColor: '#0d1a0d',
        background: '#0a0f0a',
        mainBkg: '#1e3a2f',
        nodeBorder: '#22c55e',
        clusterBkg: '#0d1a0d',
        clusterBorder: '#22c55e',
        titleColor: '#22c55e',
        edgeLabelBackground: '#0a0f0a',
      },
    });

    const renderDiagram = async () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        try {
          const { svg } = await mermaid.render(id, chart);
          containerRef.current.innerHTML = svg;
        } catch (error) {
          console.error('Mermaid rendering error:', error);
          containerRef.current.innerHTML = `<div class="text-red-400 p-4">Error rendering diagram</div>`;
        }
      }
    };

    renderDiagram();
  }, [chart]);

  return (
    <div className={cn('terminal-window', className)}>
      {title && (
        <div className="terminal-header">
          <div className="terminal-dot bg-red-500" />
          <div className="terminal-dot bg-yellow-500" />
          <div className="terminal-dot bg-green-500" />
          <span className="ml-3 text-net-cyan text-sm font-mono">{title}</span>
        </div>
      )}
      <div className="p-6 flex justify-center overflow-x-auto bg-net-dark/50" ref={containerRef} />
    </div>
  );
}
