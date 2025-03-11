import { useState, useEffect } from 'react';
import { useQuery } from "@tanstack/react-query";
import CurrencyConverter from './api/postApi';
import { ArrowsRightLeftIcon } from '@heroicons/react/24/solid';

const currencyData = {
  "USD": { symbol: "$", name: "United States Dollar" },
  "EUR": { symbol: "€", name: "Euro" },
  "INR": { symbol: "₹", name: "Indian Rupee" },
  "GBP": { symbol: "£", name: "British Pound" },
  "AUD": { symbol: "A$", name: "Australian Dollar" },
  "PKR": { symbol: "Rs", name: "Pakistani Rupee" },
  "CAD": { symbol: "C$", name: "Canadian Dollar" },
  "JPY": { symbol: "¥", name: "Japanese Yen" },
  "CNY": { symbol: "¥", name: "Chinese Yuan" },
  "CHF": { symbol: "CHF", name: "Swiss Franc" },
  "SGD": { symbol: "S$", name: "Singapore Dollar" },
  "NZD": { symbol: "NZ$", name: "New Zealand Dollar" },
  "HKD": { symbol: "HK$", name: "Hong Kong Dollar" },
  "SEK": { symbol: "kr", name: "Swedish Krona" },
  "NOK": { symbol: "kr", name: "Norwegian Krone" },
  "DKK": { symbol: "kr", name: "Danish Krone" },
  "KRW": { symbol: "₩", name: "South Korean Won" },
  "MXN": { symbol: "Mex$", name: "Mexican Peso" },
  "BRL": { symbol: "R$", name: "Brazilian Real" },
  "ZAR": { symbol: "R", name: "South African Rand" }
};

function App() {
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0.88);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [isEditingFrom, setIsEditingFrom] = useState(true);

  const { refetch } = useQuery({
    queryKey: ['currency', fromCurrency, toCurrency, amount],
    queryFn: async () => {
      const result = await CurrencyConverter(fromCurrency, toCurrency, Number(amount));
      setConvertedAmount(result);
      return result;
    },
    enabled: false,
  });

  useEffect(() => {
    if (amount && !isNaN(amount) && amount > 0) {
      refetch();
    }
  }, [amount, fromCurrency, toCurrency, refetch]);

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-4">
      <div className="bg-white shadow-2xl p-8 rounded-2xl w-full max-w-lg text-center">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Currency Converter</h2>
        <div className="flex justify-between items-center bg-gray-100 p-4 rounded-xl shadow">
          <div className="w-1/2">
            <label className="text-gray-600 text-sm font-medium">FROM</label>
            <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)} className="w-full p-2 mt-1 border rounded-lg bg-white shadow">
              {Object.keys(currencyData).map((currency) => (
                <option key={currency} value={currency}>{currency} - {currencyData[currency].name}</option>
              ))}
            </select>
            <div className="flex items-center border rounded-lg mt-2 p-2 bg-white shadow">
              <span className="text-gray-500 text-lg font-bold mr-2">{currencyData[fromCurrency].symbol}</span>
              <input 
                type="number" 
                value={amount} 
                onChange={(e) => { setAmount(e.target.value); setIsEditingFrom(true); }} 
                className="w-full outline-none text-lg font-medium bg-transparent"
              />
            </div>
          </div>
          <button onClick={handleSwapCurrencies} className="bg-blue-500 p-3 rounded-full text-white mx-2 hover:bg-blue-700 transition shadow-lg">
            <ArrowsRightLeftIcon className="w-6 h-6" />
          </button>
          <div className="w-1/2">
            <label className="text-gray-600 text-sm font-medium">TO</label>
            <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)} className="w-full p-2 mt-1 border rounded-lg bg-white shadow">
              {Object.keys(currencyData).map((currency) => (
                <option key={currency} value={currency}>{currency} - {currencyData[currency].name}</option>
              ))}
            </select>
            <div className="flex items-center border rounded-lg mt-2 p-2 bg-gray-100 shadow">
              <span className="text-gray-500 text-lg font-bold mr-2">{currencyData[toCurrency].symbol}</span>
              <input 
                type="number" 
                value={convertedAmount} 
                readOnly 
                className="w-full outline-none text-lg font-medium bg-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;