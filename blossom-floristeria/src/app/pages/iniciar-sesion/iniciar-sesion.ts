import { Component } from '@angular/core';
import { Router, RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { Auth } from '../../services/auth';
import { CarritoService } from '../../services/carrito';

@Component({
  selector: 'app-iniciar-sesion',
  imports: [FormsModule, RouterModule, HttpClientModule],
  templateUrl: './iniciar-sesion.html',
  styleUrl: './iniciar-sesion.css',
})
export class IniciarSesion {

  usuario = '';
  contrasena = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: Auth,
    private carritoService: CarritoService
  ) {}

  iniciarSesion() {

    const datos = {
      usuario: this.usuario,
      contrasena: this.contrasena
    };

    this.http.post<any>(
      'http://localhost:3000/api/iniciar-sesion',
      datos
    ).subscribe({

      next: (res) => {

        // GUARDAR USUARIO
        this.authService.login({
          id: res.id,
          nombre: res.nombre,
          email: res.email,
          rol: res.rol
        });

        // CARGAR CARRITO
        this.carritoService.cargarCarritoDB();

        // REDIRECCION
        if (res.rol === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/home']);
        }

      },

      error: () => {
        alert('Usuario o contraseña incorrectos');
      }

    });

  }

}