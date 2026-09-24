/** MineBit wordmark used inside the modal headers. */
export default function ScriptLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`relative inline-block text-[34px] font-extrabold italic leading-none tracking-tight text-white ${className}`}>
      <svg viewBox="0 0 18 22" aria-hidden className="absolute -left-4 top-1 h-5 w-4">
        <path d="M14 1L4 21l3-1 9-18z" fill="#F5A623" />
        <path d="M17 5L9 21l2.5-.8L18 6z" fill="#F5A623" opacity="0.55" />
      </svg>
      MineBit
    </span>
  );
}
