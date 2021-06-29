import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '@/store/index';
import { CollapseView } from '@/components/CollapseView';
import { Box } from '@chakra-ui/react';


export const Faq = observer(() => {
  const { lang, god } = useStore();
  return (
    <Box pt={6}>
      <CollapseView
        title={lang.t('faq.what_is_iotube_bridge')}
        body={
          <>
            <p>{lang.t('faq.iotube_bridge_is')}</p>
            <br/>
            <p>
              {`${lang.t('faq.iotube_ui')} `}
              <a href="https://tube.iotex.io" target={'_blank'}>
                https://tube.iotex.io
              </a>
            </p>
          </>
        }
      />
      <CollapseView
        title={lang.t('faq.what_is_iotube_used_for')}
        body={
          <>
            <p>{lang.t('faq.iotube_used_for.one', { chain: god.currentChain.name })}</p>
            <p>{lang.t('faq.iotube_used_for.two', { chain: god.currentChain.name })}</p>
          </>
        }
      />
      <CollapseView
        title={lang.t('faq.how_does_iotube_work')}
        body={
          <>
            <p>{lang.t('faq.iotube_work.two_components')}</p>
            <ul>
              <li>
                <strong>{lang.t('faq.iotube_work.components.smart_contracts')}</strong>
                {` ${lang.t('faq.iotube_work.components.smart_contracts.work', { chain: god.currentChain.name })}`}
              </li>
              <li>
                <strong>{lang.t('faq.iotube_work.components.pool_of_witness')}</strong>
                {` ${lang.t('faq.iotube_work.components.pool_of_witness.work', { chain: god.currentChain.name })}`}
              </li>
            </ul>
          </>
        }
      />
      <CollapseView
        title={lang.t('faq.what_is_proxy_token')}
        body={
          <>
            <p>{lang.t('faq.proxy_token_is')}</p>
          </>
        }
      />
      <CollapseView
        title={lang.t('faq.what_different_proxy_token_and_original_token')}
        body={
          <>
            <p>{lang.t('faq.difference_between_proxy_token_and_original_token')}</p>
          </>
        }
      />
      <CollapseView
        title={lang.t('faq.does_the_token_supply_increase_when_using_iotube')}
        body={
          <>
            <p>{lang.t('faq.token_supply_does_not_increase')}</p>
          </>
        }
      />
      <CollapseView
        title={lang.t('faq.does_the_token_supply_increase_when_using_iotube')}
        body={
          <>
            <p>{lang.t('faq.token_supply_does_not_increase')}</p>
          </>
        }
      />
      <CollapseView
        title={lang.t('faq.what_happens_to_my_original_tokens_if_i_sell_the_proxy_token')}
        body={
          <>
            <p>{lang.t('faq.happens_to_original_tokens')}</p>
          </>
        }
      />
      <CollapseView
        title={lang.t('faq.can_i_send_my_proxy_token_back')}
        body={
          <>
            <p>{lang.t('faq.can_send_proxy_token_back')}</p>
          </>
        }
      />
      <CollapseView
        title={lang.t('faq.can_i_transfer_as_many_or_limit')}
        body={
          <>
            <p>{lang.t('faq.transfer_limit')}</p>
          </>
        }
      />
      <CollapseView
        title={lang.t('faq.can_i_send_native_iotex_tokens_using_iotube')}
        body={
          <>
            <p>{lang.t('faq.way_to_send_native_token')}</p>
          </>
        }
      />
      <CollapseView
        title={lang.t('faq.what_tokens_are_supported_by_iotube')}
        body={
          <>
            <p>{lang.t('faq.supported_tokens')}</p>
          </>
        }
      />
      <CollapseView
        title={lang.t('faq.what_are_the_fees_using_iotube')}
        body={
          <>
            <p>
              <strong>{lang.t('faq.fee.service')}</strong>
            </p>
            <ul>
              <li>{lang.t('faq.fee.service.desc')}</li>
            </ul>
            <p>
              <strong>{lang.t('faq.fee.from_eth_to_iotex')}</strong>
            </p>
            <ul>
              <li>{lang.t('faq.fee.from_eth_to_iotex.desc.one')}</li>
              <li>{lang.t('faq.fee.from_eth_to_iotex.desc.two')}</li>
            </ul>
            <p>
              <strong>{lang.t('faq.fee.from_iotex_to_eth')}</strong>
            </p>
            <ul>
              <li>{lang.t('faq.fee.from_iotex_to_eth.desc.one')}</li>
              <li>{lang.t('faq.fee.from_iotex_to_eth.desc.two')}</li>
            </ul>
          </>
        }
      />
      <CollapseView
        title={lang.t('faq.is_there_is_a_tutorial')}
        body={
          <>
            <p>
              {lang.t('faq.tutorial_community')}{' '}
              <a target={'_blank'}
                 href="https://community.iotex.io/t/using-iotube-to-move-erc20-tokens-from-ethereum-to-iotex/1452">
                https://community.iotex.io/t/using-iotube-to-move-erc20-tokens-from-ethereum-to-iotex/1452
              </a>
            </p>
          </>
        }
      />
      <CollapseView
        title={lang.t('faq.is_iotube_open_source')}
        body={
          <>
            <p>
              {lang.t('faq.iotube_github')}{' '}
              <a target={'_blank'} href="https://github.com/iotexproject/ioTube">
                https://github.com/iotexproject/ioTube
              </a>
            </p>
          </>
        }
      />
    </Box>

  );
});