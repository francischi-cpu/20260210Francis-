
import React, { useState, useEffect } from 'react';
import { 
  Menu, X, ChevronRight, Award, Globe, ShieldCheck, 
  MapPin, Phone, Mail, FileText, ExternalLink,
  ChevronDown, BarChart3, Users, Briefcase
} from 'lucide-react';
import { QUESTIONS, FIVE_ACCOUNTS, VIP_RIGHTS, PARTNERS } from './constants';
import { RiskLevel } from './types';

// Helper for animations (simple version of Framer Motion logic)
const FadeIn: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => (
  <div className="animate-in fade-in duration-1000 slide-in-from-bottom-4" style={{ animationDelay: `${delay}ms` }}>
    {children}
  </div>
);

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'about' | 'service' | 'tool'>('home');
  const [riskStep, setRiskStep] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [riskResult, setRiskResult] = useState<RiskLevel | null>(null);

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

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center gap-2">
                <div className="w-10 h-10 bg-emerald-900 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">青</span>
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900 leading-tight">池望青 Francis</h1>
                  <p className="text-xs text-emerald-700 tracking-wider">GREENHOPE EVERRICH</p>
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              {['home', 'about', 'service', 'tool'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`text-sm font-medium transition-colors ${activeTab === tab ? 'text-emerald-800 underline underline-offset-8' : 'text-gray-500 hover:text-emerald-700'}`}
                >
                  {tab === 'home' ? '首页' : tab === 'about' ? '关于我' : tab === 'service' ? '服务项目' : '财务体检'}
                </button>
              ))}
              <a href="#contact" className="bg-emerald-900 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-emerald-800 transition-all shadow-lg hover:shadow-emerald-200">
                预约咨询
              </a>
            </div>
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-white pt-20">
          <div className="px-4 py-6 space-y-4">
            {['home', 'about', 'service', 'tool'].map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab as any); setIsMenuOpen(false); }}
                className="block w-full text-left px-4 py-3 text-lg font-medium border-b border-gray-100"
              >
                {tab === 'home' ? '首页' : tab === 'about' ? '关于我' : tab === 'service' ? '服务项目' : '财务体检'}
              </button>
            ))}
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="block w-full bg-emerald-900 text-center text-white py-4 rounded-xl text-lg font-bold">
              预约咨询
            </a>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gray-950">
        <div className="absolute inset-0 z-0 opacity-20">
          <img src="https://picsum.photos/seed/finance/1920/1080" className="w-full h-full object-cover grayscale" alt="Background" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/80 to-transparent z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/40 border border-emerald-500/30 text-emerald-400 text-xs font-medium mb-6">
                <ShieldCheck size={14} /> 家族办公室高级总监 | CFA | HSUHK Master
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                构筑您的<br /><span className="text-transparent bg-clip-text gradient-gold">幸福五大账户</span>
              </h2>
              <p className="text-lg text-gray-400 mb-10 max-w-lg">
                我是家庭财务策划师池望青，以保险工具为核心底层，搭配多品类金融工具及协议，为您提供稀缺价值的家庭资产配置方案。
              </p>
              <div className="flex flex-wrap gap-4">
                <button onClick={() => setActiveTab('tool')} className="bg-emerald-800 text-white px-8 py-4 rounded-lg font-bold flex items-center gap-2 hover:bg-emerald-700 transition-all">
                  开始风险体检 <ChevronRight size={18} />
                </button>
                <button onClick={() => setActiveTab('service')} className="bg-white/10 text-white backdrop-blur-md border border-white/20 px-8 py-4 rounded-lg font-bold hover:bg-white/20 transition-all">
                  查看服务内容
                </button>
              </div>
            </FadeIn>
            <div className="relative">
              <div className="absolute -inset-4 gradient-gold opacity-30 blur-2xl rounded-full" />
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600" 
                className="relative rounded-2xl shadow-2xl border-4 border-emerald-900/50 grayscale hover:grayscale-0 transition-all duration-700"
                alt="Francis Chi"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl hidden lg:block">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center text-emerald-900">
                    <Award size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-tighter">全球认可</p>
                    <p className="font-bold text-gray-900">MDRT TOT 会员</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Five Accounts */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">核心服务理念</h3>
            <div className="w-20 h-1.5 gradient-gold mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              我们不仅是在管理财富，更是在规划幸福的人生。通过五个维度的账户管理，确保家庭在每一个生命周期都有尊严。
            </p>
          </div>
          <div className="grid md:grid-cols-5 gap-6">
            {FIVE_ACCOUNTS.map((account, idx) => (
              <div key={idx} className="group p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-emerald-900 hover:text-white transition-all duration-300 transform hover:-translate-y-2">
                <div className="mb-4 text-emerald-900 group-hover:text-gold transition-colors">
                  {account.icon}
                </div>
                <h4 className="text-xl font-bold mb-3">{account.title}</h4>
                <p className="text-sm text-gray-500 group-hover:text-emerald-100 leading-relaxed">
                  {account.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIP Rights Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-emerald-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row">
            <div className="lg:w-1/3 p-12 bg-emerald-950 flex flex-col justify-center border-r border-emerald-800">
              <h3 className="text-gold text-sm font-bold uppercase tracking-widest mb-4">VIP EXCLUSIVE</h3>
              <h4 className="text-4xl font-bold text-white mb-6">池老师VIP<br /><span className="text-gold">8大核心权益</span></h4>
              <p className="text-emerald-200 mb-8">
                签约即享价值 16,800 HKD 的专属家庭财务规划服务，涵盖全球资产配置与管家式托付。
              </p>
              <div className="flex items-center gap-3 text-gold text-2xl font-bold">
                <span className="text-sm text-emerald-300 font-normal">价值达</span>
                16,800 HKD
              </div>
            </div>
            <div className="lg:w-2/3 p-12 grid sm:grid-cols-2 gap-8">
              {VIP_RIGHTS.map((right) => (
                <div key={right.id} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-emerald-800 rounded-lg flex items-center justify-center text-gold font-bold">
                    {right.id}
                  </div>
                  <div>
                    <h5 className="text-white font-bold mb-1">{right.title}</h5>
                    <p className="text-emerald-300 text-sm leading-snug">{right.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Tool Section */}
      <section className="py-24 bg-white" id="tool">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">智能财务体检</h3>
            <p className="text-gray-600">30秒了解您的风险偏好，获取初步资产配置建议</p>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100">
            {!riskResult ? (
              <div className="space-y-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-bold text-emerald-900 uppercase">Step {riskStep + 1} of {QUESTIONS.length}</span>
                  <div className="w-48 h-1.5 bg-gray-100 rounded-full">
                    <div 
                      className="h-full bg-emerald-700 rounded-full transition-all duration-500" 
                      style={{ width: `${((riskStep + 1) / QUESTIONS.length) * 100}%` }}
                    />
                  </div>
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-8">{QUESTIONS[riskStep].text}</h4>
                <div className="grid gap-4">
                  {QUESTIONS[riskStep].options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleRiskChoice(opt.score)}
                      className="w-full text-left p-6 rounded-2xl border-2 border-gray-100 hover:border-emerald-700 hover:bg-emerald-50 transition-all group flex items-center justify-between"
                    >
                      <span className="font-medium text-gray-700 group-hover:text-emerald-900">{opt.label}</span>
                      <ChevronRight className="text-gray-300 group-hover:text-emerald-700" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center animate-in zoom-in-95 duration-500">
                <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BarChart3 className="w-12 h-12 text-emerald-900" />
                </div>
                <h4 className="text-xl text-gray-600 mb-2">体检结果</h4>
                <p className="text-4xl font-bold text-emerald-900 mb-6">{riskResult}</p>
                <div className="bg-emerald-50 p-6 rounded-2xl mb-8 text-left border border-emerald-100">
                  <h5 className="font-bold text-emerald-900 mb-2">资产配置建议：</h5>
                  <p className="text-emerald-800 text-sm">
                    {riskResult === RiskLevel.CONSERVATIVE && "建议重点配置：现金管理(10%) + 定期寿险/健康险(30%) + 固定收益类资产(60%)。"}
                    {riskResult === RiskLevel.BALANCED && "建议重点配置：稳健共同基金(40%) + 分红险/债券(40%) + 现金及保障(20%)。"}
                    {riskResult === RiskLevel.AGGRESSIVE && "建议重点配置：全球股票基金(40%) + 债券类基金(30%) + 固定资产/保障(30%)。"}
                    {riskResult === RiskLevel.SPECULATIVE && "建议重点配置：成长型股权(30%) + 全球多策略基金(40%) + 另类资产(30%)。"}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button onClick={resetRiskTool} className="px-8 py-3 rounded-xl border border-gray-200 font-bold hover:bg-gray-50">
                    重新测试
                  </button>
                  <a href="#contact" className="px-8 py-3 rounded-xl bg-emerald-900 text-white font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-800">
                    预约 1对1 详细解读
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Partners & Proof */}
      <section className="py-20 bg-emerald-950">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-emerald-400 font-bold mb-10 tracking-[0.2em] text-sm uppercase">全球顶尖金融合作伙伴</p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 opacity-40 hover:opacity-100 transition-opacity">
            {PARTNERS.map(p => (
              <div key={p} className="flex items-center justify-center text-white font-serif italic text-xl">
                {p}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section Detailed */}
      <section className="py-24 bg-white overflow-hidden" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-emerald-800 font-bold mb-4">关于池老师</h3>
              <h4 className="text-4xl font-bold text-gray-900 mb-8 leading-tight">
                专注为全球华人家庭<br />提供稀缺的专业价值
              </h4>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  我是池望青，拥有日本早稻田大学与电子科技大学双硕士学位，是特许金融分析师(CFA)协会会员。目前担任胤源全球华人家族办公室高级总监。
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    "CFA 特许金融分析师",
                    "香港IIQE/MPF 全科持牌",
                    "MDRT 百万圆桌 TOT 会员",
                    "高级DRM认证风险管理师",
                    "HSUHK 创业管理理学硕士",
                    "四川省高端医疗第1名(2022)"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold"></div>
                      {item}
                    </div>
                  ))}
                </div>
                <p>
                  我的服务不仅在于销售产品，而在于“以人为本”的资产配置诊断(4+1诊断模型)，通过解决法律隔离、资金路径隔离、CRS门槛等专业维度，为您构筑真正的财富安全岛。
                </p>
              </div>
              <div className="mt-10 flex items-center gap-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-gray-900">140+</p>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">合作机构</p>
                </div>
                <div className="w-px h-10 bg-gray-200"></div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-gray-900">1000+</p>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">定制方案</p>
                </div>
                <div className="w-px h-10 bg-gray-200"></div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-gray-900">TOP 1%</p>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">行业服务水平</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src="https://picsum.photos/seed/office1/400/500" className="rounded-2xl shadow-lg" alt="Office Work" />
              <img src="https://picsum.photos/seed/office2/400/500" className="rounded-2xl shadow-lg mt-12" alt="Networking" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-gray-50" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[3rem] p-12 md:p-20 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full -mr-32 -mt-32 opacity-50" />
            <div className="relative z-10 grid md:grid-cols-2 gap-16">
              <div>
                <h3 className="text-4xl font-bold text-gray-900 mb-8">开启您的<br />专属家庭规划</h3>
                <div className="space-y-8">
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-900 flex-shrink-0">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">办公地址</p>
                      <p className="text-gray-900 font-medium">香港九龍尖沙咀海港城海洋中心601室</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-900 flex-shrink-0">
                      <Phone size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">联系电话</p>
                      <p className="text-gray-900 font-medium">+852 6264 4926 / +86 139 8175 8590</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-900 flex-shrink-0">
                      <Mail size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">电子邮箱</p>
                      <p className="text-gray-900 font-medium">francis.chi@greenhope.com.hk</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">姓名</label>
                      <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:bg-white outline-none transition-all" placeholder="您的尊称" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">联系电话</label>
                      <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:bg-white outline-none transition-all" placeholder="方便联系的电话" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">咨询意向</label>
                    <select className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:bg-white outline-none transition-all">
                      <option>资产配置诊断</option>
                      <option>香港保险/储蓄</option>
                      <option>海外资产配置</option>
                      <option>日本健康体检</option>
                      <option>其他</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">您的留言 (可选)</label>
                    <textarea rows={4} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-emerald-700 focus:bg-white outline-none transition-all" placeholder="描述您的财务目标或疑问"></textarea>
                  </div>
                  <button className="w-full bg-emerald-900 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-emerald-800 transition-all">
                    提交咨询申请
                  </button>
                  <p className="text-center text-xs text-gray-400">我们将严格遵守《保密协议》，保护您的隐私安全。</p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-emerald-900 rounded-xl flex items-center justify-center text-white font-bold text-2xl">
                青
              </div>
              <div>
                <p className="text-xl font-bold tracking-tight">池望青 Francis Chi</p>
                <p className="text-xs text-gray-400 uppercase tracking-widest">FAMILY FINANCIAL PLANNER</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-8 justify-center">
              {['个人简介', '服务体系', '风险评估', '隐私条款'].map(item => (
                <button key={item} className="text-sm text-gray-500 hover:text-emerald-900 font-medium">
                  {item}
                </button>
              ))}
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-emerald-50 hover:text-emerald-900 transition-all cursor-pointer">
                <Globe size={18} />
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-emerald-50 hover:text-emerald-900 transition-all cursor-pointer">
                <Users size={18} />
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-xs">© 2025 GREENHOPE EVERRICH. All rights reserved.</p>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <ShieldCheck size={14} className="text-emerald-700" />
              <span>本站数据及建议仅供参考，不作为最终投资决策依据。</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
