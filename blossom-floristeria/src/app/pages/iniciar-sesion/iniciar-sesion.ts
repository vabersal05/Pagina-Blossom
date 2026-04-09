import { Component } from '@angular/core';
import { Router, RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-iniciar-sesion',
  imports: [FormsModule, RouterModule, HttpClientModule],
  templateUrl: './iniciar-sesion.html',
  styleUrl: './iniciar-sesion.css',
})
export class IniciarSesion {
  usuario = '';
  contrasena = '';

  constructor(private router: Router, private http: HttpClient) {}

  iniciarSesion() {
    const datos = { usuario: this.usuario, contrasena: this.contrasena };

    this.http.post<any>('http://localhost:3000/api/iniciar-sesion', datos).subscribe({
      next: (res) => {
        localStorage.setItem('rol', res.rol);
        if (res.rol === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/cliente']);
        }
      },
      error: () => {
        alert('Usuario o contraseña incorrectos');
      }
    });
  }
}