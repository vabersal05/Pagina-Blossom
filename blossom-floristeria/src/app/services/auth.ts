import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor() {}
  
  login(usuario: any) {
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  logout() {
    localStorage.removeItem('usuario');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('usuario') !== null;
  }

  getUser(){
    return JSON.parse(localStorage.getItem('usuario') || 'null');
  }
}
