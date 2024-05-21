import { Component } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  isAuth: boolean = false; // User authentication status
  token: string = ""; // User token

  constructor(private api: ApiService) {}

  ionViewWillEnter() {
    this.loadToken(); // Load the token when the page loads
  }

  async loadToken() {
    try {
      const { value } = await Storage.get({ key: "myToken" }); // Retrieve token from storage
      console.log("Token is " + value);
      
      if (value) {
        console.log('Setting token: ', value);
        this.token = value; // Set token
        this.isAuth = true; // Authenticated
      } else {
        this.isAuth = false; // Not authenticated
      }
    } catch (error) {
      console.error("Error loading token:", error);
    }
  }

  get userToken(): string {
    return this.token; // Retrieve the current user token
  }

  get isUserLoggedIn(): boolean {
    return this.isAuth; // Check if the user is logged in
  }

  logout() {
    try {
      Storage.remove({ key: "myToken" }); // Remove token from storage
      this.isAuth = false; // Reset authentication status
      this.token = ""; // Reset token
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }
}
