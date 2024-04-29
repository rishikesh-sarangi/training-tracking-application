import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { NgFor } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
  NgForm,
} from '@angular/forms';
import { CourseTableDataService } from '../../Services/course-table-data.service';
@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss'],
})
export class TeachersComponent implements OnInit {
  constructor(private courseTableData: CourseTableDataService) {}

  protected isAddTeacherClicked: boolean = false;
  protected addTeacherReactiveForm!: FormGroup;

  courses: string[] = [];
  ngOnInit(): void {
    this.courseTableData.getCourses().subscribe({
      next: (data) => {
        for (const obj of data) {
          this.courses.push(obj.course);
        }
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log(this.courses);
      },
    });

    this.addTeacherReactiveForm = new FormGroup({
      teacherName: new FormControl(null, Validators.required),
      courseAssigned: new FormControl(null, Validators.required),
      emailID: new FormControl(null, [Validators.required, Validators.email]),
    });
  }

  displayedColumns: string[] = [
    'actions',
    'teacherName',
    'courseAssigned',
    'emailID',
  ];

  protected onSubmit() {}

  protected closeForm() {
    this.addTeacherReactiveForm.reset();
    this.isAddTeacherClicked = !this.isAddTeacherClicked;
  }
}
