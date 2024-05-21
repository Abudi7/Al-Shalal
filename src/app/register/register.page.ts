import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Storage } from '@capacitor/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit {
  userForm = new FormGroup({
    'firstName': new FormControl('', [Validators.required]),
    'lastName': new FormControl('', [Validators.required]),
    'email': new FormControl('', [Validators.required]),
    'username': new FormControl('', [Validators.required]),
    'password': new FormControl('', [Validators.required]),
  });

  constructor(
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit() {}

  /**
   * Registriert einen neuen Benutzer.
   * Überprüft zunächst die Validität des Formulars.
   * Ruft dann die registrieren Methode des ApiService auf und speichert das 
   * erhaltene Token im Storage.
   * Navigiert den Benutzer zur Home-Seite.
   */
  async registerUser() {
    if (!this.userForm.valid) {
      return;
    }
    this.api.register(this.userForm.value)
      .then((res: any) => {
        Storage.set({ key: 'myToken', value: res['token'] });
        this.router.navigate(['/home']);
      });
  }
}
