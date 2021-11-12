import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { EmailValidatorService } from '../../../shared/validator/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})

export class RegistroComponent implements OnInit {

  nombreApellidoPattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  
  noPuedeSerStrider(control:FormControl){
    const valor:string = control.value?.trim().toLowerCase();
    if(valor === 'strider'){
      return {
        noStrider:true
      }
    }
    return null;
  }

  camposIguales(campo1:string, campo2:string){
    
      return (formGroup:AbstractControl): ValidationErrors | null => {
          
          const pass1 = formGroup.get(campo1)?.value;
          const pass2 = formGroup.get(campo2)?.value;

          if(pass1!==pass2){
            formGroup.get(campo2)?.setErrors({noIguales:true});
            return {noIguales:true}
          }

          formGroup.get(campo2)?.setErrors(null);

          return null
      }
  }


  miFormulario : FormGroup = this.fb.group({
    nombre: ['',[Validators.required, Validators.pattern(this.nombreApellidoPattern)]],
    email: ['',[Validators.required, Validators.email],[this.emailValidator]],
    username: ['',[Validators.required,this.noPuedeSerStrider]],
    password: ['', [Validators.required]],
    password2: ['', [Validators.required]]
  },
  {
    validators: [ this.camposIguales('password','password2') ]
  })

  get emailErrorMsg():string{
    const errors = this.miFormulario.get('email')?.errors;
    if(errors?.required){
      return 'Email es obligatorio'
    }else if(errors?.pattern){
      return 'el valor ingresado no tiene formato de correo'
    }else if(errors?.emailTomado){
      return 'el email ya fue tomado'
    }
      return ''
  }

  constructor(private fb:FormBuilder, private emailValidator:EmailValidatorService) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre : 'Fernando Herrera',
      email : 'test@test.com',
      username : 'fernando',
      password : '123456',
      password2 : '123456'
    })
  }

  campoNoValido(campo:string){
    return this.miFormulario.get(campo)?.invalid
            && this.miFormulario.get(campo)?.touched
  }

/*   emailRequired(){
    return this.miFormulario.get('email')?.errors?.required
            && this.miFormulario.get('email')?.touched
  }

  emailFormato(){
    return this.miFormulario.get('email')?.errors?.pattern
            && this.miFormulario.get('email')?.touched
  }

  emailTomado(){
    return this.miFormulario.get('email')?.errors?.emailTomado
            && this.miFormulario.get('email')?.touched
  } */

  submitFormulario(){
    console.log(this.miFormulario.value);
    this.miFormulario.markAllAsTouched();
  }

}
