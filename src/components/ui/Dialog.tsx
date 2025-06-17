import React from 'react';

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center transition-opacity duration-300">
      <div className="bg-white rounded-xl shadow-2xl p-6 max-w-5xl w-full relative animate-fade-in">
        {/* Close Button */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-3 right-4 text-gray-500 hover:text-black text-2xl"
        >
          &times;
        </button>

        {/* Content */}
        <div className="space-y-6">{children}</div>

      </div>
    </div>
  );
}
