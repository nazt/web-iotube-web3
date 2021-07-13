import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useStore } from '@/store/index';
import { Header } from '@/components/Header/index';
import { ChakraProvider, Button, Container, Center, CSSReset, useTheme } from '@chakra-ui/react';
import { theme } from '@/lib/theme';
import { Web3ReactProvider } from '@web3-react/core';
import { getLibrary } from './lib/web3-react';
import { ErrorBoundary } from 'react-error-boundary';
import { Box, Text } from '@chakra-ui/layout';
import { Toaster } from 'react-hot-toast';
import { ToolConfig } from './config/ToolConfig';
import { WalletSelecter } from '@/components/WalletSelecter';
import SiderMenu from '@/components/SiderMenu';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <Container role='alert'>
      <Center h='500px'>
        <Box>
          <p>Something went wrong:</p>
          <Text color='red.500'>{error.message}</Text>
          <Button onClick={resetErrorBoundary}>Try again</Button>
        </Box>
      </Center>
    </Container>
  );
};

const BodyWrapper = observer(({ children }) => {
  const theme = useTheme();
  const { sideBar } = useStore();
  return (
    <Box
      marginLeft={{ base: '0', md: sideBar.width }}
      paddingTop={theme.header.height}
      px={{ base: 6, md: 0 }}
      maxWidth={{
        md: sideBar.isOpen ? theme.content.maxWidthWithIconText : theme.content.maxWidthWithIcon
      }}
    >
      {children}
    </Box>
  );
});

export const App = observer(() => {
  const { lang } = useStore();
  useEffect(() => {
    lang.init();
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <CSSReset/>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Web3ReactProvider getLibrary={getLibrary}>
          <WalletSelecter/>
          <Toaster/>
          <Router>
            <Header/>
            <SiderMenu/>
            <BodyWrapper>
              <Switch>
                {ToolConfig.map((item) => (
                  <Route exact path={item.path} key={item.path} component={item.component}/>
                ))}
                <Redirect from="*" to="/" />
              </Switch>
            </BodyWrapper>
          </Router>
        </Web3ReactProvider>
      </ErrorBoundary>
    </ChakraProvider>
  );
});

export default App;
