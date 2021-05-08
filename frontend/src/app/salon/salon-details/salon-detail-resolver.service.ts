import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Salon } from 'src/app/models/salon';
import { SalonService } from '../salon.service';

@Injectable({
  providedIn: 'root'
})
export class SalonDetailResolverService implements Resolve<Salon> {

constructor(private router: Router, private salonService: SalonService) { }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  Salon | Observable<Salon> | Promise<Salon> {
    const sId = route.params['id'];
    return this.salonService.getSalon(+sId).pipe(
      catchError(error => {
        this.router.navigate(['/']);
        return of(null);
      })
    )
  }

}
