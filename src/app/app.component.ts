import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PeopleListComponent } from './components/people-list/people-list.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import {
  MatProgressSpinnerModule,
  ProgressSpinnerMode,
} from '@angular/material/progress-spinner';
import { ThemePalette } from '@angular/material/core';
import { PeopleFacade } from './+state/people.facade';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    AsyncPipe,
    PeopleListComponent,
    MatProgressSpinnerModule,
  ],
  selector: 'org-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
  title = 'org';

  mode: ProgressSpinnerMode = 'indeterminate';
  color: ThemePalette = 'primary';

  readonly people$ = this.peopleFacade.people$;
  readonly loading$ = this.peopleFacade.loading$;

  constructor(readonly peopleFacade: PeopleFacade) {}
}
