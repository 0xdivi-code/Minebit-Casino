import { useId } from "react";
import type { Game } from "@/data/games";

/**
 * Crafted SVG artwork for game cards — deterministic per game (gradient +
 * glow + motif). Used in place of remote thumbnails (unavailable offline).
 */
export default function GameArt({ game, className = "" }: { game: Game; className?: string }) {
  const [from, to] = game.bg;
  const gid = `g-${game.id}`;
  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className}`}
      style={{ background: `linear-gradient(150deg, ${from} 0%, ${to} 100%)` }}
      aria-hidden
    >
      {/* radial glow */}
      <div
        className="absolute inset-0"
        style={{ background: `radial-gradient(circle at 50% 32%, ${game.accent}33 0%, transparent 62%)` }}
      />
      {/* dot texture */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.14]" aria-hidden>
        <defs>
          <pattern id={gid} width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.4" fill="#fff" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${gid})`} />
      </svg>
      {/* motif */}
      <div className="absolute inset-0 flex items-center justify-center p-[16%]">
        <Motif art={game.art} accent={game.accent} />
      </div>
      {/* bottom shade for label legibility */}
      <div className="absolute inset-x-0 bottom-0 h-[46%] bg-gradient-to-t from-black/75 to-transparent" />
    </div>
  );
}

function Motif({ art, accent }: { art: string; accent: string }) {
  const common = "h-auto w-full max-w-[130px] drop-shadow-[0_6px_16px_rgba(0,0,0,0.45)]";
  switch (art) {
    case "dice":
      return (
        <svg viewBox="0 0 120 120" className={common}>
          <rect x="18" y="18" width="84" height="84" rx="20" fill="#FDFDFD" />
          <rect x="18" y="18" width="84" height="84" rx="20" fill={accent} opacity="0.12" />
          {[[42, 42], [78, 42], [60, 60], [42, 78], [78, 78]].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="9" fill="#101620" />
          ))}
        </svg>
      );
    case "mines":
      return (
        <svg viewBox="0 0 120 120" className={common}>
          {[0, 1, 2].map((r) =>
            [0, 1, 2].map((c) => (
              <rect key={`${r}${c}`} x={14 + c * 32} y={14 + r * 32} width="28" height="28" rx="8" fill="#101620" opacity="0.72" stroke={accent} strokeOpacity="0.35" />
            ))
          )}
          <circle cx="62" cy="62" r="17" fill={accent} />
          <rect x="56" y="40" width="12" height="10" rx="2" fill={accent} />
          <path d="M62 40c1-8 8-10 12-12" stroke="#FDFDFD" strokeWidth="3" fill="none" strokeLinecap="round" />
          <circle cx="56" cy="58" r="3.4" fill="#101620" />
          <circle cx="68" cy="58" r="3.4" fill="#101620" />
          <path d="M56 67c2 2.6 10 2.6 12 0" stroke="#101620" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M30 30l4 4M38 22l4 4M22 38l4 4" stroke="#FDFDFD" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
        </svg>
      );
    case "plinko":
      return (
        <svg viewBox="0 0 120 120" className={common}>
          {[0, 1, 2, 3, 4].map((r) =>
            Array.from({ length: r + 3 }).map((_, i) => (
              <circle key={`${r}-${i}`} cx={60 + (i - (r + 2) / 2) * 15} cy={22 + r * 13} r="3.4" fill="#FDFDFD" opacity="0.85" />
            ))
          )}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <rect key={i} x={16 + i * 13} y={92} width="11" height="16" rx="3" fill={i % 2 ? accent : "#FDFDFD"} opacity={i % 2 ? 1 : 0.85} />
          ))}
          <circle cx="60" cy="12" r="7" fill={accent} stroke="#fff" strokeWidth="2" />
        </svg>
      );
    case "crash":
      return (
        <svg viewBox="0 0 120 120" className={common}>
          <path d="M14 100C40 96 52 84 62 66c8-15 16-30 34-38" stroke={accent} strokeWidth="7" fill="none" strokeLinecap="round" />
          <path d="M14 100C40 96 52 84 62 66c8-15 16-30 34-38V100z" fill={accent} opacity="0.18" />
          <circle cx="98" cy="26" r="10" fill={accent} />
          <path d="M98 18l3 5 5 1-4 4 1 5-5-2-5 2 1-5-4-4 5-1z" fill="#101620" />
          <circle cx="30" cy="34" r="2.5" fill="#fff" />
          <circle cx="48" cy="22" r="2" fill="#fff" opacity="0.7" />
          <circle cx="70" cy="44" r="2" fill="#fff" opacity="0.5" />
        </svg>
      );
    case "keno":
      return (
        <svg viewBox="0 0 120 120" className={common}>
          {Array.from({ length: 20 }).map((_, i) => {
            const hot = [2, 7, 9, 13, 18].includes(i);
            return (
              <g key={i}>
                <circle cx={24 + (i % 5) * 18} cy={22 + Math.floor(i / 5) * 20} r="8" fill={hot ? accent : "#101620"} opacity={hot ? 1 : 0.75} stroke={hot ? "#fff" : accent} strokeOpacity="0.4" />
                <text x={24 + (i % 5) * 18} y={25 + Math.floor(i / 5) * 20} textAnchor="middle" fontSize="8.5" fontWeight="800" fill={hot ? "#101620" : "#fff"}>{i + 1}</text>
              </g>
            );
          })}
        </svg>
      );
    case "hilo":
      return (
        <svg viewBox="0 0 120 120" className={common}>
          <rect x="30" y="14" width="60" height="84" rx="10" fill="#FDFDFD" />
          <text x="60" y="62" textAnchor="middle" fontSize="42" fontWeight="800" fill="#101620">A</text>
          <path d="M60 76c-6-5-12-9-12-15a7 7 0 0 1 12-4 7 7 0 0 1 12 4c0 6-6 10-12 15z" fill={accent} />
          <path d="M16 40l-6-8 6-8M104 80l6 8-6 8" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "limbo":
      return (
        <svg viewBox="0 0 120 120" className={common}>
          <circle cx="60" cy="54" r="40" fill="none" stroke="#FDFDFD" strokeWidth="5" opacity="0.9" />
          <circle cx="60" cy="54" r="26" fill="none" stroke={accent} strokeWidth="5" />
          <circle cx="60" cy="54" r="12" fill={accent} />
          <circle cx="60" cy="54" r="4.5" fill="#101620" />
          <text x="60" y="112" textAnchor="middle" fontSize="17" fontWeight="800" fill="#fff">2.00x</text>
        </svg>
      );
    case "wheel":
      return (
        <svg viewBox="0 0 120 120" className={common}>
          <circle cx="60" cy="60" r="46" fill="#101620" opacity="0.6" />
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <path key={a} d="M60 60L60 14A46 46 0 0 1 100 37z" fill={a % 120 === 0 ? accent : "#FDFDFD"} opacity={a % 120 === 0 ? 0.95 : 0.9} transform={`rotate(${a} 60 60)`} />
          ))}
          <circle cx="60" cy="60" r="10" fill="#101620" stroke="#fff" strokeWidth="3" />
          <path d="M60 2l8 12H52z" fill="#fff" />
        </svg>
      );
    case "blackjack":
      return (
        <svg viewBox="0 0 120 120" className={common}>
          <rect x="16" y="26" width="46" height="64" rx="8" fill="#FDFDFD" transform="rotate(-8 16 26)" />
          <rect x="56" y="26" width="46" height="64" rx="8" fill="#101620" stroke={accent} strokeWidth="2" transform="rotate(8 56 26)" />
          <text x="38" y="66" textAnchor="middle" fontSize="26" fontWeight="800" fill="#101620">A</text>
          <text x="80" y="62" textAnchor="middle" fontSize="20" fontWeight="800" fill={accent}>21</text>
          <circle cx="34" cy="100" r="11" fill={accent} />
          <circle cx="86" cy="100" r="11" fill="#FDFDFD" />
        </svg>
      );
    case "baccarat":
      return (
        <svg viewBox="0 0 120 120" className={common}>
          <rect x="14" y="30" width="42" height="58" rx="8" fill="#FDFDFD" />
          <rect x="62" y="30" width="42" height="58" rx="8" fill={accent} />
          <text x="35" y="66" textAnchor="middle" fontSize="26" fontWeight="800" fill="#C8102E">9</text>
          <text x="83" y="66" textAnchor="middle" fontSize="26" fontWeight="800" fill="#101620">8</text>
          <text x="35" y="104" textAnchor="middle" fontSize="12" fontWeight="800" fill="#fff">BANKER</text>
          <text x="83" y="104" textAnchor="middle" fontSize="12" fontWeight="800" fill={accent}>PLAYER</text>
        </svg>
      );
    case "roulette":
      return (
        <svg viewBox="0 0 120 120" className={common}>
          <circle cx="60" cy="60" r="46" fill="#101620" stroke="#FDFDFD" strokeWidth="4" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
            <circle key={a} cx={60 + 34 * Math.cos((a * Math.PI) / 180)} cy={60 + 34 * Math.sin((a * Math.PI) / 180)} r="7" fill={a % 90 === 0 ? "#EF4141" : "#101620"} stroke="#fff" strokeWidth="1.5" />
          ))}
          <circle cx="60" cy="60" r="14" fill={accent} />
          <circle cx="60" cy="60" r="5" fill="#fff" />
        </svg>
      );
    case "traffic":
      return (
        <svg viewBox="0 0 120 120" className={common}>
          <rect x="14" y="30" width="92" height="60" rx="10" fill="#101620" opacity="0.8" />
          <path d="M14 60h92" stroke="#FDFDFD" strokeWidth="3" strokeDasharray="10 8" />
          <rect x="24" y="38" width="30" height="14" rx="4" fill={accent} />
          <rect x="66" y="68" width="30" height="14" rx="4" fill="#5EC8F2" />
          <rect x="60" y="38" width="30" height="14" rx="4" fill="#EF4141" />
          <circle cx="32" cy="54" r="4" fill="#101620" /><circle cx="46" cy="54" r="4" fill="#101620" />
          <circle cx="74" cy="84" r="4" fill="#101620" /><circle cx="88" cy="84" r="4" fill="#101620" />
          <path d="M52 8h16l-4 12H56z" fill="#FDFDFD" />
          <circle cx="60" cy="16" r="12" fill="none" />
        </svg>
      );
    case "crossroad":
      return (
        <svg viewBox="0 0 120 120" className={common}>
          <rect x="14" y="14" width="92" height="92" rx="12" fill="#101620" opacity="0.75" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect key={i} x={24 + i * 13} y={46} width="8" height="28" rx="2" fill="#FDFDFD" opacity="0.9" />
          ))}
          <circle cx="60" cy="28" r="10" fill={accent} />
          <path d="M60 24l2.5 3.5 4 .5-3 3 .8 4-4.3-2.2-4.3 2.2.8-4-3-3 4-.5z" fill="#101620" />
          <text x="60" y="104" textAnchor="middle" fontSize="13" fontWeight="800" fill={accent}>1.5x — 10x</text>
        </svg>
      );
    case "tower":
      return (
        <svg viewBox="0 0 120 120" className={common}>
          {[0, 1, 2, 3].map((r) => (
            <g key={r}>
              {[0, 1, 2].map((c) => (
                <rect key={c} x={28 + c * 22} y={12 + r * 24} width="19" height="20" rx="6" fill={r === 3 && c === 1 ? accent : "#101620"} opacity={r === 3 && c === 1 ? 1 : 0.8} stroke={accent} strokeOpacity="0.4" />
              ))}
            </g>
          ))}
          <path d="M60 92c-8 0-12 6-12 10h24c0-4-4-10-12-10z" fill={accent} />
        </svg>
      );
    case "slide":
      return (
        <svg viewBox="0 0 120 120" className={common}>
          <rect x="14" y="50" width="92" height="18" rx="9" fill="#101620" opacity="0.8" />
          <rect x="14" y="50" width="58" height="18" rx="9" fill={accent} />
          <circle cx="72" cy="59" r="15" fill="#FDFDFD" stroke={accent} strokeWidth="4" />
          <text x="60" y="36" textAnchor="middle" fontSize="20" fontWeight="800" fill="#fff">49.50</text>
          <text x="60" y="100" textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>2.00x PAYOUT</text>
        </svg>
      );
    case "tap":
      return (
        <svg viewBox="0 0 120 120" className={common}>
          <circle cx="60" cy="60" r="44" fill="none" stroke={accent} strokeWidth="3" opacity="0.4" />
          <circle cx="60" cy="60" r="30" fill="none" stroke={accent} strokeWidth="3" opacity="0.65" />
          <circle cx="60" cy="60" r="17" fill={accent} />
          <path d="M60 47l4 8 9 1-6.5 6 1.5 9-8-4.5L52 71l1.5-9-6.5-6 9-1z" fill="#101620" />
          <path d="M88 88l6-2-2 6-8 8-4-4z" fill="#FDFDFD" opacity="0.9" />
        </svg>
      );
    /* ------- slots & live motifs ------- */
    case "sweet":
    case "candy":
      return (
        <svg viewBox="0 0 120 120" className={common}>
          <circle cx="42" cy="52" r="24" fill={accent} />
          <path d="M42 28a24 24 0 0 1 20 36c-4-8-12-12-20-12s-16 4-20 12a24 24 0 0 1 20-36z" fill="#fff" opacity="0.65" />
          <rect x="38" y="72" width="8" height="30" rx="4" fill="#fff" />
          <circle cx="84" cy="76" r="16" fill="#7DD3FC" />
          <circle cx="84" cy="76" r="16" fill="#fff" opacity="0.25" />
          <circle cx="88" cy="30" r="7" fill="#FDE047" />
          <circle cx="24" cy="88" r="5" fill="#FDE047" />
        </svg>
      );
    case "zeus":
      return (
        <svg viewBox="0 0 120 120" className={common}>
          <path d="M68 8L30 68h24l-8 44 42-62H62z" fill={accent} stroke="#fff" strokeWidth="3" strokeLinejoin="round" />
          <circle cx="60" cy="60" r="52" fill="none" stroke={accent} strokeWidth="2" strokeDasharray="6 8" opacity="0.6" />
        </svg>
      );
    case "bandit":
      return (
        <svg viewBox="0 0 120 120" className={common}>
          <circle cx="60" cy="58" r="34" fill="#8a6b3d" />
          <ellipse cx="60" cy="58" rx="34" ry="13" fill="#101620" />
          <circle cx="46" cy="58" r="7" fill="#fff" /><circle cx="74" cy="58" r="7" fill="#fff" />
          <circle cx="46" cy="58" r="3" fill="#101620" /><circle cx="74" cy="58" r="3" fill="#101620" />
          <ellipse cx="60" cy="80" rx="9" ry="6.5" fill="#101620" />
          <rect x="44" y="10" width="32" height="12" rx="4" fill={accent} />
        </svg>
      );
    case "wanted":
      return (
        <svg viewBox="0 0 120 120" className={common}>
          <path d="M60 12l11 24 27 3-20 18 6 27-24-13-24 13 6-27-20-18 27-3z" fill={accent} stroke="#fff" strokeWidth="3" strokeLinejoin="round" />
          <circle cx="60" cy="56" r="14" fill="#101620" />
          <text x="60" y="62" textAnchor="middle" fontSize="14" fontWeight="800" fill={accent}>W</text>
          <text x="60" y="104" textAnchor="middle" fontSize="15" fontWeight="800" fill="#fff">WANTED</text>
        </svg>
      );
    case "bass":
    case "duck":
      return (
        <svg viewBox="0 0 120 120" className={common}>
          <circle cx="60" cy="60" r="44" fill="none" stroke="#fff" strokeWidth="4" opacity="0.9" />
          <circle cx="60" cy="60" r="30" fill="none" stroke={accent} strokeWidth="4" />
          <circle cx="60" cy="60" r="15" fill={accent} />
          <circle cx="60" cy="60" r="5" fill="#101620" />
          <path d="M60 2v14M60 104v14M2 60h14M104 60h14" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
    case "doghouse":
    case "dog":
      return (
        <svg viewBox="0 0 120 120" className={common}>
          <path d="M22 62L60 26l38 36v34a8 8 0 0 1-8 8H30a8 8 0 0 1-8-8z" fill={accent} />
          <path d="M22 62L60 26l38 36" fill="none" stroke="#101620" strokeWidth="6" strokeLinejoin="round" />
          <rect x="48" y="68" width="24" height="36" rx="10" fill="#101620" />
          <circle cx="60" cy="50" r="14" fill="#101620" />
          <circle cx="54" cy="48" r="3" fill="#fff" /><circle cx="66" cy="48" r="3" fill="#fff" />
          <ellipse cx="60" cy="56" rx="4.5" ry="3.4" fill={accent} />
        </svg>
      );
    case "chili":
      return (
        <svg viewBox="0 0 120 120" className={common}>
          <path d="M78 18c-4 22-22 34-44 36-6 .5-9 6-5 10 3 3 8 3 12 2 24-6 40-24 43-46l-6-2z" fill={accent} />
          <path d="M78 18c2-6 8-10 14-10l-2 8c-4 0-8 1-10 4l-2-2z" fill="#4ADE80" />
          <path d="M30 84c8 8 24 10 34 4" stroke="#FDFDFD" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.7" />
          <text x="60" y="112" textAnchor="middle" fontSize="16" fontWeight="800" fill="#fff">HOT & SPICY</text>
        </svg>
      );
    case "forge":
      return (
        <svg viewBox="0 0 120 120" className={common}>
          <path d="M60 10c8 18 26 26 26 48a26 26 0 0 1-52 0c0-10 4-17 10-23 1 6 4 10 8 12-1-12 2-26 8-37z" fill={accent} />
          <path d="M60 44c4 9 12 13 12 24a12 12 0 0 1-24 0c0-5 2-9 5-11 0 3 2 5 4 6 0-6 1-13 3-19z" fill="#FDE047" />
          <circle cx="60" cy="100" r="8" fill="#FDFDFD" />
        </svg>
      );
    case "jade":
      return (
        <svg viewBox="0 0 120 120" className={common}>
          <path d="M60 12l34 26-34 66-34-66z" fill={accent} />
          <path d="M60 12l34 26h-68z" fill="#fff" opacity="0.35" />
          <path d="M60 12v92M26 38l34 66 34-66" stroke="#101620" strokeWidth="2.5" opacity="0.5" fill="none" />
        </svg>
      );
    case "aviator":
      return (
        <svg viewBox="0 0 120 120" className={common}>
          <path d="M10 78L104 30l-24 56-26-10-16 22-4-18-24-2z" fill={accent} stroke="#fff" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M10 78l70-22" stroke="#fff" strokeWidth="2" strokeDasharray="6 6" opacity="0.8" />
          <circle cx="98" cy="88" r="5" fill="#FDE047" />
        </svg>
      );
    case "caishen":
      return (
        <svg viewBox="0 0 120 120" className={common}>
          <path d="M28 78c0-16 14-24 32-24s32 8 32 24l-8 10H36z" fill={accent} />
          <ellipse cx="60" cy="78" rx="32" ry="10" fill="#B97A06" />
          <ellipse cx="60" cy="75" rx="24" ry="7" fill={accent} />
          <circle cx="60" cy="40" r="16" fill={accent} stroke="#B97A06" strokeWidth="3" />
          <rect x="54" y="34" width="12" height="12" fill="#B97A06" />
        </svg>
      );
    case "chest":
      return (
        <svg viewBox="0 0 120 120" className={common}>
          <rect x="22" y="54" width="76" height="44" rx="8" fill="#8a5a2b" />
          <path d="M22 58a38 22 0 0 1 76 0v10H22z" fill="#a9713a" />
          <rect x="52" y="58" width="16" height="40" fill={accent} opacity="0.85" />
          <rect x="50" y="66" width="20" height="16" rx="4" fill="#101620" />
          <circle cx="60" cy="74" r="3.5" fill={accent} />
          <path d="M40 30l6-8M60 26v-9M80 30l-6-8" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case "football":
      return (
        <svg viewBox="0 0 120 120" className={common}>
          <circle cx="60" cy="60" r="44" fill="#FDFDFD" />
          <path d="M60 38l20 15-8 24H48l-8-24z" fill="#101620" />
          <path d="M60 16v22M102 46l-22 7M86 100l-14-19M34 100l14-19M18 46l22 7" stroke="#101620" strokeWidth="5" />
        </svg>
      );
    case "demon":
      return (
        <svg viewBox="0 0 120 120" className={common}>
          <path d="M32 52C28 30 40 18 48 14c-2 12 2 22 8 28zM88 52c4-22-8-34-16-38 2 12-2 22-8 28z" fill={accent} />
          <ellipse cx="60" cy="66" rx="30" ry="32" fill="#FDFDFD" />
          <path d="M42 58l12 6-12 6zM78 58l-12 6 12 6z" fill="#EF4141" />
          <path d="M48 86c4 5 20 5 24 0l-3 8H51z" fill="#101620" />
        </svg>
      );
    case "chicken":
      return (
        <svg viewBox="0 0 120 120" className={common}>
          <path d="M60 12c16 0 26 24 26 46a26 26 0 0 1-52 0c0-22 10-46 26-46z" fill="#FDFDFD" />
          <path d="M42 62l6-8 6 8 6-8 6 8 6-8 6 8" stroke={accent} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M34 84c8 10 44 10 52 0" stroke={accent} strokeWidth="4" fill="none" strokeLinecap="round" />
        </svg>
      );
    case "office":
      return (
        <svg viewBox="0 0 120 120" className={common}>
          <rect x="22" y="44" width="76" height="52" rx="10" fill={accent} />
          <rect x="22" y="60" width="76" height="10" fill="#101620" opacity="0.35" />
          <path d="M46 44v-8a14 14 0 0 1 28 0v8" fill="none" stroke="#FDFDFD" strokeWidth="6" />
          <rect x="52" y="62" width="16" height="12" rx="3" fill="#101620" />
        </svg>
      );
    case "galaxy":
      return (
        <svg viewBox="0 0 120 120" className={common}>
          <circle cx="60" cy="60" r="30" fill={accent} />
          <ellipse cx="60" cy="60" rx="50" ry="16" fill="none" stroke="#fff" strokeWidth="4" transform="rotate(-20 60 60)" />
          <circle cx="28" cy="28" r="3" fill="#fff" /><circle cx="94" cy="30" r="2.4" fill="#fff" />
          <circle cx="102" cy="84" r="3" fill="#fff" /><circle cx="22" cy="88" r="2.4" fill="#fff" />
        </svg>
      );
    case "bacbo":
      return (
        <svg viewBox="0 0 120 120" className={common}>
          <rect x="24" y="40" width="32" height="32" rx="8" fill="#3B82F6" transform="rotate(-10 24 40)" />
          <rect x="62" y="40" width="32" height="32" rx="8" fill="#EF4141" transform="rotate(10 62 40)" />
          <circle cx="40" cy="56" r="4" fill="#fff" /><circle cx="78" cy="56" r="4" fill="#fff" />
          <text x="40" y="96" textAnchor="middle" fontSize="13" fontWeight="800" fill="#3B82F6">BLUE</text>
          <text x="80" y="96" textAnchor="middle" fontSize="13" fontWeight="800" fill="#EF4141">RED</text>
        </svg>
      );
    case "holdem":
      return (
        <svg viewBox="0 0 120 120" className={common}>
          <rect x="18" y="34" width="36" height="50" rx="7" fill="#FDFDFD" transform="rotate(-10 18 34)" />
          <rect x="64" y="34" width="36" height="50" rx="7" fill="#FDFDFD" transform="rotate(10 64 34)" />
          <text x="36" y="66" textAnchor="middle" fontSize="24" fontWeight="800" fill="#101620">A</text>
          <text x="82" y="66" textAnchor="middle" fontSize="24" fontWeight="800" fill="#C8102E">K</text>
          <circle cx="44" cy="100" r="10" fill={accent} /><circle cx="76" cy="100" r="10" fill="#FD9535" />
        </svg>
      );
    case "monopoly":
      return (
        <svg viewBox="0 0 120 120" className={common}>
          <rect x="30" y="52" width="60" height="44" rx="6" fill="#FDFDFD" />
          <path d="M24 56l36-28 36 28z" fill={accent} />
          <rect x="40" y="64" width="12" height="12" fill="#101620" />
          <rect x="56" y="64" width="12" height="12" fill="#101620" />
          <rect x="72" y="64" width="10" height="12" fill="#101620" />
          <rect x="30" y="92" width="60" height="8" fill={accent} />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 120 120" className={common}>
          <circle cx="60" cy="60" r="40" fill={accent} opacity="0.9" />
          <text x="60" y="76" textAnchor="middle" fontSize="44" fontWeight="800" fill="#101620">7</text>
        </svg>
      );
  }
}
