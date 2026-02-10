
export interface Question {
  id: number;
  category: 'Experience' | 'Psychology' | 'Logic';
  text: string;
  options: {
    label: string;
    score: number;
    warning?: string; 
  }[];
}

export interface AssetSpectrum {
  cash: number;       // 10% 现金流
  leverage: number;   // 20% 杠杆保障
  highYield: number;  // 30% 高收益投资
  preservation: number; // 40% 保本升值
}

export interface VIPRight {
  id: number;
  title: string;
  desc: string;
  value?: string;
}

export enum RiskLevel {
  CONSERVATIVE = 'C1 保守型',
  BALANCED = 'C3 稳健型',
  AGGRESSIVE = 'C5 进取型',
  SPECULATIVE = 'C5+ 激进型'
}
