
import React, { useState, useEffect } from 'react';
import { 
  Menu, X, ChevronRight, Award, Globe, ShieldCheck, 
  MapPin, Phone, Mail, FileText, ExternalLink,
  ChevronDown, BarChart3, Users, Briefcase, MessageCircle,
  ArrowUpCircle, CheckCircle2, PieChart
} from 'lucide-react';
import { QUESTIONS, FIVE_ACCOUNTS, VIP_RIGHTS, PARTNERS } from './constants';
import { RiskLevel } from './types';

// Helper for animations
const FadeIn: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => (
  <div className="animate-in fade-in duration-1000 slide-in-from-bottom-4 fill-mode-both" style={{ animationDelay: `${delay}ms` }}>
    {children}
  </div>
);

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'about' | 'service' | 'tool'>('home');
  const [riskStep, setRiskStep] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [riskResult, setRiskResult] = useState<RiskLevel | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRiskChoice = (score: number) => {
    const newScores = [...scores, score];
    if (riskStep < QUESTIONS.length - 1) {
      setScores(newScores);
      setRiskStep(riskStep + 1);
    } else {
      const total = newScores.reduce((a, b) => a + b, 0);
      let level = RiskLevel.CONSERVATIVE;
      if (total >= 12) level = RiskLevel.SPECULATIVE;
      else if (total >= 9) level = RiskLevel.AGGRESSIVE;
      else if (total >= 6) level = RiskLevel.BALANCED;
      setRiskResult(level);
    }
  };

  const resetRiskTool = () => {
    setRiskStep(0);
    setScores([]);
    setRiskResult(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-emerald-100">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <button 
                onClick={() => { setActiveTab('home'); window.scrollTo(0, 0); }}
                className="flex-shrink-0 flex items-center gap-3 group"
              >
                <div className="w-11 h-11 bg-emerald-900 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                  <span className="text-white font-bold text-xl">青</span>
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900 leading-tight">池望青 Francis</h1>
                  <p className="text-[10px] text-emerald-700 font-bold tracking-[0.2em] uppercase">GREENHOPE EVERRICH</p>
                </div>
              </button>
            </div>
            <div className="hidden md:flex items-center space-x-10">
              {[
                { id: 'home', label: '首页' },
                { id: 'about', label: '关于Francis' },
                { id: 'service', label: '服务体系' },
                { id: 'tool', label: '财务体检' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    document.getElementById(tab.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`text-sm font-bold transition-all relative py-2 ${activeTab === tab.id ? 'text-emerald-900' : 'text-gray-400 hover:text-emerald-700'}`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 gradient-gold rounded-full" />
                  )}
                </button>
              ))}
              <a href="#contact" className="bg-emerald-900 text-white px-7 py-2.5 rounded-full text-sm font-bold hover:bg-emerald-800 transition-all shadow-lg hover:shadow-emerald-200/50">
                预约定制咨询
              </a>
            </div>
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-900 p-2">
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[60] bg-white animate-in fade-in duration-300">
          <div className="flex justify-between items-center h-20 px-4 border-b">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-900 rounded-lg flex items-center justify-center text-white font-bold">青</div>
                <span className="font-bold">Francis Chi</span>
             </div>
             <button onClick={() => setIsMenuOpen(false)}><X size={28} /></button>
          </div>
          <div className="px-6 py-10 space-y-6">
            {['首页', '关于我', '服务项目', '风险评估'].map((label, idx) => (
              <button
                key={label}
                className="block w-full text-left text-2xl font-bold text-gray-900 pb-4 border-b border-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </button>
            ))}
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="block w-full bg-emerald-900 text-center text-white py-5 rounded-2xl text-xl font-bold shadow-xl shadow-emerald-100">
              预约 1对1 咨询
            </a>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id="home" className="relative pt-44 pb-32 overflow-hidden bg-[#0a1111]">
        <div className="absolute inset-0 z-0 opacity-40">
          <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1920" className="w-full h-full object-cover scale-105" alt="Finance background" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a1111]/80 to-[#0a1111] z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold mb-8 backdrop-blur-md">
                <ShieldCheck size={16} /> 胤源全球华人家族办公室高级总监
              </div>
              <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-[1.15]">
                不仅管理财富<br />
                <span className="text-transparent bg-clip-text gradient-gold">更规划幸福人生</span>
              </h2>
              <p className="text-xl text-gray-400 mb-12 max-w-xl leading-relaxed">
                我是 Francis 池望青，特许金融分析师(CFA)会员。通过“以人为本”的资产配置架构，为您和家人构筑穿越周期的财务安全岛。
              </p>
              <div className="flex flex-wrap gap-5">
                <button 
                  onClick={() => document.getElementById('tool')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-emerald-800 text-white px-10 py-5 rounded-2xl font-bold text-lg flex items-center gap-3 hover:bg-emerald-700 transition-all shadow-2xl shadow-emerald-900/40 group"
                >
                  开启风险诊断 <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => document.getElementById('service')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-white/5 text-white backdrop-blur-xl border border-white/10 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all"
                >
                  探索服务体系
                </button>
              </div>
            </FadeIn>
            <div className="relative animate-in zoom-in duration-1000 delay-300 fill-mode-both">
              <div className="absolute -inset-10 gradient-gold opacity-10 blur-[100px] rounded-full" />
              <div className="relative group">
                <img 
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800" 
                  className="rounded-[2.5rem] shadow-2xl border border-white/10 grayscale group-hover:grayscale-0 transition-all duration-1000"
                  alt="Francis Chi Profile"
                />
                <div className="absolute top-8 left-8 bg-emerald-950/80 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center gap-3">
                    <Award className="text-gold" />
                    <span className="text-white font-bold text-sm">MDRT TOT 会员</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Five Accounts */}
      <section id="service" className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h3 className="text-4xl font-bold text-gray-900 mb-6">核心服务：幸福五大账户</h3>
            <div className="w-24 h-2 gradient-gold mx-auto rounded-full mb-8"></div>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
              我们拒绝产品导向，坚持顾问价值。通过五个维度的科学配置，为您的家庭资产筑起铜墙铁壁。
            </p>
          </div>
          <div className="grid md:grid-cols-5 gap-8">
            {FIVE_ACCOUNTS.map((account, idx) => (
              <div key={idx} className="group p-10 bg-gray-50 rounded-[2rem] border border-gray-100 hover:bg-emerald-900 hover:text-white transition-all duration-500 transform hover:-translate-y-4 hover:shadow-2xl">
                <div className="mb-6 w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-emerald-900 group-hover:bg-emerald-800 group-hover:text-gold transition-all shadow-sm">
                  {account.icon}
                </div>
                <h4 className="text-2xl font-bold mb-5">{account.title}</h4>
                <p className="text-base text-gray-500 group-hover:text-emerald-100/80 leading-relaxed">
                  {account.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIP Rights Section */}
      <section className="py-32 bg-gray-950 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-900/10 blur-[120px] rounded-full -mr-64 -mt-64" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-emerald-900/20 backdrop-blur-3xl rounded-[3.5rem] overflow-hidden border border-white/5 shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col lg:flex-row">
            <div className="lg:w-2/5 p-16 md:p-24 bg-gradient-to-br from-emerald-950 to-black flex flex-col justify-center">
              <h3 className="text-gold text-sm font-black uppercase tracking-[0.3em] mb-6">VIP EXCLUSIVE SERVICES</h3>
              <h4 className="text-5xl font-bold text-white mb-10 leading-tight">Francis 签约客户<br /><span className="text-gold underline decoration-gold/30 underline-offset-8">8大核心权益</span></h4>
              <p className="text-lg text-emerald-200/60 mb-12 font-medium">
                作为您的长期财务管家，我将深度陪伴您的每一个财务决策，确保方案的持续有效性。
              </p>
              <div className="p-8 rounded-2xl bg-gold/5 border border-gold/10 inline-block">
                <p className="text-emerald-300 text-sm mb-2 uppercase font-bold">签约咨询服务价值</p>
                <p className="text-gold text-4xl font-black">16,800 HKD</p>
              </div>
            </div>
            <div className="lg:w-3/5 p-16 md:p-24 grid sm:grid-cols-2 gap-x-12 gap-y-16">
              {VIP_RIGHTS.map((right) => (
                <div key={right.id} className="flex gap-6 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-emerald-800/40 rounded-xl flex items-center justify-center text-gold font-black text-lg border border-white/10 group-hover:bg-gold group-hover:text-emerald-950 transition-all">
                    {right.id}
                  </div>
                  <div>
                    <h5 className="text-white font-bold text-lg mb-2 group-hover:text-gold transition-colors">{right.title}</h5>
                    <p className="text-emerald-100/50 text-sm leading-relaxed">{right.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Tool Section */}
      <section id="tool" className="py-32 bg-white scroll-mt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h3 className="text-4xl font-bold text-gray-900 mb-6">家族风险与偏好诊断</h3>
            <p className="text-xl text-gray-500">只需 30 秒，我们将基于 CFA 资产配置逻辑为您提供基准方案建议</p>
          </div>

          <div className="bg-white rounded-[3rem] p-10 md:p-20 shadow-[0_30px_100px_rgba(0,0,0,0.04)] border border-gray-100 relative overflow-hidden">
            {!riskResult ? (
              <div className="space-y-12">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm font-black text-emerald-900 uppercase tracking-widest">Question {riskStep + 1}</span>
                    <p className="text-gray-400 text-xs mt-1">Total {QUESTIONS.length} Questions</p>
                  </div>
                  <div className="w-64 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-700 transition-all duration-700 ease-out" 
                      style={{ width: `${((riskStep + 1) / QUESTIONS.length) * 100}%` }}
                    />
                  </div>
                </div>
                <h4 className="text-3xl font-bold text-gray-900 mb-12">{QUESTIONS[riskStep].text}</h4>
                <div className="grid gap-5">
                  {QUESTIONS[riskStep].options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleRiskChoice(opt.score)}
                      className="w-full text-left p-8 rounded-3xl border-2 border-gray-50 hover:border-emerald-700 hover:bg-emerald-50/50 transition-all group flex items-center justify-between"
                    >
                      <span className="text-lg font-bold text-gray-700 group-hover:text-emerald-900">{opt.label}</span>
                      <div className="w-10 h-10 rounded-full bg-gray-50 group-hover:bg-emerald-900 group-hover:text-white flex items-center justify-center transition-all">
                        <ChevronRight size={20} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center animate-in zoom-in-95 duration-700">
                <div className="w-28 h-28 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-10">
                  <PieChart className="w-14 h-14 text-emerald-900" />
                </div>
                <h4 className="text-lg font-bold text-gray-400 uppercase tracking-widest mb-4">评估建议：{riskResult}</h4>
                <p className="text-6xl font-black text-emerald-950 mb-12">基于总分：{scores.reduce((a,b)=>a+b, 0)} 分</p>
                
                <div className="grid md:grid-cols-2 gap-8 text-left mb-16">
                  <div className="bg-emerald-50 p-10 rounded-[2.5rem] border border-emerald-100">
                    <h5 className="font-black text-emerald-900 text-xl mb-6 flex items-center gap-2">
                        <BarChart3 size={24} /> 资产模型配置建议
                    </h5>
                    <ul className="space-y-4 text-emerald-900/70 font-bold">
                        {riskResult === RiskLevel.CONSERVATIVE && (
                          <>
                            <li className="flex justify-between"><span>现金/超短期理财:</span> <span className="text-emerald-900">20%</span></li>
                            <li className="flex justify-between"><span>健康/重疾寿险保障:</span> <span className="text-emerald-900">40%</span></li>
                            <li className="flex justify-between"><span>分红储蓄/国债:</span> <span className="text-emerald-900">40%</span></li>
                          </>
                        )}
                        {riskResult === RiskLevel.BALANCED && (
                          <>
                            <li className="flex justify-between"><span>稳健增值类(基金/养老金):</span> <span className="text-emerald-900">40%</span></li>
                            <li className="flex justify-between"><span>分红储蓄/债券:</span> <span className="text-emerald-900">30%</span></li>
                            <li className="flex justify-between"><span>权益类资产(股票/ETF):</span> <span className="text-emerald-900">20%</span></li>
                            <li className="flex justify-between"><span>风险对冲保障:</span> <span className="text-emerald-900">10%</span></li>
                          </>
                        )}
                        {riskResult === RiskLevel.AGGRESSIVE && (
                          <>
                            <li className="flex justify-between"><span>全球股票型基金:</span> <span className="text-emerald-900">50%</span></li>
                            <li className="flex justify-between"><span>多元货币债/分红险:</span> <span className="text-emerald-900">20%</span></li>
                            <li className="flex justify-between"><span>另类资产/PE:</span> <span className="text-emerald-900">20%</span></li>
                            <li className="flex justify-between"><span>流动性储备:</span> <span className="text-emerald-900">10%</span></li>
                          </>
                        )}
                        {riskResult === RiskLevel.SPECULATIVE && (
                          <>
                            <li className="flex justify-between"><span>高增值权益资产:</span> <span className="text-emerald-900">60%</span></li>
                            <li className="flex justify-between"><span>对冲基金/加密资产:</span> <span className="text-emerald-900">20%</span></li>
                            <li className="flex justify-between"><span>另类投资:</span> <span className="text-emerald-900">15%</span></li>
                            <li className="flex justify-between"><span>核心底仓:</span> <span className="text-emerald-900">5%</span></li>
                          </>
                        )}
                    </ul>
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-gray-500 mb-8 leading-relaxed font-medium">
                      注：以上仅为基于问卷的初步基准配置建议。真实的财富传承与规划涉及复杂的法律架构与家庭关系。建议您预约 Francis 进行深入诊断。
                    </p>
                    <div className="flex flex-col gap-4">
                        <a href="#contact" className="w-full bg-emerald-900 text-white py-5 rounded-2xl font-black text-center shadow-xl shadow-emerald-900/20 hover:scale-105 transition-transform">
                            立即预约 CFA 深度解读方案
                        </a>
                        <button onClick={resetRiskTool} className="text-emerald-900 font-bold hover:underline">
                            重新开始评估
                        </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <FadeIn>
              <h3 className="text-emerald-800 font-black mb-4 uppercase tracking-widest text-sm">Professional Profile</h3>
              <h4 className="text-5xl font-bold text-gray-900 mb-10 leading-tight">
                专注为全球华人家庭<br />
                <span className="text-emerald-700">创造稀缺的专业复利</span>
              </h4>
              <div className="space-y-8 text-lg text-gray-600 leading-relaxed font-medium">
                <p>
                  我是池望青，特许金融分析师(CFA)协会会员，拥有日本早稻田大学与电子科技大学双硕士学位。目前担任<b>胤源全球华人家族办公室高级总监</b>。
                </p>
                <div className="grid sm:grid-cols-2 gap-6">
                  {[
                    "CFA 特许金融分析师会员",
                    "香港 IIQE/MPF 持牌顾问",
                    "MDRT 百万圆桌 TOT 会员",
                    "HSUHK 创业管理理学硕士",
                    "精通中/英/日 三语服务",
                    "高级 DRM 认证风险管理师"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-gold"></div>
                      <span className="font-bold text-gray-800">{item}</span>
                    </div>
                  ))}
                </div>
                <p className="bg-white p-6 rounded-2xl border border-gray-100 italic">
                  “财富管理不应仅仅关注资产负债表的增长，更应关注它如何支撑您的生命愿景。我致力于用 CFA 的严谨逻辑与家族办公室的广阔视野，为您构筑跨周期的幸福。”
                </p>
              </div>
              <div className="mt-16 flex flex-wrap gap-12">
                {[
                  { val: "140+", label: "合作金融机构" },
                  { val: "1000+", label: "定制规划方案" },
                  { val: "TOP 1%", label: "行业服务标杆" }
                ].map((stat, i) => (
                  <div key={i}>
                    <p className="text-4xl font-black text-emerald-900">{stat.val}</p>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-2">{stat.label}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
            <div className="relative group">
               <div className="absolute inset-0 gradient-gold opacity-10 blur-[80px] rounded-full group-hover:opacity-20 transition-all" />
               <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=400" className="rounded-3xl shadow-xl transform group-hover:-rotate-2 transition-transform duration-700" alt="Work" />
                    <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=400" className="rounded-3xl shadow-xl" alt="Work2" />
                  </div>
                  <div className="space-y-6 pt-12">
                    <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=400" className="rounded-3xl shadow-xl" alt="Work3" />
                    <img src="https://images.unsplash.com/photo-1454165833767-027ffea9e78b?auto=format&fit=crop&q=80&w=400" className="rounded-3xl shadow-xl transform group-hover:rotate-2 transition-transform duration-700" alt="Work4" />
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-24 bg-emerald-950">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-gold font-black mb-16 tracking-[0.4em] text-sm uppercase">Global Institutional Partners</p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-12 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                {PARTNERS.map(p => (
                    <div key={p} className="flex items-center justify-center text-white font-serif italic text-xl whitespace-nowrap">
                        {p}
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-emerald-950 rounded-[4rem] p-12 md:p-24 shadow-[0_50px_100px_rgba(6,78,59,0.3)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-900 rounded-full -mr-48 -mt-48 opacity-20 blur-3xl" />
            <div className="relative z-10 grid lg:grid-cols-2 gap-20">
              <div>
                <h3 className="text-5xl font-bold text-white mb-10 leading-tight">开启您的<br />专属家庭资产规划</h3>
                <div className="space-y-12">
                  <div className="flex items-start gap-8 group">
                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-gold flex-shrink-0 group-hover:bg-gold group-hover:text-emerald-950 transition-all">
                      <MapPin size={28} />
                    </div>
                    <div>
                      <p className="text-xs font-black text-emerald-400 uppercase tracking-widest mb-2">Office Location</p>
                      <p className="text-white text-xl font-bold">香港九龍尖沙咀海港城海洋中心601室</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-8 group">
                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-gold flex-shrink-0 group-hover:bg-gold group-hover:text-emerald-950 transition-all">
                      <Phone size={28} />
                    </div>
                    <div>
                      <p className="text-xs font-black text-emerald-400 uppercase tracking-widest mb-2">Direct Line</p>
                      <p className="text-white text-xl font-bold">+852 6264 4926 / +86 139 8175 8590</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-8 group">
                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-gold flex-shrink-0 group-hover:bg-gold group-hover:text-emerald-950 transition-all">
                      <Mail size={28} />
                    </div>
                    <div>
                      <p className="text-xs font-black text-emerald-400 uppercase tracking-widest mb-2">Official Email</p>
                      <p className="text-white text-xl font-bold">francis.chi@greenhope.com.hk</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur-md p-10 md:p-14 rounded-[3rem] border border-white/10">
                {isSubmitted ? (
                    <div className="h-full flex flex-col items-center justify-center text-center py-20 animate-in fade-in zoom-in duration-500">
                        <CheckCircle2 className="w-24 h-24 text-gold mb-8" />
                        <h4 className="text-3xl font-bold text-white mb-4">预约申请已收到</h4>
                        <p className="text-emerald-200">Francis 将在 24 小时内亲自与您取得联系。</p>
                        <button onClick={() => setIsSubmitted(false)} className="mt-8 text-gold font-bold underline">返回修改信息</button>
                    </div>
                ) : (
                    <form className="space-y-8" onSubmit={handleSubmit}>
                        <div className="grid sm:grid-cols-2 gap-8">
                            <div>
                                <label className="block text-sm font-black text-emerald-400 uppercase tracking-widest mb-3">您的称呼</label>
                                <input type="text" required className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-emerald-700 outline-none focus:ring-2 focus:ring-gold transition-all" placeholder="例如：陈先生" />
                            </div>
                            <div>
                                <label className="block text-sm font-black text-emerald-400 uppercase tracking-widest mb-3">联系方式</label>
                                <input type="tel" required className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-emerald-700 outline-none focus:ring-2 focus:ring-gold transition-all" placeholder="手机号/微信/WhatsApp" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-black text-emerald-400 uppercase tracking-widest mb-3">初步关注领域</label>
                            <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:ring-2 focus:ring-gold transition-all appearance-none cursor-pointer">
                                <option className="bg-emerald-950 text-white">家庭资产 4+1 深度诊断</option>
                                <option className="bg-emerald-950 text-white">全球多元化储蓄与年金</option>
                                <option className="bg-emerald-950 text-white">家族信托与保险金信托</option>
                                <option className="bg-emerald-950 text-white">赴日顶尖体检与身份规划</option>
                                <option className="bg-emerald-950 text-white">其他跨境资产配置</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-black text-emerald-400 uppercase tracking-widest mb-3">补充说明</label>
                            <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-emerald-700 outline-none focus:ring-2 focus:ring-gold transition-all" placeholder="请简述您的核心关切点"></textarea>
                        </div>
                        <button type="submit" className="w-full bg-gold text-emerald-950 font-black py-5 rounded-2xl text-xl hover:scale-[1.02] transition-all shadow-2xl shadow-gold/20">
                            预约 Francis 专家时间
                        </button>
                        <p className="text-center text-xs text-emerald-500 font-bold uppercase tracking-widest">Confidential & Professional Service</p>
                    </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 pt-24 pb-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-start mb-20 gap-16">
                <div className="max-w-xs">
                   <div className="flex items-center gap-4 mb-8">
                        <div className="w-14 h-14 bg-emerald-950 rounded-2xl flex items-center justify-center text-white font-bold text-3xl">青</div>
                        <div>
                            <p className="text-2xl font-black text-gray-900 tracking-tight">Francis Chi</p>
                            <p className="text-[10px] text-emerald-700 font-black tracking-[0.3em] uppercase">Wealth Architect</p>
                        </div>
                   </div>
                   <p className="text-gray-500 font-medium leading-relaxed mb-8">
                      胤源家族办公室(GreenHope EverRich)高级总监，致力为华人精英家庭提供跨代资产保全方案。
                   </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
                    <div>
                        <h5 className="font-black text-gray-900 mb-6 uppercase tracking-widest text-xs">服务板块</h5>
                        <ul className="space-y-4 text-gray-500 font-bold text-sm">
                            <li className="hover:text-emerald-900 cursor-pointer transition-colors">资产配置诊断</li>
                            <li className="hover:text-emerald-900 cursor-pointer transition-colors">全球保险信托</li>
                            <li className="hover:text-emerald-900 cursor-pointer transition-colors">日本高端医疗</li>
                            <li className="hover:text-emerald-900 cursor-pointer transition-colors">离岸架构搭建</li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-black text-gray-900 mb-6 uppercase tracking-widest text-xs">关于我们</h5>
                        <ul className="space-y-4 text-gray-500 font-bold text-sm">
                            <li className="hover:text-emerald-900 cursor-pointer transition-colors">Francis 简介</li>
                            <li className="hover:text-emerald-900 cursor-pointer transition-colors">执业理念</li>
                            <li className="hover:text-emerald-900 cursor-pointer transition-colors">合作机构</li>
                            <li className="hover:text-emerald-900 cursor-pointer transition-colors">预约指南</li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-black text-gray-900 mb-6 uppercase tracking-widest text-xs">社交动态</h5>
                        <div className="flex gap-4">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-gray-400 hover:text-emerald-900 hover:shadow-lg transition-all cursor-pointer border border-gray-100"><MessageCircle size={20} /></div>
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-gray-400 hover:text-emerald-900 hover:shadow-lg transition-all cursor-pointer border border-gray-100"><Globe size={20} /></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pt-10 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">© 2025 Francis Chi | GreenHope EverRich. All Rights Reserved.</p>
                <div className="flex items-center gap-6 text-[10px] text-gray-400 font-black uppercase tracking-widest">
                    <span className="hover:text-emerald-900 cursor-pointer">Privacy Policy</span>
                    <span className="hover:text-emerald-900 cursor-pointer">Legal Terms</span>
                    <span className="flex items-center gap-2">
                        <ShieldCheck size={14} className="text-emerald-800" />
                        Professional Accreditation Certified
                    </span>
                </div>
            </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4">
        {showScrollTop && (
            <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="w-14 h-14 bg-white text-emerald-900 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all border border-gray-100"
            >
                <ArrowUpCircle size={28} />
            </button>
        )}
        <a 
          href="#contact"
          className="w-16 h-16 bg-emerald-900 text-gold rounded-2xl shadow-[0_20px_40px_rgba(6,78,59,0.3)] flex items-center justify-center hover:rotate-6 hover:scale-110 active:scale-95 transition-all"
        >
          <MessageCircle size={32} />
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white animate-pulse">
            1
          </div>
        </a>
      </div>
    </div>
  );
};

export default App;
