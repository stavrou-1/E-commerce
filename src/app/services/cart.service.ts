import { Injectable } from '@angular/core';
import { Item } from '../Item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: Array<any> = [];
  inventory: Array<any> = [];
  filters: Array<any> = [];

  add(message: object): void {
    this.cart.push(message);
  }

  getInventory() {
    if (this.inventory && this.inventory.length > 0) {
      return this.inventory;
    }
    return [];
  }

  resetFilters(data: any = []) {
    if (data === undefined) {
      return this.getInventory();
    } else {
      this.filters = data;
    }
  }

  getFilters() {
    if (!this.filters.length) {
      return this.getInventory();
    }
    return this.filters;
  }

  getCart() {
    return this.cart;
  }

  deleteCartItem(item: Item): void {
    console.log(`Deleting ${item} from cart.`);
  }

  clear(): void {
    this.cart = [];
  }
}
