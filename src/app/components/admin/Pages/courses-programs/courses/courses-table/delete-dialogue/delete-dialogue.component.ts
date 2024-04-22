import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import {
  MatDialog,
  MatDialogRef,
  MatDialogModule,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { CoursesTableComponent } from '../courses-table.component';
import { CourseTableDataService } from 'src/app/components/admin/Services/course-table-data.service';

interface CourseData {
  targetCode: string;
  targetCourse: string;
}

@Component({
  selector: 'app-delete-dialogue',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatDialogModule,
  ],
  templateUrl: './delete-dialogue.component.html',
  styleUrls: ['./delete-dialogue.component.scss'],
})
export class DeleteDialogueComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: CourseData) {}
}
