import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProgramsTable } from '../Pages/courses-programs/models/programs-table.model';

@Injectable({
  providedIn: 'root',
})
export class ProgramsTableService {
  constructor(private _http: HttpClient) {}

  Index: string = 'http://localhost:3000/programs';

  addPrograms(data: ProgramsTable) {
    return this._http.post(this.Index, data);
  }

  getPrograms() {
    return this._http.get(this.Index);
  }
  editProgram(id: string, data: ProgramsTable) {
    return this._http.patch(`${this.Index}/${id}`, data);
  }

  deleteProgram(id: string) {
    return this._http.delete(`${this.Index}/${id}`);
  }
}
