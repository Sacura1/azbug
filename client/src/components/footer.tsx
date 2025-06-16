import React from 'react';

const Footer: React.FC = () => {
  return (

<footer className="bg-black p-10">
  <div className="container mx-auto px-6 py-6">
    <div className="text-center">
      <p className="text-gray-400 text-sm">
        © 2025 Azbugs
      </p>
      <a
        href="https://x.com/aztechub1"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow us on X (Twitter)"
        className="inline-block mt-4 hover:scale-110 transition-transform"
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 1200 1227"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto"
        >
          <rect width="1200" height="1227" rx="200" fill="#000" />
          <path
            d="M862 320H1040L728 661L1096 1100H857L637 841L386 1100H208L540 736L192 320H438L636 561L862 320ZM819 1020H892L480 397H404L819 1020Z"
            fill="#fff"
          />
        </svg>
      </a>
    </div>
  </div>
</footer>
  );
};

export default Footer;