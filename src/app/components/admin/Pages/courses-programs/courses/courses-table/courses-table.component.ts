import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableData } from '../../models/courses-table.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CourseTableDataService } from 'src/app/components/admin/Services/course-table-data.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatMenuModule } from '@angular/material/menu';
import {
  MatDialog,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
  NgForm,
  FormsModule,
} from '@angular/forms';
import { DeleteDialogueComponent } from './delete-dialogue/delete-dialogue.component';

@Component({
  selector: 'app-courses-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    OverlayModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.scss'],
})
export class CoursesTableComponent implements OnInit {
  constructor(
    private courseTableData: CourseTableDataService,
    public _deleteDialog: MatDialog
  ) {}

  // reactive form
  protected editCourseReactiveForm!: FormGroup;

  displayedColumns: string[] = [
    'actions',
    'code',
    'course',
    'theoryTime',
    'practiceTime',
    'description',
    'addTopics',
  ];
  dataSource!: MatTableDataSource<TableData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // READ DATA
  ngOnInit(): void {
    // get the list of courses when page is loaded
    this.getCoursesList();

    // reactive form init
    this.editCourseReactiveForm = new FormGroup({
      code: new FormControl(null, Validators.required),
      course: new FormControl(null, Validators.required),
      theoryTime: new FormControl(null, Validators.required),
      practiceTime: new FormControl(null, Validators.required),
      description: new FormControl(null, [
        Validators.required,
        Validators.maxLength(40),
      ]),
      addTopics: new FormControl(null, [
        Validators.required,
        Validators.maxLength(40),
      ]),
    });
  }
  getCoursesList() {
    this.courseTableData.getCourses().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('data has been fetched !');
      },
    });
  }

  // DELETE DATA
  deleteCourse(id: string, code: string, course: string) {
    const dialogRef = this._deleteDialog.open(DeleteDialogueComponent, {
      data: { targetCode: code, targetCourse: course },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.courseTableData.deleteCourses(id).subscribe({
          next: (data) => {
            console.log('emp deleted');
            this.getCoursesList();
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {
            console.log('data has been deleted !');
          },
        });
      }
    });
  }

  // EDIT DATA
  editingRowID: number | null = null;
  editCourse(i: number, row: TableData) {
    // console.log(row);
    this.editingRowID = i;
    this.populateEditFields(row);
  }

  populateEditFields(row: TableData) {
    this.editCourseReactiveForm.patchValue({
      code: row.code,
      course: row.course,
      theoryTime: row.theoryTime,
      practiceTime: row.practiceTime,
      description: row.description,
      addTopics: row.addTopics,
    });
  }

  cancelEditing() {
    this.editingRowID = null;
  }

  saveCourse(row: any) {
    // console.log(row.id);
    if (this.editCourseReactiveForm.valid) {
      this.courseTableData
        .editCourses(row.id, this.editCourseReactiveForm.value)
        .subscribe({
          next: (data) => {
            console.log(data);
            this.editingRowID = null;
            this.getCoursesList();
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {
            console.log('data has been edited !');
          },
        });
    }
  }

  // overlay stuff
  protected isDescOpen = false;
  protected isTopicsOpen = false;

  // logic for letters / 40 in desc
  protected lettersTypedDesc: number = 0;
  protected lettersTypedTopics: number = 0;
  protected onInputChange(event: any, type: string) {
    if (type == 'description') {
      this.lettersTypedDesc = event.target.value.length;
      return;
    }
    this.lettersTypedTopics = event.target.value.length;
  }
}
