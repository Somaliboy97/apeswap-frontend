import React from 'react'
import { Text } from '@apeswapfinance/uikit'
import styled from '@emotion/styled'
import moment from 'moment/moment'
import { useTranslation } from '../../../../contexts/Localization'
import { CHAINS } from '../../config/config'
import { Row, Column, HeadingWrapper, SectionsWrapper, Section } from '../../styles'
import { HeadingContainer } from '../Tokens/Tokens'
import useTheme from '../../../../hooks/useTheme'
import { InfoTransaction } from '../../types'
import { useFetchInfoTransactions } from '../../../../state/info/hooks'

interface TransactionsProps {
  amount: number
  filter?: string
}

export const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (min-width: 1200px) {
    flex-direction: row;
  }
`

const Transactions: React.FC<TransactionsProps> = (props) => {
  const { t } = useTranslation()
  const { isDark } = useTheme()

  const transactions = useFetchInfoTransactions(props.amount)
  const activeChains = JSON.parse(localStorage.getItem('infoActiveChains'))

  function formatTime(unix: number) {
    const now = moment()
    const timestamp = moment.unix(unix)

    const inSeconds = now.diff(timestamp, 'second')
    const inMinutes = now.diff(timestamp, 'minute')
    const inHours = now.diff(timestamp, 'hour')
    const inDays = now.diff(timestamp, 'day')

    if (inHours >= 24) {
      return `${inDays} ${inDays === 1 ? 'day' : 'days'} ago`
    } else if (inMinutes >= 60) {
      return `${inHours} ${inHours === 1 ? 'hour' : 'hours'} ago`
    } else if (inSeconds >= 60) {
      return `${inMinutes} ${inMinutes === 1 ? 'minute' : 'minutes'} ago`
    } else {
      return `${inSeconds} ${inSeconds === 1 ? 'second' : 'seconds'} ago`
    }
  }

  function processTransactions() {
    const data = []
    for (let i = 0; i < Object.keys(transactions).length; i++) {
      const chain = Object.keys(transactions)[i]

      if (activeChains.includes(Number(chain))) {
        for (let j = 0; j < transactions[chain].data.length; j++) {
          data.push(transactions[chain].data[j])
        }
      }
    }

    if (props.filter) {
      return data
        .filter((x) => x.swaps[0]?.pair.token0.id === props.filter || x.swaps[0]?.pair.token0.id === props.filter)
        .sort(
          (a: InfoTransaction, b: InfoTransaction) =>
            a.swaps[0]?.transaction.timestamp - b.swaps[0]?.transaction.timestamp,
        )
        .reverse()
        .slice(0, props.amount)
    }

    return data
      .sort(
        (a: InfoTransaction, b: InfoTransaction) =>
          a.swaps[0]?.transaction.timestamp - b.swaps[0]?.transaction.timestamp,
      )
      .reverse()
      .slice(0, props.amount)
  }

  return (
    <div>
      <HeadingContainer>
        <HeadingWrapper>
          <Text margin="20px 10px 5px 10px" className="heading">
            {t('Recent Transactions')}
          </Text>
          {!props.filter && (
            <Text style={{ float: 'right' }}>
              <a href="/info/transactions">
                See more <img src={`/images/info/arrow-right-${isDark ? 'dark' : 'light'}.svg`} alt="see more" />
              </a>
            </Text>
          )}
        </HeadingWrapper>
      </HeadingContainer>
      <Container>
        <SectionsWrapper>
          <Section>
            <Row>
              <Column flex="2">{t('Info')}</Column>
              <Column>{t('Total Value')}</Column>
              <Column className="mobile-hidden">{t('Token Amount')}</Column>
              <Column className="mobile-hidden">{t('Token Amount')}</Column>
              <Column className="mobile-hidden">{t('Account')}</Column>
              <Column className="mobile-hidden">{t('Time')}</Column>
            </Row>
            {processTransactions().map((tran: InfoTransaction, index) => {
              return (
                tran.swaps[0] && (
                  <Row key={tran.swaps[0].transaction.id} background={index % 2 === 0}>
                    <Column flex="2">
                      <img src={`/images/chains/${tran.chain}.png`} width="24px" className="logo" alt="fix" />
                      {`Swap ${tran.swaps[0]?.pair?.token0.symbol} for ${tran.swaps[0]?.pair?.token1.symbol}`}
                    </Column>
                    <Column>${(Math.round(tran.swaps[0]?.amountUSD * 100) / 100).toLocaleString()}</Column>
                    <Column className="mobile-hidden">{`${Math.abs(
                      tran.swaps[0]?.amount0In - tran.swaps[0]?.amount0Out,
                    ).toLocaleString()} ${tran.swaps[0]?.pair.token0.symbol}`}</Column>
                    <Column className="mobile-hidden">{`${Math.abs(
                      tran.swaps[0]?.amount1In - tran.swaps[0]?.amount1Out,
                    ).toLocaleString()} ${tran.swaps[0]?.pair.token1.symbol}`}</Column>
                    <Column className="mobile-hidden">
                      <a
                        href={`${CHAINS.find((x) => x.chain === tran.chain)?.explorer}address/${tran.swaps[0]?.to}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {tran.swaps[0]?.to.slice(0, 6) + '...' + tran.swaps[0]?.to.slice(38, 42)}
                      </a>
                    </Column>
                    <Column className="mobile-hidden">{formatTime(tran.swaps[0]?.transaction.timestamp)}</Column>
                  </Row>
                )
              )
            })}
          </Section>
        </SectionsWrapper>
      </Container>
      <Container></Container>
    </div>
  )
}

export default Transactions