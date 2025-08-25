import axios from "axios";
import { baseUrl } from "../constants/baseUrl"
import Cookies from 'js-cookie';

export const fetchBalances = async () => {
   const res = await axios.request(
      {
        method: "get",
        url: `${baseUrl}getUserBalances`,
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${Cookies.get('token')}`,
        }
      }
    )
    if(res.status == 200){
      localStorage.setItem("creditBalance", res.data.creditBalance )
      localStorage.setItem("balance", res.data.main_balance )
        return res.data
    } 
  }