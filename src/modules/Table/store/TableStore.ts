import { makeAutoObservable } from 'mobx';
import TableService from '../api/TableService';
import { makePersistable } from 'mobx-persist-store';
import { Item } from '../types/types';

export default class TableStore {
  items: Item[] = [];
  fields: string[] = [];
  loading = false;
  error: string | null = null;
  currentPage = 1;
  hasMore = true;
  pageSize = 20;

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: 'TableStore',
      properties: ['items', 'fields'],
      storage: window.localStorage,
    });
  }

  setItems(data: Item[]) {
    this.items = Array.isArray(data) ? data : [];
  }

  setHasMore(value: boolean) {
    this.hasMore = value;
  }

  setCurrentPage(page: number) {
    this.currentPage = page;
  }

  setLoading(isload: boolean) {
    this.loading = isload;
  }

  setFields(fields: string[]) {
    this.fields = Array.isArray(fields) ? fields : [];
  }

  async fetchTableData(page: number, limit: number) {
    this.setLoading(true);
    try {
      const response = await TableService.fetchTableData(page, limit);
      const data = response.data;

      if (data.length < limit) {
        this.setHasMore(false);
      }

      this.setItems(data);
      return response;
    } catch (e: any) {
      this.error = e?.message;
      throw e;
    } finally {
      this.setLoading(false);
    }
  }

  async loadMore() {
    if (this.loading || !this.hasMore) return;

    const nextPage = this.currentPage + 1;
    await this.fetchTableData(nextPage, this.pageSize);
    this.setCurrentPage(nextPage);
  }

  async createItem(item: Item) {
    this.setLoading(true);
    try {
      await TableService.createItem(item);
      await this.fetchTableData(this.currentPage, this.pageSize);
    } catch (e: any) {
      this.error = e?.message;
    } finally {
      this.error = null;
      this.setLoading(false);
    }
  }

  async deleteTable() {
    this.setLoading(true);
    try {
      this.setFields([]);
      this.setItems([]);
    } catch (e: any) {
      this.error = e?.message;
    } finally {
      this.error = null;
      this.setLoading(false);
    }
  }
}
