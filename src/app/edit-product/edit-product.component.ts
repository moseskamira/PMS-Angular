import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from '../shared/models/product';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  editProductGroup: FormGroup;
  submitted = false;
  success = false;
  
  categoryId: number;
  prodId: number;
  editedProduct: Product;

  oldProduct: Object;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
    private dataService: DataService) { 
    this.editProductGroup = this.formBuilder.group({
      prodName: ['', Validators.required],
      prodDescrip: ['', Validators.required],
      prodImageUrl: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.prodId = Number.parseInt(params.get('prodId'));
      this.categoryId = Number.parseInt(params.get('catId')); 
      console.log(this.categoryId);
      this.getSingleProduct();
      
      });
  }

  getSingleProduct() {
    this.dataService.getSingleProduct(this.categoryId, this.prodId).subscribe(queryResp=>{
      this.oldProduct = queryResp;
      console.log(this.oldProduct);
    });

  }

  editCatProduct() {
    this.editedProduct = new Product();
    this.editedProduct.prodName = this.editProductGroup.get('prodName').value;
    this.editedProduct.prodDescrip = this.editProductGroup.get('prodDescrip').value;
    this.editedProduct.prodImageUrl = this.editProductGroup.get('prodImageUrl').value;
    this.dataService.editProduct(this.categoryId, this.prodId, this.editedProduct).subscribe(
      respData=>{
        console.log(respData);
      });
  }

}
