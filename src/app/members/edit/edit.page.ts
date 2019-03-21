import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  user:any;
  about:string;
  contact:string;
  currentUser:string;
  expTitle:string;
  experience:string;
  formTitle:string;
  formation:string;

  constructor(private router: Router, private authService: AuthenticationService, private storage: Storage) { }

  // Create the logged user from the currentUser
  ngOnInit() {
    this.storage.get("currentUser")
    .then((val) => {
      if (val !== null) {
        this.currentUser = val;
        this.storage.get(val).then(user => {
          if (user !== null) {
            this.user = JSON.parse(user);
            console.log(this.user);
          }
        });
      } else {
        this.router.navigateByUrl('/public/login');
      };
    });
  }

  saveAbout() {
    this.user["about"] = this.about;
    this.storage.set(this.currentUser, JSON.stringify(this.user));
  }

  saveContact() {
    this.user["contact"].push(this.contact);
    this.storage.set(this.currentUser, JSON.stringify(this.user));
  }

  saveExperience() {
    this.user["experiences"].push({title: this.expTitle, description: this.experience});
    this.storage.set(this.currentUser, JSON.stringify(this.user));
  }

  saveFormation() {
    this.user["formation"].push({title: this.formTitle, description: this.formation});
    this.storage.set(this.currentUser, JSON.stringify(this.user));
  }

  logout() {
    this.storage.set("currentUser", null);
    this.authService.logout();
  }
}
