import { Token, ZapType } from '@ape.swap/sdk'
import { createReducer } from '@reduxjs/toolkit'
import {
  Field,
  replaceZapState,
  selectInputCurrency,
  selectOutputCurrency,
  setInputList,
  setRecipient,
  setZapNewOutputList,
  setZapType,
  typeInput,
} from './actions'

export interface ZapState {
  readonly independentField: Field
  readonly typedValue: string
  readonly zapType: ZapType
  readonly [Field.INPUT]: {
    readonly currencyId: string | undefined
  }
  readonly [Field.OUTPUT]: {
    readonly currency1: string | undefined
    readonly currency2: string | undefined
  }
  readonly recipient: string | null
  readonly zapInputList: { [symbol: string]: Token } | undefined
  readonly zapNewOutputList: { currencyIdA: string; currencyIdB: string }[]
}

const initialState: ZapState = {
  independentField: Field.INPUT,
  zapType: ZapType.ZAP,
  typedValue: '',
  [Field.INPUT]: {
    currencyId: 'ETH',
  },
  [Field.OUTPUT]: {
    currency1: '',
    currency2: '',
  },
  recipient: null,
  zapInputList: null,
  zapNewOutputList: [],
}

export default createReducer<ZapState>(initialState, (builder) =>
  builder
    .addCase(
      replaceZapState,
      (state, { payload: { typedValue, recipient, inputCurrencyId, outputCurrencyId, zapType } }) => {
        return {
          ...state,
          [Field.INPUT]: {
            currencyId: inputCurrencyId,
          },
          [Field.OUTPUT]: {
            ...state[Field.OUTPUT],
            currency1: outputCurrencyId.currency1,
            currency2: outputCurrencyId.currency2,
          },
          independentField: Field.INPUT,
          zapType,
          typedValue,
          recipient,
        }
      },
    )
    .addCase(selectInputCurrency, (state, { payload: { currencyId } }) => {
      return {
        ...state,
        [Field.INPUT]: { currencyId },
      }
    })
    .addCase(selectOutputCurrency, (state, { payload: { currency1, currency2 } }) => {
      return {
        ...state,
        [Field.OUTPUT]: { currency1, currency2 },
      }
    })
    .addCase(typeInput, (state, { payload: { typedValue } }) => {
      return {
        ...state,
        independentField: Field.INPUT,
        typedValue,
      }
    })
    .addCase(setRecipient, (state, { payload: { recipient } }) => {
      state.recipient = recipient
    })
    .addCase(setZapType, (state, { payload: { zapType } }) => {
      state.zapType = zapType
    })
    .addCase(setInputList, (state, { payload: { zapInputList } }) => {
      return {
        ...state,
        zapInputList,
      }
    })
    .addCase(setZapNewOutputList, (state, { payload: { zapNewOutputList } }) => {
      return {
        ...state,
        zapNewOutputList,
      }
    }),
)
