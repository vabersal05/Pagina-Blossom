import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrarse',
  imports: [FormsModule, RouterModule, HttpClientModule],
  templateUrl: './registrarse.html',
  styleUrl: './registrarse.css',
})
export class Registrarse {
  nombre = '';
  email = '';
  contrasena = '';
  confirmarContrasena = '';

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {}

  registrarse() {
    if (!this.nombre || !this.email || !this.contrasena || !this.confirmarContrasena) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Todos los campos son obligatorios',
        confirmButtonColor: '#e91e8c',
      });
      return;
    }

    if (!this.email.includes('@')) {
      Swal.fire({
        icon: 'warning',
        title: 'Correo inválido',
        text: 'Ingresa un correo electrónico válido',
        confirmButtonColor: '#e91e8c',
      });
      return;
    }

    if (this.contrasena.length < 6) {
      Swal.fire({
        icon: 'warning',
        title: 'Contraseña muy corta',
        text: 'La contraseña debe tener al menos 6 caracteres',
        confirmButtonColor: '#e91e8c',
      });
      return;
    }

    if (this.contrasena !== this.confirmarContrasena) {
      Swal.fire({
        icon: 'error',
        title: 'Las contraseñas no coinciden',
        text: 'Verifica que ambas contraseñas sean iguales',
        confirmButtonColor: '#e91e8c',
      });
      return;
    }

    const datos = {
      nombre: this.nombre,
      email: this.email,
      contrasena: this.contrasena,
    };

    this.http.post<any>('http://localhost:3000/api/registrarse', datos).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: '¡Cuenta creada!',
          text: 'Tu cuenta fue creada correctamente',
          confirmButtonColor: '#e91e8c',
        }).then(() => {
          this.router.navigate(['/iniciar-sesion']);
        });
      },
      error: (err) => {
        if (err.status === 400) {
          Swal.fire({
            icon: 'error',
            title: 'Correo ya registrado',
            text: 'Este correo ya tiene una cuenta, usa otro o inicia sesión',
            confirmButtonColor: '#e91e8c',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error al registrar, intenta de nuevo',
            confirmButtonColor: '#e91e8c',
          });
        }
      },
    });
  }
}