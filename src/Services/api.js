import axios from "axios";

const BASE_URL = "https://api.coingecko.com/api/v3";

// Dashboard Coins

export const getCryptos = async (currency = "usd") => {
  try {
    const response = await axios.get(`${BASE_URL}/coins/markets`, {
      params: {
        vs_currency: currency,
        order: "market_cap_desc",
        per_page: 50,
        page: 1,
        sparkline: false,
      },
    });

    console.log("Coins API Success:", response.data);

    return response.data;
  } catch (error) {
    console.error("Coins API Error:", error);

    return [];
  }
};

// Exchange Rates

export const getExchangeRates = async () => {
  const response = await axios.get(
    "https://api.coingecko.com/api/v3/exchange_rates"
  );

  return response.data.rates;
};

// Historical Chart
export const getChartData = async (coinId, currency = "usd", days = 7) => {
  const response = await axios.get(`${BASE_URL}/coins/${coinId}/market_chart`, {
    params: {
      vs_currency: currency,
      days,
    },
  });

  return response.data;
};
