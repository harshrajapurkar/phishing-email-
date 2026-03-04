import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Mail, 
  FileText, 
  Paperclip, 
  ExternalLink, 
  User, 
  Clock, 
  Tag, 
  ShieldAlert, 
  ShieldCheck, 
  Info,
  ChevronRight,
  Search,
  Filter,
  ArrowRight
} from 'lucide-react';
import { EMAILS, EmailData, Severity, Classification } from './types';

const SeverityBadge = ({ severity }: { severity: Severity }) => {
  const colors = {
    High: 'bg-red-500/10 text-red-600 border-red-200',
    Medium: 'bg-orange-500/10 text-orange-600 border-orange-200',
    Low: 'bg-yellow-500/10 text-yellow-600 border-yellow-200',
    Informational: 'bg-blue-500/10 text-blue-600 border-blue-200',
  };

  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${colors[severity]}`}>
      {severity}
    </span>
  );
};

const ClassificationBadge = ({ classification }: { classification: Classification }) => {
  const isMalicious = classification !== 'Legitimate Email';
  return (
    <span className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold ${isMalicious ? 'bg-red-600 text-white' : 'bg-emerald-600 text-white'}`}>
      {isMalicious ? <ShieldAlert size={14} /> : <ShieldCheck size={14} />}
      {classification}
    </span>
  );
};

export default function App() {
  const [selectedEmail, setSelectedEmail] = useState<EmailData>(EMAILS[0]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-[#141414] text-[#E4E3E0] p-4 flex items-center justify-between border-b border-[#E4E3E0]/10">
        <div className="flex items-center gap-3">
          <div className="bg-red-600 p-2 rounded">
            <Shield size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">PHISH_GUARD v2.4</h1>
            <p className="text-[10px] font-mono opacity-50 uppercase tracking-[0.2em]">Tier 1 SOC Investigation Terminal</p>
          </div>
        </div>
        <div className="flex items-center gap-6 text-xs font-mono opacity-70">
          <div className="flex flex-col items-end">
            <span>OPERATOR: ANALYST_77</span>
            <span>STATUS: ACTIVE_INVESTIGATION</span>
          </div>
          <div className="h-8 w-px bg-[#E4E3E0]/20" />
          <div className="flex flex-col items-end">
            <span>{new Date().toLocaleDateString()}</span>
            <span>{new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Email List */}
        <div className="w-96 border-r border-[#141414]/10 flex flex-col bg-[#DCDAD7]">
          <div className="p-4 border-b border-[#141414]/10 bg-[#E4E3E0]/50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 opacity-30" size={16} />
              <input 
                type="text" 
                placeholder="Search case files..." 
                className="w-full bg-white/50 border border-[#141414]/10 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#141414]/20"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <div className="p-3">
              <div className="grid grid-cols-4 px-3 mb-2">
                <span className="col-header col-span-3">Subject / Sender</span>
                <span className="col-header text-right">Severity</span>
              </div>
              
              {EMAILS.map((email) => (
                <div 
                  key={email.id}
                  onClick={() => setSelectedEmail(email)}
                  className={`data-row p-3 rounded-lg mb-1 ${selectedEmail.id === email.id ? 'active' : ''}`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex flex-col truncate pr-4">
                      <span className="text-sm font-bold truncate">{email.subject}</span>
                      <span className="text-[11px] opacity-70 truncate font-mono">{email.from}</span>
                    </div>
                    <SeverityBadge severity={email.analysis.assessment.severity} />
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] font-mono opacity-50">{email.date}</span>
                    {email.attachment && <Paperclip size={10} className="opacity-50" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 border-t border-[#141414]/10 bg-[#E4E3E0]/50">
            <div className="flex items-center justify-between text-[10px] font-mono opacity-50">
              <span>TOTAL CASES: {EMAILS.length}</span>
              <span>MALICIOUS: {EMAILS.filter(e => e.analysis.assessment.classification !== 'Legitimate Email').length}</span>
            </div>
          </div>
        </div>

        {/* Main Content - Investigation Area */}
        <div className="flex-1 flex flex-col overflow-hidden bg-[#E4E3E0]">
          <AnimatePresence mode="wait">
            <motion.div 
              key={selectedEmail.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex-1 flex flex-col overflow-hidden"
            >
              {/* Email View */}
              <div className="p-8 border-b border-[#141414]/10 bg-white/30">
                <div className="max-w-4xl mx-auto">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-[#141414] text-[#E4E3E0] flex items-center justify-center font-bold text-xl">
                        {selectedEmail.from.charAt(0)}
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold tracking-tight">{selectedEmail.subject}</h2>
                        <div className="flex items-center gap-2 text-sm opacity-60">
                          <User size={14} />
                          <span>{selectedEmail.from}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-mono opacity-50 mb-1">RECEIVED</div>
                      <div className="text-sm font-bold">{selectedEmail.date}</div>
                    </div>
                  </div>

                  <div className="space-y-4 text-sm font-mono bg-white/50 p-6 rounded-xl border border-[#141414]/5 shadow-sm">
                    <div className="grid grid-cols-[100px_1fr] gap-2 border-b border-[#141414]/5 pb-2">
                      <span className="opacity-40 uppercase text-[10px] font-bold">To:</span>
                      <span>{selectedEmail.to}</span>
                    </div>
                    {selectedEmail.replyTo && (
                      <div className="grid grid-cols-[100px_1fr] gap-2 border-b border-[#141414]/5 pb-2">
                        <span className="opacity-40 uppercase text-[10px] font-bold text-red-600">Reply-To:</span>
                        <span className="text-red-600 font-bold">{selectedEmail.replyTo}</span>
                      </div>
                    )}
                    <div className="pt-4 whitespace-pre-wrap leading-relaxed text-base font-sans">
                      {selectedEmail.content}
                    </div>
                    
                    {selectedEmail.attachment && (
                      <div className="mt-8 pt-6 border-t border-[#141414]/10">
                        <div className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg w-fit">
                          <Paperclip className="text-red-600" size={18} />
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-red-900">{selectedEmail.attachment}</span>
                            <span className="text-[10px] text-red-600 uppercase font-bold tracking-widest">Suspicious Attachment</span>
                          </div>
                          <div className="ml-4 px-2 py-1 bg-red-600 text-white text-[10px] rounded font-bold">BLOCKLISTED</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Analysis Report */}
              <div className="flex-1 overflow-y-auto p-8 bg-[#DCDAD7]/50">
                <div className="max-w-4xl mx-auto space-y-8">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif italic text-2xl flex items-center gap-3">
                      <FileText className="opacity-50" />
                      Phishing Analysis Report
                    </h3>
                    <ClassificationBadge classification={selectedEmail.analysis.assessment.classification} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Header Analysis */}
                    <div className="space-y-4">
                      <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] opacity-50 flex items-center gap-2">
                        <Search size={14} />
                        Sender & Header Analysis
                      </h4>
                      <ul className="space-y-3">
                        {selectedEmail.analysis.senderHeaderAnalysis.map((item, i) => (
                          <li key={i} className="flex gap-3 text-sm bg-white/40 p-3 rounded-lg border border-[#141414]/5">
                            <div className="mt-1 shrink-0">
                              <ArrowRight size={14} className="text-red-600" />
                            </div>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Identified IOCs */}
                    <div className="space-y-4">
                      <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] opacity-50 flex items-center gap-2">
                        <Tag size={14} />
                        Identified IOCs
                      </h4>
                      <div className="space-y-2">
                        {selectedEmail.analysis.identifiedIOCs.length > 0 ? (
                          selectedEmail.analysis.identifiedIOCs.map((ioc, i) => (
                            <div key={i} className="bg-[#141414] text-[#E4E3E0] p-3 rounded-lg flex items-center justify-between">
                              <div className="flex flex-col">
                                <span className="text-[10px] font-mono opacity-50 uppercase">{ioc.type}</span>
                                <span className="text-xs font-mono font-bold truncate max-w-[200px]">{ioc.value}</span>
                              </div>
                              <div className="text-[10px] italic opacity-50 text-right">
                                {ioc.description}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="bg-emerald-500/10 text-emerald-700 p-4 rounded-lg border border-emerald-200 flex items-center gap-3">
                            <CheckCircle size={18} />
                            <span className="text-sm font-bold">No Indicators of Compromise detected.</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Final Assessment */}
                  <div className="bg-white p-6 rounded-2xl border border-[#141414]/10 shadow-xl">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-[#141414] text-white p-2 rounded-lg">
                        <Shield size={20} />
                      </div>
                      <h4 className="font-bold text-lg">Final Assessment & Action</h4>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div>
                        <div className="text-[10px] font-bold uppercase opacity-40 mb-1">Classification</div>
                        <div className="font-bold text-sm">{selectedEmail.analysis.assessment.classification}</div>
                      </div>
                      <div>
                        <div className="text-[10px] font-bold uppercase opacity-40 mb-1">Severity</div>
                        <div className="flex items-center gap-2">
                          <SeverityBadge severity={selectedEmail.analysis.assessment.severity} />
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] font-bold uppercase opacity-40 mb-1">Recommended Action</div>
                        <div className="font-bold text-sm text-red-600 flex items-center gap-2">
                          <AlertTriangle size={14} />
                          {selectedEmail.analysis.assessment.action}
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-[#141414]/5 flex justify-end">
                      <button className="bg-[#141414] text-[#E4E3E0] px-6 py-2 rounded-lg text-sm font-bold hover:bg-red-600 transition-colors flex items-center gap-2">
                        Execute Response Protocol
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Footer Status Bar */}
      <footer className="bg-[#141414] text-[#E4E3E0] px-4 py-1.5 flex items-center justify-between text-[10px] font-mono border-t border-[#E4E3E0]/10">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            SYSTEM_ONLINE
          </span>
          <span className="opacity-50">|</span>
          <span>SECURE_CONNECTION: ESTABLISHED</span>
        </div>
        <div className="flex items-center gap-4">
          <span>ENCRYPTION: AES-256</span>
          <span className="opacity-50">|</span>
          <span>LATENCY: 12ms</span>
        </div>
      </footer>
    </div>
  );
}
