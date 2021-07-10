import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '../models/review';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

const API = environment.reviewApi;

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

constructor(private http: HttpClient) { }

getAllReviews(): Observable<Review[]> {
  return this.http.get<Review[]>(API);
}

getReview(id: number) {
  return this.getAllReviews().pipe(
    map(review => {
      return review.find(r => r.id === id);
    })
  )
}

addReview(review: Review) {
  return this.http.post(`${API}`, review);
}

deleteReview(id: number) {
  return this.http.delete(`${API}/${id}`);
}
}
