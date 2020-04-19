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
  oldProduct: any;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,private router:Router,
    private dataService: DataService) { 
    this.editProductForm = this.formBuilder.group({
      prodName: ['', Validators.required],
      unitPrice: ['', Validators.required],
      prodDescrip: ['', Validators.required],
      prodImageUrl: [''],
    })

    console.log("ROUTER INFO "+this.router.getCurrentNavigation().extras.state);
  }

  ngOnInit() {
    this.oldProduct = history.state;
    this.categoryId = Number.parseInt(this.oldProduct.prodCat.catId);
    this.prodId = Number.parseInt(this.oldProduct.prodId);
    console.log("OLDPRODUCT URL "+this.oldProduct.prodImageUrl);
  }

  editCatProduct() {
    this.editedProduct = new Product();
    this.editedProduct.prodName = this.editProductForm.get('prodName').value;
    this.editedProduct.unitPrice = this.editProductForm.get('unitPrice').value;
    this.editedProduct.prodDescrip = this.editProductForm.get('prodDescrip').value;
    this.editedProduct.prodImageUrl = this.editProductForm.get('prodImageUrl').value;
    console.log("MYCATID "+this.categoryId);
    this.dataService.editProduct(this.categoryId, this.prodId, this.editedProduct).subscribe(
      respData=>{
        console.log(respData);
        // window.alert("Successfully Edited Product");
      });
    this.editProductForm.reset();
  }

}
