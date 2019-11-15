import { Component, OnInit } from '@angular/core';
import { CartService } from './../../services/cart.service';
import { Item } from 'src/app/Item';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  myCart: Array<object>;
  total: any;

  constructor(
    public cartService: CartService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.configureCartList();
  }

  configureCartList() {
    const vals = [];
    const cartArray = this.cartService.getCart();

    if (!cartArray.length) {
      return null;
    }

    for (let i = 0; i < cartArray.length; i++) {
      vals.push(this.cartService.getCart()[i].price);
    }

    this.total = vals.reduce((a, b) => a + b);
  }

  removeItemFromCart(item: Item) {
    const cartArray = this.cartService.getCart();
    const isCorrectObject = (element: Item) => element.id === item.id;
    const indexOf = cartArray.findIndex(isCorrectObject);

    if (!cartArray.length) {
      this.clearCart();
      return null;
    }
    this.total = (this.total - item.price);

    cartArray.splice(indexOf, 1);
  }

  clearCart() {
    this.cartService.clear();
    this.total = 0;
    this.messageService.add(`You recently cleared your cart!`);
  }
}
