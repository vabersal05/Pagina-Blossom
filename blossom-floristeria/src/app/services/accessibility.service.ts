import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

export interface A11yPrefs {
  fontSize: 'normal' | 'large' | 'xlarge';
  contrast: 'normal' | 'high';
  reduceMotion: boolean;
}

@Injectable({ providedIn: 'root' })
export class AccessibilityService {
  private renderer: Renderer2;
  private html = document.documentElement;
  private userId = 'guest'; // cámbialo cuando tengas auth

  constructor(rf: RendererFactory2) {
    this.renderer = rf.createRenderer(null, null);
  }

  init(userId = 'guest') {
    this.userId = userId;
    this.apply(this.load());
  }

  load(): A11yPrefs {
    const raw = localStorage.getItem(`a11y_${this.userId}`);
    return raw ? JSON.parse(raw) : { fontSize: 'normal', contrast: 'normal', reduceMotion: false };
  }

  save(prefs: Partial<A11yPrefs>) {
    const merged = { ...this.load(), ...prefs };
    localStorage.setItem(`a11y_${this.userId}`, JSON.stringify(merged));
    this.apply(merged);
  }

  private apply(p: A11yPrefs) {
    // Fuente
    ['a11y-font-large','a11y-font-xlarge']
      .forEach(c => this.renderer.removeClass(this.html, c));
    if (p.fontSize !== 'normal')
      this.renderer.addClass(this.html, `a11y-font-${p.fontSize}`);

    // Contraste
    p.contrast === 'high'
      ? this.renderer.addClass(this.html, 'a11y-high-contrast')
      : this.renderer.removeClass(this.html, 'a11y-high-contrast');

    // Reducir movimiento
    p.reduceMotion
      ? this.renderer.setAttribute(this.html, 'data-reduce-motion', 'true')
      : this.renderer.removeAttribute(this.html, 'data-reduce-motion');
  }
}


