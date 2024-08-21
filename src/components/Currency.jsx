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
        console.log(data);
      } catch (error) {
        console.log("Error in fetching exchage rates", error);
      }
    }

    fetchExchangeRates();
  }, [currency1, currency2]);

  return <div>Currency</div>;
};

export default Currency;
