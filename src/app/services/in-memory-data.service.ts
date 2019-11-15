import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Item } from './../Item';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const items = [
      {id: 11, imageSrc: '../../assets/ritz.jpg', title: 'Ritz', category: 'bread', price: 1.25, description: 'Cheese Crackers', remaining: 20, total: 0 },
      {id: 12, imageSrc: '../../assets/thomas.png', title: 'Thomas Bagels', price: 1.25, category: 'bread', description: 'Thomas Cinnamon Bagels', remaining: 20 },
      {id: 13, imageSrc: '../../assets/sara-lee.png', title: 'Sara Lee Bagels', price: 3.25, category: 'bread', description: 'Sara Lee Cinnamon Raisin', remaining: 20 },
      {id: 14, imageSrc: '../../assets/brownberry.png', title: 'Brownberry Bread', price: 2.50, category: 'bread', description: 'Brownberry 12 Grain Oat', remaining: 20 },
      {id: 15, imageSrc: '../../assets/organic-valley.png', title: 'Organic Valley', price: 3.75, category: 'dairy', description: 'Whole Milk', remaining: 20 },
      {id: 16, imageSrc: '../../assets/deans.jpg', title: 'Deans', price: 3.25, category: 'dairy', description: 'Cinnamon Ice Cream', remaining: 20 },
      {id: 17, imageSrc: '../../assets/bunny-tracks.png', title: 'Blue Bunny', price: 2.25, category: 'dairy', description: 'Chunky Monkey', remaining: 20 },
      {id: 18, imageSrc: '../../assets/sargento.jpg', title: 'Sargento', price: 1.50, category: 'dairy', description: 'Fine Sharped Cheddar', remaining: 20 },
      {id: 19, imageSrc: '../../assets/kraft.jpg', title: 'Kraft', price: 1.75, category: 'dairy', description: 'Cheese Singles', remaining: 20 },
      {id: 20, imageSrc: '../../assets/del-monte.jpg', title: 'Del Monte', price: 1.99, category: 'fruits', description: 'Canned Peaches', remaining: 20 },
      {id: 21, imageSrc: '../../assets/chiquita.jpg', title: 'Chiquita', price: 1.25, category: 'fruits', description: 'Yellow Bananas', remaining: 20 },
      {id: 22, imageSrc: '../../assets/tropicana.jpg', title: 'Tropicana', price: 2.50, category: 'fruits', description: 'Orange Juice', remaining: 20 },
      {id: 23, imageSrc: '../../assets/pineapple.jpg', title: 'Dole', price: 1.50, category: 'fruits', description: 'Fresh Pineapple', remaining: 20 },
      {id: 24, imageSrc: '../../assets/allspice.jpg', title: 'McCormick', price: 1.50, category: 'spices', description: 'Ground Allspice', remaining: 20 },
      {id: 25, imageSrc: '../../assets/pumpkin-pie.jpg', title: 'McCormick', price: 1.25, category: 'spices', description: 'Pumpkin Pie Spice', remaining: 20 },
      {id: 26, imageSrc: '../../assets/veggie-patties.jpg', title: 'Morning Star', price: 1.75, category: 'veggies', description: 'Veggie Beef Patties', remaining: 20 },
      {id: 27, imageSrc: '../../assets/amys-texasburger.jpg', title: 'Amy\'s', price: 4.50, category: 'veggies', description: 'Texas Veggie Burger', remaining: 20 },
      {id: 28, imageSrc: '../../assets/mashed-cauliflower.jpg', title: 'Bird\'s Eye', price: 3.25, category: 'veggies', description: 'Mashed Cauliflower', remaining: 20 }
    ];
    return {
      items
    };
  }

  // Overrides the genId method to ensure that an item always has an id.
  // If the items array is empty,
  // the method below returns the initial number (11).
  // if the items array is not empty, the method below returns the highest
  // item id + 1.
  genId(items: Item[]): number {
    return items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 11;
  }
}
