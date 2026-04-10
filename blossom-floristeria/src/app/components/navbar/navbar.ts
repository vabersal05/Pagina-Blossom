import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import { Auth } from '../../services/auth';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, NgIf],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  constructor(public authService: Auth) {}

  logout() {
    this.authService.logout();
  }
}