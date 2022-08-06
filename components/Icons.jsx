// custom icon designed by Spiritus team //
///////////////////////////////////////////

export function GuardianIcon ({ width, height }) {
  const w = width ? `w-${width}` : `w-6`
  const h = height ? `h-${height}` : `h-6`

  return (
    <svg
      className={`${w} ${h} dark:fill-sp-white fill-sp-lighter`}
      viewBox='0 0 22 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M9.25 3C9.25 4.65685 7.90685 6 6.25 6C4.59315 6 3.25 4.65685 3.25 3C3.25 1.34315 4.59315 0 6.25 0C7.90685 0 9.25 1.34315 9.25 3ZM7.75 3C7.75 2.17157 7.07843 1.5 6.25 1.5C5.42157 1.5 4.75 2.17157 4.75 3C4.75 3.82843 5.42157 4.5 6.25 4.5C7.07843 4.5 7.75 3.82843 7.75 3ZM17.75 5.5C17.75 6.88071 16.6307 8 15.25 8C13.8693 8 12.75 6.88071 12.75 5.5C12.75 4.11929 13.8693 3 15.25 3C16.6307 3 17.75 4.11929 17.75 5.5ZM16.25 5.5C16.25 4.94772 15.8023 4.5 15.25 4.5C14.6977 4.5 14.25 4.94772 14.25 5.5C14.25 6.05228 14.6977 6.5 15.25 6.5C15.8023 6.5 16.25 6.05228 16.25 5.5ZM12.1465 8.75C11.82 7.59575 10.7588 6.75 9.5 6.75H3.5C1.98122 6.75 0.75 7.98122 0.75 9.5V12.5C0.75 13.6046 1.64543 14.5 2.75 14.5C2.92265 14.5 3.09019 14.4781 3.25 14.437V18C3.25 19.1046 4.14543 20 5.25 20C5.72297 20 6.1576 19.8358 6.5 19.5613C6.8424 19.8358 7.27703 20 7.75 20C8.85457 20 9.75 19.1046 9.75 18V14.437C9.90981 14.4781 10.0774 14.5 10.25 14.5C11.1819 14.5 11.965 13.8626 12.187 13H12.25V18C12.25 19.1046 13.1454 20 14.25 20C14.723 20 15.1576 19.8358 15.5 19.5613C15.8424 19.8358 16.277 20 16.75 20C17.8546 20 18.75 19.1046 18.75 18V15.187C18.9098 15.2281 19.0774 15.25 19.25 15.25C20.3546 15.25 21.25 14.3546 21.25 13.25V11.5C21.25 9.98122 20.0188 8.75 18.5 8.75H12.1465ZM9.75 12.5V10C9.75 9.58579 9.41421 9.25 9 9.25C8.58579 9.25 8.25 9.58579 8.25 10V18C8.25 18.2761 8.02614 18.5 7.75 18.5C7.47386 18.5 7.25 18.2761 7.25 18V14.5C7.25 14.0858 6.91421 13.75 6.5 13.75C6.08579 13.75 5.75 14.0858 5.75 14.5V18C5.75 18.2761 5.52614 18.5 5.25 18.5C4.97386 18.5 4.75 18.2761 4.75 18V10C4.75 9.58579 4.41421 9.25 4 9.25C3.58579 9.25 3.25 9.58579 3.25 10V12.5C3.25 12.7761 3.02614 13 2.75 13C2.47386 13 2.25 12.7761 2.25 12.5V9.5C2.25 8.80964 2.80964 8.25 3.5 8.25H9.5C10.1904 8.25 10.75 8.80964 10.75 9.5V12.5C10.75 12.7761 10.5261 13 10.25 13C9.97386 13 9.75 12.7761 9.75 12.5ZM12.25 10.25H18.5C19.1904 10.25 19.75 10.8096 19.75 11.5V13.25C19.75 13.5261 19.5261 13.75 19.25 13.75C18.9739 13.75 18.75 13.5261 18.75 13.25V12C18.75 11.5858 18.4142 11.25 18 11.25C17.5858 11.25 17.25 11.5858 17.25 12V18C17.25 18.2761 17.0261 18.5 16.75 18.5C16.4739 18.5 16.25 18.2761 16.25 18V15.5C16.25 15.0858 15.9142 14.75 15.5 14.75C15.0858 14.75 14.75 15.0858 14.75 15.5V18C14.75 18.2761 14.5261 18.5 14.25 18.5C13.9739 18.5 13.75 18.2761 13.75 18V12.25C13.75 11.8358 13.4142 11.5 13 11.5H12.25V10.25Z' />
    </svg>
  )
}

export function GraveIcon ({ width, height }) {
  const w = width ? `w-${width}` : `w-6`
  const h = height ? `h-${height}` : `h-6`

  return (
    <svg
      className={`${w} ${h} dark:fill-sp-white fill-sp-lighter`}
      viewBox='0 0 21 19'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M10.2485 0C7.30997 0 5.85203 1.74337 5.45996 2.25H3.74854C3.19625 2.25 2.74854 2.69772 2.74854 3.25V16.604C1.99839 16.7757 1.38995 16.9422 0.960488 17.0688C0.562264 17.1862 0.357972 17.6137 0.499915 18.0038C0.640783 18.391 1.07 18.5948 1.46515 18.4781C2.84951 18.0692 6.13645 17.25 10.2485 17.25C14.3606 17.25 17.6476 18.0692 19.0319 18.4781C19.4271 18.5948 19.8563 18.391 19.9972 18.0038C20.1391 17.6137 19.9348 17.1862 19.5366 17.0688C19.1071 16.9422 18.4987 16.7757 17.7485 16.604V3.25C17.7485 2.69772 17.3008 2.25 16.7485 2.25H15.0371C14.645 1.74337 13.1871 0 10.2485 0ZM10.2485 1.5C12.8735 1.5 14.1245 3.41602 14.1245 3.41602L14.3472 3.75H16.2485V16.2993C14.6005 16.0013 12.5548 15.75 10.2485 15.75C7.94227 15.75 5.89661 16.0013 4.24854 16.2993V3.75H6.1499L6.37256 3.41602C6.37256 3.41602 7.62354 1.5 10.2485 1.5ZM9.49854 4.5V6.75H7.24854V8.25H9.49854V12.75H10.9985V8.25H13.2485V6.75H10.9985V4.5H9.49854Z' />
    </svg>
  )
}

export function SpiritusIcon ({ width, height }) {
  const w = width ? `w-${width}` : `w-6`
  const h = height ? `h-${height}` : `h-6`

  return (
    <svg
      className={`${w} ${h} fill-sp-dark-fawn dark:fill-sp-fawn`}
      viewBox='0 0 21 21'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M15.5004 10.0003C18.5379 10.0003 21.0004 12.4627 21.0004 15.5003C21.0004 18.5378 18.5379 21.0003 15.5004 21.0003C12.4628 21.0003 10.0004 18.5378 10.0004 15.5003C10.0004 12.4627 12.4628 10.0003 15.5004 10.0003ZM10.0226 11.9996C9.72593 12.4629 9.48639 12.9663 9.31398 13.4999L2.25278 13.5002C1.83919 13.5002 1.50391 13.8355 1.50391 14.2491L1.50391 14.8267C1.50391 15.3624 1.69502 15.8805 2.04287 16.2878C3.29618 17.7555 5.26206 18.5013 8.00036 18.5013C8.5968 18.5013 9.15667 18.4659 9.6806 18.3954C9.92579 18.8903 10.2333 19.3489 10.5921 19.7618C9.79661 19.922 8.93173 20.0013 8.00036 20.0013C4.8545 20.0013 2.46849 19.0962 0.902186 17.2619C0.322425 16.583 0.00390625 15.7195 0.00390625 14.8267L0.00390625 14.2491C0.00390625 13.007 1.01076 12.0002 2.25278 12.0002L10.0226 11.9996ZM15.5004 12.0002L15.4105 12.0083C15.2064 12.0453 15.0455 12.2063 15.0084 12.4104L15.0004 12.5002L14.9994 15.0003H12.5043L12.4144 15.0083C12.2103 15.0454 12.0494 15.2063 12.0123 15.4104L12.0043 15.5003L12.0123 15.5901C12.0494 15.7942 12.2103 15.9552 12.4144 15.9922L12.5043 16.0003H14.9994L15.0004 18.5002L15.0084 18.5901C15.0455 18.7942 15.2064 18.9551 15.4105 18.9922L15.5004 19.0002L15.5902 18.9922C15.7943 18.9551 15.9553 18.7942 15.9923 18.5901L16.0004 18.5002L15.9994 16.0003L18.5043 16.0003L18.5941 15.9922C18.7982 15.9552 18.9592 15.7942 18.9962 15.5901L19.0043 15.5003L18.9962 15.4104C18.9592 15.2063 18.7982 15.0454 18.5941 15.0083L18.5043 15.0003L15.9994 15.0003L16.0004 12.5002L15.9923 12.4104C15.9553 12.2063 15.7943 12.0453 15.5902 12.0083L15.5004 12.0002ZM8.00036 0.00488281C10.7618 0.00488281 13.0004 2.24346 13.0004 5.00488C13.0004 7.76631 10.7618 10.0049 8.00036 10.0049C5.23894 10.0049 3.00036 7.76631 3.00036 5.00488C3.00036 2.24346 5.23894 0.00488281 8.00036 0.00488281ZM8.00036 1.50488C6.06737 1.50488 4.50036 3.07189 4.50036 5.00488C4.50036 6.93788 6.06737 8.50488 8.00036 8.50488C9.93336 8.50488 11.5004 6.93788 11.5004 5.00488C11.5004 3.07189 9.93336 1.50488 8.00036 1.50488Z' />
    </svg>
  )
}

export function StoryIcon ({ width, height }) {
  const w = width ? `w-${width}` : `w-6`
  const h = height ? `h-${height}` : `h-6`
  return (
    <svg
      className={`${w} ${h}`}
      viewBox='0 0 18 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M14.75 0C16.5449 0 18 1.45507 18 3.25V10H13.25C11.4551 10 10 11.4551 10 13.25V18H3.25C1.45507 18 0 16.5449 0 14.75V3.25C0 1.45507 1.45507 0 3.25 0H14.75ZM17.56 11.5L11.5 17.56V13.25C11.5 12.2835 12.2835 11.5 13.25 11.5H17.56Z'
        fill='url(#paint0_linear_5122_27655)'
      />
      <defs>
        <linearGradient
          id='paint0_linear_5122_27655'
          x1='2.33663e-08'
          y1='8.99999'
          x2='18'
          y2='8.99999'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#ED9A4C' />
          <stop offset='1' stopColor='#E3AA6D' />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function CommentIcon ({ width, height }) {
  const w = width ? `w-${width}` : `w-6`
  const h = height ? `h-${height}` : `h-6`

  return (
    <svg
      className={`${w} ${h} fill-sp-dark-fawn dark:fill-sp-fawn`}
      viewBox='0 0 20 21'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C8.38171 20 6.81782 19.6146 5.41286 18.888L1.58704 19.9553C0.922123 20.141 0.232581 19.7525 0.0469058 19.0876C-0.0145358 18.8676 -0.014506 18.6349 0.046948 18.4151L1.11461 14.5922C0.386366 13.186 0 11.6203 0 10C0 4.47715 4.47715 0 10 0ZM10 1.5C5.30558 1.5 1.5 5.30558 1.5 10C1.5 11.4696 1.87277 12.8834 2.57303 14.1375L2.72368 14.4072L1.61096 18.3914L5.59755 17.2792L5.86709 17.4295C7.12006 18.1281 8.53218 18.5 10 18.5C14.6944 18.5 18.5 14.6944 18.5 10C18.5 5.30558 14.6944 1.5 10 1.5ZM6.75 11H11.2483C11.6625 11 11.9983 11.3358 11.9983 11.75C11.9983 12.1297 11.7161 12.4435 11.35 12.4932L11.2483 12.5H6.75C6.33579 12.5 6 12.1642 6 11.75C6 11.3703 6.28215 11.0565 6.64823 11.0068L6.75 11H11.2483H6.75ZM6.75 7.5L13.2545 7.5C13.6687 7.5 14.0045 7.83579 14.0045 8.25C14.0045 8.6297 13.7223 8.94349 13.3563 8.99315L13.2545 9H6.75C6.33579 9 6 8.66421 6 8.25C6 7.8703 6.28215 7.55651 6.64823 7.50685L6.75 7.5L13.2545 7.5L6.75 7.5Z' />
    </svg>
  )
}

export function LocationIcon ({ width, height }) {
  const w = width ? `w-${width}` : `w-6`
  const h = height ? `h-${height}` : `h-6`
  return (
    <svg
      className={`${w} ${h} fill-sp-dark-fawn dark:fill-sp-fawn`}
      viewBox='0 0 21 21'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M9.9999 19.5999C10.8265 19.5999 11.6287 19.4954 12.394 19.299C11.9593 18.8094 11.5836 18.3126 11.2753 17.8081C10.8456 18.2102 10.4078 18.3999 9.9999 18.3999C9.21169 18.3999 8.31178 17.6916 7.57376 16.1101C7.31278 15.5509 7.08597 14.9082 6.90314 14.1999H10.3152C10.3447 13.7872 10.4164 13.3856 10.5262 12.9999H6.6473C6.48804 12.0702 6.3999 11.0599 6.3999 9.9999C6.3999 8.93993 6.48804 7.92957 6.6473 6.9999L13.3525 6.9999C13.4786 7.73593 13.5601 8.52252 13.5886 9.34428C13.962 9.16581 14.3581 9.02747 14.7717 8.93491C14.7361 8.26791 14.6674 7.62031 14.5687 6.9999H17.8483C18.1282 7.73172 18.3087 8.5127 18.3733 9.32632C18.8159 9.53379 19.2274 9.79744 19.5993 10.108C19.5997 10.072 19.5999 10.036 19.5999 9.9999C19.5999 4.69797 15.3018 0.399902 9.9999 0.399902C4.69797 0.399902 0.399902 4.69797 0.399902 9.9999C0.399902 15.3018 4.69797 19.5999 9.9999 19.5999ZM9.9999 1.5999C10.7881 1.5999 11.688 2.3082 12.426 3.88967C12.687 4.44893 12.9138 5.09164 13.0967 5.7999L6.90314 5.7999C7.08597 5.09164 7.31278 4.44893 7.57376 3.88967C8.31178 2.3082 9.21169 1.5999 9.9999 1.5999ZM6.48634 3.38221C6.15467 4.09294 5.87788 4.90825 5.66708 5.7999L2.72367 5.7999C3.72744 4.06469 5.33409 2.72187 7.2572 2.05786C6.96746 2.45456 6.70984 2.9033 6.48634 3.38221ZM5.43108 6.9999C5.28058 7.94589 5.1999 8.95511 5.1999 9.9999C5.1999 11.0447 5.28058 12.0539 5.43108 12.9999H2.15146C1.79512 12.0682 1.5999 11.0569 1.5999 9.9999C1.5999 8.94295 1.79512 7.93158 2.15146 6.9999L5.43108 6.9999ZM5.66708 14.1999C5.87788 15.0916 6.15467 15.9069 6.48634 16.6176C6.70984 17.0965 6.96746 17.5452 7.2572 17.9419C5.33409 17.2779 3.72744 15.9351 2.72367 14.1999H5.66708ZM12.7426 2.05786C14.6657 2.72187 16.2724 4.06469 17.2761 5.7999H14.3327C14.1219 4.90825 13.8451 4.09294 13.5135 3.38221C13.29 2.9033 13.0323 2.45456 12.7426 2.05786ZM15.9999 9.9999C18.4852 9.9999 20.4999 12.0722 20.4999 14.6285C20.4999 16.5443 19.0801 18.5523 16.2999 20.697C16.1221 20.8342 15.8777 20.8342 15.6999 20.697C12.9197 18.5523 11.4999 16.5443 11.4999 14.6285C11.4999 12.0722 13.5146 9.9999 15.9999 9.9999ZM15.9999 13.0856C15.1715 13.0856 14.4999 13.7764 14.4999 14.6285C14.4999 15.4806 15.1715 16.1713 15.9999 16.1713C16.8283 16.1713 17.4999 15.4806 17.4999 14.6285C17.4999 13.7764 16.8283 13.0856 15.9999 13.0856Z' />
    </svg>
  )
}

export function RangeIcon ({ width, height }) {
  const w = width ? `w-${width}` : `w-6`
  const h = height ? `h-${height}` : `h-6`
  return (
    <svg
      className={`${w} ${h} fill-sp-dark-fawn dark:fill-sp-fawn`}
      viewBox='0 0 21 22'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M13.7509 11.9972C14.7314 11.9972 15.5654 12.6248 15.8731 13.5002H13.8176C13.7956 13.4982 13.7734 13.4972 13.7509 13.4972L2.24912 13.4972C1.83553 13.4972 1.50024 13.8325 1.50024 14.2461L1.50024 14.8238C1.50024 15.3595 1.69135 15.8776 2.03921 16.2849C3.29252 17.7526 5.2584 18.4984 7.9967 18.4984C8.05287 18.4984 8.10871 18.4981 8.16423 18.4975C8.24986 18.6809 8.36747 18.8499 8.5135 18.9957L9.44804 19.9288C8.98384 19.9752 8.49998 19.9984 7.9967 19.9984C4.85084 19.9984 2.46483 19.0932 0.898524 17.259C0.318763 16.5801 0.000244141 15.7166 0.000244141 14.8238L0.000244141 14.2461C0.000244141 13.0041 1.0071 11.9972 2.24912 11.9972L13.7509 11.9972ZM7.9967 0.00195312C10.7581 0.00195312 12.9967 2.24053 12.9967 5.00195C12.9967 7.76338 10.7581 10.002 7.9967 10.002C5.23528 10.002 2.9967 7.76338 2.9967 5.00195C2.9967 2.24053 5.23528 0.00195312 7.9967 0.00195312ZM7.9967 1.50195C6.06371 1.50195 4.4967 3.06896 4.4967 5.00195C4.4967 6.93495 6.06371 8.50195 7.9967 8.50195C9.9297 8.50195 11.4967 6.93495 11.4967 5.00195C11.4967 3.06896 9.9297 1.50195 7.9967 1.50195ZM12.7804 15.7835C13.0733 15.4906 13.0732 15.0157 12.7802 14.7229C12.4873 14.4301 12.0124 14.4302 11.7196 14.7231L9.21955 17.2242C9.07893 17.3649 8.99996 17.5557 9 17.7546C9.00004 17.9535 9.0791 18.1442 9.21978 18.2849L11.7198 20.7838C12.0127 21.0766 12.4876 21.0765 12.7804 20.7835C13.0733 20.4906 13.0732 20.0157 12.7802 19.7229L11.5601 18.5033H18.4401L17.2198 19.7228C16.9269 20.0156 16.9267 20.4905 17.2195 20.7835C17.5123 21.0765 17.9872 21.0766 18.2802 20.7838L20.7802 18.2854C20.9209 18.1448 20.9999 17.9541 21 17.7552C21.0001 17.5563 20.9211 17.3655 20.7805 17.2248L18.2805 14.7232C17.9877 14.4302 17.5128 14.43 17.2198 14.7228C16.9269 15.0156 16.9267 15.4905 17.2195 15.7835L18.4386 17.0033H11.5612L12.7804 15.7835Z' />
    </svg>
  )
}

export function ImageIcon ({ width, height }) {
  const w = width ? `w-${width}` : `w-6`
  const h = height ? `h-${height}` : `h-6`

  return (
    <svg
      className={`${w} ${h} fill-sp-dark-fawn dark:fill-sp-fawn`}
      viewBox='0 0 21 21'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M17.75 3C19.5449 3 21 4.45507 21 6.25L21 17.75C21 19.5449 19.5449 21 17.75 21L6.25 21C4.45507 21 3 19.5449 3 17.75L3 11.5019C3.47425 11.6996 3.97687 11.8428 4.50009 11.9236L4.5 17.75C4.5 17.9584 4.53643 18.1583 4.60326 18.3437L10.4258 12.643C11.2589 11.8273 12.5675 11.7885 13.4458 12.5266L13.5742 12.6431L19.3964 18.3447C19.4634 18.159 19.5 17.9588 19.5 17.75L19.5 6.25C19.5 5.2835 18.7165 4.5 17.75 4.5L11.9236 4.50009C11.8428 3.97687 11.6996 3.47425 11.5019 3L17.75 3ZM11.5588 13.644L11.4752 13.7148L5.66845 19.4011C5.8504 19.4651 6.04613 19.5 6.25 19.5L17.75 19.5C17.9535 19.5 18.1489 19.4653 18.3305 19.4014L12.5247 13.7148C12.2596 13.4553 11.8501 13.4316 11.5588 13.644ZM15.2521 6.5C16.4959 6.5 17.5042 7.50831 17.5042 8.75212C17.5042 9.99592 16.4959 11.0042 15.2521 11.0042C14.0083 11.0042 13 9.99592 13 8.75212C13 7.50831 14.0083 6.5 15.2521 6.5ZM5.5 0C8.53757 0 11 2.46243 11 5.5C11 8.53757 8.53757 11 5.5 11C2.46243 11 0 8.53757 0 5.5C0 2.46243 2.46243 0 5.5 0ZM15.2521 8C14.8367 8 14.5 8.33673 14.5 8.75212C14.5 9.1675 14.8367 9.50423 15.2521 9.50423C15.6675 9.50423 16.0042 9.1675 16.0042 8.75212C16.0042 8.33673 15.6675 8 15.2521 8ZM5.5 1.99923L5.41012 2.00729C5.20603 2.04433 5.0451 2.20527 5.00806 2.40936L5 2.49923L4.99965 4.99923L2.49765 5L2.40777 5.00806C2.20368 5.0451 2.04275 5.20603 2.00571 5.41012L1.99765 5.5L2.00571 5.58988C2.04275 5.79397 2.20368 5.9549 2.40777 5.99194L2.49765 6L5.00065 5.99923L5.00111 8.50348L5.00916 8.59336C5.04621 8.79745 5.20714 8.95839 5.41123 8.99543L5.50111 9.00348L5.59098 8.99543C5.79508 8.95839 5.95601 8.79745 5.99305 8.59336L6.00111 8.50348L6.00065 5.99923L8.50457 6L8.59444 5.99194C8.79853 5.9549 8.95947 5.79397 8.99651 5.58988L9.00457 5.5L8.99651 5.41012C8.95947 5.20603 8.79853 5.0451 8.59444 5.00806L8.50457 5L5.99965 4.99923L6 2.49923L5.99194 2.40936C5.9549 2.20527 5.79397 2.04433 5.58988 2.00729L5.5 1.99923Z' />
    </svg>
  )
}

export function RoseIcon ({ width, height }) {
  const w = width ? `w-${width}` : `w-6`
  const h = height ? `h-${height}` : `h-6`

  return (
    <svg
      viewBox='0 0 17 22'
      className={`${w} ${h} fill-sp-white dark:fill-sp-black`}
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath='url(#clip0_4628_40040)'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M8.89077 0.650489L8.99107 0.695166C9.06929 0.729786 10.4516 1.36114 11.4938 2.85718C11.7942 3.28836 11.6166 3.8641 11.1749 4.14878C10.9832 4.27239 10.7906 4.40048 10.5972 4.5331C10.3957 4.67135 10.1926 4.81414 9.98946 4.96225C9.91578 5.01465 9.8428 5.06857 9.76912 5.12325C9.56028 5.27781 9.35627 5.43353 9.15725 5.59043C8.7727 5.89357 8.22733 5.89424 7.84289 5.59097C7.64335 5.43357 7.43909 5.27728 7.23067 5.12249C7.15778 5.06857 7.08566 5.01541 7.01269 4.96301C6.82297 4.82476 6.63396 4.69114 6.44494 4.56199C6.24974 4.42777 6.05519 4.29799 5.86138 4.17259C5.41134 3.88142 5.2406 3.29039 5.55852 2.85883C6.05122 2.18999 6.78365 1.44239 7.86513 0.771152L7.95583 0.714755C8.23753 0.539591 8.58775 0.515517 8.89077 0.650489ZM3.68586 16.3516C3.35567 14.3943 3.73448 12.3177 4.75315 10.5055C5.1303 9.83414 5.58569 9.17307 6.1177 8.52447C6.48176 8.08063 6.44405 7.41868 5.98646 7.07206C5.92532 7.02574 5.86372 6.97954 5.80165 6.93346C4.83334 6.21688 3.89552 5.62254 2.99061 5.1515C2.34273 4.81426 1.63767 5.4874 1.75117 6.20893C2.04209 8.07786 1.57959 9.79652 1.13263 11.4574L1.13245 11.4581C0.738763 12.9202 0.367861 14.3011 0.545834 15.6652C0.86271 18.0849 2.58463 20.2346 5 20.4352C5.26652 20.4579 5.41781 20.0849 5.25081 19.8759C5.09088 19.6758 4.94132 19.468 4.80256 19.2531C4.24499 18.3864 3.86305 17.4059 3.68586 16.3516ZM15.8676 11.4588C15.4199 9.79691 14.958 8.07804 15.2489 6.20962C15.3617 5.48707 14.657 4.81405 14.0083 5.15177C13.1035 5.62284 12.1658 6.21729 11.1977 6.93422C10.1523 7.70895 9.25123 8.50643 8.49995 9.32067C7.81218 10.0657 7.24991 10.8253 6.81856 11.594C5.4376 14.0534 5.49406 17.6931 8.32034 19.5927C8.37992 19.6322 8.43951 19.6709 8.49995 19.7081C8.56267 19.7468 8.62617 19.7833 8.68975 19.819C9.00576 19.9937 9.33595 20.1327 9.67632 20.2337C10.259 20.4061 10.873 20.4692 11.498 20.4175C13.9142 20.2163 16.1375 18.0842 16.4535 15.6643C16.6322 14.3018 16.2611 12.9218 15.8684 11.4615L15.8676 11.4588Z'
        />
      </g>
      <defs>
        <clipPath id='clip0_4628_40040'>
          <rect
            width='16'
            height='22'
            fill='white'
            transform='translate(0.5)'
          />
        </clipPath>
      </defs>
    </svg>
  )
}

export function StoryHookIcon ({ width, height }) {
  const w = width ? `w-${width}` : `w-6`
  const h = height ? `h-${height}` : `h-6`

  return (
    <svg
      className={`${w} ${h} fill-sp-day-900 dark:fill-sp-fawn`}
      viewBox='0 0 16 16'
      fill='none'
    >
      <path d='M8.375 1.0625C8.375 0.75184 8.12316 0.5 7.8125 0.5C7.50184 0.5 7.25 0.75184 7.25 1.0625V1.25H2.9375C1.59131 1.25 0.5 2.34131 0.5 3.6875V10.8125C0.5 12.1587 1.59131 13.25 2.9375 13.25H4.73635L3.62999 14.5774C3.4311 14.8161 3.46332 15.1708 3.70196 15.3697C3.9406 15.5686 4.2953 15.5364 4.49419 15.2977L6.20086 13.25H8.02189C8.00738 13.1261 8 13.001 8 12.875V12.5C8 12.3716 8.01291 12.2462 8.03751 12.125H2.9375C2.21263 12.125 1.625 11.5374 1.625 10.8125V3.6875C1.625 2.96263 2.21263 2.375 2.9375 2.375H13.0625C13.7874 2.375 14.375 2.96263 14.375 3.6875V6.46615C14.9504 6.98114 15.3125 7.72953 15.3125 8.5625C15.3125 8.62551 15.3104 8.68803 15.3063 8.75H15.5V3.6875C15.5 2.34131 14.4087 1.25 13.0625 1.25H8.375V1.0625ZM14.5541 8.75C14.5597 8.68824 14.5625 8.6257 14.5625 8.5625C14.5625 8.25539 14.4954 7.96395 14.375 7.70207C14.0489 6.99261 13.332 6.5 12.5 6.5C11.3609 6.5 10.4375 7.42341 10.4375 8.5625C10.4375 9.70159 11.3609 10.625 12.5 10.625C13.5759 10.625 14.4594 9.80122 14.5541 8.75ZM15.125 11.375C15.2288 11.375 15.3294 11.3891 15.4249 11.4154C15.9006 11.5466 16.25 11.9825 16.25 12.5V12.875C16.25 14.3536 14.8554 15.875 12.5 15.875C10.3438 15.875 8.99269 14.6 8.77964 13.25C8.75997 13.1253 8.75 13 8.75 12.875V12.5C8.75 12.3685 8.77256 12.2423 8.81401 12.125C8.96845 11.6881 9.38517 11.375 9.875 11.375H15.125ZM3.5 4.8125C3.5 4.50184 3.75184 4.25 4.0625 4.25H7.0625C7.37316 4.25 7.625 4.50184 7.625 4.8125C7.625 5.12316 7.37316 5.375 7.0625 5.375H4.0625C3.75184 5.375 3.5 5.12316 3.5 4.8125ZM4.0625 6.5C3.75184 6.5 3.5 6.75184 3.5 7.0625C3.5 7.37316 3.75184 7.625 4.0625 7.625H8.9375C9.24816 7.625 9.5 7.37316 9.5 7.0625C9.5 6.75184 9.24816 6.5 8.9375 6.5H4.0625ZM3.5 9.3125C3.5 9.00184 3.75184 8.75 4.0625 8.75H8.1875C8.49816 8.75 8.75 9.00184 8.75 9.3125C8.75 9.62316 8.49816 9.875 8.1875 9.875H4.0625C3.75184 9.875 3.5 9.62316 3.5 9.3125Z' />
    </svg>
  )
}

export function CrownIcon ({ width, height }) {
  const w = width ? `w-${width}` : `w-6`
  const h = height ? `h-${height}` : `h-6`

  return (
    <svg
      className={`${w} ${h} fill-sp-day-900 dark:fill-sp-fawn`}
      viewBox='0 0 12 11'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M1.39994 2.59992L3.49994 3.99992L5.59294 1.06992C5.63919 1.0051 5.70026 0.952272 5.77105 0.91582C5.84184 0.879369 5.92032 0.860352 5.99994 0.860352C6.07957 0.860352 6.15804 0.879369 6.22884 0.91582C6.29963 0.952272 6.36069 1.0051 6.40694 1.06992L8.49994 3.99992L10.5999 2.59992C10.6794 2.54704 10.7724 2.51802 10.8678 2.51629C10.9633 2.51455 11.0572 2.54018 11.1386 2.59013C11.2199 2.64008 11.2852 2.71228 11.3269 2.79819C11.3685 2.88409 11.3847 2.98012 11.3734 3.07492L10.5519 10.0584C10.5376 10.18 10.4791 10.2922 10.3876 10.3736C10.2961 10.4549 10.1779 10.4999 10.0554 10.4999H1.94444C1.82198 10.4999 1.70377 10.4549 1.61226 10.3736C1.52074 10.2922 1.46227 10.18 1.44794 10.0584L0.626443 3.07442C0.615343 2.97966 0.631585 2.8837 0.673253 2.79788C0.714921 2.71205 0.780274 2.63994 0.861598 2.59005C0.942922 2.54016 1.03682 2.51458 1.13221 2.51633C1.2276 2.51808 1.3205 2.54708 1.39994 2.59992ZM5.99994 7.49992C6.26516 7.49992 6.51951 7.39456 6.70705 7.20703C6.89459 7.01949 6.99994 6.76514 6.99994 6.49992C6.99994 6.2347 6.89459 5.98035 6.70705 5.79281C6.51951 5.60528 6.26516 5.49992 5.99994 5.49992C5.73473 5.49992 5.48037 5.60528 5.29284 5.79281C5.1053 5.98035 4.99994 6.2347 4.99994 6.49992C4.99994 6.76514 5.1053 7.01949 5.29284 7.20703C5.48037 7.39456 5.73473 7.49992 5.99994 7.49992Z'
        fill='#E3AA6D'
      />
    </svg>
  )
}
