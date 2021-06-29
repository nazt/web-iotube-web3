import { extendTheme, useColorModeValue } from '@chakra-ui/react';

const Button = {
  // The styles all button have in common
  baseStyle: {
    fontWeight: '500',
    fontSize: '18px',
    borderRadius: '15px', // <-- border radius is same for all variants and sizes
    minHeight:'50px',
    display: 'flex'
  },
  sizes: {
    block: {
      height: '60px',
      width: '100%'
    }
  },
  // variants: outline and solid
  variants: {
    'green': {
      bg: 'lightGreen',
      color: 'gray.4'
    },
    'black': (props) => ({
      bg: props.colorMode === 'dark' ? '#182532' : 'gray.800',
      color: 'gray.100',
      _hover: {
        opacity: 0.8,
        _disabled: {
          background: 'gray'
        }
      }
    })
  },
  // The default size and variant values
  defaultProps: {
    size: 'md',
    variant: 'solid'
  }
};

export const theme = extendTheme({
  fonts: {
    body: 'DM Mono',
    heading: 'DM Mono'
  },
  header: {
    height: '64px'
  },
  shadow: {
    light: '0px 3px 20px 0px #D6D6D680'
  },
  content: {
    height: 'calc(100vh - 64px)',
    maxWidthWithIconText:'calc(100%-200px)',
    maxWidthWithIcon:'calc(100%-80px)'
  },
  sideBar: {
    width: '200px',
    widthWithOutText:'80px',
    bg: {
      light: 'white',
      dark: '#2C2D30'
    },
    itemActive: 'rgba(199, 207, 214, 0.08)'
  },
  faq: {
    collapseHeight: '60px',
    titleBg: {
      dark: '#3F3F44',
    },
    contentBg: {
      dark: '#2E2E32'
    }
  },
  colors: {
    discord: '#7289da',
    sideBar: {
      bg: '#2C2D30',
      itemActive: 'rgba(199, 207, 214, 0.08)'
    },
    header: {
      bg: '#2C2D2F'
    },
    gray: {
      bg: '#3F3F44',
      2: '#999999',
      3: '#cccccc',
      4: '#333333',
      5: '#F8F8FA',
      6: '#666666',
      7: '#F8F8FA',
      8: '#212024',
      9: '#9398A2',
      10: '#8D9399'
    },
    lightGreen: '#33FF99'
  },
  shadows: {
    lightShadow: '0px 3px 20px 0px rgba(214, 214, 214, 0.5)',
    darkShadow: '0px 3px 20px 0px rgba(36, 39, 41, 0.5)',
    largeSoft: 'rgba(60, 64, 67, 0.15) 0px 2px 10px 6px'
  },
  iconSize: {
    sm: '15px',
    md: '24px'
  },
  borderRadius: {
    sm: '15px'
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
      'body.chakra-ui-light': {
        background: ' #F9F9F9'
      },
      'body.chakra-ui-dark': {
        background: ' #212024'
      },
      '.body': {
        overflowY: 'scroll', // Always show scrollbar to avoid flickering
        margin:'auto'
      },
      html: {
        scrollBehavior: 'smooth',
        fontFamily: 'DM Mono, monospace'
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
      },
      'a': {
        color: 'lightGreen!important'
      }
    }
  },
  components: {
    Button
  }
});
