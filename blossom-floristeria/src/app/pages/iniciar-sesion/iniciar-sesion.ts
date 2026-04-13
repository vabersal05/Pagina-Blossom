import { Component } from '@angular/core';
import { Router, RouterModule } from "@angular/router";
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-iniciar-sesion',
  imports: [RouterModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './iniciar-sesion.html',
  styleUrl: './iniciar-sesion.css',
})
export class IniciarSesion {

  form = new FormGroup({
    usuario: new FormControl('', [Validators.required]),
    contrasena: new FormControl('', [Validators.required, Validators.minLength(3)])
  });

  constructor(private router: Router, private http: HttpClient) {}

  iniciarSesion() {
    if (this.form.invalid) return;

    this.http.post<any>('http://localhost:3000/api/iniciar-sesion', this.form.value).subscribe({
      next: (res) => {
        localStorage.setItem('rol', res.rol);

        if (res.rol === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/home']);
        }
      },
      error: () => alert('Usuario o contraseña incorrectos')
    });
  }
}