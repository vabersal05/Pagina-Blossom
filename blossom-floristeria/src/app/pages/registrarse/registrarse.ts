import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http'; 
import { HttpClientModule } from '@angular/common/http'; 
import { environment } from '../../../enviroments/environment';
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
            icon: 'success',
            title: 'Mensaje enviado',
            text: 'Tu mensaje fue enviado correctamente!',
            confirmButtonColor: '#d93d83',
          });
      return;
    }

    if (!this.email.includes('@')) {
      Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Correo electrónico no válido',
            confirmButtonColor: '#d93d83',
          });
      return;
    }

    if (this.contrasena.length < 6) {
      Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'La contraseña debe tener al menos 6 caracteres',
            confirmButtonColor: '#d93d83',
          });
      return;
    }

    if (this.contrasena !== this.confirmarContrasena) {
      Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Las contraseñas no coinciden',
            confirmButtonColor: '#d93d83',
          });
      return;
    }

    const datos = {
      nombre: this.nombre,
      email: this.email,
      contrasena: this.contrasena,
    };

    this.http.post<any>(`${environment.apiUrl}/registrarse`, datos).subscribe({
      next: () => {
        Swal.fire({
            icon: 'success',
            title: 'Registro exitoso',
            text: 'Tu cuenta fue creada correctamente!',
            confirmButtonColor: '#d93d83',
          });
        this.router.navigate(['/iniciar-sesion']);
      },
      error: (err) => {
        console.log('Error:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al registrar, intenta de nuevo',
          confirmButtonColor: '#d93d83',
        });
      },
    });
  }
}
