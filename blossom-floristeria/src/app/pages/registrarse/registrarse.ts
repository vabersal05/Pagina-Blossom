import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http'; //USO DE HTTPCLIENT
import { HttpClientModule } from '@angular/common/http'; //IMPORTAR EL MODULO DE HTTPCLIENT

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

  constructor(private router: Router, private http: HttpClient) {}

    registrarse() {
    if (this.contrasena !== this.confirmarContrasena) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const datos = {
      nombre: this.nombre,
      email: this.email,
      contrasena: this.contrasena
    };

    console.log('Enviando datos:', datos);

    this.http.post<any>('http://localhost:3000/api/registrarse', datos).subscribe({
      next: () => {
        alert('Cuenta creada correctamente');
        this.router.navigate(['/iniciar-sesion']);
      },
      error: (err) => {
        console.log('Error:', err);
        alert('Error al registrar, intenta de nuevo');
      }
    });
  }
}