import axios, { AxiosResponse } from "axios";

const productApi = {
  getProducts: async () => {
    const res = await axios.get("https://fakestoreapi.com/products");
    return res.data;
  },
  getProduct: async (id: number) => {
    const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
    return res.data;
  }
};

export default productApi;
