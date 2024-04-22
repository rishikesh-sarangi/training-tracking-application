import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { TableData } from '../../models/courses-table.model';

@Component({
  selector: 'app-courses-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.scss'],
})
export class CoursesTableComponent {
  displayedColumns: string[] = [
    'actions',
    'code',
    'course',
    'theoryTime',
    'practiceTime',
    'description',
    'topics',
  ];
  dataSource: TableData[] = [
    {
      code: 'CS101',
      course: 'Introduction to Computer Science',
      theoryTime: '3 hours',
      practiceTime: '2 hours',
      description: 'An introductory course to computer science...',
      topics: 'Programming basics, algorithms, data structures',
    },
    // Add more data objects as needed
  ];
}
