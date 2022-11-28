export const tokensQuery = (amount: number, block: string) => {
  return {
    query:
      'query tokens { tokens(' +
      (block !== '0' ? 'block: { number:' + block + '}' : '') +
      'first: ' +
      amount +
      ', orderBy: tradeVolumeUSD orderDirection: desc) {  id name symbol tradeVolumeUSD totalLiquidity derivedETH }  }',
  }
}

export const tokensOneDayQuery = (amount: number, block: number) => {
  return {
    query:
      'query { tokens(block: { number:' +
      block +
      '} first: ' +
      amount +
      ', orderBy: tradeVolumeUSD orderDirection: desc) {  id name symbol tradeVolumeUSD totalLiquidity derivedETH }  }',
  }
}

export const transactionsQuery = (amount: number) => {
  return {
    query:
      'query transactions {' +
      '    transactions(first: ' +
      amount +
      ', orderBy: timestamp, orderDirection: desc) {' +
      '      swaps(orderBy: timestamp, orderDirection: desc) {' +
      '        transaction {' +
      '          id' +
      '          timestamp' +
      '        }' +
      '        pair {' +
      '          token0 {' +
      '            id' +
      '            symbol' +
      '          }' +
      '          token1 {' +
      '            id' +
      '            symbol' +
      '          }' +
      '        }' +
      '        amount0In' +
      '        amount0Out' +
      '        amount1In' +
      '        amount1Out' +
      '        amountUSD' +
      '        to' +
      '      }' +
      '    }' +
      '  }',
  }
}

export const nativePricesQuery = {
  query: 'query bundles { bundles {id ethPrice }}',
}

// export const daysDataQuery = (oneDayBack: number) => {
//   return {
//     query:
//       'query uniswapDayDatas {' +
//       '    uniswapDayDatas(first: 1, skip: 0, where: { date_gt: ' +
//       oneDayBack +
//       ' }, orderBy: date, orderDirection: asc) {' +
//       '      id' +
//       '      date' +
//       '      totalVolumeUSD' +
//       '      dailyVolumeUSD' +
//       '      dailyVolumeETH' +
//       '      totalLiquidityUSD' +
//       '      totalLiquidityETH' +
//       '      txCount' +
//       '    }' +
//       '  }',
//   }
// }
export const daysDataQuery = (oneDayBack: number) => {
  return {
    query:
      'query uniswapDayDatas {' +
      '    uniswapDayDatas(first: 1, skip: 0, where: { date_gt: ' +
      oneDayBack +
      ' }, orderBy: date, orderDirection: asc) {' +
      '      id' +
      '      date' +
      '      totalVolumeUSD' +
      '      dailyVolumeUSD' +
      '      dailyVolumeETH' +
      '      totalLiquidityUSD' +
      '      totalLiquidityETH' +
      '      txCount' +
      '    }' +
      '  }',
  }
}

export const blocksQuery = (startTimestamp: number, currentTimestamp: number) => {
  return {
    query:
      'query blocks { blocks(first: 1 orderBy: timestamp orderDirection: asc where: { timestamp_gt: ' +
      startTimestamp +
      ', timestamp_lt: ' +
      currentTimestamp +
      '}' +
      '    ) {' +
      '      id' +
      '      number' +
      '      timestamp' +
      '    }' +
      '  }',
  }
}

export const uniswapFactoriesQuery = (chainId: string, block: string) => {
  return {
    query:
      'query uniswapFactories { uniswapFactories(' +
      (block !== '0' ? 'block: { number:' + block + '}' : '') +
      ' where: {id: "' +
      chainId +
      '"}) { id totalVolumeUSD totalVolumeETH untrackedVolumeUSD totalLiquidityUSD totalLiquidityETH txCount pairCount } }',
  }
}

export const pairsQuery = (amount: number) => {
  return {
    query:
      'query pairs {\n' +
      '  pairs(first: ' +
      amount +
      ' orderBy: trackedReserveETH, orderDirection: desc) {\n' +
      '  id\n' +
      '  token0 {\n' +
      '    symbol\n' +
      '    name\n' +
      '  }\n' +
      '  token1 {\n' +
      '    symbol\n' +
      '    name\n' +
      '  }\n' +
      '  reserveUSD\n' +
      '  volumeUSD\n' +
      '  }\n' +
      '}\n',
  }
}

export const graphQuery = () => {
  return {
    query:
      'query uniswapDayDatas {\n' +
      '    uniswapDayDatas(orderBy: date, orderDirection: desc first: 30) {\n' +
      '      id\n' +
      '      date\n' +
      '      totalVolumeUSD\n' +
      '      dailyVolumeUSD\n' +
      '      dailyVolumeETH\n' +
      '      totalLiquidityUSD\n' +
      '      totalLiquidityETH\n' +
      '    }\n' +
      '  }',
  }
}