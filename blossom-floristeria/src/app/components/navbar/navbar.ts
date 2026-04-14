import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { NgIf } from '@angular/common';
import { CarritoService } from '../../services/carrito';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, NgIf],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  constructor(
    public authService: Auth,
    public carritoService: CarritoService,
    private router: Router,
  ) {}

  logout() {
    this.authService.logout();
  }

  irAContacto() {
    const currentUrl = this.router.url.split('#')[0]; // quita fragmentos si hay
    this.router.navigate([currentUrl], { fragment: 'contacto' });
  }
}
