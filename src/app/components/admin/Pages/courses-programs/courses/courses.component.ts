import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { OverlayModule } from '@angular/cdk/overlay';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
  NgForm,
} from '@angular/forms';

interface CourseForm {
  code: string;
  course: string;
  theory: number | null;
  practice: number | null;
}

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
    ReactiveFormsModule,
    MatMenuModule,
    OverlayModule,
  ],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
  displayedColumns: string[] = [
    'actions',
    'code',
    'course',
    'theoryTime',
    'practiceTime',
    'description',
    'topics',
  ];
  protected isAddCourseClicked: boolean = false;
  protected isDescOpen = false;
  protected isTopicsOpen = false;
  // REACTIVE FORM
  isFormValid = false;

  addCourseReactiveForm!: FormGroup;

  ngOnInit(): void {
    this.addCourseReactiveForm = new FormGroup({
      code: new FormControl(null, Validators.required),
      course: new FormControl(null, Validators.required),
      theoryTime: new FormControl(null, Validators.required),
      practiceTime: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      addTopics: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    console.log(this.addCourseReactiveForm);
  }

  closeForm() {
    this.addCourseReactiveForm.reset();
    // this.isAddCourseBtnClicked = !this.isAddCourseBtnClicked;
  }

  protected addCourse() {
    this.isAddCourseClicked = !this.isAddCourseClicked;
  }
}
