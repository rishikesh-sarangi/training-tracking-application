import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
  NgForm,
} from '@angular/forms';
import { ProgramsTableService } from 'src/app/components/admin/Services/programs-table.service';
import { TeachersTableService } from 'src/app/components/admin/Services/teachers-table.service';
import { CourseTableDataService } from 'src/app/components/admin/Services/course-table-data.service';
@Component({
  selector: 'app-batches-program-courses-add',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './batches-program-courses-add.component.html',
  styleUrls: ['./batches-program-courses-add.component.scss'],
})
export class BatchesProgramCoursesAddComponent implements OnInit {
  addBatchProgramCoursesReactiveForm!: FormGroup;
  displayedColumns: string[] = ['actions', 'code', 'courseName', 'teacherName'];

  @Input() programCode!: string;

  // this courses here is program specific
  courses: string[] = [];
  courseCode: string[] = [];
  teachers: string[] = [];
  constructor(
    private programService: ProgramsTableService,
    private teacherService: TeachersTableService,
    private courseService: CourseTableDataService
  ) {}

  ngOnInit(): void {
    this.getCourses();
    this.getTeachers();
    this.addBatchProgramCoursesReactiveForm = new FormGroup({
      code: new FormControl(null, Validators.required),
      courseName: new FormControl(null, Validators.required),
      teacherName: new FormControl(null, Validators.required),
    });
  }

  // courses from a particular program
  getCourses() {
    this.programService.getProgramByCode(this.programCode).subscribe({
      next: (data) => {
        for (const course of data[0].courses) {
          this.courseService.getCoursesCodeByName(course).subscribe({
            next: (data) => {
              this.courses.push(data[0].course);
              this.courseCode.push(data[0].code);
            },
          });
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getTeachers() {
    this.teacherService.getTeachers().subscribe({
      next: (data) => {
        for (const teacher of data) {
          this.teachers.push(teacher.teacherName);
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  onSubmit() {}

  onProgramChange(event: any) {
    const index = this.courses.indexOf(event.value);
    const code = this.courseCode[index];
    this.addBatchProgramCoursesReactiveForm.get('code')?.setValue(code);
  }

  @Output() isAddClicked: EventEmitter<boolean> = new EventEmitter<boolean>();
  closeForm() {
    this.isAddClicked.emit(false);
    // console.log(this.isAddClicked);
  }
}
