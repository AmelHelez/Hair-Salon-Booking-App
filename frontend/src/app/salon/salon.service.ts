import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';
import { Salon } from '../models/salon';


@Injectable({
  providedIn: 'root'
})
export class SalonService {


  constructor(private http: HttpClient) { }

  getAllSalons(): Observable<Salon[]> {
    return this.http.get("https://localhost:44393/api/salons").pipe(
      map(data => {
        const propertiesArray: Array<Salon> = [];
        const localProperties = JSON.parse(localStorage.getItem('newSalon'));;

        if (localProperties) {
          for (const id in localProperties) {
              if(localProperties.hasOwnProperty(id)) {
                propertiesArray.push(localProperties[id]);
              }
            else {
              propertiesArray.push(localProperties[id]);
            }
          }
        }

        for (const id in data) {
            if(data.hasOwnProperty(id)) {
              propertiesArray.push(data[id]);
            }
          else {
            propertiesArray.push(data[id]);
          }
        }
        return propertiesArray;
      })
    );
    }

  getSalon(id: number) {
    return this.getAllSalons().pipe(
      map(salon => {
        return salon.find(s => s.id === id);
      })
    );
  }

  addSalon(salon: Salon) {
    return this.http.post("https://localhost:44393/api/salons/add", salon);
  }

  updateSalon(salonid: number, salon: Salon) {
    return this.http.put("https://localhost:44393/api/salons/" + salonid, salon);
  }

  addProperty(salon: Salon) {
    let newSalon = [salon];

    //Add a new salon in array if newSalon already exists in local storage
    if (localStorage.getItem('newSalon')) {
      newSalon = [salon,
                 ...JSON.parse(localStorage.getItem('newSalon'))];
    }
    localStorage.setItem('newSalon', JSON.stringify(newSalon));

    return this.http.post("https://localhost:44393/api/salons/add", salon);
  }

  /*dodajSalon(salon: Salon) {
    return this.http.post("https://localhost:44393/api/salons/add", salon);
  }*/

  addPropID() {
    if (localStorage.getItem('SID')) {
      localStorage.setItem('SID', String(+localStorage.getItem('SID') + 1));
      return +localStorage.getItem('SID');
    } else {
      localStorage.setItem('SID', '101');
      return 101;
    }
  }
}
