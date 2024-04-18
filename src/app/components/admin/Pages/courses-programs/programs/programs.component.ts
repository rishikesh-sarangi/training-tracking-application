import { AfterViewInit, Component ,ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {MatTableModule,MatTableDataSource} from '@angular/material/table';
import {LiveAnnouncer} from '@angular/cdk/a11y';

export interface DataElement {
  code: string;
  programName: string;
  theoryTime: string;
  practiceTime: string;
  description: string;
  courses: string;
  actions: string;
}

const DATA: DataElement[] = [
  {actions: '', code: '1', programName: 'Hydrogen', theoryTime: '2hrs', practiceTime: '2hrs', description: "lorrem", courses: 'loremmsdbfb'},
  {actions: '', code: '2', programName: 'Hydrogen', theoryTime: '3hrs', practiceTime: '1hrs', description: "lorrem", courses: 'Rajesh'},
  {actions: '', code: '3', programName: 'Hydrogen', theoryTime: '4hrs', practiceTime: '7hrs', description: "lorrem", courses: 'loremmsdbfb'},
];

@Component({
  standalone: true,
  imports: [CommonModule, MatTableModule,MatSortModule],
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss']
})
export class ProgramsComponent implements AfterViewInit {
  displayedColumns: string[] = ['actions','code', 'programName', 'theoryTime', 'practiceTime', 'description', 'courses'];
  // dataSource = DATA;
  dataSource = new MatTableDataSource(DATA);
  constructor(private _liveAnnouncer: LiveAnnouncer) {}
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
