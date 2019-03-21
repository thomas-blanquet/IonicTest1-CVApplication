import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  name:string;
  password:string;

  constructor(private authService: AuthenticationService, private storage: Storage) { }

  ngOnInit() {
  }

  // Get the user in storage and verify the password, then store the user key in current User
  login() {
    this.storage.get(this.name).then((val) => {
      if (val !== null) {
        val = JSON.parse(val);
        if (val.password === this.password) {
          this.storage.set("currentUser", this.name);
          this.authService.login();
        }
      }
    }).catch(err => console.log(err));
  }
}
