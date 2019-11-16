import { SidebarComponent } from './../sidebar/sidebar.component';
import { CheckoutComponent } from './../checkout/checkout.component';
import { CartComponent } from './../cart/cart.component';
import { HomeComponent } from './../home/home.component';
import { AppRoutingModule } from './../../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, AppRoutingModule ],
      declarations: [ LoginComponent, HomeComponent, CartComponent, CheckoutComponent, SidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
