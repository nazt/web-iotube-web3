import {  createIcon } from '@chakra-ui/react';
import React from 'react';

export const SunnyIcon = createIcon({
  displayName: "SunnyIcon",
  viewBox: "0 0 24 24",
  path: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12.5" cy="12.5" r="5.5" stroke="#33FF99" strokeWidth="2"/>
      <path d="M12.5 2V3.5M12.5 21.5V23" stroke="#33FF99" strokeWidth="2"/>
      <path d="M2 12.5L3.5 12.5M21.5 12.5L23 12.5" stroke="#33FF99" strokeWidth="2"/>
      <path d="M5.0752 5.07544L6.13586 6.1361M18.8638 18.864L19.9244 19.9247" stroke="#33FF99" strokeWidth="2"/>
      <path d="M5.0752 19.9246L6.13586 18.8639M18.8638 6.13598L19.9244 5.07532" stroke="#33FF99" strokeWidth="2"/>
    </svg>
  ),
})

export const SunnyDarkIcon = createIcon({
  displayName: "SunnyDarkIcon",
  viewBox: "0 0 24 24",
  path: (
    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
