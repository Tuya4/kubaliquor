import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';




@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;
  submitted:boolean = false;
  password!: string;
  confirmPassword!: string;





  constructor(private formBuilder : FormBuilder, private http : HttpClient, private router : Router, private authservice: AuthService) {
    this.signupForm = new FormGroup({});
   }

   get f(){return this.signupForm.controls}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      userName: new FormControl('',[Validators.required]),
      fullName: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('',[Validators.required, Validators.minLength(6)])
    });


  }


  onSubmit(){
    this.submitted = true;
    console.log(this.signupForm.value);
    if (this.password !== this.confirmPassword) {
      // Display an error message or prevent the form submission
      alert("Passwords do not match")
      return;
    }

    this.authservice.signup(this.signupForm.value).subscribe({
      next: (res) => {
        if (res) {
          alert("You are Successfully Signed Up");
          this.router.navigate(['/dashboard/products']);
        }
      },
      error: (error) => {
        alert("Error occurred while signing up");
        console.log(error);
      }
    })



    // let formValues = this.signupForm
    // this.authservice.signupUser(formValues.value)
    // .subscribe({
    //    next :(res) =>{

    //      if(res.responseCode=true){
    //       this.router.navigate(['/login']);
    //       }else{
    //        res.responseDescription;
    //      }
    //  },
    //  });

  }


    ////  this.authservice.signupUser(this.signupForm.value).subscribe(res=>{
    ////    this.signupForm.reset();
   ////   this.router.navigate(['/login']);
    ////    console.log(this.authservice.signupUser)



    // this.http.post<any>("https://localhost:44337/Users",this.signupForm.value)
    // .subscribe(res=>{
    //   alert("Signup Successful");
    //   this.signupForm.reset();
    //   this.router.navigate(['login']);
    // },err=>{
    //   alert("Something went wrong")
    // })





  }
