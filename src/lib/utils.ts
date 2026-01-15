import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import mermaid from 'mermaid';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function initializeMermaid() {
  mermaid.initialize({
    startOnLoad: true,
    theme: 'dark',
    securityLevel: 'loose',
    fontFamily: 'monospace',
    flowchart: {
      curve: 'basis',
    },
  });
}
