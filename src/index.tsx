import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useStore } from '@/store/index';
import { Header } from '@/components/Header/index';
import { ChakraProvider, Button, Container, Center, CSSReset, Alert, AlertIcon } from '@chakra-ui/react';
import { theme } from '@/lib/theme';
import { ETHProvider } from './components/EthProvider';
import { Home } from './pages/Home/index';
import { Web3ReactProvider } from '@web3-react/core';
import { getLibrary } from './lib/web3-react';
import { ErrorBoundary } from 'react-error-boundary';
import { Box, Text } from '@chakra-ui/layout';
import { Toaster } from 'react-hot-toast';
import { ToolConfig } from './config/ToolConfig';
import { WalletSelecter } from './components/WalletSelecter/index';
import { IotexProvider } from './components/IotexProvider';
import './app.css';
// import 'antd/dist/antd.css';
import { SiderMenu } from '@/components/SiderMenu';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <Container role="alert">
      <Center h="500px">
        <Box>
          <p>Something went wrong:</p>
          <Text color="red.500">{error.message}</Text>
          <Button onClick={resetErrorBoundary}>Try again</Button>
        </Box>
      </Center>
    </Container>
  );
};

export const App = observer(() => {
  const { lang, god, token } = useStore();
  useEffect(() => {
    lang.init();
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Web3ReactProvider getLibrary={getLibrary}>
          <WalletSelecter />
          <ETHProvider />
          <IotexProvider />
          <Toaster />
          <Router>
            <Header />
            <SiderMenu />
            {token.actionHash && (
              <Alert status="success">
                <AlertIcon/>
                Your action Hash is {token.actionHash}
              </Alert>
            )}
            <Switch>
              {ToolConfig.map((item) => (
                <Route exact path={item.path} key={item.path} component={item.component} />
              ))}
            </Switch>
          </Router>
        </Web3ReactProvider>
      </ErrorBoundary>
    </ChakraProvider>
  );
});

export default App;
