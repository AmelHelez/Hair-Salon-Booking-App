import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Treatment } from '../models/treatment';
import { environment } from 'src/environments/environment';

const API = environment.treatmentApi;

@Injectable({
  providedIn: 'root'
})
export class TreatmentService {

constructor(private http: HttpClient) { }

getAllTreatments(): Observable<Treatment[]> {
  return this.http.get<Treatment[]>(API);
}

getTreatment(id: number) {
  return this.getAllTreatments().pipe(
    map(treatment => {
      return treatment.find(t => t.id === id);
    })
  )
}

addTreatment(treatment: Treatment) {
  return this.http.post(`${API}/add`, treatment);
}

updateTreatment(id: number, treatment: Treatment) {
  return this.http.put(`${API}/${id}`, treatment);
}

}
