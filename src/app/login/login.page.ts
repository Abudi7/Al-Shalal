import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@capacitor/storage';
@Component({
selector: 'app-login',
templateUrl: './login.page.html',
styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
userForm = new FormGroup({
'username': new FormControl('', [Validators.required]),
'password': new FormControl('', [Validators.required]),
});
isAuth: boolean = false;
constructor(
private api: ApiService,
private router: Router,
) { }
ngOnInit() {
this.loadToken();
}
/**
* Überprüft, ob ein Token im Storage vorhanden ist.
* Wenn ein Token vorhanden ist, wird der Benutzer zur Home-Seite weitergeleitet.
* Andernfalls wird der Benutzer aufgefordert, sich anzumelden.
*/
async loadToken() {
const token = await Storage.get({ key: 'myToken' });
if (token && token.value) {
this.isAuth = true;
this.router.navigate(['/home']);
} else {
this.isAuth = false;
}
}
/**
* Sendet die Benutzeranmeldeinformationen an den ApiService.
* Wenn die Anmeldung erfolgreich ist, wird das erhaltene Token im Storage 
gespeichert
* und der Benutzer zur Home-Seite weitergeleitet.
*/
loginUser() {
if (!this.userForm.valid) {
return;
}
this.api.login(this.userForm.value)
.then((res: any) => {
Storage.set({ key: 'myToken', value: res['token'] });
this.router.navigate(['/home']);
});
}
}
