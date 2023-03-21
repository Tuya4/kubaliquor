import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(private router: Router,
    private modalService: NgbModal,
    private httpClient: HttpClient,
    private authService: AuthService) { }

  ngOnInit(): void {

  }



  logout(): void {
    // Code for logging out the user goes here
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  goToProducts() {
    this.router.navigate(['/products']);
  }

  goToOrders() {
    this.router.navigate(['/orders'])
  }

  goToCompleted(){
    this.router.navigate([''])
  }

  goToMake(){
    this.router.navigate([''])
  }

}
