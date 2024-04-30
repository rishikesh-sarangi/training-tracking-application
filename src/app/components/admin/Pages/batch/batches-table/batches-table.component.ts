import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  MatTreeFlattener,
  MatTreeFlatDataSource,
} from '@angular/material/tree';

const TREE_DATA: any = {
  batches: [
    {
      batchCode: '1D2125',
      batchName: 'Batch 1',
      batchStartDate: '2024-04-01T18:30:00.000Z',
      id: 1,
      programs: [
        {
          code: '1D2125',
          prograName: 'PHP',
          students: ['Mohit Singh', 'Neha Mohan', 'Rishikesh Sarangi'],
          courses: [
            {
              code: '1D2125',
              coursName: 'PHP',
              teacherName: ['Harshdeep Singh', 'Rishikesh Sarangi', 'Sujeet'],
            },
          ],
        },
      ],
    },
  ],
};

@Component({
  selector: 'app-batches-table',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './batches-table.component.html',
  styleUrls: ['./batches-table.component.scss'],
})
export class BatchesTableComponent implements OnInit {
  private transformer = (node: any, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      code: node.code,
      startDate: node.startDate,
      id: node.id,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<any>(
    (node) => node.level,
    (node) => this.hasBatchChild(node.level, node)
  );

  treeFlattener = new MatTreeFlattener(
    this.transformer,
    (node) => node.level,
    (node) => this.hasBatchChild(node.level, node),
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = this.transformData(TREE_DATA);
  }

  ngOnInit() {}

  hasBatchChild = (_: number, node: any) =>
    node.children && node.children.length > 0;
  hasProgramChild = (_: number, node: any) =>
    node.children && node.children.length > 0;
  hasCourseChild = (_: number, node: any) =>
    node.children && node.children.length > 0;

  transformData(data: any): any[] {
    return data.batches.map((batch: any) => ({
      name: batch.batchName,
      code: batch.batchCode,
      startDate: new Date(batch.batchStartDate),
      id: batch.id,
      children: batch.programs.map((program: any) => ({
        name: program.prograName,
        code: program.code,
        children: program.courses.map((course: any) => ({
          name: course.coursName,
          code: course.code,
          children: course.teacherName.map((teacher: string) => ({
            name: teacher,
            children: [],
          })),
        })),
      })),
    }));
  }
}
