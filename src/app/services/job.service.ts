import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { Job } from '../models/job';
import { environment } from 'src/environments/environment';
import { Item } from '../models/item';
import { Mine } from '../models/mine';
import { LampItem } from '../models/lampItem';
import { JobLamp } from '../models/jobLamp';
import { SpinnerService } from './spinnerService';
import { UJobStatus } from '../enums/uJobStatus.enum';
import { JobLampStatus } from '../enums/jobLampStatus.enum';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  navNumber = 0;
  jobSelected?: Job = undefined;

  jobs: Job[] = [];
  mines: Mine[] = [];

  newLampItems: JobLamp[] = [];
  selectedJobLamp: JobLamp = new JobLamp();

  constructor(
    private http: HttpClient,
    private spinnerService: SpinnerService
  ) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getJobs(): Observable<Job[]> {
    this.spinnerService.showSpinner();
    return this.http.get<Job[]>(environment.apiURL + '/u_Job_liteC').pipe(
      map((response) => {
        this.jobs.length = 0;
        this.jobs = response;
        this.spinnerService.hideSpinner();
        return response;
      }),
      catchError(this.handleError<Job[]>('getJobs', []))
    );
  }

  getJobByID(JobID: string): Observable<Job> {
    this.spinnerService.showSpinner();

    return this.http
      .get<Job>(environment.apiURL + '/u_Job_liteC/' + JobID)
      .pipe(
        map((response) => {
          this.jobSelected = response;

          this.spinnerService.hideSpinner();
          return response;
        }),
        catchError(this.handleError<Job>('getJobs', new Job()))
      );
  }

  getCompleted(): Observable<Job[]> {
    this.spinnerService.showSpinner();
    return this.http
      .get<Job[]>(environment.apiURL + '/u_Job_liteC/completed')
      .pipe(
        map((response) => {
          this.jobs.length = 0;
          this.jobs = response;
          this.spinnerService.hideSpinner();
          return response;
        }),
        catchError(this.handleError<Job[]>('getJobs', []))
      );
  }

  getMines(): Observable<Mine[]> {
    return this.http.get<Mine[]>(environment.apiURL + '/Mine/GetMines').pipe(
      map((response) => {
        this.mines.length = 0;
        this.mines = response;

        return response;
      }),
      catchError(this.handleError<Job[]>('getMines', []))
    );
  }

  addJob(job: Job): Observable<Job> {
    return this.http
      .post<Job>(`${environment.apiURL}/u_Job_liteC`, job, this.httpOptions)
      .pipe(
        map((response) => response),
        catchError((error: HttpErrorResponse) => {
          // ✅ Handle specific HTTP status codes
          if (error.status === 409) {
            console.error('Job conflict detected:', error);
            return throwError(
              () => new Error('A job with the same details already exists.')
            );
          }

          // 🔹 Default handler (other errors)
          return this.handleError<Job>('addJob')(error);
        })
      );
  }

  updateJob(job: Job): Observable<Job> {
    return this.http
      .put<Job>(
        environment.apiURL + '/u_Job_liteC/' + job.jobID,
        job,
        this.httpOptions
      )
      .pipe(
        map((reponse) => {
          return reponse;
        }),
        catchError(this.handleError<Job>('updateJob'))
      );
  }

  removeJob(jobItem: string | undefined): Observable<any> {
    this.spinnerService.showSpinner();
    return this.http
      .delete<any>(
        environment.apiURL + '/u_Job_liteC/' + jobItem,
        this.httpOptions
      )
      .pipe(
        map((response) => {
          this.spinnerService.hideSpinner();

          let lampIndex = this.jobs?.findIndex((x) => x.jobID === response);

          if (lampIndex != undefined) this.jobs.splice(lampIndex, 1);

          return response;
        }),
        catchError(this.handleError<Job>('updateJob'))
      );
  }

  updateJobStatus(job: Job, JobStatus: UJobStatus): Observable<Job> {
    return this.http
      .put<Job>(
        environment.apiURL + '/u_Job_liteC/' + JobStatus + '/JobStatus',
        job,
        this.httpOptions
      )
      .pipe(
        map((reponse) => {
          return reponse;
        }),
        catchError(this.handleError<Job>('updateJob'))
      );
  }

  addJobLamps(jobID: string | undefined, jobLamps: JobLamp[]): Observable<Job> {
    this.spinnerService.showSpinner();
    return this.http
      .post<Job>(
        environment.apiURL + '/u_Job_liteC/' + jobID + '/lamps',
        jobLamps,
        this.httpOptions
      )
      .pipe(
        map((response) => {
          this.spinnerService.hideSpinner();

          console.log(response);

          this.jobSelected = response;

          let job = this.jobs.find((x) => x.jobID === jobID);
          if (job) {
            job = response;
          }

          return response;
        }),
        catchError(this.handleError<Job>('updateJob'))
      );
  }

  removeJobLamp(lampItemID: string | undefined): Observable<any> {
    this.spinnerService.showSpinner();
    return this.http
      .delete<any>(
        environment.apiURL + '/u_Job_liteC/' + lampItemID + '/lamps',
        this.httpOptions
      )
      .pipe(
        map((response) => {
          this.spinnerService.hideSpinner();

          if (response == true) {
            let lampIndex = this.jobSelected?.jobLamps?.findIndex(
              (x) => x.itemLampID === lampItemID
            );

            console.log(lampIndex);

            if (lampIndex != undefined)
              this.jobSelected?.jobLamps?.splice(lampIndex, 1);
          }

          return response;
        }),
        catchError(this.handleError<Job>('updateJob'))
      );
  }

  updateJobLampStatus(joblamps: JobLamp): Observable<Job> {
    this.spinnerService.showSpinner();

    return this.http
      .put<Job>(
        environment.apiURL + '/u_Job_liteC/JobLampItems',
        joblamps,
        this.httpOptions
      )
      .pipe(
        map((reponse) => {
          this.spinnerService.hideSpinner();
          return reponse;
        }),
        catchError(this.handleError<Job>('updateJob'))
      );
  }

  updateJobLamp(joblamps: JobLamp, jobStatus: JobLampStatus): Observable<Job> {
    this.spinnerService.showSpinner();

    return this.http
      .patch<Job>(
        environment.apiURL + '/u_Job_liteC/JobLampItems/' + jobStatus,
        joblamps,
        this.httpOptions
      )
      .pipe(
        map((reponse) => {
          this.spinnerService.hideSpinner();
          return reponse;
        }),
        catchError(this.handleError<Job>('updateJob'))
      );
  }

  updateJobLampHead(joblamps: JobLamp): Observable<Job> {
    this.spinnerService.showSpinner();

    return this.http
      .patch<Job>(
        environment.apiURL + '/u_Job_liteC/JobLampItems',
        joblamps,
        this.httpOptions
      )
      .pipe(
        map((reponse) => {
          this.spinnerService.hideSpinner();
          return reponse;
        }),
        catchError((error) => {
          this.spinnerService.hideSpinner();
          // Log the error or handle it here, but re-throw it to pass it to the subscriber
          console.error('Error in updateJobLampHead:', error);
          return throwError(() => error); // Re-throw to let the subscriber handle it
        })
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console
      this.spinnerService.hideSpinner();
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
