import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Wallet, ShieldCheck, CornerDownRight, Landmark, ArrowRight, CircleCheck, Coins } from 'lucide-react';
import { UserWallet } from '../types';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  wallet: UserWallet;
  onConnect: (address: string, tier: 'Vanguard' | 'Sovereign' | 'Legacy') => void;
  onDisconnect: () => void;
}

export default function WalletModal({ isOpen, onClose, wallet, onConnect, onDisconnect }: WalletModalProps) {
  const [connecting, setConnecting] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);

  const providers = [
    { id: 'metamask', name: 'MetaMask', desc: 'Secure browser extension' },
    { id: 'coinbase', name: 'Coinbase Wallet', desc: 'Sovereign mobile vault' },
    { id: 'walletconnect', name: 'WalletConnect', desc: 'Scan multi-chain QR' },
    { id: 'ledger', name: 'Ledger Secure', desc: 'Hardware cold isolation' }
  ];

  const handleProviderSelect = (providerId: string) => {
    setSelectedProvider(providerId);
    setConnecting(true);
    setTimeout(() => {
      // Simulate real premium connection
      const randomTiers: ('Vanguard' | 'Sovereign' | 'Legacy')[] = ['Vanguard', 'Sovereign', 'Legacy'];
      const chosenTier = randomTiers[Math.floor(Math.random() * randomTiers.length)];
      const mockAddress = `0x71C${Math.random().toString(16).substr(2, 6).toUpperCase()}...${Math.random().toString(16).substr(2, 4).toUpperCase()}8ae9`;
      onConnect(mockAddress, chosenTier);
      setConnecting(false);
      setSelectedProvider(null);
    }, 1800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="wallet-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.6 }}
            className="relative w-full max-w-lg overflow-hidden rounded-md border border-neutral-800 bg-neutral-950 p-6 shadow-2xl md:p-8"
          >
            {/* Ambient glows inside */}
            <div className="absolute top-0 left-1/4 h-[1px] w-1/2 bg-gradient-to-r from-transparent via-gold-accent/40 to-transparent" />

            <div className="flex items-center justify-between border-b border-neutral-900 pb-4">
              <div className="flex items-center space-x-3">
                <Wallet className="h-5 w-5 text-neutral-400" />
                <h3 className="font-cinzel text-lg font-medium tracking-widest text-[#f3e9dc]">
                  CRYPTOGRAPHIC LOG-IN
                </h3>
              </div>
              <button
                id="close-wallet-modal-btn"
                onClick={onClose}
                className="rounded-full p-1 text-neutral-500 hover:bg-neutral-900 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {connecting ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="relative mb-6">
                  <div className="h-12 w-12 rounded-full border-2 border-neutral-800 border-t-neutral-400 animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-neutral-400" />
                  </div>
                </div>
                <p className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                  Negotiating Secure Handshake...
                </p>
                <p className="mt-2 text-xs text-neutral-600 font-sans">
                  Provider: {providers.find(p => p.id === selectedProvider)?.name}
                </p>
              </div>
            ) : wallet.connected ? (
              <div className="py-6">
                <div className="rounded border border-neutral-900 bg-neutral-900/40 p-4 mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">Connected Identity</span>
                    <span className="flex items-center space-x-1 font-mono text-[10px] text-green-500 px-2 py-0.5 rounded bg-green-950/40 border border-green-900/30">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                      <span>SECURE</span>
                    </span>
                  </div>
                  <div className="font-mono text-[#f3e9dc] tracking-wider text-sm select-all">
                    {wallet.address}
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4 border-t border-neutral-900 pt-4">
                    <div>
                      <span className="block font-mono text-[10px] text-neutral-500 uppercase tracking-widest mb-1">
                        LIQUEFIED ETH
                      </span>
                      <div className="flex items-center space-x-1.5">
                        <Coins className="h-3.5 w-3.5 text-neutral-400" />
                        <span className="font-mono text-[#f3e9dc] text-sm font-medium">{wallet.balanceETH.toFixed(2)} ETH</span>
                      </div>
                    </div>
                    <div>
                      <span className="block font-mono text-[10px] text-neutral-500 uppercase tracking-widest mb-1">
                        STABLE COLLATERAL
                      </span>
                      <div className="flex items-center space-x-1.5">
                        <Landmark className="h-3.5 w-3.5 text-neutral-400" />
                        <span className="font-mono text-[#f3e9dc] text-sm font-medium">
                          ${wallet.balanceUSDC.toLocaleString()} USDC
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-6 space-y-3">
                  <h4 className="font-mono text-xs uppercase tracking-widest text-neutral-500 flex items-center">
                    <ShieldCheck className="mr-2 h-4 w-4 text-green-500" />
                    ACQUIRED PROVENANCE TIERS
                  </h4>
                  <div className="border border-neutral-900 bg-neutral-950 rounded p-3 flex justify-between items-center">
                    <div>
                      <span className="text-[10px] text-neutral-500 tracking-wider block">MEMBER TIER LEVEL</span>
                      <span className="font-cinzel text-sm text-yellow-500/90 font-semibold tracking-widest uppercase">
                        {wallet.tier} COVENANT
                      </span>
                    </div>
                    <span className="text-[10px] text-neutral-400 border border-neutral-800 bg-neutral-900 px-2.5 py-1 rounded font-mono">
                      ELITE-99
                    </span>
                  </div>

                  {wallet.inventory.length === 0 ? (
                    <div className="text-center py-4 rounded border border-dashed border-neutral-900 bg-neutral-950">
                      <p className="text-xs text-neutral-500">No on-chain physical asset passports detected in this wallet.</p>
                      <button 
                        onClick={onClose}
                        className="mt-2 text-[10px] text-neutral-400 hover:text-white underline uppercase tracking-widest"
                      >
                        Explore Showroom
                      </button>
                    </div>
                  ) : (
                    <div>
                      <span className="text-[10px] text-neutral-500 tracking-widest font-mono uppercase block mb-2">PASS PASSES IN KEYRING:</span>
                      <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                        {wallet.inventory.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between bg-neutral-900 p-2 rounded border border-neutral-800/40">
                            <div className="flex items-center space-x-2">
                              <CornerDownRight className="h-3 w-3 text-neutral-500" />
                              <div className="text-left">
                                <span className="text-[11px] font-mono text-[#f3e9dc] block leading-none font-semibold">
                                  {item.assetName}
                                </span>
                                <span className="text-[9px] text-neutral-500 font-mono">
                                  Minted: {item.mintedAt}
                                </span>
                              </div>
                            </div>
                            <span className="text-[8px] font-mono select-all text-neutral-500 max-w-[100px] truncate">
                              {item.certificateHash}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex space-x-3">
                  <button
                    id="disconnect-wallet-btn"
                    onClick={() => {
                      onDisconnect();
                      onClose();
                    }}
                    className="w-1/2 rounded border border-neutral-900 bg-neutral-950 py-2 text-xs font-mono uppercase text-red-500 hover:bg-neutral-900 transition-colors"
                  >
                    DISCONNECT
                  </button>
                  <button
                    id="resume-showroom-btn"
                    onClick={onClose}
                    className="w-1/2 rounded bg-[#f3e9dc] py-2 text-xs font-mono font-medium uppercase text-neutral-950 hover:bg-white transition-all flex items-center justify-center space-x-1"
                  >
                    <span>SHOWROOM</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-6">
                <p className="text-xs text-neutral-400 mb-6 text-center leading-relaxed">
                  Establish a decentralized credential handshake with your private cold key or software wallet to audit asset authenticity vaults, access confidential pricing metrics, and track digital commissions.
                </p>

                <div className="space-y-2">
                  {providers.map((p) => (
                    <button
                      key={p.id}
                      id={`provider-${p.id}`}
                      onClick={() => handleProviderSelect(p.id)}
                      className="w-full text-left rounded border border-neutral-900 bg-neutral-900/10 p-3 hover:bg-neutral-900/60 hover:border-neutral-800 transition-all flex items-center justify-between group"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="rounded-full bg-neutral-900 p-2 border border-neutral-800 group-hover:border-neutral-700">
                          <Wallet className="h-4 w-4 text-[#f3e9dc]/80" />
                        </div>
                        <div>
                          <p className="font-mono text-xs uppercase text-[#f3e9dc] font-semibold">{p.name}</p>
                          <p className="text-[10px] text-neutral-500 leading-none mt-0.5">{p.desc}</p>
                        </div>
                      </div>
                      <ArrowRight className="h-3.5 w-3.5 text-neutral-600 group-hover:translate-x-1 transition-transform group-hover:text-white" />
                    </button>
                  ))}
                </div>

                <div className="mt-6 text-center text-[10px] text-neutral-600 flex items-center justify-center space-x-1.5 font-mono">
                  <ShieldCheck className="h-3 w-3" />
                  <span>SECURE ECDSA ENCRYPTED CHANNEL</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
