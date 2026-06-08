import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, X, ArrowUpRight, Clock, Calendar, Hash } from 'lucide-react';
import { JournalStory } from '../types';

interface JournalPanelProps {
  stories: JournalStory[];
}

export default function JournalPanel({ stories }: JournalPanelProps) {
  const [selectedStory, setSelectedStory] = useState<JournalStory | null>(null);

  return (
    <div id="journal-portal-box" className="space-y-8">
      <div className="border-b border-neutral-900 pb-6 text-center md:text-left">
        <span className="font-mono text-[9px] uppercase tracking-widest text-[#d4af37] block mb-1">EDITORIALS</span>
        <h2 className="font-cinzel text-xl sm:text-2xl font-light tracking-widest text-[#f3e9dc]">
          THE THORNE JOURNAL
        </h2>
        <p className="text-xs text-neutral-500 font-sans mt-1">Disquisitions on materials engineering, naval architecture, and on-chain luxury metaphysics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stories.map((story) => (
          <div 
            key={story.id} 
            className="group relative rounded border border-neutral-900 bg-neutral-950 p-5 flex flex-col justify-between hover:border-neutral-800 transition-all cursor-pointer"
            onClick={() => setSelectedStory(story)}
          >
            <div className="space-y-4">
              <div className="relative aspect-[4/3] rounded overflow-hidden border border-neutral-900/60 font-serif">
                <img 
                  src={story.image} 
                  alt={story.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-2 left-2 bg-neutral-950/90 border border-neutral-900 px-2 py-0.5 rounded text-[8px] font-mono text-[#d4af37] uppercase tracking-wider">
                  {story.category}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-[9px] font-mono text-neutral-500 uppercase tracking-widest">
                  <Calendar className="h-3 w-3" />
                  <span>{story.date}</span>
                  <span>•</span>
                  <Clock className="h-3 w-3" />
                  <span>{story.readTime}</span>
                </div>
                <h3 className="font-serif text-lg text-[#f3e9dc] group-hover:text-white font-medium leading-snug tracking-normal">
                  {story.title}
                </h3>
                <p className="text-xs text-neutral-500 font-light leading-relaxed truncate-3-lines">
                  {story.summary}
                </p>
              </div>
            </div>

            <button
              id={`read-story-btn-${story.id}`}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedStory(story);
              }}
              className="mt-6 flex items-center space-x-1.5 font-mono text-[10px] uppercase text-[#f3e9dc] hover:text-white transition-colors"
            >
              <span>READ STORY</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-neutral-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        ))}
      </div>

      {/* Story Detailed Reading Modal */}
      <AnimatePresence>
        {selectedStory && (
          <div id="story-reader-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedStory(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              className="relative w-full max-w-3xl h-[85vh] overflow-hidden rounded border border-neutral-900 bg-neutral-950 flex flex-col shadow-2xl"
            >
              {/* Cover Bar */}
              <div className="flex items-center justify-between border-b border-neutral-900 px-6 py-4 bg-neutral-950/80 shrink-0">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4 text-[#d4af37]" />
                  <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400">
                    THORNE LEAFLET SYSTEM
                  </span>
                </div>
                <button
                  id="close-reader-btn"
                  onClick={() => setSelectedStory(null)}
                  className="rounded-full p-1 text-neutral-500 hover:bg-neutral-900 hover:text-white transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Scrollable Editorial */}
              <div className="flex-1 overflow-y-auto px-6 py-8 sm:px-12 md:py-12 space-y-6">
                <div className="text-center space-y-4 max-w-xl mx-auto">
                  <span className="inline-block px-3 py-1 bg-[#d4af37]/10 border border-[#d4af37]/20 rounded font-mono text-[9px] text-[#d4af37] uppercase tracking-widest leading-none">
                    {selectedStory.category}
                  </span>
                  <h2 className="font-cinzel text-xl sm:text-2xl font-light text-[#f3e9dc] leading-snug tracking-wider">
                    {selectedStory.title}
                  </h2>
                  <div className="flex justify-center items-center space-x-3 text-[10px] font-mono text-neutral-500 uppercase tracking-widest border-y border-neutral-900/60 py-2.5">
                    <span>{selectedStory.date}</span>
                    <span>•</span>
                    <span>{selectedStory.readTime}</span>
                    <span>•</span>
                    <span>AUTHOR: THORNE EDITORIAL BOARD</span>
                  </div>
                </div>

                <div className="aspect-[2/1] rounded overflow-hidden border border-neutral-900/60 max-w-2xl mx-auto my-6">
                  <img 
                    src={selectedStory.image} 
                    alt={selectedStory.title} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="prose prose-invert max-w-2xl mx-auto space-y-5 leading-relaxed font-libre">
                  {/* Styled drop-cap on first para */}
                  {selectedStory.content.map((para, iIdx) => (
                    <p key={iIdx} className="text-sm text-neutral-300 font-light font-serif">
                      {iIdx === 0 ? (
                        <>
                          <span className="float-left text-4xl sm:text-5xl font-cinzel text-[#d4af37] font-semibold mr-2.5 mt-1 leading-none select-none">
                            {para.charAt(0)}
                          </span>
                          {para.slice(1)}
                        </>
                      ) : para}
                    </p>
                  ))}
                </div>

                <div className="max-w-2xl mx-auto border-t border-neutral-900 pt-8 mt-12 text-center text-[10px] font-mono text-neutral-600 flex items-center justify-center space-x-1 uppercase tracking-widest">
                  <Hash className="h-3 w-3 text-neutral-700" />
                  <span>END OF JOURNAL LEAFLET REGISTER</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
