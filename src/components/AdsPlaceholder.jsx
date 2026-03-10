export default function AdsPlaceholder({ size = "leaderboard", label = "Advertisement" }) {
    // size can be: 'leaderboard' (728x90), 'rectangle' (300x250)
    return (
        <div className={`ads-container ${size}`}>
            <div className="ads-box glass-panel">
                <span className="ads-label">{label}</span>
                <div className="ads-content">
                    <span>Your Ad Here! (AdSense Placeholder)</span>
                </div>
            </div>

            <style>{`
        .ads-container {
          width: 100%;
          display: flex;
          justify-content: center;
          margin: 2rem 0;
        }

        .ads-box {
          position: relative;
          background: rgba(255, 255, 255, 0.03);
          border: 1px dashed rgba(255, 255, 255, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .ads-box::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.05) 45%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 55%, transparent 60%);
          background-size: 200% 200%;
          animation: scan 4s linear infinite;
        }

        .ads-label {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--text-muted);
        }

        .ads-content {
          color: var(--text-muted);
          font-weight: 500;
          font-size: 0.9rem;
          z-index: 1;
        }

        /* Sizes */
        .leaderboard .ads-box {
          width: 100%;
          max-width: 900px;
          height: 100px;
          border-radius: 12px;
        }

        .rectangle .ads-box {
          width: 300px;
          height: 250px;
          border-radius: 12px;
        }

        @keyframes scan {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        @media (max-width: 768px) {
          .leaderboard .ads-box {
            height: 80px;
          }
          .ads-content {
            font-size: 0.8rem;
          }
        }
      `}</style>
        </div>
    );
}
