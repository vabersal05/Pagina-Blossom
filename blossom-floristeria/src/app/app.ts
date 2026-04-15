import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { Auth } from './services/auth';
import { HttpClientModule } from '@angular/common/http';

import { Navbar } from './components/navbar/navbar';
import { NavbarAdmin } from './components/navbar-admin/navbar-admin';
import { Footer } from './components/footer/footer';
import { FooterAdmin } from './components/footer-admin/footer-admin';
import { CarritoService } from './services/carrito';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    Navbar,
    NavbarAdmin,
    Footer,
    FooterAdmin,
    NgIf,
    NgFor,
    CurrencyPipe,
    HttpClientModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  constructor(
    public carritoService: CarritoService,
    public authService: Auth,
  ) {}
  protected readonly title = signal('blossom-floristeria');
}
