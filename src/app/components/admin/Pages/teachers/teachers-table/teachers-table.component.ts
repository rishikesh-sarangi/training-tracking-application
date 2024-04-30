import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
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
import { MatTableDataSource } from '@angular/material/table';
import { TeachersTableData } from '../../../shared/models/teachers-table.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { TeachersTableService } from '../../../Services/teachers-table.service';
import { CourseTableDataService } from '../../../Services/course-table-data.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogueComponent } from '../../../shared/delete-dialogue/delete-dialogue.component';
@Component({
  selector: 'app-teachers-table',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './teachers-table.component.html',
  styleUrls: ['./teachers-table.component.scss'],
})
export class TeachersTableComponent implements OnInit, OnChanges {
  constructor(
    private teachersService: TeachersTableService,
    private coursesService: CourseTableDataService,
    private _dialog: MatDialog
  ) {}
  editTeachersReactiveForm!: FormGroup;
  editingRowID: number | null = null;
  courses: string[] = [];
  displayedColumns: string[] = [
    'actions',
    'teacherName',
    'courseAssigned',
    'emailID',
  ];
  dataSource!: MatTableDataSource<TeachersTableData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getTeachers();
    this.coursesService.getCourses().subscribe({
      next: (data) => {
        for (const obj of data) {
          this.courses.push(obj.course);
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
    this.editTeachersReactiveForm = new FormGroup({
      teacherName: new FormControl(null, Validators.required),
      courseAssigned: new FormControl(null, Validators.required),
      emailID: new FormControl(null, [Validators.required, Validators.email]),
    });
  }
  // Search Filter
  @Input() filterValue: string = ' ';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filterValue']) {
      this.applyFilter(this.filterValue);
    }
  }
  applyFilter(filterValue: string) {
    // console.log(this.dataSource);
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }

  getTeachers() {
    this.teachersService.getTeachers().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  saveTeacher(row: TeachersTableData) {
    if (this.editTeachersReactiveForm.valid) {
      this.teachersService
        .editTeachers(row.id, this.editTeachersReactiveForm.value)
        .subscribe({
          next: (data) => {
            this.editingRowID = null;
            this.getTeachers();
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }

  editTeacher(id: number, row: TeachersTableData) {
    // console.log(row);
    this.editingRowID = id;
    this.editTeachersReactiveForm.patchValue(row);
  }

  protected cancelEditing() {
    this.editingRowID = null;
    this.editTeachersReactiveForm.reset();
  }

  protected deleteTeacher(id: string, teacherName: string) {
    const dialogRef = this._dialog.open(DeleteDialogueComponent, {
      data: { targetTeacherName: teacherName },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.teachersService.deleteTeachers(id).subscribe({
          next: (data) => {
            this.getTeachers();
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
  }

  getRemainingCoursesWithNumbers(courses: string[]): string {
    const remainingCourses = courses.slice(2);
    const numberedCourses = remainingCourses.map(
      (course, index) => `${index + 1}.${course}`
    );
    return numberedCourses.join('\n'); // Join with a newline character
  }
}
