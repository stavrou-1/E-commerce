import { Injectable } from '@angular/core';
import { Item } from './../Item';
import { MessageService } from './message.service';
import { CartService } from './cart.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private cartService: CartService) { }

  tempItemArray: Array<Item>;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private log(message: string) {
    this.messageService.add(`You recently: ${message}`);
  }

  /* Get items from the server */
  getInventory(): Observable<Item[]> {
    return this.http.get<Item[]>(environment.itemsUrl)
      .pipe(
        tap(_ => {
          this.cartService.inventory = _;
          this.log('fetched items');
        }),
        catchError(this.handleError<Item[]>('getItems', []))
      );
  }

  /** GET item by id. Will 404 if id not found */
  getItem(id: number): Observable<Item> {
    const url = `${environment.itemsUrl}/${id}`;
    return this.http.get<Item>(url)
      .pipe(
        tap(_ => this.log(`fetched item id=${id}`)),
        catchError(this.handleError<Item>(`getItem id=${id}`))
      );
  }

  /** DELETE: delete the item from the server */
  deleteItemFromCart(item: Item): Observable<Item> {
    return of(item);
  }

  /** POST: add a new item to the server */
  addItem(item: Item): Observable<Item> {

    return this.http.post<Item>(environment.itemsUrl, item, this.httpOptions)
      .pipe(
        tap(_ => {
          const cartArray =  this.cartService.getCart();
          this.cartService.add(item);
          this.log(`Added item to cart with id=${item.id}`);

          // add to the total
          cartArray.forEach((res: any, idx) => {
            res.total += res.price;
          });
        }),
        catchError(this.handleError<Item>('Add Item'))
      );
  }

  /**
   * Handle HTTP operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
