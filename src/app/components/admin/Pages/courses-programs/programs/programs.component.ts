
import { Component, OnInit } from '@angular/core';
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
import { CourseTableDataService } from '../../../Services/course-table-data.service';
import { ProgramsTableService } from '../../../Services/programs-table.service';
import { ProgramsTableComponent } from './programs-table/programs-table.component';
@Component({
  selector: 'app-programs',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ProgramsTableComponent,
  ],
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss'],
})
export class ProgramsComponent implements OnInit {
  constructor(
    private courseTableData: CourseTableDataService,
    private programService: ProgramsTableService
  ) {}


