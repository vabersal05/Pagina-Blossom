import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { CurrencyPipe } from '@angular/common';

import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { CarritoService } from './services/carrito';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    Navbar,
    Footer,
    NgIf,
    NgFor,
    CurrencyPipe
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(public carritoService: CarritoService) {}
  protected readonly title = signal('blossom-floristeria');
}
