import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private router: Router) {}
  
  login(usuario: any) {
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }
 
  logout() {
    localStorage.removeItem('usuario');
    this.router.navigate(['/home']);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('usuario') !== null;
  }

  getUser(){
    return JSON.parse(localStorage.getItem('usuario') || 'null');
  }
}
