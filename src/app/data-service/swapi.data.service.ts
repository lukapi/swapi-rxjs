import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PeopleResponse } from '../dto/people';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SwapiDataService {
  constructor(private httpClient: HttpClient) {}

  public getPeople$() {
    return this.httpClient
      .get<PeopleResponse>('https://swapi.dev/api/people')
      .pipe(map((response) => response.results));
  }
}
