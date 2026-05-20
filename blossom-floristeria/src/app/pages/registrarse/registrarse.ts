import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
<<<<<<< HEAD
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
=======
import { HttpClient } from '@angular/common/http'; 
import { HttpClientModule } from '@angular/common/http'; 
import { environment } from '../../../enviroments/environment';
>>>>>>> acf41a314fa60c35b32212a8f95578ad938b5aa2
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
<<<<<<< HEAD
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Todos los campos son obligatorios',
        confirmButtonColor: '#e91e8c',
      });
=======
            icon: 'success',
            title: 'Mensaje enviado',
            text: 'Tu mensaje fue enviado correctamente!',
            confirmButtonColor: '#d93d83',
          });
>>>>>>> acf41a314fa60c35b32212a8f95578ad938b5aa2
      return;
    }

    if (!this.email.includes('@')) {
      Swal.fire({
<<<<<<< HEAD
        icon: 'warning',
        title: 'Correo inválido',
        text: 'Ingresa un correo electrónico válido',
        confirmButtonColor: '#e91e8c',
      });
=======
            icon: 'error',
            title: 'Error',
            text: 'Correo electrónico no válido',
            confirmButtonColor: '#d93d83',
          });
>>>>>>> acf41a314fa60c35b32212a8f95578ad938b5aa2
      return;
    }

    if (this.contrasena.length < 6) {
      Swal.fire({
<<<<<<< HEAD
        icon: 'warning',
        title: 'Contraseña muy corta',
        text: 'La contraseña debe tener al menos 6 caracteres',
        confirmButtonColor: '#e91e8c',
      });
=======
            icon: 'error',
            title: 'Error',
            text: 'La contraseña debe tener al menos 6 caracteres',
            confirmButtonColor: '#d93d83',
          });
>>>>>>> acf41a314fa60c35b32212a8f95578ad938b5aa2
      return;
    }

    if (this.contrasena !== this.confirmarContrasena) {
      Swal.fire({
<<<<<<< HEAD
        icon: 'error',
        title: 'Las contraseñas no coinciden',
        text: 'Verifica que ambas contraseñas sean iguales',
        confirmButtonColor: '#e91e8c',
      });
=======
            icon: 'error',
            title: 'Error',
            text: 'Las contraseñas no coinciden',
            confirmButtonColor: '#d93d83',
          });
>>>>>>> acf41a314fa60c35b32212a8f95578ad938b5aa2
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
<<<<<<< HEAD
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
=======
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
>>>>>>> acf41a314fa60c35b32212a8f95578ad938b5aa2
      },
    });
  }
}