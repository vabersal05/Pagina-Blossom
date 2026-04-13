import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Catalogo } from './pages/catalogo/catalogo';
import { ContactoComponent } from './pages/contacto/contacto';
import { Carrito } from './pages/carrito/carrito';
import { ProductoDetalle } from './pages/producto-detalle/producto-detalle';
import { IniciarSesion } from './pages/iniciar-sesion/iniciar-sesion';
import { Admin } from './pages/Admin/admin';
import { Cliente } from './pages/cliente/cliente';
import { Registrarse } from './pages/registrarse/registrarse';
import { MensajesComponent } from './pages/mensajes/mensajes';
import { Nosotros } from './pages/nosotros/nosotros';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'catalogo', component: Catalogo },
  { path: 'contacto', component: ContactoComponent },
  { path: 'iniciar-sesion', component: IniciarSesion },
  { path: 'carrito', component: Carrito },
  { path: 'admin', component: Admin },
  { path: 'cliente', component: Cliente },
  { path: 'registrarse', component: Registrarse },
  { path: 'home', component: Home },
  { path: 'mensajes', component: MensajesComponent },
  { path: 'nosotros', component: Nosotros },
  { path: 'productos/:id', component: Catalogo }
];
