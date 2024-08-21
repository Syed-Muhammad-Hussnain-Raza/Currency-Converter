import { useEffect } from "react";
import { useState } from "react";

const URL =
  "https://v6.exchangerate-api.com/v6/54b6fdad5466b3aa0be0dccc/latest/USD";

const Currency = () => {
  // useState for both amount
  const [amount1, setAmount1] = useState("");
  const [amount2, setAmount2] = useState("");
  // useState for both currency
  const [currency1, setCurrency1] = useState("USD");
  const [currency2, setCurrency2] = useState("PKR");
  // useState for exchange rate between two currency
  const [exchangeRates, setExchangeRates] = useState({});

  useEffect(() => {
    async function fetchExchangeRates() {
      try {
        const response = await fetch(URL);

        if (!response.ok) {
          throw new Error("Fail to fetch exchange rate");
        }
        const data = await response.json();
        setExchangeRates(data.conversion_rates || {});
      } catch (error) {
        console.log("Error in fetching exchage rates", error);
      }
    }

    fetchExchangeRates();
  }, []);

  // Currency Converter Function
  const convertCurrency = (amount, fromCurrency, toCurrency) => {
    if (fromCurrency === toCurrency) {
      return amount;
    }

    return amount * exchangeRates[toCurrency].toFixed(2);
  };

  useEffect(() => {
    if (exchangeRates[currency1] && exchangeRates[currency2]) {
      const convertedAmount = convertCurrency(amount1, currency1, currency2);
      setAmount2(convertedAmount);
    }
  }, [amount1, currency1, currency2, exchangeRates]);

  return (
    <div className="flex flex-row mt-8  gap-x-12">
      <div className="border-black border-2 rounded-lg p-1 bg-white">
        <select
          className="bg-black text-white rounded-lg p-1"
          value={currency1}
          onChange={(e) => setCurrency1(e.target.value)}
        >
          {Object.keys(exchangeRates).map((country) => (
            <option key={country}>{country}</option>
          ))}
        </select>
        <input
          className="ml-3 border-b-2 border-blue-700 outline-none"
          type="number"
          value={amount1}
          onChange={(e) => setAmount1(e.target.value)}
        />
      </div>
      <div className="border-black border-2 rounded-lg p-1 bg-white">
        <select
          className="bg-black text-white rounded-lg p-1"
          value={currency2}
          onChange={(e) => setCurrency2(e.target.value)}
        >
          {Object.keys(exchangeRates).map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        <input
          className="ml-3 border-b-2 border-blue-700 outline-none"
          type="number"
          value={amount2}
          onChange={(e) => setAmount2(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Currency;
