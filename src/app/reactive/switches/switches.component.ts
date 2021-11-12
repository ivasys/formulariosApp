import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styleUrls: ['./switches.component.css']
})
export class SwitchesComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    genero: ['M', Validators.required],
    notificaciones: [true, Validators.required],
    condiciones: [false, Validators.required]
  });

  persona = {
    genero: 'F',
    notificaciones: true
  }

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      ...this.persona,
      condiciones: false
    })

    this.miFormulario.get('condiciones')?.valueChanges.subscribe( newValue => {
      console.log(newValue)
    })

    this.miFormulario.valueChanges.subscribe( form => {
      delete form.condiciones;
      this.persona = form;
    })
  }


  guardar(){
    const formValue = {...this.miFormulario.value};
    delete formValue.condiciones;
    this.persona = formValue;
  }

}
