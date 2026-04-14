import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { FloreriaComponent } from '../../floreria/floreria';
import { FloresCuriososService } from '../../services/flores-curiosos';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, NgIf, NgFor, FloreriaComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {

  cargando = false;
  Curiosidades: any[] = [];

  constructor(private floresCuriosos: FloresCuriososService,
              private cdr: ChangeDetectorRef
            ) {}

  onToggle(estado: boolean) {
    console.log('Curiosidades visibles:', estado);

    if (estado && this.Curiosidades.length === 0) {
      this.cargando = true;
      this.floresCuriosos.getCuriosidades().subscribe({
        next: (res) => {
          this.Curiosidades = res.data.slice(0, 6);
          this.cargando = false;
          this.cdr.detectChanges();
    },
    error: (err) => {
      console.error('Error:', err);
      this.cargando = false;
    }
      });
    }
  }
}