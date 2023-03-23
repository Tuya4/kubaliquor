import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Order } from 'src/app/models/orders.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  buyProductForm!: FormGroup;
  closeResult = '';
  submitted:boolean = false;


  constructor(private cartService: CartService, private router:Router, private modalService: NgbModal
    , private fb: FormBuilder) { }

  goToDashboard() {
    this.router.navigateByUrl('/dashboard');
  }
  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(cartItems => {
      this.cartItems = cartItems;
    });

    this.buyProductForm = new FormGroup({
      productName: new FormControl(''),
      shippingAddress: new FormControl(''),
      unitPrice: new FormControl(''),
      quantity: new FormControl('')
    });

  }

  onBuySubmit() {
    this.submitted = true;
    console.log(this.buyProductForm.value);
    this.cartService.orderCart(this.buyProductForm.value).subscribe({
      next: (res) => {
        if (res) {
          alert("Request Successful");
          this.cartService.clearCart();
        }
    },error: (error) => {
      alert("Error occurred while Buying Product(s)");
      console.log(error);
    }
  })

  }

  open(content: any) {
    console.log(content)
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}


	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}

  getTotal() {
    return this.cartItems.reduce((total, item) => total + item.unitPrice, 0);
  }

  removeFromCart(item: Product) {
    this.cartItems = this.cartItems.filter(i => i !== item);
  }

  clearCart(){
    this.cartItems = [];
  }

  orderCart(){
    this.cartService.orderCart(this.cartService.orderCart).subscribe(
      (response) => {
        console.log('Order placed successfully:', response);
        this.cartService.clearCart();
        this.router.navigateByUrl('/dashboard/orders');
      },
      (error) => {
        console.error('Failed to place order:', error);
      }
    );
  }

  goBack() {
    this.router.navigateByUrl('/dashboard/make-order');
}
}
