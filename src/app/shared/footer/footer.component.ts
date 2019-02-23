import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: []
})
export class FooterComponent implements OnInit {

  anioActual: number;

  constructor() {
      this.anioActual = new Date().getFullYear();
   }

  ngOnInit() {
  }

}
