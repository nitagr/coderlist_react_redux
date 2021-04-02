import axios from 'axios';
import * as dotenv from 'dotenv';
import { SaveUserBody } from '../API';
dotenv.config();

export const SERVER_URL = process.env.SERVER_URL || 'http://localhost:5000';

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

export const postDataAndImage = async (URL: string, formData: FormData, config: any) => {
  try {
      const response = await axios.post(`${SERVER_URL}/${URL}`, formData, config);
      return response;
  } catch (e) {
      return null;
  }
};

export const postData = async (URL: string, body: SaveUserBody) => {
  try {
      const response = await fetch(`${SERVER_URL}/${URL}`, {
          method: "POST",
          mode: "cors",
          headers: { "Content-Type": "application/json;charset=utf-8" },
          body: JSON.stringify(body),
      });
      const result = await response.json();
      return result;
  } catch (e) {
      return null;
  }
};

export const deleteData = async (URL: string) => {
  try {
      const response = await fetch(`${SERVER_URL}/${URL}`, {
          method: "DELETE",
          mode: "cors",
      });
      const result = await response.json();
      return result;
  } catch (e) {
      return null;
  }
};