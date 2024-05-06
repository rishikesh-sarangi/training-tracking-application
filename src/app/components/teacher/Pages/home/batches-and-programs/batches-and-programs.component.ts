import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { BatchServiceService } from 'src/app/components/admin/Services/batch-service.service';

@Component({
  selector: 'app-batches-and-programs',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './batches-and-programs.component.html',
  styleUrls: ['./batches-and-programs.component.scss'],
})
export class BatchesAndProgramsComponent {
  batches: string[] = [];
  programs: string[] = [];

  constructor(private batchService: BatchServiceService) {}
}
