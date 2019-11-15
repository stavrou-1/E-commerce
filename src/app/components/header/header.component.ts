import { Component, OnInit, DoCheck } from '@angular/core';
import { Item } from './../../Item';
import { CartService } from './../../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements DoCheck {

  itemQuantity = 0;
  cartArray: Array<any>;

  constructor(private cartService: CartService) { }

  ngDoCheck() {
    this.cartArray = this.cartService.getCart();
  }

}
