import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { Product } from '../shared/models/product';
import { DataService } from '../data.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  productGroup: FormGroup;
  submitted = false;
  product: Product;
  categoryId: number;

  selectedFile: File;
  imageUrl: any;
  categories: Object;
  successMsg: boolean = false;

  constructor(private formBuilder: FormBuilder, private dataService: DataService) {
    this.productGroup = this.formBuilder.group({
      catId: ['0', Validators.required],
      prodName: ['', Validators.required],
      prodDescrip: ['', Validators.required],
      unitPrice: ['', Validators.required],
      
    })
   }

   onFileChanged(event) {
     if (event.target.files && event.target.files[0]) {
      this.selectedFile = event.target.files[0];
      console.log("SELECTEDFILE"+this.selectedFile);
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent) => {
      this.imageUrl = (<FileReader>event.target).result;
      console.log("IMAGEURL"+this.imageUrl);
    }
      reader.readAsDataURL(event.target.files[0]);
    }
    
  }

  onSubmit() {
    this.submitted = true;

    if(this.productGroup.invalid) {
      console.log("Invalid Data Submission");
      return;
    }
    this.product = new Product();
    console.log("DATA is Valid");
    
    this.product.prodName = this.productGroup.get('prodName').value;
    this.product.prodDescrip = this.productGroup.get('prodDescrip').value;
    this.product.unitPrice = this.productGroup.get('unitPrice').value;
    console.log("UNITPRICE"+this.product.unitPrice);
    this.product.prodImageUrl = this.imageUrl.toString;
    console.log("THIS IS PRODIMAGEURL", this.product.prodImageUrl);
    // this.product.prodImageUrl = this.productGroup.get('prodImageUrl').value;
    this.categoryId = this.productGroup.get('catId').value;

    this.dataService.addProduct(this.categoryId, this.product).subscribe(
      (response) => console.log(response),
      (error) => console.log(error));
      this.successMsg = true;
    }
    
  ngOnInit() {
    this.fetchCategories();

  }

  fetchCategories() {
    this.dataService.getCategories().subscribe(
      catData=> {
        this.categories = catData;
        console.log("CATEGORIES"+this.categories);
      }
    )
  }

}
