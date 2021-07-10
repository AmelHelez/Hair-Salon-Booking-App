import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SalonTreatments } from '../models/salonTreatments';

const API = environment.salonTreatmentApi;

@Injectable({
  providedIn: 'root'
})
export class SalonTreatmentService {

constructor(private http: HttpClient) { }

getAllSalonTreatments(): Observable<SalonTreatments[]> {
  return this.http.get<SalonTreatments[]>(API);
}

getSalonTreatment(id: number) {
  return this.getAllSalonTreatments().pipe(
    map(treatment => {
      return treatment.find(t => t.id === id);
    })
  )
}

addSalonTreatment(salonTreatment: SalonTreatments) {
  return this.http.post(`${API}/add`, salonTreatment);
}

updateSalonTreatment(id: number, salonTreatment: SalonTreatments) {
  return this.http.put(`${API}/${id}`, salonTreatment);
}

deleteSalonTreatment(id: number) {
  return this.http.delete(`${API}/${id}`);
}

}
