
import React from 'react';
import { Shield, TrendingUp, GraduationCap, Heart, Home, Award, Globe, Briefcase, Landmark, PieChart } from 'lucide-react';
import { Question, VIPRight } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "您投资的主要目的是什么？",
    options: [
      { label: "资产保值：绝对厌恶本金损失，追求极高安全性", score: 1 },
      { label: "稳健增值：追求超越通胀的收益，能接受 5%-10% 的波动", score: 3 },
      { label: "资本利得：追求高复利增长，能承受 20% 以上的短期回撤", score: 5 }
    ]
  },
  {
    id: 2,
    text: "您的投资期限通常是多久？",
    options: [
      { label: "短期流动（1年以内）：需随时变现", score: 1 },
      { label: "中期规划（3-7年）：资产跨周期配置", score: 3 },
      { label: "长线传承（10年以上）：跨代资产规划", score: 5 }
    ]
  },
  {
    id: 3,
    text: "面对全球市场剧烈波动（如单月下跌20%），您的心态是？",
    options: [
      { label: "焦虑不安，倾向于立刻割肉离场", score: 1 },
      { label: "心理波动，但能听从顾问专业建议按兵不动", score: 3 },
      { label: "兴奋乐观，认为这是极佳的底部分批建仓机会", score: 5 }
    ]
  }
];

export const FIVE_ACCOUNTS = [
  { 
    title: "健康账户", 
    desc: "针对医疗通胀、重疾失能及跨境医疗资源的专属金，确立家庭抵御极端风险的第一道防线。", 
    icon: <Heart className="w-8 h-8" /> 
  },
  { 
    title: "理财账户", 
    desc: "平衡流动性与收益性，通过分红险、多元货币债券等工具，构建持续稳定的现金流流出。", 
    icon: <Landmark className="w-8 h-8" /> 
  },
  { 
    title: "成长账户", 
    desc: "专注于子女全球教育金、创业种子基金及婚嫁金，确保无论环境如何变迁，爱与支持不缺席。", 
    icon: <GraduationCap className="w-8 h-8" /> 
  },
  { 
    title: "养老账户", 
    desc: "利用复利与年金机制，锁定终身不缩水的被动收入，实现财务自由与生命等长的生活品质。", 
    icon: <Home className="w-8 h-8" /> 
  },
  { 
    title: "传承账户", 
    desc: "运用家族信托、大额寿险及协议架构，实现资产的债务隔离、税务优化及和谐有序的跨代延续。", 
    icon: <Shield className="w-8 h-8" /> 
  }
];

export const VIP_RIGHTS: VIPRight[] = [
  { id: 1, title: "家族系图深度诊断", desc: "基于 4+1 资产诊断模型，扫描家庭成员保障缺口与法律潜在隐患。" },
  { id: 2, title: "全球资产平衡报告", desc: "对境内外房产、股权、金融资产进行多币种、多地域的风险分散建议。" },
  { id: 3, title: "未来现金流精算规划", desc: "量化教育、养老、传承等关键节点，提供可视化财务瀑布模型设计。" },
  { id: 4, title: "家族保单终身托管", desc: "整合全球多币种保单，提供每年的权益审阅与理赔闭环服务（价值 8000元）。", value: "8000" },
  { id: 5, title: "稀缺离岸架构搭建", desc: "大陆/HK/新加坡/US 等地银行、券商及身份规划的专业对接建议。" },
  { id: 6, title: "跨境流动性解决方案", desc: "解决资金跨境的合规性与流动性，协助主流银行、数字资产账户开立。" },
  { id: 7, title: "日本精密医疗权益", desc: "赴日体检、癌症筛查及重疾医疗绿色通道，对接顶尖医疗资源。" },
  { id: 8, title: "二代财富观念教育", desc: "邀请加入“胤源二代精英会”，通过金融博弈游戏培养子女财商。"}
];

export const PARTNERS = [
  "AIA 友邦", "Prudential 保诚", "Manulife 万通", "AXA 安盛", "BlackRock 黑岩", "Morgan Stanley", "Fidelity", "JP Morgan"
];
