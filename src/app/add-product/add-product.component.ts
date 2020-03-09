import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
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
  success = false;
  product: Product;
  categoryId: number;
  constructor(private formBuilder: FormBuilder, private dataService: DataService) {
    this.productGroup = this.formBuilder.group({
      catId: ['', Validators.required],
      prodName: ['', Validators.required],
      prodDescrip: ['', Validators.required],
      prodImageUrl: ['', Validators.required],
    })
   }
   
  onSubmit() {
    this.submitted = true;

    if(this.productGroup.invalid) {
      return;

    }
    this.product = new Product();
    
    this.product.prodName = this.productGroup.get('prodName').value;
    this.product.prodDescrip = this.productGroup.get('prodDescrip').value;
    this.product.prodImageUrl = this.productGroup.get('prodImageUrl').value;
    this.categoryId = this.productGroup.get('catId').value;

    this.dataService.addProduct(this.categoryId, this.product).subscribe(
      (response) => console.log(response),
      (error) => console.log(error));
      this.success = true;
    }
    
  ngOnInit() {
  }

}
