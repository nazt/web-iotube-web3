import { createIcon, Icon } from '@chakra-ui/react';
import React from 'react';
import { create } from 'domain';

export const SunnyIcon = createIcon({
  displayName: 'SunnyIcon',
  viewBox: '0 0 24 24',
  path: (
    <svg stroke='#21CE99' fill='#21CE99' strokeWidth='0' viewBox='0 0 512 512' aria-hidden='true'
         focusable='false' height='1em' width='1em' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M256 160c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96zm246.4 80.5l-94.7-47.3 33.5-100.4c4.5-13.6-8.4-26.5-21.9-21.9l-100.4 33.5-47.4-94.8c-6.4-12.8-24.6-12.8-31 0l-47.3 94.7L92.7 70.8c-13.6-4.5-26.5 8.4-21.9 21.9l33.5 100.4-94.7 47.4c-12.8 6.4-12.8 24.6 0 31l94.7 47.3-33.5 100.5c-4.5 13.6 8.4 26.5 21.9 21.9l100.4-33.5 47.3 94.7c6.4 12.8 24.6 12.8 31 0l47.3-94.7 100.4 33.5c13.6 4.5 26.5-8.4 21.9-21.9l-33.5-100.4 94.7-47.3c13-6.5 13-24.7.2-31.1zm-155.9 106c-49.9 49.9-131.1 49.9-181 0-49.9-49.9-49.9-131.1 0-181 49.9-49.9 131.1-49.9 181 0 49.9 49.9 49.9 131.1 0 181z' />
    </svg>
  )
});

export const SunnyDarkIcon = createIcon({
  displayName: 'SunnyDarkIcon',
  viewBox: '0 0 24 24',
  path: (
    <svg stroke='#C7CFD6' fill='#C7CFD6' strokeWidth='0' viewBox='0 0 512 512' aria-hidden='true'
         focusable='false' height='1em' width='1em' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M256 160c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96zm246.4 80.5l-94.7-47.3 33.5-100.4c4.5-13.6-8.4-26.5-21.9-21.9l-100.4 33.5-47.4-94.8c-6.4-12.8-24.6-12.8-31 0l-47.3 94.7L92.7 70.8c-13.6-4.5-26.5 8.4-21.9 21.9l33.5 100.4-94.7 47.4c-12.8 6.4-12.8 24.6 0 31l94.7 47.3-33.5 100.5c-4.5 13.6 8.4 26.5 21.9 21.9l100.4-33.5 47.3 94.7c6.4 12.8 24.6 12.8 31 0l47.3-94.7 100.4 33.5c13.6 4.5 26.5-8.4 21.9-21.9l-33.5-100.4 94.7-47.3c13-6.5 13-24.7.2-31.1zm-155.9 106c-49.9 49.9-131.1 49.9-181 0-49.9-49.9-49.9-131.1 0-181 49.9-49.9 131.1-49.9 181 0 49.9 49.9 49.9 131.1 0 181z' />
    </svg>
  )
});

export const MoonLightIcon = createIcon({
  displayName: 'MoonLightIcon',
  viewBox: '0 0 24 24',
  path: (
    <svg stroke='#C7CFD6' fill='#C7CFD6' strokeWidth='0' viewBox='0 0 512 512' aria-hidden='true'
         focusable='false' height='1em' width='1em' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M283.211 512c78.962 0 151.079-35.925 198.857-94.792 7.068-8.708-.639-21.43-11.562-19.35-124.203 23.654-238.262-71.576-238.262-196.954 0-72.222 38.662-138.635 101.498-174.394 9.686-5.512 7.25-20.197-3.756-22.23A258.156 258.156 0 0 0 283.211 0c-141.309 0-256 114.511-256 256 0 141.309 114.511 256 256 256z' />
    </svg>
  )
});

export const MoonDarkIcon = createIcon({
  displayName: 'MoonDarkIcon',
  viewBox: '0 0 24 24',
  path: (
    <svg stroke='#33FF99' fill='#33FF99' strokeWidth='0' viewBox='0 0 512 512' aria-hidden='true'
         focusable='false' height='1em' width='1em' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M283.211 512c78.962 0 151.079-35.925 198.857-94.792 7.068-8.708-.639-21.43-11.562-19.35-124.203 23.654-238.262-71.576-238.262-196.954 0-72.222 38.662-138.635 101.498-174.394 9.686-5.512 7.25-20.197-3.756-22.23A258.156 258.156 0 0 0 283.211 0c-141.309 0-256 114.511-256 256 0 141.309 114.511 256 256 256z' />
    </svg>
  )
});

export const ToggleRightIcon = createIcon({
  displayName: 'ToggleRightIcon',
  viewBox: '0 0 24 24',
  path: (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M12.5534 4.22197C12.2458 3.94759 11.7918 4.19422 11.7918 4.63815V19.3649C11.7918 19.8058 12.2428 20.0524 12.5534 19.7811L20.823 12.4162C21.059 12.2035 21.059 11.7965 20.823 11.5869L12.5534 4.22197ZM6.44894 4H4V20H6.44894V4Z'
        fill='#999999' />
    </svg>
  )
});

export const ToggleLeftIcon = createIcon({
  displayName: 'ToggleLeftIcon',
  viewBox: '0 0 24 24',
  path: (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M12.4466 4.22197C12.7542 3.94759 13.2082 4.19422 13.2082 4.63815V19.3649C13.2082 19.8058 12.7572 20.0524 12.4466 19.7811L4.17695 12.4162C3.94102 12.2035 3.94102 11.7965 4.17695 11.5869L12.4466 4.22197ZM18.5511 4H21V20H18.5511V4Z'
        fill='#999999' />
    </svg>
  )
});

export const HomeIcon = (props) => (
  <Icon viewBox='0 0 24 24' width='6' height='6'>
    <svg viewBox='0 0 24 24' fill='none' {...props}>
      <circle cx='12' cy='12' r='9' stroke='currentColor' strokeWidth='2' />
      <circle cx='12' cy='12' r='2' stroke='currentColor' strokeWidth='2' />
    </svg>
  </Icon>
);

export const SwapIcon = (props) => (
  <Icon viewBox='0 0 24 24' width='6' height='6'>
    <svg viewBox='0 0 24 24' fill='none' {...props}>
      <path d='M3 9H19' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M15 5L19 9L15 13' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M19 18H3' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M7 22L3 18L7 14' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  </Icon>
);

export const FaqIcon = (props) => (
  <Icon viewBox='0 0 24 24' width='6' height='6'>
    <svg viewBox='0 0 24 24' fill='none' {...props}>
      <path fillRule='evenodd' clipRule='evenodd'
            d='M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z'
            fill='currentColor' />
      <path
        d='M10.6961 13.7673V11.4363C11.4993 11.4058 12.0991 11.2738 12.4956 11.0402C12.9023 10.7964 13.1057 10.3901 13.1057 9.82133V9.60803C13.1057 9.22207 12.9887 8.92752 12.7549 8.72438C12.5312 8.52124 12.2364 8.41967 11.8704 8.41967C11.4739 8.41967 11.1434 8.54155 10.8791 8.78532C10.6249 9.02909 10.4521 9.33887 10.3606 9.71468L8.5 8.93767C8.5915 8.63296 8.72367 8.33841 8.89651 8.05402C9.06935 7.75946 9.29303 7.50046 9.56754 7.27701C9.85221 7.0434 10.1877 6.85549 10.5741 6.7133C10.9706 6.5711 11.4281 6.5 11.9466 6.5C12.4753 6.5 12.9582 6.57618 13.3954 6.72853C13.8326 6.88089 14.2088 7.09418 14.524 7.36842C14.8391 7.64266 15.0781 7.97276 15.2407 8.35873C15.4136 8.74469 15.5 9.17128 15.5 9.6385C15.5 10.0651 15.4288 10.4511 15.2865 10.7964C15.1442 11.1417 14.951 11.4464 14.707 11.7105C14.463 11.9644 14.1783 12.1727 13.8529 12.3352C13.5276 12.4977 13.187 12.6094 12.8312 12.6704V13.7673H10.6961ZM11.7941 17.5C11.3061 17.5 10.9553 17.3883 10.7418 17.1648C10.5385 16.9414 10.4368 16.6671 10.4368 16.3421V15.9765C10.4368 15.6514 10.5385 15.3772 10.7418 15.1537C10.9553 14.9303 11.3061 14.8186 11.7941 14.8186C12.2821 14.8186 12.6278 14.9303 12.8312 15.1537C13.0447 15.3772 13.1514 15.6514 13.1514 15.9765V16.3421C13.1514 16.6671 13.0447 16.9414 12.8312 17.1648C12.6278 17.3883 12.2821 17.5 11.7941 17.5Z'
        fill='currentColor' />
    </svg>
  </Icon>
);

export const TransactionsIcon = (props) => (
  <Icon viewBox='0 0 24 24' width='6' height='6'>
    <svg viewBox='0 0 24 24' fill='none' {...props}>
      <path d='M18 8L6 8' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M16 5L8 5' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
      <rect x='5' y='11' width='14' height='8' stroke='currentColor' strokeWidth='2' strokeLinecap='round'
            strokeLinejoin='round' />
    </svg>
  </Icon>
);

export const IotubeIcon = (props) => (
  <Icon viewBox='0 0 135 36' {...props}>
    <svg viewBox='0 0 135 36' fill='none'>
      <path
        d='M8 18.506C7.99881 16.0335 8.73092 13.6161 10.1037 11.5597C11.4765 9.50334 13.4283 7.90025 15.7123 6.95323C17.9963 6.00622 20.5098 5.75782 22.935 6.23946C25.3601 6.7211 27.588 7.91113 29.3367 9.65905C31.0855 11.407 32.2766 13.6342 32.7594 16.0592C33.2422 18.4841 32.995 20.9977 32.0491 23.2822C31.1031 25.5666 29.501 27.5192 27.4453 28.893C25.3895 30.2667 22.9725 31 20.5 31C17.187 30.9963 14.0106 29.679 11.6674 27.3369C9.32415 24.9948 8.00529 21.819 8 18.506ZM8.992 18.506C8.99319 20.7799 9.66846 23.0024 10.9325 24.8926C12.1965 26.7828 13.9925 28.2559 16.0935 29.1256C18.1944 29.9953 20.5061 30.2226 22.7363 29.7789C24.9664 29.3351 27.015 28.2402 28.623 26.6324C30.231 25.0247 31.3263 22.9763 31.7705 20.7462C32.2146 18.5161 31.9877 16.2044 31.1183 14.1033C30.249 12.0022 28.7762 10.2059 26.8863 8.94158C24.9963 7.67724 22.7739 7.00159 20.5 7.00001C17.4484 7.00054 14.5219 8.21288 12.3639 10.3705C10.2059 12.5281 8.99306 15.4544 8.992 18.506ZM10.992 18.506C10.9908 16.6272 11.5468 14.7902 12.5896 13.2273C13.6324 11.6644 15.1152 10.4458 16.8505 9.72564C18.5858 9.00546 20.4957 8.816 22.3387 9.18123C24.1817 9.54647 25.875 10.45 27.2046 11.7775C28.5341 13.1051 29.4401 14.7971 29.808 16.6395C30.176 18.482 29.9894 20.3922 29.2717 22.1286C28.5541 23.865 27.3377 25.3496 25.7764 26.3947C24.215 27.4398 22.3788 27.9984 20.5 28C17.9821 27.9982 15.5677 26.9975 13.7867 25.2176C12.0056 23.4377 11.0034 21.024 11 18.506H10.992ZM11.992 18.506C11.992 20.1871 12.4905 21.8305 13.4245 23.2284C14.3585 24.6262 15.686 25.7156 17.2392 26.359C18.7924 27.0023 20.5014 27.1707 22.1503 26.8427C23.7991 26.5147 25.3137 25.7052 26.5024 24.5164C27.6912 23.3277 28.5007 21.8131 28.8287 20.1643C29.1567 18.5154 28.9883 16.8064 28.345 15.2532C27.7016 13.7 26.6122 12.3725 25.2143 11.4385C23.8165 10.5045 22.1731 10.006 20.492 10.006C18.2396 10.01 16.0807 10.907 14.4888 12.5005C12.8969 14.0939 12.0019 16.2536 12 18.506H11.992Z'
        fill='currentColor' />
      <path d='M5 6H4V32H5V6Z' fill='currentColor' />
      <path d='M3 6H2V32H3V6Z' fill='currentColor' />
      <path d='M7 6H6V32H7V6Z' fill='currentColor' />
      <path d='M7.91107 32H6.49805L32.4911 6H33.9061L7.91107 32Z' fill='currentColor' />
      <path
        d='M20.5 25C19.2144 25 17.9577 24.6188 16.8888 23.9045C15.8199 23.1903 14.9868 22.1752 14.4948 20.9874C14.0029 19.7997 13.8741 18.4928 14.1249 17.2319C14.3757 15.9711 14.9948 14.8129 15.9038 13.9038C16.8129 12.9948 17.9711 12.3757 19.2319 12.1249C20.4928 11.8741 21.7997 12.0029 22.9874 12.4948C24.1752 12.9868 25.1903 13.8199 25.9045 14.8888C26.6188 15.9577 27 17.2144 27 18.5C26.9979 20.2233 26.3124 21.8754 25.0939 23.0939C23.8754 24.3124 22.2233 24.9979 20.5 25ZM20.5 13C19.4122 13 18.3489 13.3226 17.4444 13.9269C16.5399 14.5313 15.8349 15.3903 15.4186 16.3953C15.0024 17.4003 14.8935 18.5061 15.1057 19.573C15.3179 20.6399 15.8417 21.6199 16.6109 22.3891C17.3801 23.1583 18.3601 23.6821 19.427 23.8944C20.4939 24.1066 21.5998 23.9977 22.6047 23.5814C23.6097 23.1651 24.4687 22.4601 25.0731 21.5557C25.6774 20.6512 26 19.5878 26 18.5C25.9987 17.0416 25.4188 15.6433 24.3877 14.612C23.3566 13.5807 21.9584 13.0006 20.5 12.999V13Z'
        fill='currentColorr' />
      <path
        d='M20.5 21.999C19.8078 21.999 19.131 21.7937 18.5555 21.4091C17.9799 21.0245 17.5313 20.4779 17.2664 19.8384C17.0015 19.1988 16.9322 18.4951 17.0673 17.8162C17.2023 17.1372 17.5357 16.5136 18.0251 16.0241C18.5146 15.5346 19.1383 15.2013 19.8172 15.0663C20.4961 14.9312 21.1999 15.0005 21.8394 15.2654C22.479 15.5303 23.0256 15.9789 23.4102 16.5545C23.7947 17.1301 24 17.8068 24 18.499C24 19.4273 23.6312 20.3175 22.9748 20.9739C22.3185 21.6302 21.4283 21.999 20.5 21.999Z'
        fill='currentColor' />
      <path
        d='M123.375 4H109.625C109.28 4 109 4.44772 109 5V13C109 13.5523 109.28 14 109.625 14H123.375C123.72 14 124 13.5523 124 13V5C124 4.44772 123.72 4 123.375 4Z'
        fill='#313132' />
      <path
        d='M113 12L110.993 5.7H111.803L113.45 11.019L115.097 5.7H115.916L113.9 12H113ZM118.846 12.108C118.414 12.108 118.042 12.027 117.73 11.865C117.418 11.703 117.172 11.484 116.992 11.208C116.812 10.932 116.704 10.617 116.668 10.263H117.442C117.496 10.605 117.649 10.884 117.901 11.1C118.153 11.31 118.471 11.415 118.855 11.415C119.305 11.415 119.659 11.271 119.917 10.983C120.175 10.689 120.304 10.32 120.304 9.876C120.304 9.408 120.172 9.042 119.908 8.778C119.644 8.508 119.302 8.373 118.882 8.373C118.546 8.373 118.258 8.451 118.018 8.607C117.784 8.757 117.595 8.949 117.451 9.183H116.731L117.271 5.7H120.637V6.393H117.865L117.532 8.265H117.577C117.715 8.115 117.901 7.983 118.135 7.869C118.375 7.755 118.651 7.698 118.963 7.698C119.377 7.698 119.737 7.788 120.043 7.968C120.355 8.142 120.598 8.394 120.772 8.724C120.946 9.048 121.033 9.429 121.033 9.867C121.033 10.275 120.946 10.65 120.772 10.992C120.604 11.328 120.355 11.598 120.025 11.802C119.701 12.006 119.308 12.108 118.846 12.108Z'
        fill='#BAC0CC' />
      <path
        d='M47.7118 28C46.3491 28 45.2665 27.6733 44.4638 27.02C43.6611 26.348 43.2598 25.1627 43.2598 23.464V16.632H39.7598V14.112H41.8318C42.7838 14.112 43.3438 13.6453 43.5118 12.712L43.9318 10.472H46.2278V14.112H51.7158V16.632H46.2278V23.408C46.2278 24.136 46.3865 24.6493 46.7038 24.948C47.0398 25.228 47.6091 25.368 48.4118 25.368H51.6598V28H47.7118ZM61.7569 28.336C60.0769 28.336 58.7982 27.8227 57.9209 26.796C57.0622 25.7507 56.6329 24.2387 56.6329 22.26V14.112H59.6009V21.896C59.6009 23.0347 59.8435 23.9307 60.3289 24.584C60.8329 25.2187 61.5982 25.536 62.6249 25.536C63.6515 25.536 64.5102 25.1907 65.2009 24.5C65.8915 23.8093 66.2369 22.8107 66.2369 21.504V14.112H69.2049V28H66.6289L66.3769 25.928H66.2369C65.8635 26.6 65.2849 27.1693 64.5009 27.636C63.7169 28.1027 62.8022 28.336 61.7569 28.336ZM80.5339 28.336C79.5073 28.336 78.6393 28.1307 77.9299 27.72C77.2393 27.2907 76.7073 26.7027 76.3339 25.956H76.1659L75.9139 28H73.3659V7.84H76.3339V15.904C76.6699 15.344 77.2019 14.8493 77.9299 14.42C78.6579 13.9907 79.5259 13.776 80.5339 13.776C81.6913 13.776 82.7273 14.056 83.6419 14.616C84.5566 15.1573 85.2753 15.9693 85.7979 17.052C86.3393 18.1347 86.6099 19.4693 86.6099 21.056C86.6099 22.6427 86.3393 23.9773 85.7979 25.06C85.2753 26.1427 84.5566 26.964 83.6419 27.524C82.7273 28.0653 81.6913 28.336 80.5339 28.336ZM79.9179 25.508C80.9819 25.508 81.8593 25.144 82.5499 24.416C83.2593 23.6693 83.6139 22.5587 83.6139 21.084C83.6139 19.5907 83.2593 18.4707 82.5499 17.724C81.8593 16.9773 80.9819 16.604 79.9179 16.604C78.8539 16.604 77.9673 16.9773 77.2579 17.724C76.5673 18.452 76.2219 19.5627 76.2219 21.056C76.2219 22.5307 76.5673 23.6413 77.2579 24.388C77.9673 25.1347 78.8539 25.508 79.9179 25.508ZM96.735 28.336C95.391 28.336 94.2057 28.0373 93.179 27.44C92.1523 26.824 91.3497 25.9747 90.771 24.892C90.1923 23.8093 89.903 22.5493 89.903 21.112C89.903 19.656 90.183 18.3773 90.743 17.276C91.3217 16.1747 92.1243 15.316 93.151 14.7C94.1963 14.084 95.4003 13.776 96.763 13.776C98.107 13.776 99.2643 14.084 100.235 14.7C101.206 15.2973 101.952 16.1 102.475 17.108C103.016 18.116 103.287 19.2267 103.287 20.44C103.287 20.6267 103.287 20.832 103.287 21.056C103.287 21.2613 103.278 21.4947 103.259 21.756H92.815C92.9083 23.044 93.3283 24.024 94.075 24.696C94.8217 25.3493 95.699 25.676 96.707 25.676C97.5843 25.676 98.275 25.4987 98.779 25.144C99.3017 24.7707 99.6843 24.2667 99.927 23.632H102.923C102.587 24.9573 101.887 26.0773 100.823 26.992C99.759 27.888 98.3963 28.336 96.735 28.336ZM96.735 16.352C95.8203 16.352 95.0083 16.632 94.299 17.192C93.5897 17.7333 93.1323 18.4987 92.927 19.488H100.319C100.244 18.5547 99.8803 17.7987 99.227 17.22C98.5737 16.6413 97.743 16.352 96.735 16.352Z'
        fill='currentColor' />
    </svg>
  </Icon>

);

export const IotubeMobileIcon = (props) => (
  <Icon viewBox='0 0 50 50' {...props}>
    <svg viewBox='0 0 50 50' fill='none'>
      <path d='M13.353 11.2354H12.2938V38.7641H13.353V11.2354Z' fill='currentColor' />
      <path fill-rule='evenodd' clip-rule='evenodd'
            d='M10.1762 11.2354H11.2354V38.7641H10.1762V11.2354ZM18.0307 33.5533C17.7094 33.2132 17.4052 32.8552 17.1196 32.4805C15.361 30.1849 14.4117 27.3718 14.4199 24.48C14.4199 20.9697 15.8143 17.6033 18.2964 15.1212C20.7786 12.6391 24.145 11.2446 27.6552 11.2446C31.0342 11.2446 34.2799 12.5367 36.7319 14.8473L40.3429 11.2354H41.8412L37.4732 15.6041C39.6675 18.031 40.8905 21.1924 40.8905 24.48C40.8979 27.3441 39.9652 30.1315 38.2356 32.4144H36.8766C38.3743 30.6764 39.3507 28.5507 39.6934 26.2821C40.0361 24.0135 39.7312 21.6942 38.8136 19.5913C38.2939 18.4 37.5895 17.3056 36.7317 16.3457L35.2242 17.8536C35.9177 18.6483 36.4867 19.5524 36.9047 20.5363C37.7723 22.579 37.9404 24.8512 37.3827 26.9993C36.825 29.1473 35.5728 31.0508 33.8211 32.4134H31.9C33.6903 31.4532 35.1031 29.9155 35.9086 28.0504C36.714 26.1854 36.8648 24.1026 36.3362 22.141C35.9833 20.8309 35.3412 19.6263 34.467 18.6109L32.9701 20.1081C33.1115 20.2807 33.2449 20.4605 33.3696 20.6471C34.1258 21.7789 34.5295 23.1096 34.5295 24.4708C34.5273 26.2955 33.8015 28.0448 32.5113 29.3351C31.221 30.6253 29.4717 31.3511 27.647 31.3532C26.2858 31.3532 24.9552 30.9496 23.8233 30.1933C23.6371 30.0689 23.4576 29.9358 23.2853 29.7947L21.7762 31.3041C22.4243 31.8618 23.153 32.3281 23.9431 32.6848V33.8284H23.9421C22.8692 33.4041 21.8849 32.8016 21.0271 32.0533L19.537 33.5437C20.807 34.6764 22.305 35.5398 23.9411 36.0696V37.1786L23.9421 37.1827C22.0194 36.6145 20.2602 35.6231 18.7875 34.2933L14.3175 38.7641H12.8213L18.0307 33.5533ZM33.7299 17.8501L32.2375 19.3429C31.6623 18.828 31.0016 18.4108 30.2808 18.1122C29.0232 17.5913 27.6394 17.455 26.3043 17.7206C24.9692 17.9861 23.7429 18.6416 22.7804 19.6042C21.8179 20.5667 21.1624 21.793 20.8968 23.1281C20.6312 24.4632 20.7675 25.847 21.2885 27.1046C21.5872 27.8259 22.0049 28.4871 22.5203 29.0626L21.0157 30.5675C20.4776 29.9812 20.0161 29.3222 19.6465 28.6051C18.7159 26.7993 18.4236 24.7316 18.8172 22.7385C19.2109 20.7454 20.2673 18.9442 21.8146 17.6277C23.362 16.3113 25.3092 15.5571 27.3396 15.4878C29.37 15.4186 31.3641 16.0383 32.9976 17.2463C33.2531 17.4353 33.4974 17.6369 33.7299 17.8501ZM21.9356 25.6069C22.1356 26.6124 22.597 27.545 23.2704 28.3122L24.7731 26.8091C24.5474 26.5319 24.3618 26.2219 24.2235 25.8879C23.943 25.2108 23.8696 24.4656 24.0126 23.7467C24.1556 23.0278 24.5086 22.3674 25.0269 21.8491C25.5452 21.3309 26.2055 20.9779 26.9244 20.8349C27.6433 20.6919 28.3885 20.7653 29.0657 21.0458C29.3993 21.184 29.709 21.3694 29.9861 21.5948L31.4873 20.0932C30.4284 19.1642 29.0643 18.6475 27.647 18.6475C26.4953 18.6475 25.3694 18.989 24.4118 19.6289C23.4541 20.2688 22.7077 21.1783 22.267 22.2423C21.8262 23.3064 21.7109 24.4773 21.9356 25.6069ZM25.5527 27.5269C25.5645 27.535 25.5765 27.5431 25.5885 27.5511C26.1979 27.9584 26.9144 28.1757 27.6474 28.1757C28.6303 28.1757 29.573 27.7853 30.268 27.0902C30.963 26.3952 31.3534 25.4526 31.3534 24.4697C31.3534 23.7367 31.1361 23.0202 30.7289 22.4107C30.7207 22.3985 30.7125 22.3864 30.7043 22.3743L32.2169 20.8614C33.0247 21.8841 33.4703 23.1545 33.4703 24.4708C33.4703 25.6225 33.1288 26.7484 32.4889 27.706C31.849 28.6637 30.9395 29.4101 29.8755 29.8508C28.8114 30.2916 27.6405 30.4069 26.5109 30.1822C25.6051 30.002 24.7584 29.6097 24.0385 29.0413L25.5527 27.5269ZM18.778 32.8058L20.2671 31.3163C19.7911 30.8034 19.3671 30.2394 19.004 29.6315C17.8657 27.7264 17.3893 25.4983 17.6487 23.2942C17.9081 21.0902 18.8889 19.0336 20.4383 17.4448C21.9878 15.8559 24.019 14.8239 26.2159 14.5092C28.4128 14.1946 30.6521 14.615 32.5853 15.705C33.2755 16.0942 33.9128 16.561 34.4865 17.0932L35.9922 15.5872C35.5309 15.1536 35.0347 14.7549 34.5072 14.3956C32.6111 13.1038 30.3887 12.3738 28.0959 12.2895C25.8031 12.2053 23.5331 12.7704 21.5473 13.9196C19.5616 15.0688 17.9407 16.7555 16.8714 18.7854C15.8021 20.8154 15.3278 23.106 15.5032 25.3937C15.6786 27.6813 16.4964 29.8729 17.8627 31.7161C18.1476 32.0981 18.4533 32.4618 18.778 32.8058ZM27.2478 37.705C26.9819 37.72 26.7192 37.64 26.5068 37.4793C26.4055 37.3734 26.3289 37.2464 26.2823 37.1074C26.2358 36.9685 26.2204 36.8209 26.2375 36.6753V35.1252H25.4436V34.554H25.9142C26.0061 34.5628 26.0978 34.5347 26.169 34.4761C26.2403 34.4174 26.2854 34.3328 26.2944 34.2409L26.3899 33.7327H26.9103V34.5591H28.1555V35.1303H26.9103V36.6682C26.9035 36.7305 26.9098 36.7936 26.9289 36.8533C26.948 36.913 26.9794 36.968 27.0211 37.0148C27.1334 37.0926 27.2693 37.1286 27.4054 37.1165H28.1464V37.7131L27.2478 37.705ZM30.4364 37.7812C30.2746 37.7922 30.1124 37.7661 29.9622 37.705C29.812 37.6439 29.6776 37.5493 29.5694 37.4285C29.3533 37.1321 29.2486 36.7689 29.2736 36.4029V34.554H29.9475V36.3196C29.9343 36.536 29.9937 36.7506 30.1163 36.9294C30.1786 37.0049 30.2581 37.0642 30.3482 37.1024C30.4382 37.1406 30.5361 37.1566 30.6336 37.149C30.7419 37.1518 30.8496 37.1324 30.9502 37.0921C31.0507 37.0517 31.1419 36.9911 31.2181 36.9142C31.3016 36.8227 31.3658 36.7154 31.4068 36.5985C31.4479 36.4817 31.4649 36.3577 31.457 36.2342V34.557H32.1309V37.708H31.5424L31.4854 37.2384H31.458C31.3637 37.4003 31.2279 37.534 31.0646 37.6257C30.8738 37.7341 30.6568 37.7879 30.4375 37.7812H30.4364ZM34.6995 37.7812C34.4942 37.7881 34.291 37.7385 34.112 37.6379C33.9543 37.5436 33.8276 37.4056 33.7471 37.2405H33.7094L33.6525 37.704H33.0742V33.1299H33.7471V34.9595C33.8365 34.8194 33.9595 34.7038 34.1049 34.6231C34.2848 34.5218 34.4889 34.4712 34.6954 34.4767C34.9433 34.4726 35.1875 34.5373 35.4008 34.6638C35.6157 34.797 35.7867 34.9903 35.8928 35.2198C36.0124 35.5078 36.0739 35.8166 36.0739 36.1285C36.0739 36.4403 36.0124 36.7491 35.8928 37.0372C35.7866 37.2666 35.6156 37.4599 35.4008 37.5932C35.1888 37.7191 34.9461 37.7842 34.6995 37.7812ZM34.5597 37.1399C34.6722 37.1432 34.7842 37.1226 34.8881 37.0794C34.9922 37.0361 35.086 36.9711 35.163 36.8888C35.3364 36.6778 35.4216 36.4079 35.4008 36.1356C35.4214 35.8611 35.3363 35.5891 35.163 35.3753C35.0848 35.2953 34.9914 35.2318 34.8883 35.1885C34.7853 35.1451 34.6746 35.1228 34.5628 35.1228C34.4509 35.1228 34.3403 35.1451 34.2372 35.1885C34.1341 35.2318 34.0408 35.2953 33.9626 35.3753C33.8071 35.5974 33.7237 35.8619 33.7237 36.133C33.7237 36.4042 33.8071 36.6687 33.9626 36.8908C34.0389 36.9723 34.1316 37.0366 34.2346 37.0796C34.3375 37.1224 34.4483 37.143 34.5597 37.1399ZM38.377 37.7812C38.0938 37.7855 37.8147 37.7124 37.57 37.5698C37.3375 37.4329 37.148 37.2336 37.0231 36.9945C36.8871 36.7294 36.8193 36.4345 36.8259 36.1366C36.8195 35.8352 36.8861 35.5366 37.0201 35.2665C37.1427 35.0234 37.3325 34.8205 37.5669 34.6821C37.8137 34.5389 38.0948 34.4658 38.3801 34.4706C38.6574 34.4646 38.9308 34.5379 39.1678 34.6821C39.3833 34.8167 39.5588 35.0066 39.6761 35.2319C39.7978 35.4653 39.86 35.7251 39.857 35.9882V36.1244C39.857 36.1732 39.855 36.2271 39.8509 36.286H37.4917C37.493 36.4101 37.5189 36.5326 37.568 36.6465C37.617 36.7605 37.6882 36.8635 37.7773 36.9498C37.9395 37.0968 38.1511 37.1773 38.3699 37.1754C38.5369 37.1844 38.7024 37.1411 38.8436 37.0514C38.9615 36.9667 39.0512 36.8484 39.1008 36.7119H39.7808C39.7067 37.0093 39.5397 37.2753 39.304 37.4712C39.0436 37.6843 38.7142 37.7945 38.3781 37.7812H38.377ZM38.377 35.0622C38.1768 35.0595 37.9816 35.1255 37.8241 35.2492C37.6585 35.3813 37.5477 35.5699 37.513 35.7788H39.1861C39.1809 35.6809 39.1562 35.5851 39.1137 35.4968C39.0711 35.4085 39.0114 35.3295 38.9381 35.2645C38.7831 35.1288 38.5829 35.0563 38.377 35.0612V35.0622ZM9.11836 11.2357H8.0592V38.7645H9.11836V11.2357Z'
            fill='currentColor' />
    </svg>
  </Icon>

);

export const ArrowDownIcon = (props) => (
  <Icon viewBox='0 0 24 24' {...props}>
    <svg viewBox='0 0 24 24' fill='none'>
      <path d='M12 16L18 10H6L12 16Z' fill='currentColor' />
    </svg>
  </Icon>
);

export const IoTeXIcon = (props) => (
  <Icon viewBox='0 0 21 20' {...props}>
    <svg viewBox='0 0 21 20' fill='none'>
      <path d='M11.0317 3.34961V6.37262L13.6654 4.86336L11.0317 3.34961Z' fill='currentColor' />
      <path opacity='0.9' d='M13.665 4.86353V7.88654L16.2987 6.37301L13.665 4.86353Z' fill='currentColor' />
      <path opacity='0.8' d='M11.0317 6.37207V9.39486L13.6654 7.8856L11.0317 6.37207Z' fill='currentColor' />
      <path opacity='0.8' d='M13.665 7.88623V10.909L16.2987 9.39549L13.665 7.88623Z' fill='currentColor' />
      <path opacity='0.8' d='M11.0317 9.39478V12.4176L13.6654 10.9083L11.0317 9.39478Z' fill='currentColor' />
      <path d='M13.665 10.9087V13.9315L16.2987 12.418L13.665 10.9087Z' fill='currentColor' />
      <path opacity='0.4' d='M4.22412 6.271V9.29378L6.85775 7.78026L4.22412 6.271Z' fill='currentColor' />
      <path opacity='0.2' d='M7.54736 7.39404V10.4168L10.1765 8.90757L7.54736 7.39404Z' fill='currentColor' />
      <path opacity='0.3' d='M5.59473 9.30737V12.3302L8.22836 10.8166L5.59473 9.30737Z' fill='currentColor' />
      <path opacity='0.9' d='M7.33105 11.5876V14.6104L9.96018 13.0969L7.33105 11.5876Z' fill='currentColor' />
      <path opacity='0.7' d='M11.0107 12.8889V15.9113L13.6399 14.3977L11.0107 12.8889Z' fill='currentColor' />
      <path opacity='0.9' d='M7.98584 5.90234V8.92513L10.615 7.41587L7.98584 5.90234Z' fill='currentColor' />
      <path opacity='0.8' d='M11.0316 3.34961V6.37262L8.39795 4.86336L11.0316 3.34961Z' fill='currentColor' />
      <path opacity='0.6' d='M7.98568 4.63379V7.6559L5.35205 6.14305L7.98568 4.63379Z' fill='currentColor' />
      <path opacity='0.6' d='M10.6185 6.13062V9.1534L7.98486 7.63987L10.6185 6.13062Z' fill='currentColor' />
      <path opacity='0.95' d='M7.535 7.39404V10.4168L4.90137 8.90757L7.535 7.39404Z' fill='currentColor' />
      <path opacity='0.6' d='M11.0315 9.39478V12.4176L8.40234 10.9083L11.0315 9.39478Z' fill='currentColor' />
      <path opacity='0.55' d='M5.59483 10.0996V13.1224L2.96143 11.6086L5.59483 10.0996Z' fill='currentColor' />
      <path d='M16.2987 6.37207V9.39486L13.665 7.8856L16.2987 6.37207Z' fill='currentColor' />
      <path opacity='0.95' d='M13.6654 7.88623V10.909L11.0317 9.39549L13.6654 7.88623Z' fill='currentColor' />
      <path opacity='0.9' d='M16.2987 9.39478V12.4176L13.665 10.9083L16.2987 9.39478Z' fill='currentColor' />
      <path opacity='0.7' d='M13.6654 10.9087V13.9315L11.0317 12.418L13.6654 10.9087Z' fill='currentColor' />
      <path opacity='0.4' d='M10.4486 12.1672V15.19L7.81494 13.6808L10.4486 12.1672Z' fill='currentColor' />
      <path d='M13.6654 4.86353V7.88654L11.0317 6.37301L13.6654 4.86353Z' fill='currentColor' />
    </svg>
  </Icon>
);

export const BSCIcon = (props) => (
  <Icon viewBox='0 0 20 20' {...props}>
    <svg viewBox='0 0 20 20' fill='none'>
      <path
        d='M8.44717 10.0408L10.0492 8.43878L11.6511 10.0408L10.0492 11.6428L8.44717 10.0408ZM13.5448 10.0408L15.1467 8.43881L16.7487 10.0408L15.1467 11.6428L13.5448 10.0408ZM3.34961 10.0407L4.95159 8.43876L6.55358 10.0407L4.95159 11.6427L3.34961 10.0407ZM5.87894 7.51171L10.0406 3.3501L11.6425 4.95208L7.48093 9.11369L5.87894 7.51171Z'
        fill='currentColor' />
      <path
        d='M12.6176 9.11342L8.45598 4.95184L10.058 3.34985L14.2196 7.51146L12.6176 9.11342ZM7.48089 10.9889L11.6425 15.1505L10.0405 16.7525L5.87891 12.5909L7.48089 10.9889Z'
        fill='currentColor' />
      <path d='M14.2201 12.591L10.0585 16.7526L8.45654 15.1506L12.6182 10.989L14.2201 12.591Z' fill='currentColor' />
    </svg>
  </Icon>
);

export const ETHIcon = (props) => (
  <Icon viewBox='0 0 20 20' {...props}>
    <svg viewBox='0 0 20 20' fill='none'>
      <path opacity='0.9' d='M9.74463 1.68896V7.66578L14.682 9.87461L9.74463 1.68896Z' fill='currentColor' />
      <path d='M9.74499 1.68896V7.66578L4.80762 9.87461L9.74499 1.68896Z' fill='currentColor' />
      <path opacity='0.7' d='M9.74476 7.66602L4.80739 9.87484L9.74476 12.8632L14.6821 9.87484L9.74476 7.66602Z'
            fill='currentColor' />
      <path opacity='0.6' d='M9.74463 7.66577L4.80726 9.8746L9.74463 12.863V7.66577Z' fill='currentColor' />
      <path d='M4.80762 10.6543L9.74499 17.9304V13.6427L4.80762 10.6543Z' fill='currentColor' />
      <path opacity='0.8' d='M14.682 10.6543L9.74463 17.9304V13.6427L14.682 10.6543Z' fill='currentColor' />
    </svg>
  </Icon>
);

export const PolygonIcon = (props) => (
  <Icon viewBox='0 0 48 48' {...props}>
    <svg viewBox='0 0 20 20' fill='none'>
      <g opacity='0.8'>
        <path
          d='M13.0698 7.48846C12.8359 7.35416 12.5353 7.35416 12.2681 7.48846L10.3974 8.59642L9.12799 9.30149L7.29071 10.4095C7.05688 10.5438 6.75623 10.5438 6.48899 10.4095L5.05257 9.53651C4.81874 9.40222 4.65171 9.13362 4.65171 8.83145V7.15272C4.65171 6.88412 4.78533 6.61552 5.05257 6.44765L6.48899 5.60828C6.72283 5.47398 7.02347 5.47398 7.29071 5.60828L8.72713 6.48122C8.96096 6.61552 9.12799 6.88412 9.12799 7.18629V8.29425L10.3974 7.55561V6.41407C10.3974 6.14548 10.2638 5.87688 9.99652 5.70901L7.32412 4.131C7.09028 3.9967 6.78963 3.9967 6.52239 4.131L3.78318 5.74258C3.51594 5.87688 3.38232 6.14548 3.38232 6.41407V9.57009C3.38232 9.83869 3.51594 10.1073 3.78318 10.2752L6.48899 11.8532C6.72283 11.9875 7.02347 11.9875 7.29071 11.8532L9.12799 10.7788L10.3974 10.0401L12.2347 8.96575C12.4685 8.83145 12.7691 8.83145 13.0364 8.96575L14.4728 9.80511C14.7066 9.93941 14.8736 10.208 14.8736 10.5102V12.1889C14.8736 12.4575 14.74 12.7261 14.4728 12.894L13.0698 13.7333C12.8359 13.8676 12.5353 13.8676 12.2681 13.7333L10.8316 12.894C10.5978 12.7597 10.4308 12.4911 10.4308 12.1889V11.1145L9.16139 11.8532V12.9611C9.16139 13.2297 9.29501 13.4983 9.56225 13.6662L12.2681 15.2442C12.5019 15.3785 12.8025 15.3785 13.0698 15.2442L15.7756 13.6662C16.0094 13.5319 16.1764 13.2633 16.1764 12.9611V9.77154C16.1764 9.50294 16.0428 9.23434 15.7756 9.06647L13.0698 7.48846Z'
          fill='currentColor' />
      </g>
    </svg>
  </Icon>
);

export const IotubeIconV4 = (props) => (
  <Icon viewBox='0 0 48 48' {...props}>
    <svg viewBox='0 0 25 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M3.3457 4L3.3457 20' stroke='currentColor' strokeWidth='2' />
      <circle cx='13.3457' cy='12' r='7' stroke='currentColor' strokeWidth='2' />
      <path d='M20.8457 4.5L5.8457 19.5' stroke='currentColor' strokeWidth='2' />
    </svg>
  </Icon>
);

export const DiscordIcon = (props) => (
  <Icon viewBox='0 0 48 48' {...props}>
    <svg viewBox='0 0 148 148' focusable='false' aria-hidden='true'>
      <path fill='currentColor'
            d='M107.75 125.001s-4.5-5.375-8.25-10.125c16.375-4.625 22.625-14.875 22.625-14.875-5.125 3.375-10 5.75-14.375 7.375-6.25 2.625-12.25 4.375-18.125 5.375-12 2.25-23 1.625-32.375-.125-7.125-1.375-13.25-3.375-18.375-5.375-2.875-1.125-6-2.5-9.125-4.25-.375-.25-.75-.375-1.125-.625-.25-.125-.375-.25-.5-.375-2.25-1.25-3.5-2.125-3.5-2.125s6 10 21.875 14.75c-3.75 4.75-8.375 10.375-8.375 10.375-27.625-.875-38.125-19-38.125-19 0-40.25 18-72.875 18-72.875 18-13.5 35.125-13.125 35.125-13.125l1.25 1.5c-22.5 6.5-32.875 16.375-32.875 16.375s2.75-1.5 7.375-3.625c13.375-5.875 24-7.5 28.375-7.875.75-.125 1.375-.25 2.125-.25 7.625-1 16.25-1.25 25.25-.25 11.875 1.375 24.625 4.875 37.625 12 0 0-9.875-9.375-31.125-15.875l1.75-2S110 19.626 128 33.126c0 0 18 32.625 18 72.875 0 0-10.625 18.125-38.25 19zM49.625 66.626c-7.125 0-12.75 6.25-12.75 13.875s5.75 13.875 12.75 13.875c7.125 0 12.75-6.25 12.75-13.875.125-7.625-5.625-13.875-12.75-13.875zm45.625 0c-7.125 0-12.75 6.25-12.75 13.875s5.75 13.875 12.75 13.875c7.125 0 12.75-6.25 12.75-13.875s-5.625-13.875-12.75-13.875z'
            fillRule='nonzero' />
    </svg>
  </Icon>
);

export const AssetIcon = (props) => (
  <Icon viewBox='0 0 48 48' {...props}>
    <svg viewBox='0 0 25 24' fill='none' aria-hidden='true'>
      <path
        d='M18.7463 10C19.7506 10.7312 20.3457 11.6401 20.3457 12.625C20.3457 15.0412 16.764 17 12.3457 17C7.92742 17 4.3457 15.0412 4.3457 12.625C4.3457 11.8281 4.73528 11.081 5.41596 10.4375C5.57657 10.2857 5.75339 10.1396 5.94512 10'
        stroke='currentColor' strokeWidth='2' />
      <path
        d='M18.7463 14C19.7506 14.7312 20.3457 15.6401 20.3457 16.625C20.3457 19.0412 16.764 21 12.3457 21C7.92742 21 4.3457 19.0412 4.3457 16.625C4.3457 15.8281 4.73528 15.081 5.41596 14.4375C5.57657 14.2857 5.75339 14.1396 5.94512 14'
        stroke='currentColor' strokeWidth='2' />
      <path
        d='M20.3457 8.5C20.3457 9.53859 19.6528 10.6408 18.1882 11.5358C16.7408 12.4203 14.6776 13 12.3457 13C10.0138 13 7.95061 12.4203 6.50319 11.5358C5.03861 10.6408 4.3457 9.53859 4.3457 8.5C4.3457 7.46141 5.03861 6.35921 6.50319 5.46419C7.95061 4.57966 10.0138 4 12.3457 4C14.6776 4 16.7408 4.57966 18.1882 5.46419C19.6528 6.35921 20.3457 7.46141 20.3457 8.5Z'
        stroke='currentColor' strokeWidth='2' />
    </svg>
  </Icon>
);
