import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Catalogo } from './pages/catalogo/catalogo';
import { Contacto } from './pages/contacto/contacto';
import { Carrito } from './pages/carrito/carrito';
import { ProductoDetalle } from './pages/producto-detalle/producto-detalle';
import { IniciarSesion } from './pages/iniciar-sesion/iniciar-sesion';
import { Admin } from './pages/Admin/admin';
import { Cliente } from './pages/cliente/cliente';
import {Registrarse} from "./pages/registrarse/registrarse";

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'catalogo', component: Catalogo },
  { path: 'contacto', component: Contacto },
  { path: 'iniciar-sesion', component: IniciarSesion },
  { path: 'carrito', component: Carrito },
  { path: 'producto/:id', component: ProductoDetalle },
  { path: 'admin', component: Admin },
  { path: 'cliente', component: Cliente },
  { path: 'registrarse', component: Registrarse },
  { path: 'home', component: Home }
];