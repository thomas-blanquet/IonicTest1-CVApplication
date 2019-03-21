import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})

export class ContactPage implements OnInit {
  contact:string[];
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
            if (parsedUser.contact !== undefined) {
              this.contact = parsedUser.contact;
            } else {
              this.contact = [];
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
