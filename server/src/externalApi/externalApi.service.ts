import { Injectable } from '@nestjs/common';
import axios from 'axios';
import 'dotenv/config';

@Injectable()
export class ExternalApiService {
  async fearAndGreed() {
    const COINMARKETCAP_BASE_URL = process.env.COINMARKETCAP_BASE_URL;
    const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY;
    const coinMarketCapOptions = {
      method: 'GET',
      url: `${COINMARKETCAP_BASE_URL}fear-and-greed/latest`,
      headers: {
        accept: 'application/json',
        'X-CMC_PRO_API_KEY': COINMARKETCAP_API_KEY,
      },
    };

    const { data } = await axios(coinMarketCapOptions);

    return {
      value: data.data.value,
      value_classification: data.data.value_classification,
    };
  }
}
