import { DataService } from './../../services/data.service';
import { CartService } from './../../services/cart.service';
import { FilterService } from './../../services/filter.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  constructor(
    private filterService: FilterService) {}

  activeSidebarLink = '';

  queryCategories(category: string) {
    this.activeSidebarLink = category;
    this.filterService.setInventory(category);
  }
}
