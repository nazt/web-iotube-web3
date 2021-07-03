import { createIcon, Icon } from '@chakra-ui/react';
import React from 'react';
import { create } from 'domain';

export const SunnyIcon = createIcon({
  displayName: "SunnyIcon",
  viewBox: "0 0 24 24",
  path: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12.5" cy="12.5" r="5.5" stroke="#21CE99" strokeWidth="2"/>
      <path d="M12.5 2V3.5M12.5 21.5V23" stroke="#21CE99" strokeWidth="2"/>
      <path d="M2 12.5L3.5 12.5M21.5 12.5L23 12.5" stroke="#21CE99" strokeWidth="2"/>
      <path d="M5.0752 5.07544L6.13586 6.1361M18.8638 18.864L19.9244 19.9247" stroke="#21CE99" strokeWidth="2"/>
      <path d="M5.0752 19.9246L6.13586 18.8639M18.8638 6.13598L19.9244 5.07532" stroke="#21CE99" strokeWidth="2"/>
    </svg>
  ),
})

export const SunnyDarkIcon = createIcon({
  displayName: "SunnyDarkIcon",
  viewBox: "0 0 24 24",
  path: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.5">
        <circle cx="12.8457" cy="12.5" r="5.5" stroke="#C7CFD6" strokeWidth="2"/>
        <path d="M12.8457 2V3.5M12.8457 21.5V23" stroke="#C7CFD6" strokeWidth="2"/>
        <path d="M2.3457 12.5L3.8457 12.5M21.8457 12.5L23.3457 12.5" stroke="#C7CFD6" strokeWidth="2"/>
        <path d="M5.4209 5.07544L6.48156 6.1361M19.2095 18.864L20.2701 19.9247" stroke="#C7CFD6" strokeWidth="2"/>
        <path d="M5.4209 19.9246L6.48156 18.8639M19.2095 6.13598L20.2701 5.07532" stroke="#C7CFD6" strokeWidth="2"/>
      </g>
    </svg>
  ),
})

export const MoonLightIcon=createIcon({
  displayName: "MoonLightIcon",
  viewBox: "0 0 24 24",
  path: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="path-1-inside-1" fill="white">
        <path fillRule="evenodd" clipRule="evenodd" d="M22.1697 13.878C21.6568 13.9688 21.1289 14.0162 20.5899 14.0162C15.6194 14.0162 11.5899 9.98672 11.5899 5.01616C11.5899 3.95931 11.7721 2.945 12.1067 2.00293C6.69429 2.12985 2.3457 6.55716 2.3457 12.0001C2.3457 17.523 6.82285 22.0001 12.3457 22.0001C17.2267 22.0001 21.2909 18.5032 22.1697 13.878Z"/>
      </mask>
      <path d="M22.1697 13.878L24.1345 14.2513L24.6756 11.4032L21.821 11.9086L22.1697 13.878ZM12.1067 2.00293L13.9914 2.67238L14.9636 -0.0646141L12.0599 0.00347936L12.1067 2.00293ZM21.821 11.9086C21.4227 11.9791 21.0115 12.0162 20.5899 12.0162V16.0162C21.2463 16.0162 21.8909 15.9584 22.5184 15.8473L21.821 11.9086ZM20.5899 12.0162C16.7239 12.0162 13.5899 8.88215 13.5899 5.01616H9.58994C9.58994 11.0913 14.5148 16.0162 20.5899 16.0162V12.0162ZM13.5899 5.01616C13.5899 4.19058 13.732 3.40253 13.9914 2.67238L10.2221 1.33347C9.81219 2.48747 9.58994 3.72803 9.58994 5.01616H13.5899ZM4.3457 12.0001C4.3457 7.64602 7.82461 4.1039 12.1536 4.00238L12.0599 0.00347936C5.56396 0.155809 0.345703 5.46829 0.345703 12.0001H4.3457ZM12.3457 20.0001C7.92742 20.0001 4.3457 16.4184 4.3457 12.0001H0.345703C0.345703 18.6275 5.71829 24.0001 12.3457 24.0001V20.0001ZM20.2048 13.5047C19.502 17.2037 16.2483 20.0001 12.3457 20.0001V24.0001C18.2051 24.0001 23.0798 19.8026 24.1345 14.2513L20.2048 13.5047Z" fill="#C7CFD6" mask="url(#path-1-inside-1)"/>
    </svg>
  ),
})

export const MoonDarkIcon=createIcon({
  displayName: "MoonDarkIcon",
  viewBox: "0 0 24 24",
  path: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="path-1-inside-1" fill="white">
        <path fillRule="evenodd" clipRule="evenodd" d="M19.824 11.878C19.3111 11.9688 18.7832 12.0162 18.2442 12.0162C13.2737 12.0162 9.24423 7.98672 9.24423 3.01616C9.24423 1.95931 9.4264 0.945002 9.76104 0.00292969C4.34858 0.129853 0 4.55716 0 10.0001C0 15.523 4.47715 20.0001 10 20.0001C14.881 20.0001 18.9452 16.5032 19.824 11.878Z"/>
      </mask>
      <path d="M19.824 11.878L21.7888 12.2513L22.3299 9.40316L19.4753 9.90861L19.824 11.878ZM9.76104 0.00292969L11.6457 0.672385L12.6179 -2.06461L9.71415 -1.99652L9.76104 0.00292969ZM19.4753 9.90861C19.077 9.97913 18.6658 10.0162 18.2442 10.0162V14.0162C18.9006 14.0162 19.5452 13.9584 20.1727 13.8473L19.4753 9.90861ZM18.2442 10.0162C14.3782 10.0162 11.2442 6.88215 11.2442 3.01616H7.24423C7.24423 9.09129 12.1691 14.0162 18.2442 14.0162V10.0162ZM11.2442 3.01616C11.2442 2.19058 11.3863 1.40253 11.6457 0.672385L7.87641 -0.666525C7.46649 0.487474 7.24423 1.72803 7.24423 3.01616H11.2442ZM2 10.0001C2 5.64602 5.47891 2.1039 9.80792 2.00238L9.71415 -1.99652C3.21826 -1.84419 -2 3.46829 -2 10.0001H2ZM10 18.0001C5.58172 18.0001 2 14.4184 2 10.0001H-2C-2 16.6275 3.37258 22.0001 10 22.0001V18.0001ZM17.8591 11.5047C17.1563 15.2037 13.9026 18.0001 10 18.0001V22.0001C15.8594 22.0001 20.7341 17.8026 21.7888 12.2513L17.8591 11.5047Z" fill="#33FF99" mask="url(#path-1-inside-1)"/>
    </svg>
  ),
})

export const ToggleRightIcon=createIcon({
  displayName: "ToggleRightIcon",
  viewBox: "0 0 24 24",
  path: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.5534 4.22197C12.2458 3.94759 11.7918 4.19422 11.7918 4.63815V19.3649C11.7918 19.8058 12.2428 20.0524 12.5534 19.7811L20.823 12.4162C21.059 12.2035 21.059 11.7965 20.823 11.5869L12.5534 4.22197ZM6.44894 4H4V20H6.44894V4Z" fill="#999999"/>
    </svg>
  ),
})

export const ToggleLeftIcon=createIcon({
  displayName: "ToggleLeftIcon",
  viewBox: "0 0 24 24",
  path: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.4466 4.22197C12.7542 3.94759 13.2082 4.19422 13.2082 4.63815V19.3649C13.2082 19.8058 12.7572 20.0524 12.4466 19.7811L4.17695 12.4162C3.94102 12.2035 3.94102 11.7965 4.17695 11.5869L12.4466 4.22197ZM18.5511 4H21V20H18.5511V4Z" fill="#999999"/>
    </svg>
  ),
})

export const HomeIcon=(props)=>(
  <Icon viewBox="0 0 24 24" width="6" height="6">
    <svg  viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
      <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="2"/>
    </svg>
  </Icon>
)

export const SwapIcon=(props)=>(
  <Icon viewBox="0 0 24 24" width="6" height="6">
    <svg  viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M3 9H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15 5L19 9L15 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M19 18H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 22L3 18L7 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </Icon>
)

export const FaqIcon=(props)=>(
  <Icon viewBox="0 0 24 24" width="6" height="6">
    <svg  viewBox="0 0 24 24" fill="none" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="currentColor"/>
      <path d="M10.6961 13.7673V11.4363C11.4993 11.4058 12.0991 11.2738 12.4956 11.0402C12.9023 10.7964 13.1057 10.3901 13.1057 9.82133V9.60803C13.1057 9.22207 12.9887 8.92752 12.7549 8.72438C12.5312 8.52124 12.2364 8.41967 11.8704 8.41967C11.4739 8.41967 11.1434 8.54155 10.8791 8.78532C10.6249 9.02909 10.4521 9.33887 10.3606 9.71468L8.5 8.93767C8.5915 8.63296 8.72367 8.33841 8.89651 8.05402C9.06935 7.75946 9.29303 7.50046 9.56754 7.27701C9.85221 7.0434 10.1877 6.85549 10.5741 6.7133C10.9706 6.5711 11.4281 6.5 11.9466 6.5C12.4753 6.5 12.9582 6.57618 13.3954 6.72853C13.8326 6.88089 14.2088 7.09418 14.524 7.36842C14.8391 7.64266 15.0781 7.97276 15.2407 8.35873C15.4136 8.74469 15.5 9.17128 15.5 9.6385C15.5 10.0651 15.4288 10.4511 15.2865 10.7964C15.1442 11.1417 14.951 11.4464 14.707 11.7105C14.463 11.9644 14.1783 12.1727 13.8529 12.3352C13.5276 12.4977 13.187 12.6094 12.8312 12.6704V13.7673H10.6961ZM11.7941 17.5C11.3061 17.5 10.9553 17.3883 10.7418 17.1648C10.5385 16.9414 10.4368 16.6671 10.4368 16.3421V15.9765C10.4368 15.6514 10.5385 15.3772 10.7418 15.1537C10.9553 14.9303 11.3061 14.8186 11.7941 14.8186C12.2821 14.8186 12.6278 14.9303 12.8312 15.1537C13.0447 15.3772 13.1514 15.6514 13.1514 15.9765V16.3421C13.1514 16.6671 13.0447 16.9414 12.8312 17.1648C12.6278 17.3883 12.2821 17.5 11.7941 17.5Z" fill="currentColor"/>
    </svg>
  </Icon>
)

export const TransactionsIcon=(props)=>(
  <Icon viewBox="0 0 24 24" width="6" height="6">
    <svg  viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M18 8L6 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 5L8 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="5" y="11" width="14" height="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </Icon>
)

export const IotubeIcon=(props)=>(
  <Icon viewBox="0 0 135 36" {...props}>
    <svg  viewBox="0 0 135 36" fill="none" >
      <path d="M8 18.506C7.99881 16.0335 8.73092 13.6161 10.1037 11.5597C11.4765 9.50334 13.4283 7.90025 15.7123 6.95323C17.9963 6.00622 20.5098 5.75782 22.935 6.23946C25.3601 6.7211 27.588 7.91113 29.3367 9.65905C31.0855 11.407 32.2766 13.6342 32.7594 16.0592C33.2422 18.4841 32.995 20.9977 32.0491 23.2822C31.1031 25.5666 29.501 27.5192 27.4453 28.893C25.3895 30.2667 22.9725 31 20.5 31C17.187 30.9963 14.0106 29.679 11.6674 27.3369C9.32415 24.9948 8.00529 21.819 8 18.506ZM8.992 18.506C8.99319 20.7799 9.66846 23.0024 10.9325 24.8926C12.1965 26.7828 13.9925 28.2559 16.0935 29.1256C18.1944 29.9953 20.5061 30.2226 22.7363 29.7789C24.9664 29.3351 27.015 28.2402 28.623 26.6324C30.231 25.0247 31.3263 22.9763 31.7705 20.7462C32.2146 18.5161 31.9877 16.2044 31.1183 14.1033C30.249 12.0022 28.7762 10.2059 26.8863 8.94158C24.9963 7.67724 22.7739 7.00159 20.5 7.00001C17.4484 7.00054 14.5219 8.21288 12.3639 10.3705C10.2059 12.5281 8.99306 15.4544 8.992 18.506ZM10.992 18.506C10.9908 16.6272 11.5468 14.7902 12.5896 13.2273C13.6324 11.6644 15.1152 10.4458 16.8505 9.72564C18.5858 9.00546 20.4957 8.816 22.3387 9.18123C24.1817 9.54647 25.875 10.45 27.2046 11.7775C28.5341 13.1051 29.4401 14.7971 29.808 16.6395C30.176 18.482 29.9894 20.3922 29.2717 22.1286C28.5541 23.865 27.3377 25.3496 25.7764 26.3947C24.215 27.4398 22.3788 27.9984 20.5 28C17.9821 27.9982 15.5677 26.9975 13.7867 25.2176C12.0056 23.4377 11.0034 21.024 11 18.506H10.992ZM11.992 18.506C11.992 20.1871 12.4905 21.8305 13.4245 23.2284C14.3585 24.6262 15.686 25.7156 17.2392 26.359C18.7924 27.0023 20.5014 27.1707 22.1503 26.8427C23.7991 26.5147 25.3137 25.7052 26.5024 24.5164C27.6912 23.3277 28.5007 21.8131 28.8287 20.1643C29.1567 18.5154 28.9883 16.8064 28.345 15.2532C27.7016 13.7 26.6122 12.3725 25.2143 11.4385C23.8165 10.5045 22.1731 10.006 20.492 10.006C18.2396 10.01 16.0807 10.907 14.4888 12.5005C12.8969 14.0939 12.0019 16.2536 12 18.506H11.992Z" fill="currentColor"/>
      <path d="M5 6H4V32H5V6Z" fill="currentColor"/>
      <path d="M3 6H2V32H3V6Z" fill="currentColor"/>
      <path d="M7 6H6V32H7V6Z" fill="currentColor"/>
      <path d="M7.91107 32H6.49805L32.4911 6H33.9061L7.91107 32Z" fill="currentColor"/>
      <path d="M20.5 25C19.2144 25 17.9577 24.6188 16.8888 23.9045C15.8199 23.1903 14.9868 22.1752 14.4948 20.9874C14.0029 19.7997 13.8741 18.4928 14.1249 17.2319C14.3757 15.9711 14.9948 14.8129 15.9038 13.9038C16.8129 12.9948 17.9711 12.3757 19.2319 12.1249C20.4928 11.8741 21.7997 12.0029 22.9874 12.4948C24.1752 12.9868 25.1903 13.8199 25.9045 14.8888C26.6188 15.9577 27 17.2144 27 18.5C26.9979 20.2233 26.3124 21.8754 25.0939 23.0939C23.8754 24.3124 22.2233 24.9979 20.5 25ZM20.5 13C19.4122 13 18.3489 13.3226 17.4444 13.9269C16.5399 14.5313 15.8349 15.3903 15.4186 16.3953C15.0024 17.4003 14.8935 18.5061 15.1057 19.573C15.3179 20.6399 15.8417 21.6199 16.6109 22.3891C17.3801 23.1583 18.3601 23.6821 19.427 23.8944C20.4939 24.1066 21.5998 23.9977 22.6047 23.5814C23.6097 23.1651 24.4687 22.4601 25.0731 21.5557C25.6774 20.6512 26 19.5878 26 18.5C25.9987 17.0416 25.4188 15.6433 24.3877 14.612C23.3566 13.5807 21.9584 13.0006 20.5 12.999V13Z" fill="currentColorr"/>
      <path d="M20.5 21.999C19.8078 21.999 19.131 21.7937 18.5555 21.4091C17.9799 21.0245 17.5313 20.4779 17.2664 19.8384C17.0015 19.1988 16.9322 18.4951 17.0673 17.8162C17.2023 17.1372 17.5357 16.5136 18.0251 16.0241C18.5146 15.5346 19.1383 15.2013 19.8172 15.0663C20.4961 14.9312 21.1999 15.0005 21.8394 15.2654C22.479 15.5303 23.0256 15.9789 23.4102 16.5545C23.7947 17.1301 24 17.8068 24 18.499C24 19.4273 23.6312 20.3175 22.9748 20.9739C22.3185 21.6302 21.4283 21.999 20.5 21.999Z" fill="currentColor"/>
      <path d="M123.375 4H109.625C109.28 4 109 4.44772 109 5V13C109 13.5523 109.28 14 109.625 14H123.375C123.72 14 124 13.5523 124 13V5C124 4.44772 123.72 4 123.375 4Z" fill="#313132"/>
      <path d="M113 12L110.993 5.7H111.803L113.45 11.019L115.097 5.7H115.916L113.9 12H113ZM118.846 12.108C118.414 12.108 118.042 12.027 117.73 11.865C117.418 11.703 117.172 11.484 116.992 11.208C116.812 10.932 116.704 10.617 116.668 10.263H117.442C117.496 10.605 117.649 10.884 117.901 11.1C118.153 11.31 118.471 11.415 118.855 11.415C119.305 11.415 119.659 11.271 119.917 10.983C120.175 10.689 120.304 10.32 120.304 9.876C120.304 9.408 120.172 9.042 119.908 8.778C119.644 8.508 119.302 8.373 118.882 8.373C118.546 8.373 118.258 8.451 118.018 8.607C117.784 8.757 117.595 8.949 117.451 9.183H116.731L117.271 5.7H120.637V6.393H117.865L117.532 8.265H117.577C117.715 8.115 117.901 7.983 118.135 7.869C118.375 7.755 118.651 7.698 118.963 7.698C119.377 7.698 119.737 7.788 120.043 7.968C120.355 8.142 120.598 8.394 120.772 8.724C120.946 9.048 121.033 9.429 121.033 9.867C121.033 10.275 120.946 10.65 120.772 10.992C120.604 11.328 120.355 11.598 120.025 11.802C119.701 12.006 119.308 12.108 118.846 12.108Z" fill="#BAC0CC"/>
      <path d="M47.7118 28C46.3491 28 45.2665 27.6733 44.4638 27.02C43.6611 26.348 43.2598 25.1627 43.2598 23.464V16.632H39.7598V14.112H41.8318C42.7838 14.112 43.3438 13.6453 43.5118 12.712L43.9318 10.472H46.2278V14.112H51.7158V16.632H46.2278V23.408C46.2278 24.136 46.3865 24.6493 46.7038 24.948C47.0398 25.228 47.6091 25.368 48.4118 25.368H51.6598V28H47.7118ZM61.7569 28.336C60.0769 28.336 58.7982 27.8227 57.9209 26.796C57.0622 25.7507 56.6329 24.2387 56.6329 22.26V14.112H59.6009V21.896C59.6009 23.0347 59.8435 23.9307 60.3289 24.584C60.8329 25.2187 61.5982 25.536 62.6249 25.536C63.6515 25.536 64.5102 25.1907 65.2009 24.5C65.8915 23.8093 66.2369 22.8107 66.2369 21.504V14.112H69.2049V28H66.6289L66.3769 25.928H66.2369C65.8635 26.6 65.2849 27.1693 64.5009 27.636C63.7169 28.1027 62.8022 28.336 61.7569 28.336ZM80.5339 28.336C79.5073 28.336 78.6393 28.1307 77.9299 27.72C77.2393 27.2907 76.7073 26.7027 76.3339 25.956H76.1659L75.9139 28H73.3659V7.84H76.3339V15.904C76.6699 15.344 77.2019 14.8493 77.9299 14.42C78.6579 13.9907 79.5259 13.776 80.5339 13.776C81.6913 13.776 82.7273 14.056 83.6419 14.616C84.5566 15.1573 85.2753 15.9693 85.7979 17.052C86.3393 18.1347 86.6099 19.4693 86.6099 21.056C86.6099 22.6427 86.3393 23.9773 85.7979 25.06C85.2753 26.1427 84.5566 26.964 83.6419 27.524C82.7273 28.0653 81.6913 28.336 80.5339 28.336ZM79.9179 25.508C80.9819 25.508 81.8593 25.144 82.5499 24.416C83.2593 23.6693 83.6139 22.5587 83.6139 21.084C83.6139 19.5907 83.2593 18.4707 82.5499 17.724C81.8593 16.9773 80.9819 16.604 79.9179 16.604C78.8539 16.604 77.9673 16.9773 77.2579 17.724C76.5673 18.452 76.2219 19.5627 76.2219 21.056C76.2219 22.5307 76.5673 23.6413 77.2579 24.388C77.9673 25.1347 78.8539 25.508 79.9179 25.508ZM96.735 28.336C95.391 28.336 94.2057 28.0373 93.179 27.44C92.1523 26.824 91.3497 25.9747 90.771 24.892C90.1923 23.8093 89.903 22.5493 89.903 21.112C89.903 19.656 90.183 18.3773 90.743 17.276C91.3217 16.1747 92.1243 15.316 93.151 14.7C94.1963 14.084 95.4003 13.776 96.763 13.776C98.107 13.776 99.2643 14.084 100.235 14.7C101.206 15.2973 101.952 16.1 102.475 17.108C103.016 18.116 103.287 19.2267 103.287 20.44C103.287 20.6267 103.287 20.832 103.287 21.056C103.287 21.2613 103.278 21.4947 103.259 21.756H92.815C92.9083 23.044 93.3283 24.024 94.075 24.696C94.8217 25.3493 95.699 25.676 96.707 25.676C97.5843 25.676 98.275 25.4987 98.779 25.144C99.3017 24.7707 99.6843 24.2667 99.927 23.632H102.923C102.587 24.9573 101.887 26.0773 100.823 26.992C99.759 27.888 98.3963 28.336 96.735 28.336ZM96.735 16.352C95.8203 16.352 95.0083 16.632 94.299 17.192C93.5897 17.7333 93.1323 18.4987 92.927 19.488H100.319C100.244 18.5547 99.8803 17.7987 99.227 17.22C98.5737 16.6413 97.743 16.352 96.735 16.352Z" fill="currentColor"/>
    </svg>
  </Icon>

)

export const ArrowDownIcon = (props) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M12 16L18 10H6L12 16Z" fill="currentColor"/>
    </svg>
  </Icon>
)

export const IoTeXIcon = (props) => (
  <Icon viewBox="0 0 21 20" {...props}>
    <svg viewBox="0 0 21 20" fill="none">
      <path d="M11.0317 3.34961V6.37262L13.6654 4.86336L11.0317 3.34961Z" fill="currentColor"/>
      <path opacity="0.9" d="M13.665 4.86353V7.88654L16.2987 6.37301L13.665 4.86353Z" fill="currentColor"/>
      <path opacity="0.8" d="M11.0317 6.37207V9.39486L13.6654 7.8856L11.0317 6.37207Z" fill="currentColor"/>
      <path opacity="0.8" d="M13.665 7.88623V10.909L16.2987 9.39549L13.665 7.88623Z" fill="currentColor"/>
      <path opacity="0.8" d="M11.0317 9.39478V12.4176L13.6654 10.9083L11.0317 9.39478Z" fill="currentColor"/>
      <path d="M13.665 10.9087V13.9315L16.2987 12.418L13.665 10.9087Z" fill="currentColor"/>
      <path opacity="0.4" d="M4.22412 6.271V9.29378L6.85775 7.78026L4.22412 6.271Z" fill="currentColor"/>
      <path opacity="0.2" d="M7.54736 7.39404V10.4168L10.1765 8.90757L7.54736 7.39404Z" fill="currentColor"/>
      <path opacity="0.3" d="M5.59473 9.30737V12.3302L8.22836 10.8166L5.59473 9.30737Z" fill="currentColor"/>
      <path opacity="0.9" d="M7.33105 11.5876V14.6104L9.96018 13.0969L7.33105 11.5876Z" fill="currentColor"/>
      <path opacity="0.7" d="M11.0107 12.8889V15.9113L13.6399 14.3977L11.0107 12.8889Z" fill="currentColor"/>
      <path opacity="0.9" d="M7.98584 5.90234V8.92513L10.615 7.41587L7.98584 5.90234Z" fill="currentColor"/>
      <path opacity="0.8" d="M11.0316 3.34961V6.37262L8.39795 4.86336L11.0316 3.34961Z" fill="currentColor"/>
      <path opacity="0.6" d="M7.98568 4.63379V7.6559L5.35205 6.14305L7.98568 4.63379Z" fill="currentColor"/>
      <path opacity="0.6" d="M10.6185 6.13062V9.1534L7.98486 7.63987L10.6185 6.13062Z" fill="currentColor"/>
      <path opacity="0.95" d="M7.535 7.39404V10.4168L4.90137 8.90757L7.535 7.39404Z" fill="currentColor"/>
      <path opacity="0.6" d="M11.0315 9.39478V12.4176L8.40234 10.9083L11.0315 9.39478Z" fill="currentColor"/>
      <path opacity="0.55" d="M5.59483 10.0996V13.1224L2.96143 11.6086L5.59483 10.0996Z" fill="currentColor"/>
      <path d="M16.2987 6.37207V9.39486L13.665 7.8856L16.2987 6.37207Z" fill="currentColor"/>
      <path opacity="0.95" d="M13.6654 7.88623V10.909L11.0317 9.39549L13.6654 7.88623Z" fill="currentColor"/>
      <path opacity="0.9" d="M16.2987 9.39478V12.4176L13.665 10.9083L16.2987 9.39478Z" fill="currentColor"/>
      <path opacity="0.7" d="M13.6654 10.9087V13.9315L11.0317 12.418L13.6654 10.9087Z" fill="currentColor"/>
      <path opacity="0.4" d="M10.4486 12.1672V15.19L7.81494 13.6808L10.4486 12.1672Z" fill="currentColor"/>
      <path d="M13.6654 4.86353V7.88654L11.0317 6.37301L13.6654 4.86353Z" fill="currentColor"/>
    </svg>
  </Icon>
)

export const BSCIcon = (props) => (
  <Icon viewBox="0 0 20 20" {...props}>
    <svg viewBox="0 0 20 20" fill="none">
      <path d="M8.44717 10.0408L10.0492 8.43878L11.6511 10.0408L10.0492 11.6428L8.44717 10.0408ZM13.5448 10.0408L15.1467 8.43881L16.7487 10.0408L15.1467 11.6428L13.5448 10.0408ZM3.34961 10.0407L4.95159 8.43876L6.55358 10.0407L4.95159 11.6427L3.34961 10.0407ZM5.87894 7.51171L10.0406 3.3501L11.6425 4.95208L7.48093 9.11369L5.87894 7.51171Z" fill="currentColor"/>
      <path d="M12.6176 9.11342L8.45598 4.95184L10.058 3.34985L14.2196 7.51146L12.6176 9.11342ZM7.48089 10.9889L11.6425 15.1505L10.0405 16.7525L5.87891 12.5909L7.48089 10.9889Z" fill="currentColor"/>
      <path d="M14.2201 12.591L10.0585 16.7526L8.45654 15.1506L12.6182 10.989L14.2201 12.591Z" fill="currentColor"/>
    </svg>
  </Icon>
)

export const ETHIcon = (props) => (
  <Icon viewBox="0 0 20 20" {...props}>
    <svg viewBox="0 0 20 20" fill="none">
      <path opacity="0.9" d="M9.74463 1.68896V7.66578L14.682 9.87461L9.74463 1.68896Z" fill="currentColor"/>
      <path d="M9.74499 1.68896V7.66578L4.80762 9.87461L9.74499 1.68896Z" fill="currentColor"/>
      <path opacity="0.7" d="M9.74476 7.66602L4.80739 9.87484L9.74476 12.8632L14.6821 9.87484L9.74476 7.66602Z" fill="currentColor"/>
      <path opacity="0.6" d="M9.74463 7.66577L4.80726 9.8746L9.74463 12.863V7.66577Z" fill="currentColor"/>
      <path d="M4.80762 10.6543L9.74499 17.9304V13.6427L4.80762 10.6543Z" fill="currentColor"/>
      <path opacity="0.8" d="M14.682 10.6543L9.74463 17.9304V13.6427L14.682 10.6543Z" fill="currentColor"/>
    </svg>
  </Icon>
)

export const PolygonIcon = (props) => (
  <Icon viewBox="0 0 48 48" {...props}>
    <svg viewBox="0 0 20 20" fill="none">
      <g opacity="0.8">
        <path d="M13.0698 7.48846C12.8359 7.35416 12.5353 7.35416 12.2681 7.48846L10.3974 8.59642L9.12799 9.30149L7.29071 10.4095C7.05688 10.5438 6.75623 10.5438 6.48899 10.4095L5.05257 9.53651C4.81874 9.40222 4.65171 9.13362 4.65171 8.83145V7.15272C4.65171 6.88412 4.78533 6.61552 5.05257 6.44765L6.48899 5.60828C6.72283 5.47398 7.02347 5.47398 7.29071 5.60828L8.72713 6.48122C8.96096 6.61552 9.12799 6.88412 9.12799 7.18629V8.29425L10.3974 7.55561V6.41407C10.3974 6.14548 10.2638 5.87688 9.99652 5.70901L7.32412 4.131C7.09028 3.9967 6.78963 3.9967 6.52239 4.131L3.78318 5.74258C3.51594 5.87688 3.38232 6.14548 3.38232 6.41407V9.57009C3.38232 9.83869 3.51594 10.1073 3.78318 10.2752L6.48899 11.8532C6.72283 11.9875 7.02347 11.9875 7.29071 11.8532L9.12799 10.7788L10.3974 10.0401L12.2347 8.96575C12.4685 8.83145 12.7691 8.83145 13.0364 8.96575L14.4728 9.80511C14.7066 9.93941 14.8736 10.208 14.8736 10.5102V12.1889C14.8736 12.4575 14.74 12.7261 14.4728 12.894L13.0698 13.7333C12.8359 13.8676 12.5353 13.8676 12.2681 13.7333L10.8316 12.894C10.5978 12.7597 10.4308 12.4911 10.4308 12.1889V11.1145L9.16139 11.8532V12.9611C9.16139 13.2297 9.29501 13.4983 9.56225 13.6662L12.2681 15.2442C12.5019 15.3785 12.8025 15.3785 13.0698 15.2442L15.7756 13.6662C16.0094 13.5319 16.1764 13.2633 16.1764 12.9611V9.77154C16.1764 9.50294 16.0428 9.23434 15.7756 9.06647L13.0698 7.48846Z" fill="currentColor"/>
      </g>
    </svg>
  </Icon>
)

