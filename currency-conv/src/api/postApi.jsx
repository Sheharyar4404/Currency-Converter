import axios from "axios";

const api = axios.create({
    baseURL: "https://v6.exchangerate-api.com/v6/ed965496eea0167b9f1f764b"
})

const CurrencyConverter = async (fromCurrency, toCurrency, amount) => {
   const res = await api.get(`/pair/${fromCurrency}/${toCurrency}/${amount}`);
   console.log(res);
   return res.data.conversion_result;
};

export default CurrencyConverter;