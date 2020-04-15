import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Product } from '../shared/models/product';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  @Input() model: Product;
  editProductForm: FormGroup;
  submitted = false;
  success = false;
  categoryId: number;
  prodId: number;
  editedProduct: Product;
  oldProduct: Product;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
    private dataService: DataService) { 
    this.editProductForm = this.formBuilder.group({
      prodName: ['', Validators.required],
      unitPrice: ['', Validators.required],
      prodDescrip: ['', Validators.required],
      prodImageUrl: [''],
    })
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.prodId = Number.parseInt(params.get('prodId'));
      this.categoryId = Number.parseInt(params.get('catId')); 
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
    this.editedProduct.prodName = this.editProductForm.get('prodName').value;
    this.editedProduct.unitPrice = this.editProductForm.get('unitPrice').value;
    this.editedProduct.prodDescrip = this.editProductForm.get('prodDescrip').value;
    this.editedProduct.prodImageUrl = this.editProductForm.get('prodImageUrl').value;
    this.dataService.editProduct(this.categoryId, this.prodId, this.editedProduct).subscribe(
      respData=>{
        console.log(respData);
        window.alert("Successfully Edited Product");
      });
    this.editProductForm.reset();
  }

}
