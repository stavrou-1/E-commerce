import { CartService } from './../../services/cart.service';
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Item } from './../../Item';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  cartData: Array<Item>;
  selectedItem: Item;
  cart: Array<Item>;

  constructor(
    private dataService: DataService,
    public cartService: CartService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.getInventory();
  }

  getInventory(): void {
    this.dataService.getInventory()
      .subscribe(item => {
        this.cartData = this.cartService.getInventory()[0]; // This is what our data structure should look like.
      });
  }

  removeFromCart(item: Item): void {

    this.dataService.deleteItemFromCart(item)
      .subscribe(_ => {
        const cartItemToDelete = _;
        const cartArray = this.cartService.getCart();

        if (cartArray.indexOf(cartItemToDelete) === -1) {
          console.log('Not found.');
          return false;
        }

        const isCorrectObject = (element: any) => element.id === cartItemToDelete.id;
        const foundIndex = cartArray.findIndex(isCorrectObject);

        this.cartService.getCart().splice(foundIndex, 1);

        this.messageService.add(`You removed item id=${cartItemToDelete.id} from cart.`);

      });
  }

  addItemToCart(item: Item): void {
    this.dataService.addItem(item)
      .subscribe((newItem: any) => console.log(this.cartService.inventory));
  }

}
