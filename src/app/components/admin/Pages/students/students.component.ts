import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
  NgForm,
  FormsModule,
} from '@angular/forms';
import { CourseTableDataService } from '../../Services/course-table-data.service';
@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent {
  isAddStudentClicked: boolean = false;
  addStudentReactiveForm!: FormGroup;
  displayedColumns: string[] = [
    'actions',
    'studentCode',
    'studentName',
    'emailID',
  ];

  ngOnInit(): void {
    this.addStudentReactiveForm = new FormGroup({
      studentCode: new FormControl(null, Validators.required),
      studentName: new FormControl(null, Validators.required),
      emailID: new FormControl(null, [Validators.required, Validators.email]),
    });
  }
  onSubmit() {}
  closeForm() {
    this.addStudentReactiveForm.reset();
    this.isAddStudentClicked = !this.isAddStudentClicked;
  }
}
