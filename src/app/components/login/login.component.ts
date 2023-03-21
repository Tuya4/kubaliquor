import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup
  submitted= false;
  error = '';
  isLoggedIn = false;


  constructor(private formBuilder : FormBuilder, private authservice : AuthService,
    private router : Router, private http : HttpClient) { }


  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.minLength(6)]),

    }
    // , { validator: this.checkPasswords }
    );

  }

  // checkPasswords(group: FormGroup) {
  //   const password = group.get('password').value;
  //   const confirmPassword = group.get('confirmPassword').value;

  //   return password === confirmPassword ? null : { notSame: true };
  // }

  get f (){
    return this.loginForm.controls;
  }

  onSubmit(){
    let formValues = this.loginForm
    formValues.value.fullName=""
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.authservice.login(formValues.value).subscribe({
      next: (response) => {
        if (response.message === 'Successfully logged in.'){
          alert(response.message);
          this.router.navigate(['/dashboard/products']);
        }
        else{
          alert(response.message);
        }
      },
      error: (error) => {
        alert("Error occurred while loging in");
        console.log(error);
      }

    });

    this.isLoggedIn = true;



    // let formValues= this.loginForm
    // this.authservice.signInUser(formValues.value)
    // .subscribe({
    //    next :(res) =>{
    //      if(res.responseCode=true){
    //       this.router.navigate(['/dashboard']);
    //       }else{
    //        res.responseDescription;
    //      }
    //  },
    //  });

  }
}
