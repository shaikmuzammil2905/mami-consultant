export function CountryFlag({ code, className = 'w-10 h-10' }) {
  switch (code) {
    case 'AE':
      return (
        <svg viewBox="0 0 64 64" className={`${className} rounded-full shadow-sm border border-white/80 shrink-0`} aria-label="UAE Flag">
          <clipPath id="aeClip"><circle cx="32" cy="32" r="32" /></clipPath>
          <g clipPath="url(#aeClip)">
            <rect x="0" y="0" width="64" height="21.33" fill="#00732F" />
            <rect x="0" y="21.33" width="64" height="21.34" fill="#FFFFFF" />
            <rect x="0" y="42.67" width="64" height="21.33" fill="#000000" />
            <rect x="0" y="0" width="18" height="64" fill="#FF0000" />
          </g>
        </svg>
      );
    case 'SA':
      return (
        <svg viewBox="0 0 64 64" className={`${className} rounded-full shadow-sm border border-white/80 shrink-0`} aria-label="Saudi Arabia Flag">
          <clipPath id="saClip"><circle cx="32" cy="32" r="32" /></clipPath>
          <g clipPath="url(#saClip)">
            <rect width="64" height="64" fill="#006C35" />
            <path d="M16 26h32M20 22h24M24 30h16" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M18 40h28l-3 3H18z" fill="#FFFFFF" />
          </g>
        </svg>
      );
    case 'QA':
      return (
        <svg viewBox="0 0 64 64" className={`${className} rounded-full shadow-sm border border-white/80 shrink-0`} aria-label="Qatar Flag">
          <clipPath id="qaClip"><circle cx="32" cy="32" r="32" /></clipPath>
          <g clipPath="url(#qaClip)">
            <rect width="64" height="64" fill="#8A1538" />
            <polygon points="0,0 22,0 26,6 22,12 26,18 22,24 26,30 22,36 26,42 22,48 26,54 22,60 26,64 0,64" fill="#FFFFFF" />
          </g>
        </svg>
      );
    case 'GB':
      return (
        <svg viewBox="0 0 64 64" className={`${className} rounded-full shadow-sm border border-white/80 shrink-0`} aria-label="UK Flag">
          <clipPath id="gbClip"><circle cx="32" cy="32" r="32" /></clipPath>
          <g clipPath="url(#gbClip)">
            <rect width="64" height="64" fill="#012169" />
            <path d="M0 0L64 64M64 0L0 64" stroke="#FFFFFF" strokeWidth="10" />
            <path d="M0 0L64 64M64 0L0 64" stroke="#C8102E" strokeWidth="5" />
            <path d="M32 0V64M0 32H64" stroke="#FFFFFF" strokeWidth="14" />
            <path d="M32 0V64M0 32H64" stroke="#C8102E" strokeWidth="8" />
          </g>
        </svg>
      );
    case 'IE':
      return (
        <svg viewBox="0 0 64 64" className={`${className} rounded-full shadow-sm border border-white/80 shrink-0`} aria-label="Ireland Flag">
          <clipPath id="ieClip"><circle cx="32" cy="32" r="32" /></clipPath>
          <g clipPath="url(#ieClip)">
            <rect x="0" y="0" width="21.33" height="64" fill="#169B62" />
            <rect x="21.33" y="0" width="21.34" height="64" fill="#FFFFFF" />
            <rect x="42.67" y="0" width="21.33" height="64" fill="#FF883E" />
          </g>
        </svg>
      );
    case 'OM':
      return (
        <svg viewBox="0 0 64 64" className={`${className} rounded-full shadow-sm border border-white/80 shrink-0`} aria-label="Oman Flag">
          <clipPath id="omClip"><circle cx="32" cy="32" r="32" /></clipPath>
          <g clipPath="url(#omClip)">
            <rect x="0" y="0" width="64" height="21.33" fill="#FFFFFF" />
            <rect x="0" y="21.33" width="64" height="21.34" fill="#DB161B" />
            <rect x="0" y="42.67" width="64" height="21.33" fill="#008000" />
            <rect x="0" y="0" width="20" height="64" fill="#DB161B" />
            <circle cx="10" cy="12" r="3.5" fill="#FFFFFF" />
          </g>
        </svg>
      );
    default:
      return null;
  }
}

