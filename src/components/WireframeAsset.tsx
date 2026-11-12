import React from 'react';

interface BoxProps {
  label?: string;
  className?: string;
  aspectRatio?: string;
}

/**
 * Standard low-fidelity wireframe image placeholder with diagonal cross lines
 */
export const WireframeImagePlaceholder: React.FC<BoxProps> = ({
  label = '[ FOTO ]',
  className = '',
  aspectRatio = 'aspect-video',
}) => {
  return (
    <div
      className={`relative w-full border-2 border-dashed border-black/80 bg-neutral-100 flex items-center justify-center overflow-hidden ${aspectRatio} ${className}`}
    >
      {/* Diagonal wireframe cross */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none text-neutral-300"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <line x1="0" y1="0" x2="100%" y2="100%" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="100%" y1="0" x2="0" y2="100%" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
      </svg>
      <div className="relative z-10 px-2 py-1 bg-white border border-black text-[11px] font-mono tracking-wider font-semibold text-black uppercase">
        {label}
      </div>
    </div>
  );
};

/**
 * Low fidelity wireframe sketch for "bere caffè la mattina"
 */
export const CoffeeSketchIllustration: React.FC<{ className?: string }> = ({ className = 'w-full h-56' }) => {
  return (
    <div className={`relative bg-neutral-50 border-2 border-black rounded-xl flex items-center justify-center p-4 overflow-hidden ${className}`}>
      {/* Background wireframe blueprint grid */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            'radial-gradient(#000 1px, transparent 1px), radial-gradient(#000 1px, #f5f5f5 1px)',
          backgroundSize: '16px 16px',
        }}
      />

      <svg
        viewBox="0 0 200 160"
        className="w-48 h-40 text-black stroke-black fill-none"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Steam rising */}
        <path d="M85 30 Q 80 15, 88 5" strokeDasharray="3 3" />
        <path d="M100 28 Q 105 12, 98 4" strokeDasharray="3 3" />
        <path d="M115 32 Q 110 16, 118 6" strokeDasharray="3 3" />

        {/* Cup rim ellipse */}
        <ellipse cx="100" cy="45" rx="38" ry="12" fill="#fff" />
        {/* Coffee surface */}
        <ellipse cx="100" cy="46" rx="34" ry="9" fill="#18181b" />
        <path d="M78 46 Q 100 50, 122 46" stroke="#fff" strokeWidth="1.5" />

        {/* Cup body */}
        <path d="M62 45 L 72 105 Q 100 120, 128 105 L 138 45" fill="#fff" />

        {/* Cup handle */}
        <path d="M136 55 Q 162 65, 155 85 Q 148 100, 126 98" fill="none" />
        <path d="M134 62 Q 152 70, 147 84 Q 142 94, 126 93" fill="none" strokeWidth="1.5" />

        {/* Wireframe shading hatches on cup */}
        <line x1="78" y1="65" x2="88" y2="95" strokeWidth="1" strokeDasharray="2 3" />
        <line x1="84" y1="65" x2="94" y2="95" strokeWidth="1" strokeDasharray="2 3" />

        {/* Saucer plate */}
        <ellipse cx="100" cy="115" rx="65" ry="16" fill="#fff" />
        <ellipse cx="100" cy="115" rx="55" ry="12" fill="none" strokeDasharray="4 2" />

        {/* Coffee beans sketch */}
        <ellipse cx="45" cy="122" rx="7" ry="5" transform="rotate(-25 45 122)" fill="#18181b" />
        <path d="M41 120 Q 45 122, 49 124" stroke="#fff" strokeWidth="1" />

        <ellipse cx="155" cy="124" rx="6" ry="4" transform="rotate(30 155 124)" fill="#18181b" />
        <path d="M152 125 Q 155 124, 158 123" stroke="#fff" strokeWidth="1" />
      </svg>

      <div className="absolute bottom-2 right-2 bg-black text-white text-[10px] font-mono px-2 py-0.5 rounded">
        FOTO_VERIFICATA_#0815.RAW
      </div>
    </div>
  );
};

/**
 * Low fidelity wireframe sketch for general photos
 */
export const GenericPhotoSketch: React.FC<{ title: string; className?: string }> = ({
  title,
  className = 'w-full h-44',
}) => {
  return (
    <div className={`relative bg-neutral-100 border-2 border-black rounded-xl flex flex-col items-center justify-center p-4 overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 100 80"
        className="w-20 h-16 text-black stroke-black fill-none mb-2"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="5" y="10" width="90" height="60" rx="4" fill="#fff" />
        {/* Sun */}
        <circle cx="30" cy="28" r="8" fill="none" strokeWidth="2" />
        {/* Mountains / Landscape */}
        <path d="M10 65 L 40 38 L 65 65" />
        <path d="M50 65 L 75 46 L 90 65" />
        <line x1="5" y1="65" x2="95" y2="65" strokeWidth="2" />
      </svg>
      <span className="text-xs font-mono font-bold uppercase tracking-wider text-black bg-white px-2 py-0.5 border border-black rounded">
        {title}
      </span>
      <span className="text-[10px] font-mono text-neutral-500 mt-1">
        [PROVA_FOTOGRAFICA_SFIDA]
      </span>
    </div>
  );
};
