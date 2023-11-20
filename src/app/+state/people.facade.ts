import { Injectable, OnDestroy } from '@angular/core';
import { PeopleState } from './people.state';
import {
  BehaviorSubject,
  Subject,
  distinctUntilChanged,
  map,
  takeUntil,
} from 'rxjs';
import { SwapiDataService } from '../data-service/swapi.data.service';

let _state: PeopleState = {
  people: [],
  loading: false,
};

@Injectable({
  providedIn: 'root',
})
export class PeopleFacade implements OnDestroy {
  private destroy$: Subject<any> = new Subject<any>();

  private store = new BehaviorSubject<PeopleState>(_state);
  private state$ = this.store.asObservable();

  loading$ = this.state$.pipe(map((state) => state.loading));

  people$ = this.state$.pipe(
    map((state) => state.people),
    distinctUntilChanged()
  );

  private updateState(state: PeopleState) {
    this.store.next((_state = state));
  }

  constructor(private swapiDataService: SwapiDataService) {
    this.updateState({ ..._state, loading: true });
    this.swapiDataService
      .getPeople$()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (response) =>
          this.updateState({ ..._state, people: response, loading: false }),
        () => this.updateState({ ..._state, people: [], loading: false })
      );
  }

  ngOnDestroy() {
    this.destroy$.next(0);
    this.destroy$.complete();
  }
}
