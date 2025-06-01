import type { AxiosResponse } from "axios";
import { api } from "@/app/api/https";
import { Item } from "../types/types";


export default class TableService {
   static async fetchTableData(page: number, limit: number): Promise<AxiosResponse> {
    return api.get(`/items?_page=${page}&_limit=${limit}`); 
  }

  static async createItem(item: Omit<Item, 'id'>): Promise<AxiosResponse<Item>> {
    return api.post('/items', item); 
  }

  static async deleteItem(id: number): Promise<AxiosResponse<void>> {
    return api.delete(`/items/${id}`); 
  }
}