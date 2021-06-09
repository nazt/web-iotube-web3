import React from 'react';
import { observer } from 'mobx-react-lite';
import {
  Container,
  Image,
  Stack,
  HStack,
  Table,
  Heading,
  Thead,
  Tr,
  Th,
  Td,
  Tfoot,
  Tbody,
  Button,
  ButtonGroup,
  Box,
  Text,
  Center,
  StatGroup,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  StatArrow,
  Divider,
  Tag,
  useColorModeValue
} from '@chakra-ui/react';

export const Vault = observer(() => {
  return <Container
    mt={10}
    maxW="container.lg"
  >
    <Box
      p={5}
      flex="1"
      css={{
        backdropFilter: 'saturate(180%) blur(5px)',
        backgroundColor: useColorModeValue('#fff', 'rgba(26, 32, 44, 0.8)'),
        borderRadius: '15px',
        boxShadow: '0px 3px 20px 0px rgba(214, 214, 214, 0.5)'
      }}
    >
      <Heading as="h4" size="md">Unlock TTT</Heading>
      <Table variant="simple" mt={6}>
        <Thead>
          <Tr>
            <Th></Th>
            <Th>Name</Th>
            <Th isNumeric>Staked</Th>
            <Th>Remaining</Th>
            <Th>Speed</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>
              <Stack direction="row" spacing={4}>
                <Image boxSize="20px" src="/images/token_custom.png"/>
                <Image boxSize="20px" position="absolute" zIndex="-5" src="/images/vita.png"/>
              </Stack>
            </Td>
            <Td>CYC-VITA</Td>
            <Td isNumeric>0</Td>
            <Td>--</Td>
            <Td isNumeric>0</Td>
            <Td>
              <Stack direction="row" spacing={4} align="center">
                <Button size="sm" colorScheme="teal" variant="solid">
                  Claim
                </Button>
                <Button size="sm" colorScheme="teal" variant="outline">
                  Get LP
                </Button>
                <ButtonGroup size="sm" isAttached variant="outline">
                  <Button colorScheme="teal" variant="solid" mr="-px">Stake</Button>
                  <Button>Unstake</Button>
                  {/*<IconButton aria-label="Add to friends" icon={<AddIcon />} />*/}
                </ButtonGroup>
              </Stack>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
    <HStack spacing={8} mt={10}>
      <Box
        p={5}
        flex={1}
        css={{
          backdropFilter: 'saturate(180%) blur(5px)',
          backgroundColor: useColorModeValue('#fff', 'rgba(26, 32, 44, 0.8)'),
          borderRadius: '15px',
          boxShadow: '0px 3px 20px 0px rgba(214, 214, 214, 0.5)'
        }}>
        <Heading as="h4" size="md">Stake LP To Earn TTT</Heading>
        <Stack direction="row" mt={8}>
          <Image boxSize={8} src="/images/token_custom.png"/>
          <Center><Text>LP</Text></Center>
          <Button size="sm" colorScheme="teal" variant="solid">
            Stake
          </Button>
          <Button size="sm" colorScheme="teal" variant="outline">
            Unstake
          </Button>
        </Stack>
        <StatGroup mt={10}>
          <Stat>
            <StatLabel>Stake</StatLabel>
            <StatNumber fontSize="lg">345,670</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Remaining</StatLabel>
            <StatNumber fontSize="lg">---</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Total Staking</StatLabel>
            <StatNumber fontSize="lg">154.7M</StatNumber>

          </Stat>
          <Stat>
            <StatLabel>APY%</StatLabel>
            <StatNumber fontSize="lg">62.27%</StatNumber>
          </Stat>
        </StatGroup>
        <Divider mt={2} mb={2}/>
        <Box>
          Claimable TTT:  0
          <Tag  ml={2} size="sm" variant="solid" colorScheme="teal">
            Claim
          </Tag>
        </Box>
      </Box>
      <Box p={5}
           flex={1}
           css={{
             backdropFilter: 'saturate(180%) blur(5px)',
             backgroundColor: useColorModeValue('#fff', 'rgba(26, 32, 44, 0.8)'),
             borderRadius: '15px',
             boxShadow: '0px 3px 20px 0px rgba(214, 214, 214, 0.5)'
           }}>
        <Heading as="h4" size="md">Stake Token To Earn TTT</Heading>
        <StatGroup mt={10}>
          <Stat>
            <StatLabel>Sent</StatLabel>
            <StatNumber>345,670</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              23.36%
            </StatHelpText>
          </Stat>

          <Stat>
            <StatLabel>Clicked</StatLabel>
            <StatNumber>45</StatNumber>
            <StatHelpText>
              <StatArrow type="decrease" />
              9.05%
            </StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Clicked</StatLabel>
            <StatNumber>45</StatNumber>
            <StatHelpText>
              <StatArrow type="decrease" />
              9.05%
            </StatHelpText>
          </Stat>
        </StatGroup>
      </Box>

    </HStack>
  </Container>;
});
