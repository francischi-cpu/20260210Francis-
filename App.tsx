
import React, { useState, useEffect } from 'react';
import { 
  Menu, X, ChevronRight, Award, Globe, ShieldCheck, 
  MapPin, Phone, Mail, FileText, ExternalLink,
  ChevronDown, BarChart3, Users, Briefcase, MessageCircle,
  ArrowUpCircle, CheckCircle2, PieChart, Info, AlertTriangle, Send,
  Zap, Activity, Landmark, GraduationCap, Heart, Home, Star
} from 'lucide-react';
import { DIAGNOSTIC_QUESTIONS, FIVE_ACCOUNTS, VIP_RIGHTS, PARTNERS } from './constants';
import { RiskLevel, AssetSpectrum } from './types';

const FadeIn: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => (
  <div className="animate-in fade-in duration-1000 slide-in-from-bottom-4 fill-mode-both" style={{ animationDelay: `${delay}ms` }}>
    {children}
  </div>
);

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'about' | 'service' | 'tool'>('home');
  
  // Diagnostic State
  const [diagnosticStep, setDiagnosticStep] = useState<'intro' | 'spectrum' | 'dna' | 'report'>('intro');
  const [spectrum, setSpectrum] = useState<AssetSpectrum>({ cash: 10, leverage: 20, highYield: 30, preservation: 40 });
  const [dnaScores, setDnaScores] = useState<number[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalSpectrum = spectrum.cash + spectrum.leverage + spectrum.highYield + spectrum.preservation;

  const handleSpectrumChange = (key: keyof AssetSpectrum, val: number) => {
    setSpectrum(prev => ({ ...prev, [key]: val }));
  };

  const handleDNAChoice = (score: number) => {
    const newScores = [...dnaScores, score];
    if (currentQIndex < DIAGNOSTIC_QUESTIONS.length - 1) {
      setDnaScores(newScores);
      setCurrentQIndex(currentQIndex + 1);
    } else {
      setDnaScores(newScores);
      setDiagnosticStep('report');
    }
  };

  const calculateRisk = () => {
    const total = dnaScores.reduce((a, b) => a + b, 0);
    if (total >= 16) return RiskLevel.SPECULATIVE;
    if (total >= 12) return RiskLevel.AGGRESSIVE;
    if (total >= 8) return RiskLevel.BALANCED;
    return RiskLevel.CONSERVATIVE;
  };

  const sendDiagnosticReport = async () => {
    setIsSubmitting(true);
    const risk = calculateRisk();
    const body = `
池老C深度诊断报告：
--------------------------
1. 资产全景 (4321模型):
   - 现金流: ${spectrum.cash}%
   - 杠杆保障: ${spectrum.leverage}%
   - 高收益投资: ${spectrum.highYield}%
   - 保本升值: ${spectrum.preservation}%

2. 投资 DNA 得分: ${dnaScores.reduce((a, b) => a + b, 0)}
3. 综合风险画像: ${risk}
--------------------------
诊断来源: Francis 池望青 个人门户
    `;

    const mailto = `mailto:francischi@francis-family-cfo.com?subject=新客户深度诊断申请 - ${risk}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
    }, 1500);
  };

  const resetTool = () => {
    setDiagnosticStep('intro');
    setDnaScores([]);
    setCurrentQIndex(0);
    setIsSent(false);
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-emerald-100">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <button onClick={() => { setActiveTab('home'); resetTool(); }} className="flex items-center gap-3 group">
                <div className="w-11 h-11 bg-emerald-900 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform text-white font-bold text-xl">青</div>
                <div className="text-left">
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
                { id: 'tool', label: '深度诊断' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id as any); resetTool(); }}
                  className={`text-sm font-bold transition-all relative py-2 ${activeTab === tab.id ? 'text-emerald-900' : 'text-gray-400 hover:text-emerald-700'}`}
                >
                  {tab.label}
                  {activeTab === tab.id && <span className="absolute bottom-0 left-0 w-full h-0.5 gradient-gold rounded-full" />}
                </button>
              ))}
              <a href="#contact" className="bg-emerald-900 text-white px-7 py-2.5 rounded-full text-sm font-bold hover:bg-emerald-800 shadow-lg shadow-emerald-900/10 transition-all">
                预约定制咨询
              </a>
            </div>
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-900 p-2">{isMenuOpen ? <X size={28} /> : <Menu size={28} />}</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow">
        
        {/* TAB: HOME */}
        {activeTab === 'home' && (
          <section className="pt-44 pb-32 px-4 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 text-sm font-bold mb-8 backdrop-blur-md">
                <ShieldCheck size={16} /> 胤源全球华人家族办公室高级总监 | CFA
              </div>
              <h2 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-[1.15] font-serif">
                不仅管理财富<br />
                <span className="text-transparent bg-clip-text gradient-gold">更规划幸福人生</span>
              </h2>
              <p className="text-xl text-gray-500 mb-12 max-w-xl leading-relaxed">
                我是 Francis 池望青。我致力于用 CFA 的严谨逻辑与家族办公室的广阔视野，为您构筑跨越周期的家庭财务安全岛。
              </p>
              <div className="flex flex-wrap gap-5">
                <button 
                  onClick={() => setActiveTab('tool')}
                  className="bg-emerald-900 text-white px-10 py-5 rounded-2xl font-bold text-lg flex items-center gap-3 hover:bg-emerald-800 transition-all shadow-2xl shadow-emerald-900/20 group"
                >
                  开启池老C深度诊断 <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => setActiveTab('about')}
                  className="bg-white text-emerald-900 border border-emerald-900/20 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-emerald-50 transition-all"
                >
                  关于我
                </button>
              </div>
            </FadeIn>
            <div className="relative animate-in zoom-in duration-1000 delay-300">
              <div className="absolute -inset-10 gradient-gold opacity-10 blur-[100px] rounded-full" />
              <div className="relative group">
                <img 
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800" 
                  className="rounded-[2.5rem] shadow-2xl border-4 border-white grayscale group-hover:grayscale-0 transition-all duration-1000"
                  alt="Francis Chi Profile"
                />
                <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-3xl shadow-2xl z-20">
                    <div className="flex items-center gap-3 mb-2">
                        <Award className="text-gold" />
                        <span className="text-gray-900 font-black">MDRT TOT 会员</span>
                    </div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Global Top 1% Excellence</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* TAB: ABOUT */}
        {activeTab === 'about' && (
          <section className="pt-32 pb-20 px-4 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <h3 className="text-emerald-800 font-black mb-4 uppercase tracking-widest text-sm">Professional Profile</h3>
                <h4 className="text-5xl font-bold text-gray-900 mb-10 leading-tight">专注为华人精英家庭<br /><span className="text-emerald-700 underline decoration-gold/30 underline-offset-8">创造稀缺的专业复利</span></h4>
                <div className="space-y-8 text-lg text-gray-600 leading-relaxed font-medium">
                  <p>我是池望青，特许金融分析师(CFA)会员，拥有日本早稻田大学与电子科技大学双硕士学位。</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { icon: <Award className="text-gold" />, text: "CFA 特许金融分析师" },
                      { icon: <Globe className="text-gold" />, text: "早稻田大学双硕士" },
                      { icon: <Star className="text-gold" />, text: "MDRT TOT 顶尖会员" },
                      { icon: <Briefcase className="text-gold" />, text: "胤源家办高级总监" },
                      { icon: <ShieldCheck className="text-gold" />, text: "中/英/日 三语服务" },
                      { icon: <Activity className="text-gold" />, text: "认证风险管理师 (DRM)" }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                        {item.icon}
                        <span className="font-bold text-gray-800">{item.text}</span>
                      </div>
                    ))}
                  </div>
                  <p className="bg-emerald-50 p-6 rounded-2xl border-l-4 border-emerald-800 italic text-emerald-900">
                    “财富管理不应仅仅关注资产负债表的增长，更应关注它如何支撑您的生命愿景。我致力于为您构筑跨周期的幸福。”
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                 <div className="space-y-6">
                    <img src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=400" className="rounded-3xl shadow-xl hover:scale-105 transition-transform" alt="Career 1" />
                    <img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=400" className="rounded-3xl shadow-xl hover:scale-105 transition-transform" alt="Career 2" />
                 </div>
                 <div className="space-y-6 pt-12">
                    <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=400" className="rounded-3xl shadow-xl hover:scale-105 transition-transform" alt="Career 3" />
                    <img src="https://images.unsplash.com/photo-1454165833767-027ffea9e78b?auto=format&fit=crop&q=80&w=400" className="rounded-3xl shadow-xl hover:scale-105 transition-transform" alt="Career 4" />
                 </div>
              </div>
            </div>
          </section>
        )}

        {/* TAB: SERVICE */}
        {activeTab === 'service' && (
          <section className="pt-32 pb-20 px-4 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
             <div className="text-center mb-24">
                <h3 className="text-4xl font-bold text-gray-900 mb-6 font-serif">服务体系：幸福五大账户</h3>
                <p className="text-xl text-gray-500 max-w-3xl mx-auto">我们拒绝产品导向，坚持顾问价值。通过 CFA 严谨模型，为您的家庭资产筑起铜墙铁壁。</p>
             </div>
             <div className="grid md:grid-cols-5 gap-8">
                {FIVE_ACCOUNTS.map((account, idx) => (
                  <div key={idx} className="group p-10 bg-gray-50 rounded-[2.5rem] border border-gray-100 hover:bg-emerald-900 hover:text-white transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl">
                    <div className="mb-6 w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-emerald-900 group-hover:bg-emerald-800 group-hover:text-gold transition-all shadow-sm">
                      {account.icon}
                    </div>
                    <h4 className="text-2xl font-bold mb-5">{account.title}</h4>
                    <p className="text-base opacity-70 group-hover:opacity-100 leading-relaxed">{account.desc}</p>
                  </div>
                ))}
             </div>
             <div className="mt-24 bg-emerald-950 rounded-[4rem] p-16 text-center text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-800 rounded-full blur-[100px] opacity-20" />
                <h4 className="text-3xl font-bold mb-8">Francis 签约客户尊享权益</h4>
                <div className="grid sm:grid-cols-3 gap-8">
                    {VIP_RIGHTS.slice(0, 6).map(right => (
                        <div key={right.id} className="p-6 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 hover:border-gold/50 transition-colors">
                            <p className="text-gold font-black mb-2">0{right.id}</p>
                            <h5 className="font-bold mb-2">{right.title}</h5>
                            <p className="text-sm text-emerald-100/50">{right.desc}</p>
                        </div>
                    ))}
                </div>
             </div>
          </section>
        )}

        {/* TAB: DIAGNOSTIC TOOL */}
        {activeTab === 'tool' && (
          <section className="pt-32 pb-20 px-4 max-w-5xl mx-auto">
             <div className="text-center mb-16">
                <h3 className="text-4xl font-bold text-emerald-900 mb-4 font-serif">池老C深度诊断系统</h3>
                <p className="text-gray-500">数据可视化 + 心理画像化 + 合规流程化</p>
             </div>

             <div className="bg-white rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.05)] border border-gray-100 p-8 md:p-16 relative overflow-hidden">
                
                {/* INTRO STEP */}
                {diagnosticStep === 'intro' && (
                  <div className="text-center animate-in zoom-in duration-500">
                    <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner">
                      <PieChart className="w-12 h-12 text-emerald-900" />
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-6">这不是问卷，是一次关于家族健康的深度对话</h4>
                    <p className="text-gray-500 max-w-lg mx-auto mb-12 leading-relaxed text-lg">
                      我们通过“看得见的资产”、“看不见的性格”、“必须守的规矩”三个维度，为您量身定制国际理财方案。
                    </p>
                    <button onClick={() => setDiagnosticStep('spectrum')} className="bg-emerald-900 text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-emerald-800 shadow-2xl shadow-emerald-900/20 transition-all active:scale-95">
                      立即开启全景扫描
                    </button>
                  </div>
                )}

                {/* SPECTRUM STEP: 4321 Model */}
                {diagnosticStep === 'spectrum' && (
                  <div className="animate-in slide-in-from-right duration-500">
                    <div className="flex justify-between items-center mb-10">
                      <h4 className="text-xl font-bold flex items-center gap-2"><Activity className="text-emerald-700" size={20} /> 家庭资产全景快筛</h4>
                      <span className={`px-4 py-1 rounded-full font-bold text-xs ${totalSpectrum === 100 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-50 text-red-600'}`}>
                        总和: {totalSpectrum}% (需等于 100%)
                      </span>
                    </div>
                    <div className="space-y-10">
                      {[
                        { key: 'cash', label: '现金流账户 (生活费/短期应急)', color: 'bg-emerald-500' },
                        { key: 'leverage', label: '杠杆保障账户 (保命钱/杠杆)', color: 'bg-gold' },
                        { key: 'highYield', label: '高收益投资账户 (生钱钱/波动)', color: 'bg-red-500' },
                        { key: 'preservation', label: '保本升值账户 (养老钱/传承)', color: 'bg-emerald-900' }
                      ].map((item) => (
                        <div key={item.key}>
                          <div className="flex justify-between text-sm font-bold mb-3">
                            <span className="text-gray-600">{item.label}</span>
                            <span className="text-emerald-900 font-black">{spectrum[item.key as keyof AssetSpectrum]}%</span>
                          </div>
                          <input 
                            type="range" min="0" max="100" 
                            value={spectrum[item.key as keyof AssetSpectrum]}
                            onChange={(e) => handleSpectrumChange(item.key as any, parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-emerald-900"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="mt-12 flex justify-end">
                      <button 
                        disabled={totalSpectrum !== 100}
                        onClick={() => setDiagnosticStep('dna')}
                        className={`px-10 py-4 rounded-xl font-bold transition-all ${totalSpectrum === 100 ? 'bg-emerald-900 text-white shadow-xl' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                      >
                        下一步：解码投资 DNA
                      </button>
                    </div>
                  </div>
                )}

                {/* DNA STEP: Questions */}
                {diagnosticStep === 'dna' && (
                  <div className="animate-in slide-in-from-right duration-500">
                    <div className="mb-10 flex justify-between items-end">
                       <div>
                         <p className="text-xs font-black text-emerald-800 uppercase tracking-widest mb-1">Block II: Investor DNA</p>
                         <h4 className="text-2xl font-bold text-gray-900">问询环节 {currentQIndex + 1}/{DIAGNOSTIC_QUESTIONS.length}</h4>
                       </div>
                       <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-900 transition-all duration-500" style={{ width: `${((currentQIndex + 1)/DIAGNOSTIC_QUESTIONS.length)*100}%` }} />
                       </div>
                    </div>
                    <h4 className="text-2xl font-bold text-gray-800 mb-10 leading-relaxed">{DIAGNOSTIC_QUESTIONS[currentQIndex].text}</h4>
                    <div className="grid gap-4">
                      {DIAGNOSTIC_QUESTIONS[currentQIndex].options.map((opt, i) => (
                        <button 
                          key={i}
                          onClick={() => handleDNAChoice(opt.score)}
                          className="w-full p-6 text-left rounded-2xl border-2 border-gray-50 hover:border-emerald-800 hover:bg-emerald-50 transition-all group"
                        >
                          <p className="font-bold text-gray-700 group-hover:text-emerald-900 mb-1">{opt.label}</p>
                          {opt.warning && <p className="text-[10px] text-red-500 font-bold flex items-center gap-1"><AlertTriangle size={12} /> {opt.warning}</p>}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* REPORT STEP */}
                {diagnosticStep === 'report' && (
                  <div className="animate-in zoom-in duration-700 text-center">
                    <div className="w-20 h-20 bg-emerald-900 text-gold rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl rotate-3">
                      <ShieldCheck size={40} />
                    </div>
                    <h4 className="text-sm font-black text-emerald-800 uppercase tracking-widest mb-2">深度诊断完成 - 风险画像</h4>
                    <p className="text-5xl font-black text-gray-900 mb-12">{calculateRisk()}</p>
                    
                    <div className="grid md:grid-cols-2 gap-8 text-left mb-12">
                      <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100">
                        <h5 className="font-bold text-emerald-900 mb-6 flex items-center gap-2"><PieChart size={18} /> 资产地图反馈</h5>
                        <ul className="space-y-4 text-sm font-medium">
                          <li className="flex justify-between border-b border-emerald-100 pb-2"><span>流动性健康度:</span> <span className="text-emerald-900 font-bold">{spectrum.cash > 25 ? '现金积压' : '健康'}</span></li>
                          <li className="flex justify-between border-b border-emerald-100 pb-2"><span>保障覆盖率:</span> <span className="text-emerald-900 font-bold">{spectrum.leverage < 10 ? '严重不足' : '良好'}</span></li>
                          <li className="flex justify-between border-b border-emerald-100 pb-2"><span>养老安全垫:</span> <span className="text-emerald-900 font-bold">{spectrum.preservation < 30 ? '需强化' : '稳固'}</span></li>
                        </ul>
                      </div>
                      <div className="bg-gray-50 p-8 rounded-3xl border border-gray-200">
                         <h5 className="font-bold text-gray-900 mb-6 flex items-center gap-2"><Info size={18} /> 合规与邏輯建议</h5>
                         <p className="text-sm text-gray-500 leading-relaxed italic">
                           “根据您的 DNA 测算，您对中长期目标有清晰认知。建议重点关注跨境币种对冲及家族信托架构搭建。”
                         </p>
                      </div>
                    </div>

                    {!isSent ? (
                      <div className="flex flex-col items-center gap-4">
                        <button 
                          onClick={sendDiagnosticReport}
                          disabled={isSubmitting}
                          className="w-full bg-emerald-900 text-white py-5 rounded-2xl font-black text-xl shadow-2xl shadow-emerald-900/30 flex items-center justify-center gap-3 hover:scale-[1.02] transition-all"
                        >
                          {isSubmitting ? '正在处理...' : '提交诊断申请至 Francis 邮箱'} <Send size={20} />
                        </button>
                        <p className="text-xs text-gray-400">数据将安全发送至：francischi@francis-family-cfo.com</p>
                      </div>
                    ) : (
                      <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-200 text-emerald-900 font-bold flex items-center justify-center gap-3 animate-bounce">
                        <CheckCircle2 /> 诊断报告已成功申请！Francis 将在 24 小时内联络您。
                      </div>
                    )}
                  </div>
                )}

             </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-emerald-950 py-20 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 text-white mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-emerald-950 font-bold text-2xl">青</div>
              <div>
                <p className="text-xl font-bold">Francis Chi</p>
                <p className="text-xs text-emerald-400 font-bold tracking-widest">Family Financial Architect</p>
              </div>
            </div>
            <p className="text-emerald-100/50 max-w-sm leading-relaxed mb-8">
              胤源全球华人家族办公室高级总监。致力为华人精英家庭提供跨地域、跨周期的资产保全与传承方案。
            </p>
          </div>
          <div>
            <h5 className="text-gold font-bold uppercase tracking-widest text-xs mb-8">快速导航</h5>
            <ul className="space-y-4 text-emerald-100/40 text-sm font-bold">
              <li onClick={() => setActiveTab('about')} className="hover:text-white cursor-pointer transition-colors">关于 Francis</li>
              <li onClick={() => setActiveTab('service')} className="hover:text-white cursor-pointer transition-colors">服务体系</li>
              <li onClick={() => setActiveTab('tool')} className="hover:text-white cursor-pointer transition-colors">深度诊断</li>
            </ul>
          </div>
          <div>
            <h5 className="text-gold font-bold uppercase tracking-widest text-xs mb-8">联络信息</h5>
            <ul className="space-y-4 text-emerald-100/40 text-sm font-bold">
              <li className="flex items-center gap-2"><Phone size={14} /> +852 6264 4926</li>
              <li className="flex items-center gap-2"><Mail size={14} /> francischi@greenhope.com.hk</li>
              <li className="flex items-center gap-2"><MapPin size={14} /> 香港尖沙咀海洋中心 601 室</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
           <p className="text-emerald-100/20 text-[10px] uppercase tracking-[0.4em]">© 2025 FRANCIS CHI | GREENHOPE EVERRICH</p>
           <div className="flex gap-6 text-[10px] text-emerald-100/20 font-bold uppercase">
             <span>Privacy Policy</span>
             <span>G30 Compliance</span>
           </div>
        </div>
      </footer>

      {/* Floating Buttons */}
      <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4">
        {showScrollTop && (
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-14 h-14 bg-white text-emerald-900 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all border border-gray-100"
          >
            <ArrowUpCircle size={28} />
          </button>
        )}
        <button 
          onClick={() => setActiveTab('tool')}
          className="w-16 h-16 bg-emerald-900 text-gold rounded-2xl shadow-2xl flex items-center justify-center hover:rotate-6 hover:scale-110 active:scale-95 transition-all"
        >
          <BarChart3 size={32} />
        </button>
      </div>
    </div>
  );
};

export default App;
