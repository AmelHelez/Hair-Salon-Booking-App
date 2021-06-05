import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Appointment } from '../models/appointment';
import { Salon } from '../models/salon';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http: HttpClient) { }

  getAllAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>("https://localhost:44393/api/appointments");
  }

  getAppointment(id: number) {
    return this.getAllAppointments().pipe(
      map(appointment => {
        return appointment.find(a => a.id === id);
      })
    );
  }
  addAppointment(appointment: Appointment) {
    return this.http.post("https://localhost:44393/api/appointments", appointment);
  }
}
