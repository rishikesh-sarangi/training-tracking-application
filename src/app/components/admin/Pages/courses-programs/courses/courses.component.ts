import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
  protected isAddCourseClicked: boolean = false;
  displayedColumns: string[] = [
    'column1',
    'column2',
    'column3',
    'column4',
    'column5',
    'column6',
    'column7',
  ];
  dataSource = [
    {
      column1: '',
      column2: '',
      column3: '',
      column4: '',
      column5: '',
      column6: '',
      column7: '',
    },
  ];
  protected addCourse() {
    this.isAddCourseClicked = !this.isAddCourseClicked;
  }
}
