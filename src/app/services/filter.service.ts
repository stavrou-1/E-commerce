import { DataService } from './data.service';
import { CartService } from './cart.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(
    private cartService: CartService) { }

  getInventory() {
    return this.cartService.getInventory();
  }

  setInventory(searchString: any) {
    const ref: object = {};
    let i: number;

    const arrayOriginal = this.cartService.getInventory();

    // Big O(n) notation of linear time complexity.
    for (i = 0; i < arrayOriginal.length; i++) {
      ref[arrayOriginal[i].category] = [];
    }

    for (i = 0; i < arrayOriginal.length; i++) {
      ref[arrayOriginal[i].category].push(arrayOriginal[i]);
    }

    console.log(JSON.stringify(ref[searchString], null, 2));
    this.cartService.resetFilters(ref[searchString]);

    return ref[searchString];
  }
}
