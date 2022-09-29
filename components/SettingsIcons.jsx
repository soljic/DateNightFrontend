// custom icon designed by Spiritus team //
///////////////////////////////////////////

export function SettingsGuardianIcon({ width, height }) {
  const w = width ? `w-${width}` : `w-6`;
  const h = height ? `h-${height}` : `h-6`;

  return (
    <svg
      className={`${w} ${h} dark:fill-sp-white fill-sp-dark-fawn`}
      viewBox="0 0 22 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9.25 3C9.25 4.65685 7.90685 6 6.25 6C4.59315 6 3.25 4.65685 3.25 3C3.25 1.34315 4.59315 0 6.25 0C7.90685 0 9.25 1.34315 9.25 3ZM7.75 3C7.75 2.17157 7.07843 1.5 6.25 1.5C5.42157 1.5 4.75 2.17157 4.75 3C4.75 3.82843 5.42157 4.5 6.25 4.5C7.07843 4.5 7.75 3.82843 7.75 3ZM17.75 5.5C17.75 6.88071 16.6307 8 15.25 8C13.8693 8 12.75 6.88071 12.75 5.5C12.75 4.11929 13.8693 3 15.25 3C16.6307 3 17.75 4.11929 17.75 5.5ZM16.25 5.5C16.25 4.94772 15.8023 4.5 15.25 4.5C14.6977 4.5 14.25 4.94772 14.25 5.5C14.25 6.05228 14.6977 6.5 15.25 6.5C15.8023 6.5 16.25 6.05228 16.25 5.5ZM12.1465 8.75C11.82 7.59575 10.7588 6.75 9.5 6.75H3.5C1.98122 6.75 0.75 7.98122 0.75 9.5V12.5C0.75 13.6046 1.64543 14.5 2.75 14.5C2.92265 14.5 3.09019 14.4781 3.25 14.437V18C3.25 19.1046 4.14543 20 5.25 20C5.72297 20 6.1576 19.8358 6.5 19.5613C6.8424 19.8358 7.27703 20 7.75 20C8.85457 20 9.75 19.1046 9.75 18V14.437C9.90981 14.4781 10.0774 14.5 10.25 14.5C11.1819 14.5 11.965 13.8626 12.187 13H12.25V18C12.25 19.1046 13.1454 20 14.25 20C14.723 20 15.1576 19.8358 15.5 19.5613C15.8424 19.8358 16.277 20 16.75 20C17.8546 20 18.75 19.1046 18.75 18V15.187C18.9098 15.2281 19.0774 15.25 19.25 15.25C20.3546 15.25 21.25 14.3546 21.25 13.25V11.5C21.25 9.98122 20.0188 8.75 18.5 8.75H12.1465ZM9.75 12.5V10C9.75 9.58579 9.41421 9.25 9 9.25C8.58579 9.25 8.25 9.58579 8.25 10V18C8.25 18.2761 8.02614 18.5 7.75 18.5C7.47386 18.5 7.25 18.2761 7.25 18V14.5C7.25 14.0858 6.91421 13.75 6.5 13.75C6.08579 13.75 5.75 14.0858 5.75 14.5V18C5.75 18.2761 5.52614 18.5 5.25 18.5C4.97386 18.5 4.75 18.2761 4.75 18V10C4.75 9.58579 4.41421 9.25 4 9.25C3.58579 9.25 3.25 9.58579 3.25 10V12.5C3.25 12.7761 3.02614 13 2.75 13C2.47386 13 2.25 12.7761 2.25 12.5V9.5C2.25 8.80964 2.80964 8.25 3.5 8.25H9.5C10.1904 8.25 10.75 8.80964 10.75 9.5V12.5C10.75 12.7761 10.5261 13 10.25 13C9.97386 13 9.75 12.7761 9.75 12.5ZM12.25 10.25H18.5C19.1904 10.25 19.75 10.8096 19.75 11.5V13.25C19.75 13.5261 19.5261 13.75 19.25 13.75C18.9739 13.75 18.75 13.5261 18.75 13.25V12C18.75 11.5858 18.4142 11.25 18 11.25C17.5858 11.25 17.25 11.5858 17.25 12V18C17.25 18.2761 17.0261 18.5 16.75 18.5C16.4739 18.5 16.25 18.2761 16.25 18V15.5C16.25 15.0858 15.9142 14.75 15.5 14.75C15.0858 14.75 14.75 15.0858 14.75 15.5V18C14.75 18.2761 14.5261 18.5 14.25 18.5C13.9739 18.5 13.75 18.2761 13.75 18V12.25C13.75 11.8358 13.4142 11.5 13 11.5H12.25V10.25Z" />
    </svg>
  );
}

export function SettingsSignOutIcon({ width, height }) {
  const w = width ? `w-${width}` : `w-6`;
  const h = height ? `h-${height}` : `h-6`;

  return (
    <svg
      width="15"
      height="15"
      className={`${w} ${h} fill-sp-cotta`}
      viewBox="0 0 15 15"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5.5 8.25C5.91421 8.25 6.25 7.91422 6.25 7.5C6.25 7.08579 5.91421 6.75 5.5 6.75C5.08579 6.75 4.75 7.08579 4.75 7.5C4.75 7.91422 5.08579 8.25 5.5 8.25ZM8 0.500004C8 0.354204 7.93636 0.215666 7.82575 0.120678C7.71514 0.0256898 7.56857 -0.0162863 7.42445 0.00574443L0.424449 1.07574C0.180316 1.11306 0 1.32303 0 1.57V12.43C0 12.6769 0.180277 12.8869 0.424378 12.9243L7.42438 13.9953C7.56851 14.0173 7.71509 13.9754 7.82572 13.8804C7.93635 13.7854 8 13.6468 8 13.501V7.00002L13.1722 7.00002L12.1753 7.87372C11.9679 8.05556 11.9468 8.37144 12.1284 8.57926C12.3099 8.78708 12.6253 8.80814 12.8328 8.6263L14.8295 6.8763C14.9379 6.78135 15 6.64419 15 6.50001C15 6.35583 14.9379 6.21867 14.8295 6.12372L12.8328 4.37372C12.6253 4.19188 12.3099 4.21294 12.1284 4.42076C11.9468 4.62858 11.9679 4.94446 12.1753 5.1263L13.1723 6.00002L8 6.00002V0.500004ZM7 1.08224V12.9187L1 12.0007V1.99938L7 1.08224ZM9.5 13H9V8H10V12.5C10 12.7761 9.77614 13 9.5 13ZM9 5V1H9.5C9.77614 1 10 1.22386 10 1.5V5H9Z" />
    </svg>
  );
}

export function SettingsSpiritusIcon({ width, height }) {
  const w = width ? `w-${width}` : `w-6`;
  const h = height ? `h-${height}` : `h-6`;

  return (
    <svg
      className={`${w} ${h} fill-sp-dark-fawn dark:fill-sp-white`}
      width="14"
      height="16"
      viewBox="0 0 14 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M7 7.49951C8.10457 7.49951 9 6.60408 9 5.49951C9 4.39494 8.10457 3.49951 7 3.49951C5.89543 3.49951 5 4.39494 5 5.49951C5 6.60408 5.89543 7.49951 7 7.49951ZM7 12.4995C9.5 12.4995 10.5 11.2447 10.5 9.99951C10.5 9.17108 9.82843 8.49951 9 8.49951H5C4.17157 8.49951 3.5 9.17108 3.5 9.99951C3.5 11.2494 4.5 12.4995 7 12.4995ZM7.27735 0.0839749C7.1094 -0.0279916 6.8906 -0.0279916 6.72265 0.0839749C4.78446 1.3761 2.68833 2.1823 0.429289 2.50503C0.182965 2.54021 0 2.75117 0 3V7.5C0 11.3913 2.30699 14.2307 6.82051 15.9667C6.93605 16.0111 7.06395 16.0111 7.17949 15.9667C11.693 14.2307 14 11.3913 14 7.5V3C14 2.75117 13.817 2.54021 13.5707 2.50503C11.3117 2.1823 9.21554 1.3761 7.27735 0.0839749ZM1 3.42787C2.98541 3.09055 4.85275 2.39606 6.59914 1.34583L7 1.09715L7.40086 1.34583C9.14725 2.39606 11.0146 3.09055 13 3.42787V7.5C13 10.892 11.0321 13.3634 7 14.9632C2.96795 13.3634 1 10.892 1 7.5V3.42787Z" />
    </svg>
  );
}

export function SettingsSuggestionsIcon({ width, height }) {
  const w = width ? `w-${width}` : `w-6`;
  const h = height ? `h-${height}` : `h-6`;

  return (
    <svg
      className={`${w} ${h} fill-sp-dark-fawn dark:fill-sp-white`}
      width="14"
      height="16"
      viewBox="0 0 14 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8.5 7C8.5 7.65311 8.0826 8.20873 7.5 8.41465V10.5C7.5 10.7761 7.27614 11 7 11C6.72386 11 6.5 10.7761 6.5 10.5V8.41465C5.9174 8.20873 5.5 7.65311 5.5 7C5.5 6.17157 6.17157 5.5 7 5.5C7.82843 5.5 8.5 6.17157 8.5 7ZM7.27735 0.0839749C7.1094 -0.0279916 6.8906 -0.0279916 6.72265 0.0839749C4.78446 1.3761 2.68833 2.1823 0.429289 2.50503C0.182965 2.54021 0 2.75117 0 3V7.5C0 11.3913 2.30699 14.2307 6.82051 15.9667C6.93605 16.0111 7.06395 16.0111 7.17949 15.9667C11.693 14.2307 14 11.3913 14 7.5V3C14 2.75117 13.817 2.54021 13.5707 2.50503C11.3117 2.1823 9.21554 1.3761 7.27735 0.0839749ZM1 3.42787C2.98541 3.09055 4.85275 2.39606 6.59914 1.34583L7 1.09715L7.40086 1.34583C9.14725 2.39606 11.0146 3.09055 13 3.42787V7.5C13 10.892 11.0321 13.3634 7 14.9632C2.96795 13.3634 1 10.892 1 7.5V3.42787Z" />
    </svg>
  );
}

export function SettingsAccountIcon({ width, height }) {
  const w = width ? `w-${width}` : `w-6`;
  const h = height ? `h-${height}` : `h-6`;

  return (
    <svg
      className={`${w} ${h} fill-sp-dark-fawn dark:fill-sp-white`}
      width="14"
      height="16"
      viewBox="0 0 14 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M7 0C4.79086 0 3 1.79086 3 4C3 6.20914 4.79086 8 7 8C9.20914 8 11 6.20914 11 4C11 1.79086 9.20914 0 7 0ZM4 4C4 2.34315 5.34315 1 7 1C8.65685 1 10 2.34315 10 4C10 5.65685 8.65685 7 7 7C5.34315 7 4 5.65685 4 4ZM2.00873 9C0.903151 9 0 9.88687 0 11C0 12.6912 0.83281 13.9663 2.13499 14.7966C3.41697 15.614 5.14526 16 7 16C8.85474 16 10.583 15.614 11.865 14.7966C13.1672 13.9663 14 12.6912 14 11C14 9.89557 13.1045 9.00001 12 9.00001L2.00873 9ZM1 11C1 10.4467 1.44786 10 2.00873 10L12 10C12.5522 10 13 10.4478 13 11C13 12.3088 12.3777 13.2837 11.3274 13.9534C10.2568 14.636 8.73511 15 7 15C5.26489 15 3.74318 14.636 2.67262 13.9534C1.62226 13.2837 1 12.3088 1 11Z" />
    </svg>
  );
}


export function SettingsGlobeIcon({ width, height }) {
  const w = width ? `w-${width}` : `w-6`;
  const h = height ? `h-${height}` : `h-6`;

  return (
    <svg
      className={`${w} ${h} fill-sp-dark-fawn dark:fill-sp-white`}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM8 1C8.65685 1 9.40677 1.59025 10.0218 2.90814C10.2393 3.37419 10.4283 3.90978 10.5806 4.5H5.41936C5.57172 3.90978 5.76073 3.37419 5.97822 2.90814C6.59323 1.59025 7.34315 1 8 1ZM5.07203 2.48526C4.79564 3.07753 4.56498 3.75696 4.38931 4.5H1.93648C2.77295 3.05399 4.11182 1.93497 5.71442 1.38163C5.47297 1.71222 5.25828 2.08617 5.07203 2.48526ZM4.19265 5.5C4.06723 6.28832 4 7.12934 4 8C4 8.87066 4.06723 9.71168 4.19265 10.5H1.45963C1.16268 9.7236 1 8.8808 1 8C1 7.1192 1.16268 6.2764 1.45963 5.5H4.19265ZM4.38931 11.5C4.56498 12.243 4.79564 12.9225 5.07203 13.5147C5.25828 13.9138 5.47297 14.2878 5.71442 14.6184C4.11182 14.065 2.77295 12.946 1.93648 11.5H4.38931ZM5.41936 11.5H10.5806C10.4283 12.0902 10.2393 12.6258 10.0218 13.0919C9.40677 14.4097 8.65685 15 8 15C7.34315 15 6.59323 14.4097 5.97822 13.0919C5.76073 12.6258 5.57172 12.0902 5.41936 11.5ZM10.7938 10.5H5.20617C5.07345 9.72528 5 8.88331 5 8C5 7.11669 5.07345 6.27472 5.20617 5.5H10.7938C10.9266 6.27472 11 7.11669 11 8C11 8.88331 10.9266 9.72528 10.7938 10.5ZM11.6107 11.5H14.0635C13.2271 12.946 11.8882 14.065 10.2856 14.6184C10.527 14.2878 10.7417 13.9138 10.928 13.5147C11.2044 12.9225 11.435 12.243 11.6107 11.5ZM14.5404 10.5H11.8074C11.9328 9.71168 12 8.87066 12 8C12 7.12934 11.9328 6.28832 11.8074 5.5H14.5404C14.8373 6.2764 15 7.1192 15 8C15 8.8808 14.8373 9.7236 14.5404 10.5ZM10.2856 1.38163C11.8882 1.93497 13.2271 3.05399 14.0635 4.5H11.6107C11.435 3.75696 11.2044 3.07753 10.928 2.48526C10.7417 2.08617 10.527 1.71222 10.2856 1.38163Z" />
    </svg>
  );
}

export function SettingsDevicesIcon({ width, height }) {
  const w = width ? `w-${width}` : `w-6`;
  const h = height ? `h-${height}` : `h-6`;

  return (
    <svg
      className={`${w} ${h} fill-sp-dark-fawn dark:fill-sp-white`}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4 1H14C14.5523 1 15 1.44772 15 2V9C15 9.55228 14.5523 10 14 10H7V11H10V13H7V14H12.5C12.7761 14 13 13.7761 13 13.5C13 13.2239 12.7761 13 12.5 13H11V11H14C15.1046 11 16 10.1046 16 9V2C16 0.895431 15.1046 0 14 0H4C2.89543 0 2 0.895431 2 2V5H3V2C3 1.44772 3.44772 1 4 1ZM2.5 13C2.22386 13 2 13.2239 2 13.5C2 13.7761 2.22386 14 2.5 14H3.5C3.77614 14 4 13.7761 4 13.5C4 13.2239 3.77614 13 3.5 13H2.5ZM0 7.5C0 6.67157 0.671573 6 1.5 6H4.5C5.32843 6 6 6.67157 6 7.5V14.5C6 15.3284 5.32843 16 4.5 16H1.5C0.671573 16 0 15.3284 0 14.5V7.5ZM1.5 7C1.22386 7 1 7.22386 1 7.5V14.5C1 14.7761 1.22386 15 1.5 15H4.5C4.77614 15 5 14.7761 5 14.5V7.5C5 7.22386 4.77614 7 4.5 7H1.5Z" />
    </svg>
  );
}

export function SettingsQuestionIcon({ width, height }) {
  const w = width ? `w-${width}` : `w-6`;
  const h = height ? `h-${height}` : `h-6`;

  return (
    <svg
      className={`${w} ${h} fill-sp-dark-fawn dark:fill-sp-white`}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0ZM8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1ZM8 11.5C8.41421 11.5 8.75 11.8358 8.75 12.25C8.75 12.6642 8.41421 13 8 13C7.58579 13 7.25 12.6642 7.25 12.25C7.25 11.8358 7.58579 11.5 8 11.5ZM8 3.5C9.38071 3.5 10.5 4.61929 10.5 6C10.5 6.72959 10.1848 7.40774 9.6513 7.8771L9.49667 8.00243L9.27817 8.16553L9.19065 8.23718C9.1348 8.28509 9.08354 8.33373 9.03456 8.38592C8.69627 8.74641 8.5 9.24223 8.5 10C8.5 10.2761 8.27614 10.5 8 10.5C7.72386 10.5 7.5 10.2761 7.5 10C7.5 8.98796 7.79312 8.24747 8.30535 7.70162C8.41649 7.5832 8.53202 7.47988 8.66094 7.37874L8.90761 7.19439L9.02561 7.09468C9.325 6.81435 9.5 6.42206 9.5 6C9.5 5.17157 8.82843 4.5 8 4.5C7.17157 4.5 6.5 5.17157 6.5 6C6.5 6.27614 6.27614 6.5 6 6.5C5.72386 6.5 5.5 6.27614 5.5 6C5.5 4.61929 6.61929 3.5 8 3.5Z" />
    </svg>
  );
}

export function SettingsCheckSelectedIcon({ width, height }) {
  const w = width ? `w-${width}` : `w-6`;
  const h = height ? `h-${height}` : `h-6`;

  return (
    <svg
      className={`${w} ${h} fill-sp-dark-fawn dark:fill-sp-white`}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 13C10.7614 13 13 10.7614 13 8C13 5.23858 10.7614 3 8 3C5.23858 3 3 5.23858 3 8C3 10.7614 5.23858 13 8 13ZM8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0ZM1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8Z"
        fill="url(#paint0_linear_7156_5052)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_7156_5052"
          x1="2.077e-08"
          y1="7.99999"
          x2="16"
          y2="7.99999"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#ED9A4C" />
          <stop offset="1" stopColor="#E3AA6D" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function SettingsCheckUnselectedIcon({ width, height }) {
  const w = width ? `w-${width}` : `w-6`;
  const h = height ? `h-${height}` : `h-6`;

  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1ZM0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8Z"
        fill="#706E6B"
      />
    </svg>
  );
}
