import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  fonts: {
    body: 'DM Mono, system-ui, sans-serif',
    heading: 'DM Mono, system-ui, sans-serif'
  },
  colors: {
    discord: '#7289da',
    white: '#F9F9F9',
    sideBar: {
      bg:'#2C2D30',
      itemActive:'rgba(199, 207, 214, 0.08)'
    },
    header:{
      bg:'rgba(199, 207, 214, 0.1)'
    },
    gray:{
      800:'#212024'
    },
    lightGreen:'#33FF99'
  },
  shadows: {
    largeSoft: 'rgba(60, 64, 67, 0.15) 0px 2px 10px 6px;'
  },
  styles: {
    global: {
      'html, #__next': {
        height: '100%'
      },
      '#__next': {
        display: 'flex',
        flexDirection: 'column'
      },
      '.body': {
        overflowY: 'scroll' // Always show scrollbar to avoid flickering
      },
      html: {
        scrollBehavior: 'smooth'
      },
      '#nprogress': {
        pointerEvents: 'none'
      },
      '#nprogress .bar': {
        background: 'green.200',
        position: 'fixed',
        zIndex: '1031',
        top: 0,
        left: 0,
        width: '100%',
        height: '2px'
      }
    }
  }
});
