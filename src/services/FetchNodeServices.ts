import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();

const SERVER_URL = process.env.SERVER_URL || 'http://localhost:5000';

export const getData = async (url: any): Promise<any> => {
  try {
    let response = await fetch(`${SERVER_URL}/${url}`)
    let result = await response.json()
    return result.data;
  } catch (e) {
      console.log(e);
      return null;
  }
}