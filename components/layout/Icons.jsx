export function StoriesIcon({ width, height, fill }) {
  const w = width ? `w-${width}` : `w-6`;
  const h = height ? `h-${height}` : `h-6`;
  return (
    <svg
      className={`${w} ${h}`}
      viewBox="0 0 12 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.5 5C3.22386 5 3 5.22386 3 5.5C3 5.77614 3.22386 6 3.5 6H8.5C8.77614 6 9 5.77614 9 5.5C9 5.22386 8.77614 5 8.5 5H3.5ZM3 8.5C3 8.22386 3.22386 8 3.5 8H8.5C8.77614 8 9 8.22386 9 8.5C9 8.77614 8.77614 9 8.5 9H3.5C3.22386 9 3 8.77614 3 8.5ZM3.5 11C3.22386 11 3 11.2239 3 11.5C3 11.7761 3.22386 12 3.5 12H5.5C5.77614 12 6 11.7761 6 11.5C6 11.2239 5.77614 11 5.5 11H3.5ZM2.5 0C2.22386 0 2 0.223858 2 0.5V1H1.5C0.671573 1 0 1.67157 0 2.5L0 14.5C0 15.3284 0.671573 16 1.5 16H7.5C7.63261 16 7.75979 15.9473 7.85355 15.8536L11.8536 11.8536C11.9473 11.7598 12 11.6326 12 11.5V2.5C12 1.67157 11.3284 1 10.5 1H10V0.5C10 0.223858 9.77614 0 9.5 0C9.22386 0 9 0.223858 9 0.5V1H6.5V0.5C6.5 0.223858 6.27614 0 6 0C5.72386 0 5.5 0.223858 5.5 0.5V1H3V0.5C3 0.223858 2.77614 0 2.5 0ZM10.5 2C10.7761 2 11 2.22386 11 2.5V11H8.5C7.67157 11 7 11.6716 7 12.5V15H1.5C1.22386 15 1 14.7761 1 14.5V2.5C1 2.22386 1.22386 2 1.5 2H10.5ZM10.2929 12L8 14.2929V12.5C8 12.2239 8.22386 12 8.5 12H10.2929Z"
        fill={fill || "#E3AA6D"}
      />
    </svg>
  );
}

export function MobileAppIcon({ width, height, fill }) {
  const w = width ? `w-${width}` : `w-6`;
  const h = height ? `h-${height}` : `h-6`;
  return (
    <svg
      className={`${w} ${h}`}
      viewBox="0 0 10 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 12C3.72386 12 3.5 12.2239 3.5 12.5C3.5 12.7761 3.72386 13 4 13H6C6.27614 13 6.5 12.7761 6.5 12.5C6.5 12.2239 6.27614 12 6 12H4ZM2 0C0.89543 0 0 0.895431 0 2L0 14C0 15.1046 0.895431 16 2 16H8C9.10457 16 10 15.1046 10 14V2C10 0.89543 9.10457 0 8 0L2 0ZM1 2C1 1.44772 1.44772 1 2 1H8C8.55228 1 9 1.44772 9 2V14C9 14.5523 8.55228 15 8 15H2C1.44772 15 1 14.5523 1 14V2Z"
        fill={fill || "#E3AA6D"}
      />
    </svg>
  );
}

export function AboutIcon({ width, height, fill }) {
  const w = width ? `w-${width}` : `w-6`;
  const h = height ? `h-${height}` : `h-6`;
  return (
    <svg
      className={`${w} ${h}`}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.49206 6.91012C8.44972 6.67687 8.24557 6.49999 8.00011 6.49999C7.72397 6.49999 7.50011 6.72385 7.50011 6.99999V11.5021L7.50817 11.592C7.55051 11.8253 7.75465 12.0021 8.00011 12.0021C8.27626 12.0021 8.50011 11.7783 8.50011 11.5021V6.99999L8.49206 6.91012ZM8.79883 4.74999C8.79883 4.33578 8.46304 3.99999 8.04883 3.99999C7.63461 3.99999 7.29883 4.33578 7.29883 4.74999C7.29883 5.16421 7.63461 5.49999 8.04883 5.49999C8.46304 5.49999 8.79883 5.16421 8.79883 4.74999ZM16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8ZM1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8Z"
        fill={fill || "#E3AA6D"}
      />
    </svg>
  );
}

export function UserIcon({ className }) {
  return <svg
    className={className}
    width="17"
    height="20"
    viewBox="0 0 17 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M13.7542 11.9999C14.9962 11.9999 16.003 13.0068 16.003 14.2488V15.1673C16.003 15.7406 15.8238 16.2997 15.4905 16.7662C13.9446 18.9294 11.4203 20.0011 8 20.0011C4.57903 20.0011 2.05607 18.9289 0.513908 16.7646C0.181945 16.2987 0.00354004 15.7409 0.00354004 15.1688V14.2488C0.00354004 13.0068 1.0104 11.9999 2.25242 11.9999H13.7542ZM8 0.00463867C10.7614 0.00463867 13 2.24321 13 5.00464C13 7.76606 10.7614 10.0046 8 10.0046C5.23857 10.0046 3 7.76606 3 5.00464C3 2.24321 5.23857 0.00463867 8 0.00463867Z" />
  </svg>
}
