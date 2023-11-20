import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { People } from '../../dto/people';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'org-people-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, HttpClientModule, MatButtonModule],
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeopleListComponent implements OnChanges {
  displayedColumns: string[] = ['Name', 'Height'];

  readonly dataSource = new MatTableDataSource<People>();

  @Input()
  people!: People[];

  constructor(private ref: ChangeDetectorRef) {}

  ngOnChanges(): void {
    this.dataSource.data = this.people;
    this.ref.detectChanges();
  }
}
