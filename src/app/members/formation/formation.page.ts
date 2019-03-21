import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.page.html',
  styleUrls: ['./formation.page.scss'],
})
export class FormationPage implements OnInit {
  formation:any[];
  currentUser:string;

  constructor(private router: Router, private authService: AuthenticationService, private storage: Storage) { }

  // Create the logged user from the currentUser
  ngOnInit() {
    this.storage.get("currentUser")
    .then((val) => {
      if (val !== null) {
        this.currentUser = val;
        this.storage.get(val).then(user => {
          if (user !== null) {
            let parsedUser = JSON.parse(user);
            if (parsedUser.formation !== undefined) {
              this.formation = parsedUser.formation;
            } else {
              this.formation = [];
            }
          }
        });
      } else {
        this.router.navigateByUrl('/public/login');
      };
    });
  }

  logout() {
    this.storage.set("currentUser", null);
    this.authService.logout();
  }
}
