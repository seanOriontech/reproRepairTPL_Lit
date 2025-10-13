import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Item } from '../models/item';
import { environment } from 'src/environments/environment';
import { SpinnerService } from './spinnerService';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  navNumber: number = 0;
  itemSelected?: Item = undefined;
  items: Item[] = [];

  constructor(
    private http: HttpClient,
    private spinnerService: SpinnerService
  ) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  /** GET all items */
  getItems(): Observable<Item[]> {
    this.spinnerService.showSpinner();
    return this.http.get<Item[]>(environment.apiURL + '/u_Item').pipe(
      map((response) => {
        this.items.length = 0;
        this.items = response;
        this.spinnerService.hideSpinner();

        return response;
      }),
      catchError(this.handleError<Item[]>('getItems', []))
    );
  }

  /** GET item by id. */
  getItem(id: string): Observable<Item> {
    const url = `${environment.apiURL}/${id}`;
    return this.http
      .get<Item>(url)
      .pipe(catchError(this.handleError<Item>(`getItem id=${id}`)));
  }

  /** POST: add a new item */
  addItem(item: Item): Observable<Item> {
    return this.http
      .post<Item>(environment.apiURL + '/u_Item', item, this.httpOptions)
      .pipe(
        map((reponse) => {
          return reponse;
        }),
        catchError(this.handleError<Item>('addItem'))
      );
  }

  /** PUT: update the item */
  updateItem(item: Item): Observable<any> {
    return this.http
      .put(
        environment.apiURL + '/u_Item/' + item.itemID,
        item,
        this.httpOptions
      )
      .pipe(catchError(this.handleError<any>('updateItem')));
  }

  /** DELETE: delete the item */
  deleteItem(id: string): Observable<Item> {
    const url = `${environment.apiURL + '/u_Item'}/${id}`;
    return this.http.delete<Item>(url, this.httpOptions).pipe(
      map((reponse) => {
        this.getItems().subscribe();
        return reponse;
      }),
      catchError(this.handleError<Item>('deleteItem'))
    );
  }

  /** Handle Http operation that failed. */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console
      return of(result as T);
    };
  }

  moveForward() {
    this.navNumber++;
  }

  moveBackward() {
    this.navNumber--;
  }
}
