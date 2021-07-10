import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'

import { Salon } from 'src/app/models/salon';
import { User } from 'src/app/models/user';
import { ReviewClass } from '../../models/reviewClass';
import { SalonService } from 'src/app/salon/salon.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ReviewService } from 'src/app/services/review.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-reviews',
  templateUrl: './user-reviews.component.html',
  styleUrls: ['./user-reviews.component.css']
})
export class UserReviewsComponent implements OnInit {
  salonId: number;
  userId: number;
  salon: Salon;
  user: User;
  addReviewForm: FormGroup;
  review = new ReviewClass();
  currentRate = 3;

  constructor(private reviewService: ReviewService, private alertify: AlertifyService,
    private route: ActivatedRoute, private userService: UserService,
    private salonService: SalonService, private fb: FormBuilder, private location: Location) { }

  ngOnInit(): void {
    this.getSalonAndUser();
    this.createAddReviewForm();
  }

  getSalonAndUser() {
    this.salonId = +this.route.snapshot.params['id'];
    this.userId = +localStorage.getItem("userId");
    this.salonService.getSalon(this.salonId).subscribe(
      data => this.salon = data
    )
    this.userService.getUser(this.userId).subscribe(
      data => this.user = data
    )
  }

  createAddReviewForm() {
    this.addReviewForm = this.fb.group({
      grade: [null],
      comment: [null]
    });
  }

  onBack() {
    this.location.back();
  }

  get grade() {
    return this.addReviewForm.get('grade') as FormControl;
  }

  get comment() {
    return this.addReviewForm.get('comment') as FormControl;
  }

  mapReview(): void {
     this.review.grade = +this.grade.value;
     this.review.comment = this.comment.value;
     this.review.dateReviewed = new Date();
     this.review.salonId = this.salonId;
     this.review.userId = this.userId;
  }

  onSubmit() {
    console.log("Details:", this.addReviewForm.value);
    this.mapReview();
    this.reviewService.addReview(this.review).subscribe(() => this.isSuccessful()
  )}

  isSuccessful() {
    this.alertify.success("You have successfully added a review for this salon.");
    this.location.back();
  }

}
