import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Landmark, ShieldAlert, Award, FileSpreadsheet, Anchor, Fuel, Key, Compass, Info, Heart } from 'lucide-react';
import { Asset, UserWallet } from '../types';

interface AssetDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  asset: Asset;
  userWallet: UserWallet;
  onMintCertificate: (assetName: string, category: 'yachts' | 'automobiles') => void;
  onOpenWalletModal: () => void;
}

export default function AssetDetailModal({
  isOpen,
  onClose,
  asset,
  userWallet,
  onMintCertificate,
  onOpenWalletModal
}: AssetDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'configurator' | 'blueprint'>('overview');
  
  // Bespoke customizer choices
  const [extColor, setExtColor] = useState('Obsidian Metallic Black');
  const [interior, setInterior] = useState('Alpine Bull Hide Noir');
  const [trim, setTrim] = useState('Polished Raw Titanium');
  const [acousticSystem, setAcousticSystem] = useState(false);
  const [stabilizers, setStabilizers] = useState(false);
  
  const [mintStatus, setMintStatus] = useState<'idle' | 'minting' | 'completed' | 'failed'>('idle');
  const [latestTxHash, setLatestTxHash] = useState('');
  
  // Custom contact details for concierge
  const [conciergeMsg, setConciergeMsg] = useState('');
  const [isJoinedWaitlist, setIsJoinedWaitlist] = useState(false);
  const [submitProgress, setSubmitProgress] = useState(false);

  // Dynamic price calculation
  const basePriceNum = parseInt(asset.priceEstimate.replace(/[^0-9]/g, ''), 10);
  const calculateTotalPrice = () => {
    let price = basePriceNum;
    if (extColor === 'Sarthe Titanium Pearl') price += 85000;
    if (extColor === 'Liquid Liquid Platinum') price += 120000;
    if (interior === 'White Jade Alcantara') price += 45000;
    if (interior === 'Ermenegildo Zegna Silk-weave') price += 75000;
    if (trim === 'Bespoke Coal Marquetry') price += 35000;
    if (trim === 'Open-pore Walnut Burl') price += 28000;
    if (acousticSystem) price += 60000;
    if (stabilizers) price += 220000;
    return price;
  };

  useEffect(() => {
    // Reset configurator defaults on asset change
    setExtColor(asset.category === 'yachts' ? 'Pure Carrara White' : 'Obsidian Metallic Black');
    setInterior(asset.category === 'yachts' ? 'Teak & Cream Alcantara' : 'Alpine Bull Hide Noir');
    setTrim(asset.category === 'yachts' ? 'Raw Bronzed Copper' : 'Polished Raw Titanium');
    setAcousticSystem(false);
    setStabilizers(false);
    setActiveTab('overview');
    setMintStatus('idle');
    setIsJoinedWaitlist(false);
    setConciergeMsg('');
  }, [asset]);

  const handleMintPass = () => {
    if (!userWallet.connected) {
      onOpenWalletModal();
      return;
    }
    
    setMintStatus('minting');
    
    // Simulate smart contract mining latency
    setTimeout(() => {
      const mockTx = `0xdb58${Math.random().toString(16).substr(2, 8).toUpperCase()}...8893F7`;
      setLatestTxHash(mockTx);
      onMintCertificate(asset.name, asset.category);
      setMintStatus('completed');
    }, 2200);
  };

  const handleConciergeForm = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitProgress(true);
    setTimeout(() => {
      setSubmitProgress(false);
      setIsJoinedWaitlist(true);
    }, 1500);
  };

  const isAlreadyMinted = userWallet.inventory.some(item => item.assetName === asset.name);

  // Form selections lists
  const optionsColors = asset.category === 'yachts' 
    ? ['Pure Carrara White', 'Polaris Ice Grey', 'Deep Cosmic Indigo', 'Sarthe Titanium Pearl']
    : ['Obsidian Metallic Black', 'Stardust Charcoal', 'Sarthe Titanium Pearl', 'Liquid Liquid Platinum'];

  const optionsInteriors = asset.category === 'yachts'
    ? ['Teak & Cream Alcantara', 'Saddle Bull-hide Hermès Gold', 'White Jade Alcantara', 'Sea-salt Micro-fiber']
    : ['Alpine Bull Hide Noir', 'Cream Alcantara', 'Ermenegildo Zegna Silk-weave', 'Crimson Sullano Leather'];

  const optionsTrims = asset.category === 'yachts'
    ? ['Raw Bronzed Copper', 'Mirrored Marine Stainless', 'Open-pore Walnut Burl', 'Marine Pre-preg Carbon']
    : ['Polished Raw Titanium', 'Bespoke Coal Marquetry', 'Open-pore Walnut Burl', 'Flawless Forge-wave Composite'];

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="asset-detail-modal" className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/95 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-5xl h-[92vh] sm:h-[85vh] overflow-hidden rounded border border-neutral-900 bg-[#0c0c0d] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-neutral-900 px-6 py-4 shrink-0 bg-neutral-950/70">
              <div className="flex items-center space-x-3">
                <span className="font-mono text-[10px] tracking-widest text-[#d4af37] border border-[#d4af37]/30 px-2.5 py-0.5 rounded-full uppercase">
                  {asset.category} Showroom
                </span>
                <h2 className="font-cinzel text-lg sm:text-xl font-medium tracking-widest text-[#f3e9dc]">
                  {asset.name}
                </h2>
              </div>
              <button
                id="close-asset-modal-btn"
                onClick={onClose}
                className="rounded-full p-1.5 text-neutral-400 hover:bg-neutral-900 hover:text-white transition-colors"
                aria-label="Close details"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Inner modal tab selector */}
            <div className="flex bg-neutral-950/40 border-b border-neutral-900 px-6 shrink-0 z-10 overflow-x-auto no-scrollbar">
              <button
                id="tab-overview"
                onClick={() => setActiveTab('overview')}
                className={`py-3 px-4 font-mono text-xs uppercase tracking-widest border-b-2 transition-all leading-none focus:outline-none shrink-0 ${
                  activeTab === 'overview' 
                    ? 'border-[#f3e9dc] text-[#f3e9dc] font-semibold' 
                    : 'border-transparent text-neutral-500 hover:text-neutral-300'
                }`}
              >
                Overview
              </button>
              <button
                id="tab-configurator"
                onClick={() => setActiveTab('configurator')}
                className={`py-3 px-4 font-mono text-xs uppercase tracking-widest border-b-2 transition-all leading-none focus:outline-none shrink-0 ${
                  activeTab === 'configurator' 
                    ? 'border-[#f3e9dc] text-[#f3e9dc] font-semibold' 
                    : 'border-transparent text-neutral-500 hover:text-neutral-300'
                }`}
              >
                Bespoke Configurator
              </button>
              <button
                id="tab-blueprint"
                onClick={() => setActiveTab('blueprint')}
                className={`py-3 px-4 font-mono text-xs uppercase tracking-widest border-b-2 transition-all leading-none focus:outline-none shrink-0 ${
                  activeTab === 'blueprint' 
                    ? 'border-[#f3e9dc] text-[#f3e9dc] font-semibold' 
                    : 'border-transparent text-neutral-500 hover:text-neutral-300'
                }`}
              >
                On-Chain Provenance
              </button>
            </div>

            {/* Scrollable Content Pane */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
              {activeTab === 'overview' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left Column: Image & Feature Accents */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="relative aspect-[16/9] rounded overflow-hidden border border-neutral-900 group">
                      <img 
                        src={asset.bgImage} 
                        alt={asset.name} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                        <div>
                          <p className="font-mono text-[9px] uppercase tracking-widest text-[#d4af37]">Physical Manifest</p>
                          <h4 className="font-cinzel text-md font-semibold text-white tracking-widest">{asset.name}</h4>
                        </div>
                        <span className="font-mono text-xs text-neutral-400">{asset.dimensions}</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-serif text-2xl font-light italic text-[#f3e9dc]">
                        "{asset.tagline}"
                      </h3>
                      <p className="text-sm text-neutral-400 leading-relaxed font-light">
                        {asset.longDescription}
                      </p>
                    </div>

                    <div className="border-t border-neutral-900 pt-6">
                      <div className="flex items-center space-x-2 text-gold-accent/80 mb-4">
                        <Award className="h-4.5 w-4.5 text-[#d4af37]" />
                        <h4 className="font-mono text-xs uppercase tracking-widest font-semibold text-[#f3e9dc]">Bespoke Craftsmanship Highlights</h4>
                      </div>
                      <ul id="craft-highlights-list" className="space-y-3">
                        {asset.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start text-xs text-neutral-400 leading-relaxed">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37] mr-3 mt-1.5 shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right Column: Specification Matrix */}
                  <div className="lg:col-span-5 space-y-6">
                    <div className="bg-neutral-950/60 rounded border border-neutral-900 p-5">
                      <h4 className="font-mono text-xs uppercase tracking-widest text-neutral-400 border-b border-neutral-900 pb-2 mb-4">
                        Veritable Metrics
                      </h4>
                      <dl className="space-y-3">
                        {asset.specs.map((spec, sIdx) => (
                          <div key={sIdx} className="flex justify-between items-baseline text-xs border-b border-neutral-950 pb-2">
                            <dt className="text-neutral-500 font-mono text-[10px] uppercase tracking-wider">{spec.label}</dt>
                            <dd className="text-[#f3e9dc] font-medium text-right ml-4 font-sans">{spec.value}</dd>
                          </div>
                        ))}
                      </dl>

                      <div className="mt-6 pt-4 border-t border-neutral-900 flex justify-between items-center bg-[#070708] p-3 rounded">
                        <div>
                          <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest block leading-none">
                            BASE VALUATION
                          </span>
                          <span className="text-md font-sans font-light text-neutral-400 mt-1 block">
                            ESTIMATE SECURED
                          </span>
                        </div>
                        <span className="font-mono text-lg font-semibold text-[#d4af37]">
                          {asset.priceEstimate}
                        </span>
                      </div>
                    </div>

                    <div className="bg-neutral-950/60 rounded border border-neutral-900 p-5 space-y-4">
                      <h4 className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                        Concierge Intake Form
                      </h4>
                      {isJoinedWaitlist ? (
                        <div id="waitlist-success" className="p-4 bg-green-950/30 border border-green-900/60 rounded text-center">
                          <Check className="h-6 w-6 text-green-500 mx-auto mb-2" />
                          <p className="font-mono text-xs text-green-400 uppercase tracking-wider">Inquiry Authenticated</p>
                          <p className="text-[11px] text-neutral-400 mt-1">Our Elite Liaison Officer will contact you within 4 hours via encrypt protocol.</p>
                        </div>
                      ) : (
                        <form onSubmit={handleConciergeForm} className="space-y-3">
                          <div>
                            <label className="block text-[9px] font-mono text-neutral-500 uppercase tracking-widest mb-1">COMMENTS & MANDATES</label>
                            <textarea 
                              required
                              value={conciergeMsg}
                              onChange={(e) => setConciergeMsg(e.target.value)}
                              placeholder="Specify polar class requirements, private hangar configurations, custom call-sign engravings..."
                              className="w-full bg-neutral-900 text-xs border border-neutral-800 rounded p-2.5 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-700 min-h-[60px]"
                            />
                          </div>

                          <button
                            id="submit-inquiry-btn"
                            type="submit"
                            disabled={submitProgress}
                            className="w-full py-2 bg-neutral-150 bg-[#e5e5e6] hover:bg-white text-neutral-950 font-mono text-xs uppercase tracking-widest rounded transition-all font-semibold flex items-center justify-center space-x-1.5"
                          >
                            <span>{submitProgress ? 'AUTHENTICATING ENVOY...' : 'SUBMIT SECURE INQUIRY'}</span>
                          </button>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'configurator' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left: Interactive Preview Sheet */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="relative aspect-[16/9] rounded overflow-hidden border border-neutral-900 bg-neutral-950 flex items-center justify-center">
                      <img 
                        src={asset.bgImage} 
                        alt="Bespoke configuration" 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover opacity-80 brightness-90 transition-all filter blur-[1px] group-hover:blur-0"
                      />
                      <div className="absolute inset-0 bg-neutral-950/40 mix-blend-color" />
                      <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/95 via-[#000]/20 to-transparent">
                        <div className="grid grid-cols-3 gap-2 text-center rounded border border-neutral-900 bg-neutral-950/90 p-3 backdrop-blur-md">
                          <div>
                            <span className="block text-[8px] font-mono text-neutral-500 uppercase">EXTERIOR</span>
                            <span className="text-[10px] font-mono text-[#f3e9dc] font-semibold truncate block">{extColor}</span>
                          </div>
                          <div>
                            <span className="block text-[8px] font-mono text-neutral-500 uppercase">INTERIOR CAB</span>
                            <span className="text-[10px] font-mono text-[#f3e9dc] font-semibold truncate block">{interior}</span>
                          </div>
                          <div>
                            <span className="block text-[8px] font-mono text-neutral-500 uppercase">HIGHLIGHT TRIM</span>
                            <span className="text-[10px] font-mono text-[#f3e9dc] font-semibold truncate block">{trim}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-neutral-950 border border-neutral-900 rounded p-5 space-y-4">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-neutral-500 uppercase">Cryptographical Passport Draft Hash</span>
                        <span className="text-[10px] text-neutral-400 select-all font-semibold">
                          0xBD9{extColor.length.toString(16)}{interior.length.toString(16)}{trim.length.toString(16)}F...C4e8
                        </span>
                      </div>
                      <p className="text-[10px] text-neutral-500 leading-relaxed">
                        Every subtle architectural adjustments dynamic registers a revision token under Ethereum IPFS architecture. Minting structural passports secures configuration credentials immutably.
                      </p>
                    </div>
                  </div>

                  {/* Right: Customization Controls */}
                  <div className="lg:col-span-5 space-y-5">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[9px] font-mono text-neutral-500 uppercase tracking-widest mb-1.5 font-semibold">
                          EXTERIOR COAT FINISH
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {optionsColors.map((color) => (
                            <button
                              key={color}
                              id={`color-${color.replace(/\s+/g, '-')}`}
                              onClick={() => setExtColor(color)}
                              className={`py-2 px-3 text-left rounded border text-[11px] font-mono leading-tight hover:border-neutral-700 transition-all ${
                                extColor === color 
                                  ? 'bg-[#f3e9dc] text-neutral-950 border-[#f3e9dc] font-semibold' 
                                  : 'bg-neutral-900 text-neutral-400 border-neutral-800'
                              }`}
                            >
                              {color}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-[9px] font-mono text-neutral-500 uppercase tracking-widest mb-1.5 font-semibold">
                          INTERIOR CABIN COVENANT
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {optionsInteriors.map((intOpt) => (
                            <button
                              key={intOpt}
                              id={`interior-${intOpt.replace(/\s+/g, '-')}`}
                              onClick={() => setInterior(intOpt)}
                              className={`py-2 px-3 text-left rounded border text-[11px] font-mono leading-tight hover:border-neutral-700 transition-all ${
                                interior === intOpt 
                                  ? 'bg-[#f3e9dc] text-neutral-950 border-[#f3e9dc] font-semibold' 
                                  : 'bg-neutral-900 text-neutral-400 border-neutral-800'
                              }`}
                            >
                              {intOpt}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-[9px] font-mono text-neutral-500 uppercase tracking-widest mb-1.5 font-semibold">
                          BESPOKE ACCENT MARQUETRY
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {optionsTrims.map((trimOpt) => (
                            <button
                              key={trimOpt}
                              id={`trim-${trimOpt.replace(/\s+/g, '-')}`}
                              onClick={() => setTrim(trimOpt)}
                              className={`py-2 px-3 text-left rounded border text-[11px] font-mono leading-tight hover:border-neutral-700 transition-all ${
                                trim === trimOpt 
                                  ? 'bg-[#f3e9dc] text-neutral-950 border-[#f3e9dc] font-semibold' 
                                  : 'bg-neutral-900 text-neutral-400 border-neutral-800'
                              }`}
                            >
                              {trimOpt}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2 space-y-3">
                        <label className="block text-[9px] font-mono text-neutral-500 uppercase tracking-widest font-semibold">
                          TECHNOLOGICAL UPGRADES
                        </label>
                        <div className="space-y-2">
                          <label className="flex items-center justify-between p-2.5 rounded bg-neutral-900 border border-neutral-800 hover:border-neutral-700 cursor-pointer select-none">
                            <div className="flex items-center space-x-3">
                              <input 
                                type="checkbox" 
                                checked={acousticSystem}
                                onChange={(e) => setAcousticSystem(e.target.checked)}
                                className="rounded border-neutral-700 bg-neutral-950 text-[#f3e9dc] focus:ring-0 h-4 w-4"
                              />
                              <div>
                                <span className="text-xs text-[#f3e9dc] font-mono uppercase font-semibold">Audiophile Studio Dome</span>
                                <span className="block text-[9px] text-neutral-500 font-sans">Custom resonance 18-speaker setup (+ $60,000)</span>
                              </div>
                            </div>
                          </label>

                          <label className="flex items-center justify-between p-2.5 rounded bg-neutral-900 border border-neutral-800 hover:border-neutral-700 cursor-pointer select-none">
                            <div className="flex items-center space-x-3">
                              <input 
                                type="checkbox" 
                                checked={stabilizers}
                                onChange={(e) => setStabilizers(e.target.checked)}
                                className="rounded border-neutral-700 bg-neutral-950 text-[#f3e9dc] focus:ring-0 h-4 w-4"
                              />
                              <div>
                                <span className="text-xs text-[#f3e9dc] font-mono uppercase font-semibold">
                                  {asset.category === 'yachts' ? 'Seakeeper Zero-Speed Gyro' : 'Hyperformance Ceramic Track Gears'}
                                </span>
                                <span className="block text-[9px] text-neutral-500 font-sans">
                                  {asset.category === 'yachts' ? 'Banish roll angles (+ $220,000)' : 'Precision dynamic gearboxes (+ $60,000)'}
                                </span>
                              </div>
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#070708] border border-neutral-900 rounded p-4 flex justify-between items-center mt-4">
                      <div>
                        <span className="text-[9px] font-mono text-neutral-500 uppercase leading-none block">DYNAMIC VALUATION</span>
                        <span className="text-[11px] text-neutral-400 font-sans mt-0.5 block">INCLUDING SPEC CONFIGS</span>
                      </div>
                      <span className="text-lg font-mono font-semibold text-[#d4af37]">
                        ${calculateTotalPrice().toLocaleString()} USD
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'blueprint' && (
                <div className="space-y-6">
                  <div className="rounded border border-neutral-900 bg-neutral-950/40 p-6 md:p-8 text-center max-w-2xl mx-auto space-y-6">
                    <div className="rounded-full bg-neutral-900 inline-flex p-4 border border-neutral-800 text-yellow-500/80">
                      <Compass className="h-8 w-8 text-[#d4af37]" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-cinzel text-md tracking-widest text-[#f3e9dc]">
                        DECENTRALIZED ENVOY CERTIFICATION
                      </h3>
                      <p className="text-xs text-neutral-400 font-light leading-relaxed max-w-md mx-auto">
                        In accordance with the Thorne Smart Protocol registry, verified collectors can instantiate an on-chain ownership certificate proving provenance to the physical chassis or shipbuilders ledger.
                      </p>
                    </div>

                    <div className="p-4 bg-neutral-900 rounded border border-neutral-800 text-left font-mono text-xs space-y-3">
                      <div className="flex justify-between items-center text-[10px] text-neutral-500 uppercase border-b border-neutral-800 pb-2">
                        <span>CONTRACT PARADOX STATE</span>
                        <span>SOL-v4.1.9</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Asset Record:</span>
                        <span className="text-white font-semibold">{asset.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Registry Anchor:</span>
                        <span className="text-white truncate max-w-[240px] font-semibold">{asset.dimensions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Verified Hash:</span>
                        <span className="text-neutral-400 select-all truncate max-w-[245px] font-mono">{asset.verifiedHash}</span>
                      </div>
                    </div>

                    {mintStatus === 'completed' ? (
                      <div className="p-4 bg-green-950/30 border border-green-900/40 rounded space-y-2 text-left">
                        <div className="flex items-center space-x-2 text-green-400 font-mono text-xs uppercase tracking-wider">
                          <Check className="h-4 w-4 bg-green-950 border border-green-800 rounded-full text-green-400 shrink-0" />
                          <span>PASSPORT SECURELY MINTED TO COLLECTOR KEYRING!</span>
                        </div>
                        <p className="text-[10px] text-neutral-400">
                          The receipt token is successfully cataloged in block validators. You can inspect your credential checklist on your local client keyring ledger context.
                        </p>
                        <p className="text-[8px] font-mono text-neutral-500 select-all break-all leading-none mt-1">
                          TX SECURE HASH: {latestTxHash}
                        </p>
                      </div>
                    ) : mintStatus === 'minting' ? (
                      <div className="py-6 flex flex-col items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#d4af37] border-t-transparent" />
                        <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 mt-4">Mining Credentials block...</span>
                      </div>
                    ) : isAlreadyMinted ? (
                      <div className="p-4 bg-[#d4af37]/10 border border-[#d4af37]/30 rounded text-center">
                        <Check className="h-5 w-5 text-yellow-500 mx-auto mb-2" />
                        <span className="font-mono text-xs text-yellow-500 uppercase tracking-widest font-semibold block">Credential Passport Active</span>
                        <p className="text-[10px] text-neutral-400 mt-1">An original cryptographic verification token for this {asset.category} is already secure inside your keyring envelope.</p>
                      </div>
                    ) : (
                      <button
                        id="mint-certificate-btn"
                        onClick={handleMintPass}
                        className="py-3 px-8 bg-neutral-950 hover:bg-[#f3e9dc] hover:text-neutral-950 text-[#f3e9dc] border border-[#f3e9dc] font-mono text-xs uppercase tracking-widest rounded transition-all font-semibold inline-flex items-center space-x-2"
                      >
                        <Compass className="h-4 w-4" />
                        <span>MINT SECURE COLLECTOR CERTIFICATE</span>
                      </button>
                    )}

                    {!userWallet.connected && (
                      <p className="text-[10px] text-red-400/80 font-mono">
                        ⚠️ Please establish cryptographic wallet credentials before attempting to claim on-chain asset records.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
