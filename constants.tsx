
import React from 'react';
import { Shield, TrendingUp, GraduationCap, Heart, Home, Award, Globe, Briefcase, Landmark, PieChart, Star, Zap, Activity } from 'lucide-react';
import { Question, VIPRight } from './types';

export const DIAGNOSTIC_QUESTIONS: Question[] = [
  {
    id: 1,
    category: 'Experience',
    text: "您参与股票、基金或衍生品投资的经验大约有多少年？",
    options: [
      { label: "少于 2 年 (监管关注新手期)", score: 1 },
      { label: "2 - 5 年 (具备基础市场认知)", score: 3 },
      { label: "5 - 10 年 (资深投资者)", score: 4 },
      { label: "10 年以上 (专业级/经历多周期)", score: 5 }
    ]
  },
  {
    id: 2,
    category: 'Logic',
    text: "在投资决策上，您倾向于哪种模式？(ILAS 合规关键题)",
    options: [
      { label: "完全自主选择投资选项并承担风险", score: 5 },
      { label: "依赖专业顾问建议，共同决策", score: 3 },
      { label: "完全不想管理投资选项，追求全权委托", score: 1, warning: "提示：若选此项，投连险(ILAS)可能不适合您。" }
    ]
  },
  {
    id: 3,
    category: 'Psychology',
    text: "假设投资下跌 20%，您的第一反应通常是？(损失厌恶测试)",
    options: [
      { label: "立刻止损卖出，无法忍受本金受损", score: 1 },
      { label: "感到焦虑但会观望，听取专业建议", score: 3 },
      { label: "视为加仓机会，买入更多优质资产", score: 5 }
    ]
  },
  {
    id: 4,
    category: 'Logic',
    text: "这笔规划资金，您预计多久之内绝对不会动用？",
    options: [
      { label: "1 年以内 (追求极高流动性)", score: 1 },
      { label: "1 - 5 年 (中期财务目标匹配)", score: 3 },
      { label: "10 年以上 (追求长期复利或传承)", score: 5 }
    ]
  }
];

export const FIVE_ACCOUNTS = [
  { 
    title: "健康账户", 
    desc: "锁定全球顶尖医疗资源，建立抵御重疾与极端风险的财务堤坝。", 
    icon: <Heart className="w-8 h-8" /> 
  },
  { 
    title: "理财账户", 
    desc: "平衡流动性，通过多元货币债与分红险，构建不间断的现金流。", 
    icon: <Landmark className="w-8 h-8" /> 
  },
  { 
    title: "成长账户", 
    desc: "确立子女全球教育金、创业种子金，确保爱与支持永不缺席。", 
    icon: <GraduationCap className="w-8 h-8" /> 
  },
  { 
    title: "养老账户", 
    desc: "利用複利機制鎖定終身年金，實現財務自由與生命等長的品質。", 
    icon: <Home className="w-8 h-8" /> 
  },
  { 
    title: "传承账户", 
    desc: "运用信托与保险架构，实现资产的债务隔离与和谐有序的跨代延续。", 
    icon: <Shield className="w-8 h-8" /> 
  }
];

export const VIP_RIGHTS: VIPRight[] = [
  { id: 1, title: "家族系图深度诊断", desc: "基于 4+1 模型扫描保障缺口与法律潜在隐患。" },
  { id: 2, title: "全球资产平衡报告", desc: "跨币种、跨地域的风险分散建议与地域对冲。" },
  { id: 3, title: "未来现金流精算规划", desc: "量化教育、养老节点，提供可视化财务瀑布模型设计。" },
  { id: 4, title: "全球保单终身托管", desc: "整合多币种保单，提供理赔闭环服务 (价值 HK$8,000)。", value: "8000" },
  { id: 5, title: "日本精密医疗权益", desc: "对接日本顶尖癌症筛查与重疾医疗绿色通道。" },
  { id: 6, title: "家族信托架构设计", desc: "针对 HNW 客户的私密化、税务合规化资产隔离方案。" }
];

export const PARTNERS = [
  "AIA", "Prudential", "Manulife", "AXA", "BlackRock", "Morgan Stanley", "Fidelity", "JP Morgan"
];
