import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { FloresCuriososService } from '../../services/flores-curiosos';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, NgIf, NgFor],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  cargando = true;
  Curiosidades: any[] = [];

  constructor(
    private floresCuriosos: FloresCuriososService,
    private cdr: ChangeDetectorRef
  ) {}

  mostrarNombres = false;

  ngOnInit(): void {
    this.floresCuriosos.getCuriosidades().subscribe({
      
      next: (res) => {
        this.Curiosidades = res.data.slice(0, 6);
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error:', err);
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }
}
