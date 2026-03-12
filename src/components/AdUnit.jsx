import { useEffect, useRef } from 'react';

/**
 * Google AdSense Ad Component
 * 
 * HOW TO USE:
 * 1. Sign up at https://www.google.com/adsense/
 * 2. Get approved (takes 1-7 days)
 * 3. Replace YOUR_ADSENSE_PUB_ID in index.html with your publisher ID (ca-pub-XXXXXXXXXX)
 * 4. Create ad units in AdSense dashboard and paste the slot IDs below
 * 
 * Until AdSense is approved, this shows a styled placeholder.
 */

// ⚠️ REPLACE THESE with your real AdSense values after approval
const ADSENSE_CLIENT = 'ca-pub-8301774269044238';
const AD_SLOTS = {
  leaderboard: 'XXXXXXXXXX',   // Create a "Display ad" 728x90 in AdSense
  rectangle: 'XXXXXXXXXX',     // Create a "Display ad" 300x250 in AdSense
  infeed: 'XXXXXXXXXX',        // Create an "In-feed ad" in AdSense
};

export default function AdUnit({ format = 'auto', slot = 'leaderboard', style = {} }) {
  const adRef = useRef(null);
  const isAdSenseReady = typeof window !== 'undefined' && window.adsbygoogle !== undefined;
  const adSlot = AD_SLOTS[slot] || AD_SLOTS.leaderboard;

  useEffect(() => {
    if (isAdSenseReady && adRef.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.log('AdSense error:', e);
      }
    }
  }, [isAdSenseReady]);

  // If AdSense is not loaded yet (not approved), show a nice placeholder
  if (!isAdSenseReady || adSlot === 'XXXXXXXXXX') {
    return (
      <div className="ad-placeholder-wrapper" style={style}>
        <div className="ad-placeholder">
          <span className="ad-placeholder-label">Sponsored</span>
          <div className="ad-placeholder-content">
            <p>📱 <strong>Digitox</strong> — India's #1 Refurbished Phone Store</p>
            <p className="ad-sub">Up to 70% off on iPhones, Samsung & more!</p>
          </div>
        </div>

        <style>{`
          .ad-placeholder-wrapper {
            width: 100%;
            display: flex;
            justify-content: center;
            margin: 1.5rem 0;
          }
          .ad-placeholder {
            width: 100%;
            max-width: 728px;
            min-height: 90px;
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            border: 1px solid #dee2e6;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            padding: 1rem 2rem;
          }
          .ad-placeholder-label {
            position: absolute;
            top: 6px;
            right: 10px;
            font-size: 0.6rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #adb5bd;
          }
          .ad-placeholder-content {
            text-align: center;
          }
          .ad-placeholder-content p {
            margin: 0;
            color: #495057;
            font-size: 0.95rem;
          }
          .ad-sub {
            font-size: 0.8rem !important;
            color: #6c757d !important;
            margin-top: 0.3rem !important;
          }
        `}</style>
      </div>
    );
  }

  // Real AdSense ad
  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '1.5rem 0', ...style }}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', width: '100%' }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={adSlot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
