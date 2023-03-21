import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';



export interface Product {
  id: number;
  productName: string;
  description: string;
  unitPrice: number;
  quantity: number;
  totalCost: number;
}



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  @ViewChild('cont') contRef!: TemplateRef<any>;
  isModalActive = false;
  // selectedProduct = null;


  showDeleteModal = false;
  // selectedProduct: Product = { id: '', productName: '', description: '', unitPrice: '', stock: '',  totalCost: '' };
  selectedProduct!: Product;

  addProductForm!: FormGroup;
  editProductForm!: FormGroup;
  submitted:boolean = false;

  newProduct: any = {};
  // deleteIndex!: number;
  // editProduct: any = {};

  closeResult = '';
  products: any[] = [];
  // product: Product = {
  //   id: 0,
  //   productName: '',
  //   description: '',
  //   unitPrice: '',
  //   stock: '',
  //   totalCost: ''
  // };
  // modalTitle!: string;
  // modalButton!: string;
  // showModal: boolean = false;

  // newProduct = {  productName: '', description: '', unitPrice: '', stock: '', totalCost:'' };

  constructor(private authService: AuthService, private productService: ProductService, private modalService: NgbModal, private router:Router, private fb: FormBuilder) {

   }
   goToDashboard() {
    this.router.navigateByUrl('/dashboard');
  }

  logout() {
    // clear any authentication information here
    this.router.navigate(['dashboard']);
  }

  goBack() {
    this.router.navigateByUrl('/dashboard');
  }

  ngOnInit(): void {
    this.getProducts();
    this.addProductForm = new FormGroup({
      productName: new FormControl(''),
      description: new FormControl(''),
      unitPrice: new FormControl(''),
      quantity: new FormControl('')
    });

    this.editProductForm = new FormGroup({
      productName: new FormControl(''),
      description: new FormControl(''),
      unitPrice: new FormControl(''),
      quantity: new FormControl('')
    });
    // }
    //  this.product = new Product();
    this.getProducts();

  }




  getProducts(): void {
    this.productService.getProducts()
      .subscribe(products => this.products = products);
  }



  deleteProductOpen(product: Product): void {
    this.selectedProduct = product;
    this.modalService.open(this. contRef);
  }



  onAddSubmit() {
    this.submitted = true;
    console.log(this.addProductForm.value);
    this.productService.addProduct(this.addProductForm.value).subscribe({
      next: (res) => {
        if (res) {
          alert("New Product Added");
          this.getProducts();
        }
    },error: (error) => {
      alert("Error occurred while Adding Product");
      console.log(error);
    }
  })

  }

  onEditSubmit() {
    this.submitted = true;
    console.log(this.editProductForm.value);

    this.productService.updateProduct(this.editProductForm.value).subscribe({
      next: (res) => {
        if (res) {
          alert("Product Updated");
          this.getProducts();
        }
    },error: (error) => {
      alert("Error occurred while Updating Product");
      console.log(error);
    }
  })
  }

  onDelete(){
    console.log(this.selectedProduct);
    this.productService.deleteProduct(this.selectedProduct).subscribe({
      next: (res) => {
        if (res) {
          alert("Product Updated");
          this.getProducts();
        }
    },error: (error) => {
      alert("Error occurred while Updating Product");
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

  editProductOpen(contents:any, product: any) {
    console.log(product)
    this.editProductForm.patchValue(product)
    console.log(this.editProductForm.value);
		this.modalService.open(contents, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

  // deleteProductOpen(cont: any, product: any) {
  //   console.log(product)
	// 	this.modalService.open(cont, { ariaLabelledBy: 'modal-basic-title' }).result.then(
	// 		(result) => {
	// 			this.closeResult = `Closed with: ${result}`;
	// 		},
	// 		(reason) => {
	// 			this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
	// 		},
	// 	);
	// }

  deleteProduct(product: Product) {
    this.selectedProduct = product;
    this.showDeleteModal = true;
  }


}




































// import { Component, OnInit } from '@angular/core';
// import { ProductService } from 'src/app/services/product.service';
// import { MatDialog } from '@angular/material/dialog';
// import { DialogComponent } from '../dialog/dialog.component';
// import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { Router } from '@angular/router';
// import { HttpClient, HttpClientModule} from '@angular/common/http';
// import { FormControl, FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';

// export interface Product {
//   id: string;
//   productName: string;
//   description: string;
//   unitPrice: string;
//   stock: string;
//   totalCost: string;
// }

// @Component({
//   selector: 'app-products',
//   templateUrl: './products.component.html',
//   styleUrls: ['./products.component.css']


// })
// export class ProductsComponent implements OnInit {
//   closeResult!: string;
//   products: any[] = [];
//   selectedProduct: any;
//   isEditing: boolean = false;
//   addProductForm!:FormGroup;
//   editProductForm!: FormGroup;
//   addProductModal: any;
//   editProductModal: any;


//   formVisible = false;






//    showForm() {
//     this.formVisible = true;

//   }

//   save(){
//     this.isEditing = true;
//   }

//   newProduct = {  productName: '', description: '', unitPrice: '', stock: '', totalCost:'' };

//   constructor(private productService: ProductService,
//     private modalService: NgbModal,
//     private httpClient: HttpClient,
//     private fb: FormBuilder,
//     private router: Router) { }



//   ngOnInit(): void {
//     // this.productService.getProducts().subscribe(products => {
//     //   this.products = products;

//     // });

//     this.addProductForm = this.fb.group({
//       productName:['',Validators.required],
//       description: ['', Validators.required],
//       unitPrice: ['', Validators.required],
//       stock: ['',Validators.required],
//     });
//     this.editProductForm = this.fb.group({
//       id: [ '', Validators.required],
//       productName: ['', Validators.required],
//       description: ['', Validators.required],
//       stock: ['',Validators.required],
//       unitPrice: ['', Validators.required]

//     });

//   }

//   getAllProducts() {
//     this.productService.getAllProducts().subscribe(
//       (data : Product[]) => {
//         this.products = data.map(product => ({
//           ...product}));
//         });
//         }
//   showAddProductModal(){
//     this.addProductForm.reset();
//     this.addProductModal = true;
//      setTimeout(() => document.getElementById('productName')?.focus(), 0);


//   }

//  addNewProduct() {
//   let formValues = this.addProductForm;

//   this.productService.addProduct(formValues.value).subscribe(
//     (addedProduct: Product) => {
//       // Add the newly created product to the products array
//       this.products.push({
//         ...addedProduct,
//         isLoading: true
//       });

//       // Reload all products from the server
//       this.getAllProducts();
//     },
//     (error: any) => {
//       console.error('Error adding product:', error);
//       // Remove product from frontend
//       this.products.shift();
//     }
//   );

//   this.addProductModal = false;
// }

// showEditProductModal(product: any) {

//   this.editProductForm.reset();
//   this.editProductForm.patchValue(product);
//   this.selectedProduct = product;
//   this.editProductModal = true;
// }

// updateProduct() {
//   const formValues = this.editProductForm.value;

//   this.productService.updateProduct(formValues).subscribe(
//     (updatedProduct: Product) => {
//       const productIndex = this.products.findIndex(product => product.id === updatedProduct.id);
//       if (productIndex !== -1) {
//         this.products[productIndex] = {
//           ...updatedProduct,
//         };

//       }
//       this.getAllProducts();
//       location.reload(); // Reload the page after updating the product
//       alert('Product updated successfully.'); // Show success message
//     },
//     (error: any) => {
//       console.log(`Error updating product: ${error}`);
//     }
//   );
// }

// deleteProduct(id: any): void {

//   this.productService.deleteProduct(id).subscribe(
//   (response) => {
//     console.log('Success:', response);
//     this.products = this.products.filter(product => product.id !== id);
//     this.showSuccessMessage(response.message);
//   },
//   (error) => {
//     console.error('Error:', error);
//     let errorMessage = 'Failed to delete product.';
//     if (error.status === 404) {
//       errorMessage = `Product ${id} not found.`;
//     } else if (error.error && error.error.message) {
//       errorMessage = error.error.message;
//     }
//     this.showErrorMessage(errorMessage);
//   }
// );

// }

// showSuccessMessage(arg0: string) {
//   console.log('Success:', onmessage);

// }
// showErrorMessage(arg0: string) {
//    console.error('Error:', onmessage);

// }
// confirmDeleteProduct(productId: number) {
// if (window.confirm('Are you sure you want to delete this product?')) {
//   this.deleteProduct(productId);
// }
// }
//   // onSubmit(f: NgForm) {

//   //   const url = 'https://localhost:44337/api/Products';
//   //   this.httpClient.post(url, f.value)
//   //     .subscribe((result) => {
//   //       this.ngOnInit(); //reload the table
//   //     });
//   //   this.modalService.dismissAll(); //dismiss the modal
//   // }

//   // onSubmit() {
//   //   this.products.push(this.newProduct);
//   //   this.newProduct = {  productName: '', description: '', unitPrice: '', stock: '', totalCost:'' };
//   //   this.formVisible = false;
//   // }



//   // addProduct(productName: string, description: string, unitPrice: string, stock: string, totalCost: string) {
//   //   const product = {
//   //     id: this.selectedProduct.id,
//   //     productName: productName,
//   //     description: description,
//   //     unitPrice: unitPrice,
//   //     stock: stock,
//   //     totalCost: totalCost
//   //   };

//   //   this.productService.addProduct(product).subscribe(newProduct => {
//   //     this.products.push(newProduct);
//   //   });
//   // }

//   selectProduct(product: any) {
//     this.selectedProduct = product;
//     this.isEditing = false;
//   }

//   editProduct(productName: string, description: string, unitPrice: string, stock: string, totalCost: string) {
//     const product = {
//       id: this.selectedProduct.id,
//       productName: productName,
//       description: description,
//       unitPrice: unitPrice,
//       stock: stock,
//       totalCost: totalCost
//     };

//     this.productService.updateProduct(product).subscribe(updatedProduct => {
//       const index = this.products.findIndex(p => p.id === updatedProduct.id);
//       this.products[index] = updatedProduct;
//       this.selectedProduct = null;
//       this.isEditing = false;
//     });
//   }

//   // deleteProduct() {

//   //   this.productService.deleteProduct(this.selectedProduct.id).subscribe(() => {
//   //     const index = this.products.findIndex(p => p.id === this.selectedProduct.id);
//   //     this.products.splice(index, 1);
//   //     this.selectedProduct = null;
//   //     this.isEditing = false;
//   //   });
//   // }

//   open(content: any){
//     this.modalService.open(content, {ariaLabelledBy: 'modal-basi-title'}).result.then((result) => {
//     this.closeResult = 'Closed with: ${result}';
//   } ,(reason) => {
//     this.closeResult = 'Dismissed ${this.getDismissReason(reason)}';
//   });
//   }

//   private getDismissReason(reason: any): string{
//     if (reason===ModalDismissReasons.ESC){
//       return 'by pressing ESC';
//     } else if (reason === ModalDismissReasons.BACKDROP_CLICK){
//       return 'by clicking the backdrop';
//     } else{
//       return 'with: $(reason)';
//     }
//   }


//   }





// // openDialog() {
//   // this.dialog.open(DialogComponent);

//   // const dialogRef = this.dialog.open(DialogComponent);

//   // dialogRef.afterClosed().subscribe(result => {
//   //   console.log(`Dialog result: ${result}`);
//   // });
// // }


