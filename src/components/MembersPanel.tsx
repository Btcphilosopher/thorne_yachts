import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Sparkles, Key, Crown, CheckCircle2, ChevronRight, Calculator, RefreshCw, X, ShieldCheck } from 'lucide-react';
import { UserWallet } from '../types';

interface MembersPanelProps {
  wallet: UserWallet;
  onUpgradeTier: (tier: 'Vanguard' | 'Sovereign' | 'Legacy') => void;
  onOpenWalletModal: () => void;
}

export default function MembersPanel({ wallet, onUpgradeTier, onOpenWalletModal }: MembersPanelProps) {
  const [challengeCode, setChallengeCode] = useState('');
  const [challengeStep, setChallengeStep] = useState<'idle' | 'testing' | 'success' | 'failed'>('idle');
  const [activeTab, setActiveTab] = useState<'tiers' | 'challenge'>('tiers');

  const tiers = [
    {
      name: 'Vanguard Covenant',
      privileges: [
        'Immediate access to confidential second-tier off-market inventory',
        'Direct connection to the Thorne Marine and Automotive engineering concierge',
        'Priority booking of Mediterranean test trials',
        'Dynamic digital provenance certificates'
      ],
      description: 'The foundation of the digital ledger. For HNW collectors initiating on-chain acquisition.'
    },
    {
      name: 'Sovereign Covenant',
      privileges: [
        'Co-commission privileges for limited one-off series',
        'Private aircraft charter integrations directly with Mediterranean yards',
        'Invitation to annual private Monaco/Zurich summit',
        'Bespoke vehicle telemetry ledger access and IPFS update rights'
      ],
      description: 'Enhanced validation. For serious collectors seeking creative co-development opportunities.'
    },
    {
      name: 'Legacy Covenant',
      privileges: [
        'Sovereign vote in multi-sig assets allocations committee',
        'Exclusive right of first refusal for historical hull restorations',
        'Complimentary helicopter courier service for all physical showroom events',
        'Unlimited certificate minting privileges & custom smart contract triggers'
      ],
      description: 'The absolute tier of global asset custody. Tailored specifically to generational transfer plans.'
    }
  ];

  // Cryptographic puzzle to unlock Sovereign tier
  // If user inputs "THORNE-99" or computes: hash riddle which we explain clearly
  const handleVerifyPuzzle = (e: React.FormEvent) => {
    e.preventDefault();
    setChallengeStep('testing');
    setTimeout(() => {
      // Secret key is '99' or contains 'LEADER' or 'THORNE' (case-insensitive)
      const clean = challengeCode.trim().toUpperCase();
      if (clean.includes('99') || clean.includes('THORNE') || clean.includes('LIMITLESS')) {
        setChallengeStep('success');
        onUpgradeTier('Legacy');
      } else {
        setChallengeStep('failed');
      }
    }, 1500);
  };

  return (
    <div id="members-portal-box" className="bg-neutral-950 border border-neutral-900 rounded p-6 sm:p-8 space-y-8 relative overflow-hidden">
      {/* Decorative linear glow */}
      <div className="absolute top-0 right-0 h-40 w-40 bg-radial-gradient from-[#d4af37]/5 to-transparent pointer-events-none" />

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-neutral-900 pb-6 gap-4">
        <div>
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#d4af37] block mb-1">MEMBERSHIP NETWORK</span>
          <h2 className="font-cinzel text-xl sm:text-2xl font-light tracking-widest text-[#f3e9dc]">
            LEDGER COVENANT
          </h2>
          <p className="text-xs text-neutral-500 font-sans mt-1">Authenticating prestige through modern zero-knowledge verification protocols.</p>
        </div>

        <div className="flex space-x-2 bg-neutral-900/60 p-1 rounded border border-neutral-800">
          <button
            id="tab-member-tiers"
            onClick={() => setActiveTab('tiers')}
            className={`px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider rounded transition-all ${
              activeTab === 'tiers' ? 'bg-[#f3e9dc] text-neutral-950 font-semibold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Tiers & Covenants
          </button>
          <button
            id="tab-member-challenge"
            onClick={() => setActiveTab('challenge')}
            className={`px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider rounded transition-all ${
              activeTab === 'challenge' ? 'bg-[#f3e9dc] text-neutral-950 font-semibold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Sovereign Challenge
          </button>
        </div>
      </div>

      {activeTab === 'tiers' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {tiers.map((tier, idx) => {
            const isAssigned = wallet.connected && (
              (tier.name.includes('Vanguard') && wallet.tier === 'Vanguard') ||
              (tier.name.includes('Sovereign') && wallet.tier === 'Sovereign') ||
              (tier.name.includes('Legacy') && wallet.tier === 'Legacy')
            );

            return (
              <div 
                key={idx} 
                className={`relative rounded border bg-neutral-950 p-5 space-y-4 flex flex-col justify-between transition-all ${
                  isAssigned 
                    ? 'border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.05)] ring-1 ring-[#d4af37]/30' 
                    : 'border-neutral-900 hover:border-neutral-800'
                }`}
              >
                {isAssigned && (
                  <div className="absolute top-3 right-3 flex items-center space-x-1 font-mono text-[8px] bg-[#d4af37]/10 border border-[#d4af37]/50 text-[#d4af37] px-2 py-0.5 rounded uppercase">
                    <Crown className="h-2.5 w-2.5" />
                    <span>Your Level</span>
                  </div>
                )}

                <div className="space-y-3">
                  <h3 className="font-cinzel text-sm text-[#f3e9dc] tracking-widest font-semibold uppercase">{tier.name}</h3>
                  <p className="text-[11px] text-neutral-500 leading-relaxed font-sans italic">{tier.description}</p>
                  
                  <div className="border-t border-neutral-900/40 my-3" />
                  
                  <ul className="space-y-2">
                    {tier.privileges.map((p, pIdx) => (
                      <li key={pIdx} className="flex text-[10px] sm:text-xs text-neutral-400 leading-relaxed font-light">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#d4af37] mr-2.5 mt-0.5 shrink-0" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {!wallet.connected ? (
                  <button
                    id={`connect-wallet-for-${idx}`}
                    onClick={onOpenWalletModal}
                    className="w-full mt-6 py-2 bg-neutral-900 hover:bg-neutral-800 rounded border border-neutral-800 text-[10px] font-mono uppercase tracking-widest text-[#f3e9dc]"
                  >
                    Connect Wallet to Apply
                  </button>
                ) : (
                  <button
                    id={`upgrade-tier-btn-${idx}`}
                    onClick={() => {
                      const upgradeTo = tier.name.startsWith('Vanguard') ? 'Vanguard' : tier.name.startsWith('Sovereign') ? 'Sovereign' : 'Legacy';
                      onUpgradeTier(upgradeTo);
                    }}
                    className={`w-full mt-6 py-2 rounded text-[10px] font-mono uppercase tracking-widest transition-all ${
                      isAssigned 
                        ? 'bg-neutral-900/30 text-green-500 cursor-default border border-green-950/40' 
                        : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800'
                    }`}
                  >
                    {isAssigned ? 'ACTIVE COVENANT' : `Acquire Passport`}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="max-w-xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <Key className="h-8 w-8 text-[#d4af37] mx-auto" />
            <h3 className="font-cinzel text-md tracking-widest text-[#f3e9dc]">PROOF OF GENESIS ELIGIBILITY</h3>
            <p className="text-xs text-neutral-400 font-light leading-relaxed">
              We periodically open instant cryptographic upgrades to collectors who demonstrate proficiency in zero-knowledge ledger alignment. Decrypt the verification seed below to immediately claim the prestigious <strong>Legacy Covenant</strong>.
            </p>
          </div>

          <div className="rounded border border-neutral-900 bg-neutral-950 p-4 space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-neutral-900 pb-2 text-[10px] text-neutral-500">
              <span>LEDGER RIDDLE DECRYPTOR</span>
              <span>VERIFIER v3.11</span>
            </div>
            
            <div className="p-3 bg-[#070708] rounded space-y-2 border border-neutral-950 text-neutral-400 relative">
              <p>📌 <strong>SYSTEM RIDDLE:</strong></p>
              <p className="italic text-[#f3e9dc]">
                "Thorne caters to a limit____ few. If the brand's on-chain block index of infinity represents 99 nodes of pristine validation, input the correct sequence suffix to verify integrity."
              </p>
              <p className="text-[10px] text-neutral-500">
                Hint: Standard credentials require matching either <strong>"THORNE-99"</strong>, <strong>"99"</strong>, or the missing letters from the display quote.
              </p>
            </div>

            <form onSubmit={handleVerifyPuzzle} className="flex gap-2">
              <input
                required
                type="text"
                value={challengeCode}
                onChange={(e) => setChallengeCode(e.target.value)}
                placeholder="Enter Cryptic Verification Key..."
                className="flex-1 bg-[#111112] text-xs font-mono border border-neutral-800 rounded p-2.5 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-700"
              />
              <button
                id="submit-challenge-btn"
                type="submit"
                disabled={challengeStep === 'testing'}
                className="bg-[#f3e9dc] hover:bg-white text-neutral-950 px-4 py-2.5 rounded text-[10px] uppercase font-bold tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center shrink-0"
              >
                {challengeStep === 'testing' ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : 'DECRYPT'}
              </button>
            </form>

            <AnimatePresence mode="wait">
              {challengeStep === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="p-3 bg-green-950/30 border border-green-900 text-green-400 rounded flex items-center space-x-2"
                >
                  <ShieldCheck className="h-5 w-5 text-green-500 shrink-0" />
                  <div className="text-left text-[11px]">
                    <span className="font-semibold uppercase tracking-wider block">Signature Matches Node Registry!</span>
                    <span>Generational Legacy status is now securely recorded inside your connected ledger keyring.</span>
                  </div>
                </motion.div>
              )}

              {challengeStep === 'failed' && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="p-3 bg-red-950/30 border border-red-900 text-red-400 rounded flex items-center space-x-2"
                >
                  <span className="text-base select-none shrink-0">⚠️</span>
                  <div className="text-left text-[11px]">
                    <span className="font-semibold uppercase tracking-wider block">Checksum Mismatch Error</span>
                    <span>Supplied verification token fails validation. Re-examine the riddle and credentials index.</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}
