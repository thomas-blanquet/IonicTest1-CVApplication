import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  name:string;
  password:string;

  constructor(private storage: Storage) { }

  ngOnInit() {
  }

  // Create the user in storage
  register() {
    this.storage.set(this.name, JSON.stringify({password: this.password, name: this.name, about: "", experiences: [], formation: [], contact: []}));
  }
}
