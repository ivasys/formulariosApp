import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styleUrls: ['./switches.component.css']
})
export class SwitchesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  persona = {
    genero: '',
    notificaciones:true
  }

  terminosYCondiciones = false;

}
