import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { AccessibilityService, A11yPrefs } from '../../services/accessibility.service';

@Component({
  selector: 'app-accessibility-panel',
  standalone: true,
  imports: [NgIf], // ← cambia aquí también
  templateUrl: './accessibility-panel.component.html',
  styleUrl: './accessibility-panel.component.css'
})
export class AccessibilityPanelComponent implements OnInit {
  prefs!: A11yPrefs;
  open = false;

  constructor(private a11y: AccessibilityService) {}

  ngOnInit() {
    this.prefs = this.a11y.load();
  }

  update(change: Partial<A11yPrefs>) {
    this.prefs = { ...this.prefs, ...change };
    this.a11y.save(this.prefs);
  }
}