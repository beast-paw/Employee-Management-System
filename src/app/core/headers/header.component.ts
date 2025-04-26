import { Component } from '@angular/core';
@Component({
  selector: 'app-header',
  template: `<header><h1>Employee Management System</h1></header>`,
  styles: [
    `header { padding: 1rem; background: #333; color: white; text-align: center; }`,
  ],
})
export class HeaderComponent {}