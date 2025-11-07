import { Injectable } from '@angular/core';
import { Technician } from '../models/technician';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Item } from '../models/item';
import { SpinnerService } from './spinnerService';

@Injectable({
  providedIn: 'root',
})
export class TechService {
  navNumber: number = 0;
  techSelected?: Technician = undefined;
  technicians: Technician[] = [];

  constructor(
    private http: HttpClient,
    private spinnerService: SpinnerService
  ) {
    this.getItems().subscribe();
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  /** GET all items */
  getItems(): Observable<Technician[]> {
    this.spinnerService.showSpinner();
    return this.http
      .get<Technician[]>(environment.apiURL + '/Technicians_lite')
      .pipe(
        map((response) => {
          this.technicians.length = 0;
          this.technicians = response;

          this.technicians.push({ technicianID: 'ALL', name: 'SHOW ALL' });

          this.spinnerService.hideSpinner();

          return response;
        }),
        catchError(this.handleError<Technician[]>('getItems', []))
      );
  }

  getTechnicianName(techID: string) {
    if (this.technicians.length === 0) {
      this.getItems().subscribe();
    }

    let tech = this.technicians.find((x) => x.technicianID == techID);

    return tech?.name;
  }

  /** GET item by id. */
  /* getItem(id: string): Observable<Item> {
    const url = `${environment.apiURL}/${id}`;
    return this.http
      .get<Item>(url)
      .pipe(catchError(this.handleError<Item>(`getItem id=${id}`)));
  }*/

  /** POST: add a new item */
  addItem(technician: Technician): Observable<Technician> {
    return this.http
      .post<Technician>(
        environment.apiURL + '/Technicians_lite',
        technician,
        this.httpOptions
      )
      .pipe(
        map((reponse) => {
          this.getItems().subscribe();

          return reponse;
        }),
        catchError(this.handleError<Technician>('addItem'))
      );
  }

  /** PUT: update the item */
  updateItem(technician: Technician): Observable<Technician> {
    return this.http
      .put(
        environment.apiURL + '/Technicians_lite/' + technician.technicianID,
        technician,
        this.httpOptions
      )
      .pipe(catchError(this.handleError<Technician>('updateItem')));
  }

  /** DELETE: delete the item */
  deleteItem(id: string): Observable<Technician> {
    const url = `${environment.apiURL + '/Technicians_lite'}/${id}`;
    return this.http.delete<Technician>(url, this.httpOptions).pipe(
      map((reponse) => {
        this.getItems().subscribe();
        return reponse;
      }),
      catchError(this.handleError<Technician>('deleteItem'))
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
