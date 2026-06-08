/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Compass, 
  Key, 
  Anchor, 
  Globe, 
  Infinity as InfinityIcon, 
  ArrowRight, 
  ArrowUpRight, 
  ChevronLeft, 
  ChevronRight, 
  Menu, 
  X, 
  Wallet, 
  Send, 
  MessageSquare, 
  Check, 
  Heart,
  Eye,
  Settings,
  Search,
  Filter,
  CheckCircle2
} from 'lucide-react';

import { ASSETS, STORIES } from './data';
import { Asset, UserWallet, ChatMessage } from './types';

// Modals and panels
import WalletModal from './components/WalletModal';
import AssetDetailModal from './components/AssetDetailModal';
import MembersPanel from './components/MembersPanel';
import JournalPanel from './components/JournalPanel';

export default function App() {
  // Navigation & UI control state
  const [activeTab, setActiveTab] = useState<'all' | 'yachts' | 'automobiles'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Carousel states for Sections
  const [activeYachtIdx, setActiveYachtIdx] = useState(0);
  const [activeCarIdx, setActiveCarIdx] = useState(1); // Default to phantom-nova (idx 1 in our comprehensive asset list)

  // Wallet State
  const [wallet, setWallet] = useState<UserWallet>({
    connected: false,
    address: null,
    balanceETH: 0.0,
    balanceUSDC: 0.0,
    tier: 'None',
    inventory: []
  });

  // Modal Control States
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  // Chat State (Floating Concierge)
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [conciergeLoading, setConciergeLoading] = useState(false);

  // Filter lists of Yachts and Automobiles specifically for carousels
  const yachtSlides = ASSETS.filter(a => a.category === 'yachts');
  const automobileSlides = ASSETS.filter(a => a.category === 'automobiles');

  // Trigger default greeting when opening chat
  useEffect(() => {
    if (chatMessages.length === 0) {
      setChatMessages([
        {
          id: 'welcome',
          sender: 'concierge',
          text: 'Welcome to the Thorne Liaison Center. I am your automated Elite Concierge. Connect your cryptographic wallet or specify custom requirements for superyacht Polar conversions, bespoke V12 acoustic tuning, or off-market access. How may I guide your inquiry today?',
          timestamp: 'Just now'
        }
      ]);
    }
  }, [chatMessages]);

  // Connect Wallet Action
  const handleConnectWallet = (address: string, tier: 'Vanguard' | 'Sovereign' | 'Legacy') => {
    setWallet({
      connected: true,
      address,
      balanceETH: 124.85,
      balanceUSDC: 1250000,
      tier,
      inventory: []
    });
    
    // Supplement greeting message dynamically
    setChatMessages(prev => [
      ...prev,
      {
        id: `sys-${Date.now()}`,
        sender: 'concierge',
        text: `Handshake established. Welcome, Sovereign Collector [${address.slice(0,6)}...]. Your profile is verified as ${tier} Covenant level. You now have exclusive right to configure custom options or mint asset passports directly into your local keyring.`,
        timestamp: 'Just now'
      }
    ]);
  };

  // Disconnect Wallet
  const handleDisconnectWallet = () => {
    setWallet({
      connected: false,
      address: null,
      balanceETH: 0,
      balanceUSDC: 0,
      tier: 'None',
      inventory: []
    });
  };

  // Upgrade Tier Action
  const handleUpgradeTier = (tier: 'Vanguard' | 'Sovereign' | 'Legacy') => {
    setWallet(prev => ({
      ...prev,
      tier
    }));
  };

  // On-Chain minting credential passport
  const handleMintPass = (assetName: string, category: 'yachts' | 'automobiles') => {
    const mockHash = `0x9c3d${Math.random().toString(16).substr(2, 6).toUpperCase()}...${Math.random().toString(16).substr(2, 4).toUpperCase()}883F`;
    const newItem = {
      id: `nft-${Date.now()}`,
      assetName,
      category,
      certificateHash: mockHash,
      mintedAt: new Date().toLocaleDateString(),
      tier: wallet.tier
    };

    setWallet(prev => ({
      ...prev,
      inventory: [...prev.inventory, newItem]
    }));
    
    // Add transaction to assistant chat log
    setChatMessages(prev => [
      ...prev,
      {
        id: `tx-sys-${Date.now()}`,
        sender: 'concierge',
        text: `✅ COMPLETED: Successfully cataloged digital provenance passport for "${assetName}" into connected ledger envelope. Verification proof hash is secure: ${mockHash}.`,
        timestamp: 'Just now'
      }
    ]);
  };

  // Handle preset queries in concierge chat
  const handleChatPreset = (queryText: string, replyText: string) => {
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: queryText,
      timestamp: 'Just now'
    };
    
    setChatMessages(prev => [...prev, userMsg]);
    setConciergeLoading(true);

    setTimeout(() => {
      setConciergeLoading(false);
      setChatMessages(prev => [
        ...prev,
        {
          id: `c-${Date.now()}`,
          sender: 'concierge',
          text: replyText,
          timestamp: 'Just now'
        }
      ]);
    }, 1200);
  };

  // Submit custom inquiry text
  const handleSendChatText = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: chatInput,
      timestamp: 'Just now'
    };

    setChatMessages(prev => [...prev, userMsg]);
    const inputClean = chatInput.toLowerCase();
    setChatInput('');
    setConciergeLoading(true);

    // Custom simulated AI responses depending on key phrases
    setTimeout(() => {
      setConciergeLoading(false);
      let reply = 'Inquiry logged securely. Our primary naval architect and automotive design lead will verify your requirements. If your cryptographic tier is active, a ledger transmission will be broadcasted to your verified envelope shortly.';
      
      if (inputClean.includes('yacht') || inputClean.includes('athena') || inputClean.includes('elysium')) {
        reply = 'Regarding Thorne superyachts: Athena 115 is fully configured for deep ice transit with polar hull reinforcement. Elysium 80 incorporates a state-of-the-art silent hydrogen fuel array. Would you like me to open the custom configurator panel for either of these crafts?';
      } else if (inputClean.includes('car') || inputClean.includes('phantom') || inputClean.includes('spectre')) {
        reply = 'Our automobile bespoke program operates on raw carbon and solid titanium frames. The Phantom Nova features an acoustic V12 exhaust and custom starlight arrays. Click "Bespoke Configurator" in the showroom to customize exterior finishes.';
      } else if (inputClean.includes('wallet') || inputClean.includes('connect')) {
        reply = 'Decrypting connections. Click "CONNECT WALLET" on the header or footer. This instantiates a secure RPC state that enables digital passport mints, unlocks exclusive inventory tiers, and updates verified telemetry blueprints.';
      } else if (inputClean.includes('membership') || inputClean.includes('covenant')) {
        reply = 'The Thorne Covenant operates in three digital ranks: Vanguard, Sovereign, and Legacy. You can unlock Sovereign and Legacy access immediately by solving the Ledger Riddle puzzle below or by certifying high-end inventory purchases.';
      }

      setChatMessages(prev => [
        ...prev,
        {
          id: `c-${Date.now()}`,
          sender: 'concierge',
          text: reply,
          timestamp: 'Just now'
        }
      ]);
    }, 1400);
  };

  // Open asset modal and set state
  const handleOpenAssetDetail = (asset: Asset) => {
    setSelectedAsset(asset);
    setDetailOpen(true);
  };

  // Scroll to section block cleanly
  const scrollToAnchor = (elementId: string) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  // Search filter applied to bottom Featured Inventory section
  const filteredInventory = ASSETS.filter(item => {
    const matchesCategory = activeTab === 'all' || item.category === activeTab;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.dimensions.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="relative min-h-screen bg-[#070708] text-[#e5e5e6] overflow-x-hidden font-sans selection:bg-[#d4af37]/30 selection:text-white">
      
      {/* Background visual ambience */}
      <div className="fixed inset-0 glow-overlay opacity-20 pointer-events-none bg-radial-gradient from-neutral-900 via-[#070708] to-[#010101] z-0" />

      {/* Header */}
      <header className="relative z-40 border-b border-neutral-900 bg-neutral-950/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex items-center justify-between">
          
          {/* Logo Brand Crest Left */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollToAnchor('hero-yachts')}>
            <div className="border border-neutral-800 p-1.5 rounded bg-neutral-950 flex items-center justify-center hover:border-neutral-700 transition-colors">
              <span className="font-cinzel text-xs text-[#d4af37] font-semibold tracking-widest leading-none">TT</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-cinzel text-xs font-bold tracking-widest text-[#f3e9dc]">THORNE</h1>
              <p className="text-[7px] text-neutral-500 tracking-wider">HYPEROBJECTS</p>
            </div>
          </div>

          {/* Center Banner Header Title */}
          <div className="text-center absolute left-1/2 -translate-x-1/2 hidden md:block">
            <h2 className="font-cinzel text-sm font-semibold tracking-[0.25em] text-[#f3e9dc] uppercase">THORNE</h2>
            <p className="text-[8px] text-[#f3e9dc]/70 font-mono tracking-widest uppercase mt-0.5">HYPEROBJECTS FOR A LIMITLESS FEW</p>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            <button 
              id="nav-link-yachts"
              onClick={() => scrollToAnchor('hero-yachts')} 
              className="font-mono text-[10px] tracking-widest text-neutral-400 hover:text-white uppercase transition-colors"
            >
              Yachts
            </button>
            <button 
              id="nav-link-automobiles"
              onClick={() => scrollToAnchor('hero-autos')} 
              className="font-mono text-[10px] tracking-widest text-neutral-400 hover:text-white uppercase transition-colors"
            >
              Automobiles
            </button>
            <button 
              id="nav-link-membership"
              onClick={() => scrollToAnchor('membership-section')} 
              className="font-mono text-[10px] tracking-widest text-neutral-400 hover:text-white uppercase transition-colors"
            >
              Membership
            </button>
            <button 
              id="nav-link-journal"
              onClick={() => scrollToAnchor('journal-section')} 
              className="font-mono text-[10px] tracking-widest text-neutral-400 hover:text-white uppercase transition-colors"
            >
              Journal
            </button>
          </nav>

          {/* Right Connect Wallet button */}
          <div className="flex items-center space-x-3">
            {wallet.connected ? (
              <button
                id="header-wallet-btn-connected"
                onClick={() => setWalletModalOpen(true)}
                className="font-mono text-[10px] tracking-widest rounded border border-[#d4af37]/40 bg-neutral-900/60 px-3.5 py-2 text-[#f3e9dc] hover:bg-neutral-900 hover:border-[#d4af37] transition-all flex items-center space-x-2"
              >
                <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="uppercase text-[9px] font-semibold text-[#d4af37]">{wallet.tier}</span>
                <span>•</span>
                <span className="font-mono">{wallet.address?.slice(0, 6)}...</span>
              </button>
            ) : (
              <button
                id="header-wallet-btn-disconnected"
                onClick={() => setWalletModalOpen(true)}
                className="font-mono text-[10px] tracking-widest rounded border border-neutral-800 bg-neutral-950 px-3.5 py-2 text-white hover:bg-neutral-900 hover:border-neutral-700 transition-all flex items-center space-x-1"
              >
                <span>CONNECT WALLET</span>
                <span className="text-[#d4af37]">+</span>
              </button>
            )}

            {/* Mobile ham menu */}
            <button 
              id="mobile-drawer-toggle"
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-1.5 border border-neutral-800 rounded text-neutral-400 hover:text-white hover:bg-neutral-900 transition-all"
            >
              <Menu className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="relative w-80 max-w-full bg-[#0c0c0d] border-l border-neutral-900 h-full p-6 flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-neutral-900 pb-4">
                  <span className="font-cinzel text-xs font-bold text-[#f3e9dc] tracking-widest">THORNE</span>
                  <button onClick={() => setMobileMenuOpen(false)} className="rounded p-1 text-neutral-500 hover:text-white">
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <nav className="flex flex-col space-y-4">
                  <button 
                    id="mobile-nav-yachts"
                    onClick={() => scrollToAnchor('hero-yachts')}
                    className="text-left font-mono text-xs uppercase tracking-widest py-2 border-b border-neutral-900/40 text-neutral-300 hover:text-white"
                  >
                    YACHTS
                  </button>
                  <button 
                    id="mobile-nav-autos"
                    onClick={() => scrollToAnchor('hero-autos')}
                    className="text-left font-mono text-xs uppercase tracking-widest py-2 border-b border-neutral-900/40 text-neutral-300 hover:text-white"
                  >
                    AUTOMOBILES
                  </button>
                  <button 
                    id="mobile-nav-members"
                    onClick={() => scrollToAnchor('membership-section')}
                    className="text-left font-mono text-xs uppercase tracking-widest py-2 border-b border-neutral-900/40 text-neutral-300 hover:text-white"
                  >
                    MEMBERSHIP
                  </button>
                  <button 
                    id="mobile-nav-journal"
                    onClick={() => scrollToAnchor('journal-section')}
                    className="text-left font-mono text-xs uppercase tracking-widest py-2 border-b border-neutral-900/40 text-neutral-300 hover:text-white"
                  >
                    THE JOURNAL
                  </button>
                  <button 
                    id="mobile-nav-inventory"
                    onClick={() => scrollToAnchor('featured-inventory-sec')}
                    className="text-left font-mono text-xs uppercase tracking-widest py-2 text-neutral-300 hover:text-white"
                  >
                    SHOWROOM LISTINGS
                  </button>
                </nav>
              </div>

              <div className="space-y-4">
                {wallet.connected ? (
                  <div className="rounded border border-neutral-900 bg-neutral-950 p-4">
                    <span className="block text-[8px] font-mono text-neutral-500 uppercase tracking-widest mb-1">CONNECTED KEYRING</span>
                    <span className="block text-xs font-mono text-white truncate max-w-full select-all mb-2">{wallet.address}</span>
                    <span className="inline-block font-cinzel text-[9px] text-[#d4af37] font-semibold tracking-wider bg-[#d4af37]/10 px-2.5 py-0.5 rounded border border-[#d4af37]/30 uppercase leading-none">
                      {wallet.tier} COVENANT
                    </span>
                  </div>
                ) : (
                  <button
                    id="mobile-drawer-connect"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setWalletModalOpen(true);
                    }}
                    className="w-full py-2.5 bg-[#f3e9dc] text-neutral-950 text-xs font-mono uppercase tracking-widest rounded transition-all font-semibold"
                  >
                    Connect Wallet +
                  </button>
                )}
                
                <p className="text-center text-[8px] text-neutral-600 font-mono tracking-widest">
                  MADE FOR A LIMITLESS FEW.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Hero Section 1: YACHTS (01 / 03) */}
      <section id="hero-yachts" className="relative z-10 w-full min-h-[92vh] flex items-center py-12 md:py-24 border-b border-neutral-900">
        
        {/* Background slide images */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeYachtIdx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${yachtSlides[activeYachtIdx].bgImage})` }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none opacity-90" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Slide interactive content */}
            <div className="space-y-6 max-w-xl text-left">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#d4af37] flex items-center space-x-2">
                <span>YACHTS CATALOG</span>
                <span>•</span>
                <span>{yachtSlides[activeYachtIdx].serial}</span>
              </span>

              <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#f3e9dc] font-light leading-[1.1] tracking-tight uppercase">
                {yachtSlides[activeYachtIdx].tagline}
              </h2>

              <p className="font-sans text-xs sm:text-sm tracking-widest text-[#e5e5e6]/80 max-w-md uppercase leading-relaxed font-light">
                {yachtSlides[activeYachtIdx].description}
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  id="explore-yachts-cta"
                  onClick={() => {
                    setActiveTab('yachts');
                    scrollToAnchor('featured-inventory-sec');
                  }}
                  className="rounded border border-neutral-800 bg-neutral-950/90 hover:bg-neutral-900 hover:border-neutral-700 px-6 py-3.5 font-mono text-[10px] uppercase font-bold tracking-widest text-white transition-all flex items-center justify-center space-x-2 shrink-0"
                >
                  <span>EXPLORE YACHTS</span>
                  <span className="text-[#d4af37]">+</span>
                </button>

                <button
                  id={`details-yacht-btn-${yachtSlides[activeYachtIdx].id}`}
                  onClick={() => handleOpenAssetDetail(yachtSlides[activeYachtIdx])}
                  className="rounded bg-[#f3e9dc] text-neutral-950 hover:bg-white px-6 py-3.5 font-mono text-[10px] uppercase font-bold tracking-widest transition-all flex items-center justify-center space-x-1.5 shrink-0"
                >
                  <span>CONFIGURE VESSEL</span>
                </button>
              </div>
            </div>

            {/* Float badge specifying yacht dimensions */}
            <div className="lg:justify-self-end text-left lg:text-right border-l lg:border-l-0 lg:border-r border-neutral-800 pl-4 lg:pl-0 lg:pr-6 py-2 bg-neutral-950/45 p-6 backdrop-blur-sm rounded shrink-0">
              <p className="font-serif text-lg text-white font-semibold tracking-wider">
                {yachtSlides[activeYachtIdx].name}
              </p>
              <p className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest mt-1">
                {yachtSlides[activeYachtIdx].dimensions}
              </p>
              <div className="mt-4 flex lg:justify-end">
                <button
                  id={`view-details-yacht-badge-${yachtSlides[activeYachtIdx].id}`}
                  onClick={() => handleOpenAssetDetail(yachtSlides[activeYachtIdx])}
                  className="text-[10px] font-mono text-[#d4af37] hover:text-white uppercase tracking-wider flex items-center space-x-2"
                >
                  <span>VIEW DETAILS</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Custom index splitting navigation bar - exactly styled like prompt */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between z-10">
          <span className="font-mono text-xs text-neutral-500 uppercase tracking-[0.2em]">01</span>
          
          {/* Sliced divider with center TT Shield icon */}
          <div className="flex-1 mx-6 relative flex items-center justify-center">
            <div className="absolute inset-x-0 h-[1px] bg-neutral-900" />
            <button 
              id="center-vessel-switcher"
              onClick={() => setActiveYachtIdx((prev) => (prev + 1) % yachtSlides.length)}
              className="relative z-10 border border-neutral-800 hover:border-neutral-700 bg-neutral-950 p-2 rounded transform hover:scale-105 transition-all text-[#d4af37]"
            >
              <span className="font-cinzel text-[10px] font-bold tracking-widest select-none">TT</span>
            </button>
          </div>

          <span className="font-mono text-xs text-neutral-500 uppercase tracking-[0.2em]">03</span>
        </div>
      </section>

      {/* Hero Section 2: AUTOMOBILES (02 / 03) */}
      <section id="hero-autos" className="relative z-10 w-full min-h-[92vh] flex items-center py-12 md:py-24 border-b border-neutral-900">
        
        {/* Background slide images */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCarIdx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.95 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${automobileSlides[activeCarIdx].bgImage})` }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/45 to-black pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none opacity-95" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Float badge specifying auto dimensions (Placed left to follow visual layout of the prompt section 2) */}
            <div className="text-left border-l border-neutral-800 pl-6 py-2 bg-neutral-950/45 p-6 backdrop-blur-sm rounded max-w-xs shrink-0 order-2 lg:order-1">
              <p className="font-serif text-lg text-white font-semibold tracking-wider">
                {automobileSlides[activeCarIdx].name}
              </p>
              <p className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest mt-1">
                {automobileSlides[activeCarIdx].dimensions}
              </p>
              <div className="mt-4 flex">
                <button
                  id={`view-details-auto-badge-${automobileSlides[activeCarIdx].id}`}
                  onClick={() => handleOpenAssetDetail(automobileSlides[activeCarIdx])}
                  className="text-[10px] font-mono text-[#d4af37] hover:text-white uppercase tracking-wider flex items-center space-x-2"
                >
                  <span>VIEW DETAILS</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>

            {/* Content block: Automobiles text (Placed right contextually for section 2) */}
            <div className="space-y-6 max-w-xl text-left lg:text-right lg:justify-self-end order-1 lg:order-2">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#d4af37] flex items-center lg:justify-end space-x-2">
                <span>AUTOMOBILES PROGRAM</span>
                <span>•</span>
                <span>{automobileSlides[activeCarIdx].serial}</span>
              </span>

              <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#f3e9dc] font-light leading-[1.1] tracking-tight uppercase">
                {automobileSlides[activeCarIdx].tagline}
              </h2>

              <div className="lg:flex lg:justify-end">
                <p className="font-sans text-xs sm:text-sm tracking-widest text-[#e5e5e6]/80 max-w-md uppercase leading-relaxed font-light">
                  {automobileSlides[activeCarIdx].description}
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center sm:justify-end gap-4">
                <button
                  id="explore-autos-cta"
                  onClick={() => {
                    setActiveTab('automobiles');
                    scrollToAnchor('featured-inventory-sec');
                  }}
                  className="rounded border border-neutral-800 bg-neutral-950/90 hover:bg-neutral-900 hover:border-neutral-700 px-6 py-3.5 font-mono text-[10px] uppercase font-bold tracking-widest text-white transition-all flex items-center justify-center space-x-2 shrink-0"
                >
                  <span>EXPLORE AUTOMOBILES</span>
                  <span className="text-[#d4af37]">+</span>
                </button>

                <button
                  id={`config-auto-btn-${automobileSlides[activeCarIdx].id}`}
                  onClick={() => handleOpenAssetDetail(automobileSlides[activeCarIdx])}
                  className="rounded bg-[#f3e9dc] text-neutral-950 hover:bg-white px-6 py-3.5 font-mono text-[10px] uppercase font-bold tracking-widest transition-all flex items-center justify-center space-x-1.5 shrink-0"
                >
                  <span>CONFIGURE CHASSIS</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Custom index divider splitting bar for Automobiles */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between z-10">
          <span className="font-mono text-xs text-neutral-500 uppercase tracking-[0.2em]">02</span>
          
          <div className="flex-1 mx-6 relative flex items-center justify-center">
            <div className="absolute inset-x-0 h-[1px] bg-neutral-900" />
            <button 
              id="center-auto-switcher"
              onClick={() => setActiveCarIdx((prev) => (prev + 1) % automobileSlides.length)}
              className="relative z-10 border border-neutral-800 hover:border-neutral-700 bg-neutral-950 p-2 rounded transform hover:scale-105 transition-all text-[#d4af37]"
            >
              <span className="font-cinzel text-[10px] font-bold tracking-widest select-none">TT</span>
            </button>
          </div>

          <span className="font-mono text-xs text-neutral-500 uppercase tracking-[0.2em]">03</span>
        </div>
      </section>

      {/* Monogram technical divider row precisely replicating image mid banner */}
      <section className="relative z-10 bg-[#0a0a0b] py-8 border-b border-neutral-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-6 md:gap-4">
            
            {/* Left verified certification line */}
            <div className="flex items-center space-x-3">
              <span className="font-mono text-[#d4af37] text-sm font-semibold select-none">+</span>
              <div>
                <p className="font-mono text-[9px] uppercase tracking-widest text-[#f3e9dc] font-bold">VERIFIED ASSETS</p>
                <p className="font-mono text-[8px] text-neutral-500 tracking-wider">ON-CHAIN CERTIFICATES</p>
              </div>
            </div>

            {/* Center on-chain Evolution mandate */}
            <div className="max-w-md text-center py-2 px-4">
              <p className="font-cinzel text-[12px] sm:text-[13px] tracking-[0.18em] text-[#f3e9dc] font-medium leading-relaxed">
                OWNERSHIP IS EVOLUTION.
              </p>
              <p className="font-mono text-[9px] text-[#d4af37] tracking-[0.1em] uppercase mt-0.5">
                INTEGRATED ON-CHAIN. VERIFIED FOREVER.
              </p>
            </div>

            {/* Right exclusive inventory access line */}
            <div className="flex items-center space-x-3 md:flex-row-reverse md:space-x-reverse">
              <span className="font-mono text-[#d4af37] text-sm font-semibold select-none">+</span>
              <div className="md:text-right">
                <p className="font-mono text-[9px] uppercase tracking-widest text-[#f3e9dc] font-bold">EXCLUSIVE ACCESS</p>
                <p className="font-mono text-[8px] text-neutral-500 tracking-wider">MEMBER-ONLY INVENTORY</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section 3: FEATURED INVENTORY GRID */}
      <section id="featured-inventory-sec" className="relative z-10 py-16 sm:py-24 border-b border-neutral-900 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header content and search filtering controls */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between border-b border-neutral-900 pb-5 mb-10 gap-6">
          <div className="text-left space-y-1">
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#d4af37] font-bold">CURATED OFFERS</span>
            <h2 className="font-cinzel text-xl sm:text-2xl font-light tracking-widest text-[#f3e9dc]">
              FEATURED SHOWROOM
            </h2>
          </div>

          {/* Interactive controls */}
          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4 items-center">
            
            {/* Soft Search bar */}
            <div className="relative w-full sm:w-60 bg-[#111112] border border-neutral-800 rounded flex items-center px-3 py-1.5 focus-within:border-neutral-700 transition-all">
              <Search className="h-3.5 w-3.5 text-neutral-500 mr-2" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search specs or hulls..."
                className="bg-transparent text-xs text-white placeholder-neutral-600 focus:outline-none w-full font-mono"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="p-0.5 rounded-full hover:bg-neutral-800"
                >
                  <X className="h-3 w-3 text-neutral-400" />
                </button>
              )}
            </div>

            {/* Filter buttons */}
            <div className="flex space-x-1.5 bg-neutral-950 p-1 rounded border border-neutral-800 w-full sm:w-auto justify-center">
              <button
                id="filter-showroom-all"
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1 font-mono text-[9px] uppercase tracking-wider rounded transition-all ${
                  activeTab === 'all' ? 'bg-[#f3e9dc] text-neutral-950 font-bold' : 'text-neutral-500 hover:text-white'
                }`}
              >
                All
              </button>
              <button
                id="filter-showroom-yachts"
                onClick={() => setActiveTab('yachts')}
                className={`px-3 py-1 font-mono text-[9px] uppercase tracking-wider rounded transition-all ${
                  activeTab === 'yachts' ? 'bg-[#f3e9dc] text-neutral-950 font-bold' : 'text-neutral-500 hover:text-white'
                }`}
              >
                Yachts
              </button>
              <button
                id="filter-showroom-autos"
                onClick={() => setActiveTab('automobiles')}
                className={`px-3 py-1 font-mono text-[9px] uppercase tracking-wider rounded transition-all ${
                  activeTab === 'automobiles' ? 'bg-[#f3e9dc] text-neutral-950 font-bold' : 'text-neutral-500 hover:text-white'
                }`}
              >
                Autos
              </button>
            </div>
          </div>
        </div>

        {/* Infinite Grid presenting luxury items */}
        {filteredInventory.length === 0 ? (
          <div className="text-center py-16 rounded border border-dashed border-neutral-900 bg-neutral-950/40">
            <p className="text-sm font-mono text-neutral-500">No off-market ledger assets match query.</p>
            <button 
              onClick={() => { setSearchQuery(''); setActiveTab('all'); }}
              className="mt-3 text-xs text-[#d4af37] underline tracking-widest font-mono uppercase"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredInventory.map((item) => {
              const isItemMinted = wallet.inventory.some(owned => owned.assetName === item.name);

              return (
                <div 
                  key={item.id} 
                  className="group relative rounded border border-neutral-900 bg-[#0c0c0d]/80 overflow-hidden flex flex-col justify-between hover:border-neutral-800 hover:shadow-2xl transition-all duration-300"
                >
                  {/* Image container & overlay */}
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-neutral-900">
                    <img 
                      src={item.bgImage} 
                      alt={item.name} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    
                    {/* Dark luxury lighting vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
                    
                    {/* Premium [NEW] / [MINTED] Badge left */}
                    <div className="absolute top-4 left-4 flex space-x-2">
                      <span className="font-mono text-[8px] font-bold tracking-widest text-[#f3e9dc] bg-[#0c0c0d]/90 border border-neutral-800 px-2.5 py-1 rounded">
                        NEW
                      </span>
                      {isItemMinted && (
                        <span className="font-mono text-[8px] font-semibold tracking-widest text-green-400 bg-green-950/90 border border-green-900/40 px-2.5 py-1 rounded flex items-center space-x-1 uppercase">
                          <span className="h-1 w-1 rounded-full bg-green-400" />
                          <span>CERTIFIED</span>
                        </span>
                      )}
                    </div>

                    {/* Shield Emblem icon on right representing verification */}
                    <div className="absolute top-4 right-4 bg-neutral-950/90 border border-neutral-800 p-2 rounded">
                      <Shield className="h-3.5 w-3.5 text-[#d4af37]" />
                    </div>

                    {/* Dimensions & Name Overlay bottom */}
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                      <div className="text-left">
                        <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest leading-none block">
                          Model Register
                        </span>
                        <h4 className="font-cinzel text-md text-[#f3e9dc] font-semibold tracking-widest mt-0.5">
                          {item.name}
                        </h4>
                      </div>
                      <span className="font-mono text-[9px] text-[#f3e9dc]/80">{item.dimensions}</span>
                    </div>
                  </div>

                  {/* Body Specs detail panel */}
                  <div className="p-5 space-y-4">
                    <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed text-left font-light">
                      {item.longDescription}
                    </p>

                    <div className="grid grid-cols-2 gap-4 border-t border-b border-neutral-900/60 py-3.5 my-1.5 font-mono text-[9px] uppercase tracking-wider text-neutral-500">
                      <div>
                        <span>EST VALUATION</span>
                        <span className="block font-semibold text-[#d4af37] text-[11px] mt-0.5">{item.priceEstimate}</span>
                      </div>
                      <div>
                        <span>SECURE AUDIT STATE</span>
                        <span className="block text-green-500 text-[10px] flex items-center mt-0.5 font-bold">
                          ● ONLINE VERIFIED
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <button
                        id={`card-spec-btn-${item.id}`}
                        onClick={() => handleOpenAssetDetail(item)}
                        className="font-mono text-[10px] tracking-widest text-[#d4af37] font-semibold uppercase flex items-center space-x-1 text-left"
                      >
                        <span>VIEW DETAILS</span>
                        <ArrowRight className="h-3 w-3" />
                      </button>

                      <button
                        id={`card-config-btn-${item.id}`}
                        onClick={() => handleOpenAssetDetail(item)}
                        className="rounded border border-neutral-800 bg-neutral-950 px-4 py-1.5 text-neutral-400 hover:text-white hover:bg-neutral-900 font-mono text-[9px] uppercase tracking-widest transition-all"
                      >
                        Bespoke Config
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Trust Metrics / Tech Portfolio - 4 Columns precisely following mockup */}
      <section className="relative z-10 border-b border-neutral-900 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="border border-neutral-900 rounded p-5 space-y-3 bg-[#0a0a0b]/40 text-left hover:border-neutral-800 transition-colors">
            <div className="rounded bg-neutral-950 p-2.5 w-fit border border-neutral-900 text-[#d4af37]">
              <Key className="h-4.5 w-4.5" />
            </div>
            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-widest font-bold text-[#f3e9dc]">VERIFIED ON-CHAIN</h4>
              <p className="text-[10px] sm:text-xs text-neutral-500 leading-relaxed font-light mt-1">
                Every single asset is registered with immutable provenance markers direct to smart contracts.
              </p>
            </div>
          </div>

          <div className="border border-neutral-900 rounded p-5 space-y-3 bg-[#0a0a0b]/40 text-left hover:border-neutral-800 transition-colors">
            <div className="rounded bg-neutral-950 p-2.5 w-fit border border-neutral-900 text-[#d4af37]">
              <Compass className="h-4.5 w-4.5" />
            </div>
            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-widest font-bold text-[#f3e9dc]">CURATED EXCLUSIVELY</h4>
              <p className="text-[10px] sm:text-xs text-neutral-500 leading-relaxed font-light mt-1">
                By explicit invitation. Available only to certified ledger envelopes of generational collectors.
              </p>
            </div>
          </div>

          <div className="border border-neutral-900 rounded p-5 space-y-3 bg-[#0a0a0b]/40 text-left hover:border-neutral-800 transition-colors">
            <div className="rounded bg-neutral-950 p-2.5 w-fit border border-neutral-900 text-[#d4af37]">
              <Globe className="h-4.5 w-4.5" />
            </div>
            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-widest font-bold text-[#f3e9dc]">GLOBAL DELIVERY</h4>
              <p className="text-[10px] sm:text-xs text-neutral-500 leading-relaxed font-light mt-1">
                Encompassing dedicated white-glove oceanic shipping and cargo aircraft priority drops worldwide.
              </p>
            </div>
          </div>

          <div className="border border-neutral-900 rounded p-5 space-y-3 bg-[#0a0a0b]/40 text-left hover:border-neutral-800 transition-colors">
            <div className="rounded bg-neutral-950 p-2.5 w-fit border border-neutral-900 text-[#d4af37]">
              <InfinityIcon className="h-4.5 w-4.5" />
            </div>
            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-widest font-bold text-[#f3e9dc]">LEGACY PRESERVED</h4>
              <p className="text-[10px] sm:text-xs text-neutral-500 leading-relaxed font-light mt-1">
                Rigorous structural components built to outlast generations, backed by virtual twin trackers.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Integrative Members Portal Covenant section (Tiers & Riddle challenge) */}
      <section id="membership-section" className="relative z-10 py-16 sm:py-24 border-b border-neutral-900 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MembersPanel 
          wallet={wallet} 
          onUpgradeTier={handleUpgradeTier} 
          onOpenWalletModal={() => setWalletModalOpen(true)} 
        />
      </section>

      {/* Editorial Journal Archive */}
      <section id="journal-section" className="relative z-10 py-16 sm:py-24 border-b border-neutral-900 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <JournalPanel stories={STORIES} />
      </section>

      {/* Floating Concierge Chat Assistant Bubble & Widget */}
      <div className="fixed bottom-6 right-6 z-40">
        <AnimatePresence>
          {chatOpen ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="w-80 sm:w-96 rounded-md border border-neutral-800 bg-[#0a0a0b] shadow-2xl flex flex-col h-[500px]"
            >
              {/* Chat Header */}
              <div className="flex items-center justify-between border-b border-neutral-900 px-4 py-3 bg-neutral-950">
                <div className="flex items-center space-x-2.5">
                  <div className="relative">
                    <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500 ring-2 ring-neutral-950 animate-pulse" />
                    <div className="h-8 w-8 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-center font-cinzel text-xs text-[#d4af37] font-semibold">
                      TT
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="font-mono text-[10px] font-bold text-[#f3e9dc] uppercase leading-none">CONCIERGE LIAISON</p>
                    <p className="text-[8px] text-green-500 font-mono tracking-wider mt-0.5 block">● ACTIVE ENVOY STATE</p>
                  </div>
                </div>

                <button 
                  id="close-chat-widget-btn"
                  onClick={() => setChatOpen(false)}
                  className="rounded-full p-1 text-neutral-500 hover:bg-neutral-900 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Chat Message Stream */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[340px]">
                {chatMessages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`flex flex-col max-w-[85%] ${msg.sender === 'user' ? 'ml-auto text-right' : 'text-left'}`}
                  >
                    <span className="font-mono text-[8px] text-neutral-500 uppercase tracking-widest mb-1">
                      {msg.sender === 'user' ? 'Collector Passport' : 'Elite Concierge'}
                    </span>
                    <div className={`p-3 rounded text-xs leading-relaxed font-light ${
                      msg.sender === 'user' 
                        ? 'bg-[#f3e9dc] text-neutral-950 rounded-tr-none font-medium' 
                        : 'bg-neutral-900/60 text-neutral-300 border border-neutral-800/45 rounded-tl-none'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                
                {conciergeLoading && (
                  <div className="flex items-center space-x-2 text-neutral-500 font-mono text-[9px] uppercase tracking-widest">
                    <div className="h-2 w-2 rounded-full bg-neutral-500 animate-bounce" />
                    <div className="h-2 w-2 rounded-full bg-neutral-500 animate-bounce [animation-delay:0.2s]" />
                    <div className="h-2 w-2 rounded-full bg-neutral-500 animate-bounce [animation-delay:0.4s]" />
                    <span>CONCIERGE CIPHER TUNING...</span>
                  </div>
                )}
              </div>

              {/* Quick Preset Buttons */}
              <div className="px-4 py-2 bg-neutral-950 border-t border-neutral-900 overflow-x-auto no-scrollbar flex space-x-2 shrink-0">
                <button
                  id="preset-shipment-btn"
                  onClick={() => handleChatPreset(
                    'Tell me about shipping processes.',
                    'Thorne partners with elite commercial freight carriers. Vehicles undergo deep encapsulation before sailing, and custom superyachts can be sailed directly to any port under the guidance of fully licensed Admirals.'
                  )}
                  className="px-3 py-1 bg-neutral-900 text-neutral-300 border border-neutral-800 rounded font-mono text-[8px] uppercase tracking-widest hover:text-white shrink-0"
                >
                  Shipping
                </button>
                <button
                  id="preset-blueprints-btn"
                  onClick={() => handleChatPreset(
                    'Can I view yacht hull blueprints?',
                    'Detailed CAD geometry, dual-hull structural mockups, and ice cabin blueprints are secured under confidential Sovereign Covenant credentials. Please connect your cryptographic envelope, select verified item, and choose the blueprint tab.'
                  )}
                  className="px-3 py-1 bg-neutral-900 text-neutral-300 border border-neutral-800 rounded font-mono text-[8px] uppercase tracking-widest hover:text-white shrink-0"
                >
                  Blueprints
                </button>
                <button
                  id="preset-[#d4af37]-btn"
                  onClick={() => handleChatPreset(
                    'Explain on-chain certificates benefits.',
                    'The Thorne Certificate is an ERC-1155 tracking passport documenting engine serial numbers, custom paints, and legal surveyor reports. It streamlines future ocean yard maintenance audits and provides generational authentication proofs.'
                  )}
                  className="px-3 py-1 bg-neutral-900 text-neutral-300 border border-neutral-800 rounded font-mono text-[8px] uppercase tracking-widest hover:text-white shrink-0"
                >
                  NFT Assets
                </button>
              </div>

              {/* Input Chat Block */}
              <form onSubmit={handleSendChatText} className="p-3 bg-neutral-950 border-t border-neutral-900 flex gap-2 shrink-0">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Enquire regarding custom hulls or chassis..."
                  className="flex-1 bg-[#111112] text-xs font-sans border border-neutral-800 rounded px-3 py-2 text-white focus:outline-none focus:border-neutral-700 font-light"
                />
                <button
                  id="send-chat-message-btn"
                  type="submit"
                  className="rounded bg-[#f3e9dc] hover:bg-white text-neutral-950 p-2 border border-neutral-800 hover:scale-105 active:scale-95 transition-all flex items-center justify-center shrink-0"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </form>
            </motion.div>
          ) : (
            <button
              id="open-concierge-chat-bubble"
              onClick={() => setChatOpen(true)}
              className="bg-[#0a0a0b] hover:bg-[#111112] text-[#f3e9dc] px-4 py-3 rounded-full border border-neutral-800 shadow-2xl flex items-center space-x-2 hover:scale-[1.05] active:scale-[0.95] duration-300 transition-all font-mono text-xs uppercase font-bold tracking-widest"
              aria-label="Contact Concierge"
            >
              <div className="relative">
                <span className="absolute bottom-0 right-0 h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                <MessageSquare className="h-4 w-4" />
              </div>
              <span>LIAISON LOBBY</span>
            </button>
          )}
        </AnimatePresence>
      </div>

      {/* Footer precisely mirroring image structure */}
      <footer className="relative z-10 border-t border-neutral-900 bg-neutral-950 pt-16 pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left Col: Thorne monogram brand */}
            <div className="md:col-span-4 space-y-4 text-left">
              <div className="flex items-center space-x-3" onClick={() => scrollToAnchor('hero-yachts')}>
                <div className="border border-neutral-800 p-2 rounded bg-neutral-950 flex items-center justify-center">
                  <span className="font-cinzel text-sm text-[#d4af37] font-bold tracking-widest leading-none">TT</span>
                </div>
                <div>
                  <h3 className="font-cinzel text-sm font-bold tracking-[0.2em] text-[#f3e9dc]">THORNE</h3>
                  <p className="text-[8px] text-neutral-500 font-mono uppercase tracking-widest">HYPEROBJECTS</p>
                </div>
              </div>
              <p className="text-xs text-neutral-500 font-light max-w-xs leading-relaxed font-sans">
                Curating the worlds most formidable on-chain physical architecture and custom mechanics of art since 2018.
              </p>
            </div>

            {/* Right link columns */}
            <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8 text-left">
              <div>
                <h4 className="font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold mb-4">Navigation</h4>
                <ul className="space-y-2 text-xs font-mono text-neutral-500">
                  <li><button onClick={() => scrollToAnchor('hero-yachts')} className="hover:text-[#f3e9dc] transition-colors uppercase text-[10px]">Yachts</button></li>
                  <li><button onClick={() => scrollToAnchor('hero-autos')} className="hover:text-[#f3e9dc] transition-colors uppercase text-[10px]">Automobiles</button></li>
                  <li><button onClick={() => scrollToAnchor('membership-section')} className="hover:text-[#f3e9dc] transition-colors uppercase text-[10px]">Membership</button></li>
                  <li><button onClick={() => scrollToAnchor('journal-section')} className="hover:text-[#f3e9dc] transition-colors uppercase text-[10px]">Journal</button></li>
                </ul>
              </div>

              <div>
                <h4 className="font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold mb-4">Company</h4>
                <ul className="space-y-2 text-xs font-mono text-neutral-500">
                  <li><a href="#" className="hover:text-[#f3e9dc] transition-colors uppercase text-[10px]">About</a></li>
                  <li><a href="#" className="hover:text-[#f3e9dc] transition-colors uppercase text-[10px]">Philosophy</a></li>
                  <li><a href="#" className="hover:text-[#f3e9dc] transition-colors uppercase text-[10px]">Careers</a></li>
                  <li><a href="#" className="hover:text-[#f3e9dc] transition-colors uppercase text-[10px]">Contact</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold mb-4">Legal</h4>
                <ul className="space-y-2 text-xs font-mono text-neutral-500">
                  <li><a href="#" className="hover:text-[#f3e9dc] transition-colors uppercase text-[10px]">Terms</a></li>
                  <li><a href="#" className="hover:text-[#f3e9dc] transition-colors uppercase text-[10px]">Privacy</a></li>
                  <li><a href="#" className="hover:text-[#f3e9dc] transition-colors uppercase text-[10px]">Cookies</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold mb-4">Resources</h4>
                <ul className="space-y-2 text-xs font-mono text-neutral-500">
                  <li><a href="#" className="hover:text-[#f3e9dc] transition-colors uppercase text-[10px]">Whitepaper</a></li>
                  <li><a href="#" className="hover:text-[#f3e9dc] transition-colors uppercase text-[10px]">Verification</a></li>
                  <li><a href="#" className="hover:text-[#f3e9dc] transition-colors uppercase text-[10px]">Support</a></li>
                </ul>
              </div>
            </div>

          </div>

          {/* Bottom connect and copyright bars */}
          <div className="border-t border-neutral-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            
            {/* Direct Connect wallet bottom CTA */}
            {wallet.connected ? (
              <div className="flex items-center space-x-2 text-xs font-mono text-neutral-400">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>Verified identity:</span>
                <span className="text-[#f3e9dc] underline font-semibold cursor-pointer" onClick={() => setWalletModalOpen(true)}>
                  {wallet.address?.slice(0, 8)}...
                </span>
              </div>
            ) : (
              <button
                id="footer-wallet-btn"
                onClick={() => setWalletModalOpen(true)}
                className="font-mono text-[10px] tracking-widest rounded border border-neutral-800 bg-neutral-950 px-6 py-2.5 text-white hover:bg-neutral-950 hover:border-neutral-700 transition-all flex items-center justify-center space-x-2"
              >
                <span>CONNECT WALLET</span>
                <span className="text-[#d4af37] font-bold">+</span>
              </button>
            )}

            <div className="text-center sm:text-right space-y-1">
              <p className="font-mono text-[9px] tracking-widest text-[#f3e9dc] uppercase">MADE FOR A LIMITLESS FEW.</p>
              <p className="font-mono text-[8.5px] text-neutral-600 uppercase tracking-widest">
                © 2025 THORNE HYPEROBJECTS. ALL RIGHTS RESERVED.
              </p>
            </div>

          </div>

        </div>
      </footer>

      {/* Wallet Modal */}
      <WalletModal
        isOpen={walletModalOpen}
        onClose={() => setWalletModalOpen(false)}
        wallet={wallet}
        onConnect={handleConnectWallet}
        onDisconnect={handleDisconnectWallet}
      />

      {/* Vessel / Chassis Customizer detail popup */}
      {selectedAsset && (
        <AssetDetailModal
          isOpen={detailOpen}
          onClose={() => setDetailOpen(false)}
          asset={selectedAsset}
          userWallet={wallet}
          onMintCertificate={handleMintPass}
          onOpenWalletModal={() => setWalletModalOpen(true)}
        />
      )}

    </div>
  );
}
