
import React from 'react';
import { Shield, TrendingUp, GraduationCap, Heart, Home, Award, Globe, Briefcase } from 'lucide-react';
import { Question, VIPRight } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "您投资的主要目的是什么？",
    options: [
      { label: "资产保值，不愿承受任何损失", score: 1 },
      { label: "适度增值，能接受小幅波动", score: 3 },
      { label: "追求高回报，能接受较大的本金波动", score: 5 }
    ]
  },
  {
    id: 2,
    text: "您的投资期限通常是多久？",
    options: [
      { label: "1年以内", score: 1 },
      { label: "1-5年", score: 3 },
      { label: "5年以上", score: 5 }
    ]
  },
  {
    id: 3,
    text: "如果您的投资在一个月内下跌了20%，您会？",
    options: [
      { label: "立即卖出，避免更多损失", score: 1 },
      { label: "保持观望，等待回升", score: 3 },
      { label: "逢低买入，摊薄成本", score: 5 }
    ]
  }
];

export const FIVE_ACCOUNTS = [
  { title: "健康账户", desc: "早预防、早治疗、健康保险专属基金", icon: <Heart className="w-8 h-8" /> },
  { title: "理财账户", desc: "稳健增值，抵御通胀，构筑财务安全边际", icon: <TrendingUp className="w-8 h-8" /> },
  { title: "成长账户", desc: "教育金、婚嫁金、创业金，陪伴孩子每一阶段", icon: <GraduationCap className="w-8 h-8" /> },
  { title: "养老账户", desc: "品质退休规划，确保被动收入与生命等长", icon: <Home className="w-8 h-8" /> },
  { title: "传承账户", desc: "家族系图规划，股权与资产的合规安全延续", icon: <Shield className="w-8 h-8" /> }
];

export const VIP_RIGHTS: VIPRight[] = [
  { id: 1, title: "家族系图", desc: "明确每位成员健康、保障、担心和心愿规划扫描" },
  { id: 2, title: "资产盘点", desc: "对现有资产进行短、中、长及风险盘点，4+1模型分析" },
  { id: 3, title: "未来现金流规划", desc: "针对教育、医疗、创业及养老传承的现金流设计" },
  { id: 4, title: "家族保单托管", desc: "一站式全球保单权益查询、管理、理赔闭环（价值8000元）", value: "8000" },
  { id: 5, title: "全球保险+投资方案", desc: "大陆/HK/新加坡/US等全球资产配置与DIY定制" },
  { id: 6, title: "香港银行卡", desc: "解决跨境资金流动性规划，主流银行协助开户" },
  { id: 7, title: "HK证券+数字货币", desc: "协助开户及海外博主特权，对接全球金融市场" },
  { id: 8, title: "日本健康及Family Office", desc: "赴日精密体检、跨境税务、投资与身份规划建议" }
];

export const PARTNERS = [
  "AIA", "Prudential", "Manulife", "AXA", "BlackRock", "Morgan Stanley", "Fidelity", "JP Morgan"
];
