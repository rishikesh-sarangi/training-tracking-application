import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class TopicsTableDataService {
  constructor(private _http: HttpClient) {}

  Index: string = 'http://localhost:3000/topics';

  addTopics(code: string, newData: any): Observable<any> {
    // Fetch existing data
    return this._http.get<any[]>(this.Index).pipe(
      map((data: any[]) => {
        const existingTopic = data.find((topic) => topic.code === code);
        if (existingTopic) {
          // If topic with given code exists, append newData to its topic array
          existingTopic.topic.push(newData);
          console.log(existingTopic);
          // Update the topic in the database
          return this._http.put(
            `${this.Index}/${existingTopic.id}`,
            existingTopic
          );
        } else {
          // If topic with given code doesn't exist, return an error or handle accordingly
          throw new Error(`Topic with code ${code} not found.`);
        }
      })
    );
  }

  getTopics(): Observable<any> {
    return this._http.get(`${this.Index}`);
  }

  deleteTopics(topicName: string): Observable<any> {
    return this._http.delete(`${this.Index}/${topicName}`);
  }

  editTopics(id: string, data: any): Observable<any> {
    return this._http.put(`${this.Index}/${id}`, data);
  }
}
