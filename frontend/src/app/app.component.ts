import { Component } from '@angular/core';
// import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/database';
// import 'firebase/firestore';
// import 'firebase/storage';

// const config = {
//   apiKey: 'AIzaSyBMm8tVl7yml7SoT-o4tHZHf-UsLT1Akq4',
//   databaseURL: 'https://angularchat-70bb8-default-rtdb.firebaseio.com'
// };

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'appointer';

  constructor() {
    // firebase.initializeApp(config);
  }
}
