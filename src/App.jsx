import { useState } from 'react'
import './App.css'
import useCurrencyInfo from './hooks/useCurrencyInfo'
import { Input } from './components'

function App() {
 const [amount,setAmount]=useState(0)
  const [fromCurrency,setFromCurrency]=useState("usd")
  const [toCurrency,setToCurrency]=useState("inr")
  const [convertedAmount,setConvertedAmount]=useState(0)
  const currencyInfo=useCurrencyInfo(fromCurrency)
  const options=Object.keys(currencyInfo)
  const swap=()=>{
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }
  const convert = ()=>setConvertedAmount(amount*currencyInfo[toCurrency])
  
  return (
  <>
    <div
          className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat font-nunito"
      >
          <div className="w-full flex flex-col items-center">
              <img className=" w-20" src='./public/coin.gif'/>
              <h2 className=' text-white font-bold text-2xl mb-5'>💸Real Time Currency Convertor💸</h2>
              <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/20">
                  <form
                      onSubmit={(e) => {
                          e.preventDefault();
                          convert()
                      }}
                  >
                      <div className="w-full mb-1">
                          <Input
                              label="From"
                              amount={amount||""}
                              currencyOptions={options}
                              onCurrencyChange={(currency)=>{
                                setFromCurrency(currency)
                              }}
                              selectCurrency={fromCurrency}
                              onAmountChange={(amount)=>{
                                if(amount>-1)
                                setAmount(amount)
                              }}
                          />
                      </div>
                      <div className="relative w-full h-0.5">
                          <button
                              type="button"
                              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                              onClick={swap}
                          >
                            <i class="ri-swap-line"></i> 
                          </button>
                      </div>
                      <div className="w-full mt-1 mb-4">
                          <Input
                              label="To"
                              amount={convertedAmount}
                              currencyOptions={options}
                              selectCurrency={toCurrency}
                              onCurrencyChange={(currency)=>{
                                setToCurrency(currency)
                              }}
                              amountDisable
                          />
                      </div>
                      <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                          Convert {fromCurrency.toUpperCase()} <i class="ri-token-swap-line"></i> {toCurrency.toUpperCase()}
                      </button>
                  </form>
              </div>
          </div>
      </div>
  </>
  )
}

export default App
