import { extendTheme } from '@chakra-ui/react';

const Button = {
  // The styles all button have in common
  baseStyle: {
    fontWeight: '500',
    fontSize: '18px',
    borderRadius: '15px', // <-- border radius is same for all variants and sizes
    minHeight:'50px',
    display: 'flex',
    shadow: 'none',
    _focus: {
      shadow: 'none',
    }
  },
  sizes: {
    block: {
      height: '60px',
      width: '100%'
    }
  },
  // variants: outline and solid
  variants: {
    'green':(props)=>({
      bg: props.colorMode === 'dark'?'lightGreen':'darkLightGreen',
      color: 'gray.4'
    }),
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

const Table = {
  parts: ["th", "tr", "td"],
  baseStyle: {
    th: {
      display: 'inline-block',
      fontFamily: 'dmSans',
      fontWeight: '400',
      textTransform: 'capitalize',
      border: 'none',
      paddingInlineStart: '0',
      paddingInlineEnd: '0',
      p: '0'
    },
    tr: {
      border: 'none',
      align: "center",
      borderRadius: '2xl',
      fontFamily: 'dmSans',
      fontWeight: '400',
    },
    td: {
      paddingInlineStart: '0',
      paddingInlineEnd: '0',
      paddingInline: '0'
    }
  },
  sizes: {
    md: {
      th: {
        fontSize: 'lg',
      },
      tr: {
        mb: '4',
        fontSize: 'md',
        px: '5'
      }
    }
  },
  variants: {
    unstyled: (props) => ({
      color: props.colorMode === "dark" ? "gray.bg10" : "gray.6",
      shadow: props.colorMode === "dark" ? "" : "lightShadow"
    })
  },
  defaultProps: {
    size: 'md',
    variant: "unstyled",
  },
};

const Link = {
  baseStyle: {
    target: "_blank"
  },
  variants: {
    'green':(props)=>({
      color: props.colorMode === 'dark'?'lightGreen':'darkLightGreen',
    }),
  },
  defaultProps: {
    size: 'md',
    variant: "green",
  },
};

const Accordion = {
  parts: ['item', 'button', 'panel'],
  baseStyle: {
    border: 0,
    borderRadius: '2xl',
    item: {
      border: 0,
      borderRadius: '2xl'
    },
    button: {
      _focus: {
        shadow: 'none'
      }
    },
    panel: {
      px: 0,
      py: 3
    }
  }
};

const Tooltip = {
  baseStyle: {
    px: '2',
    py: '1',
    color: 'white',
    borderRadius: 'md',
    fontSize: 'md',
    fontFamily: 'dmSans',
  }
};

export const theme = extendTheme({
  fonts: {
    body: 'DM Mono',
    heading: 'DM Mono',
    dmSans: 'DM Sans, sans-serif'
  },
  header: {
    height: '4.5rem'
  },
  shadow: {
    light: '0px 3px 20px 0px #D6D6D680'
  },
  content: {
    height: 'calc(100vh - 64px)',
    maxWidthWithIconText:'calc(100%-220px)',
    maxWidthWithIcon:'calc(100%-80px)'
  },
  sideBar: {
    none: '0px',
    width: '220px',
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
      2: '#999999',
      3: '#cccccc',
      4: '#333333',
      5: '#F8F8FA',
      6: '#666666',
      7: '#F8F8FA',
      8: '#212024',
      9: '#9398A2',
      10: '#8D9399',
      11:'#c7cfd614'
    },
    lightGreen: '#33FF99',
    darkLightGreen:'#21CE99',
    white:'#FFFFFF',
    yellow: '#F2C94C',
    red: '#EB5757',
    blue: '#56CCF2',
    bg: {
      bg1: '#3F3F44',
      bg1Alpha20: 'rgba(63, 63, 68, 0.2)',
      bg2: '#CDCFD6',
      bg2Alpha20: 'rgba(205, 207, 214, 0.2)'
    }
  },
  space: {
    18: '4.5rem'
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
      }
    }
  },
  components: {
    Button,
    Table,
    Link,
    Accordion,
    Tooltip
  }
});
