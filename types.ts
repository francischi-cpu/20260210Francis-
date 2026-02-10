
export interface Question {
  id: number;
  text: string;
  options: {
    label: string;
    score: number;
  }[];
}

export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface VIPRight {
  id: number;
  title: string;
  desc: string;
  value?: string;
}

export enum RiskLevel {
  CONSERVATIVE = '保守型',
  BALANCED = '稳健型',
  AGGRESSIVE = '进取型',
  SPECULATIVE = '激进型'
}
