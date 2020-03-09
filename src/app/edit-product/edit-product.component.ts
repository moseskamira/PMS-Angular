import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from '../shared/models/product';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  editProductGroup: FormGroup;
  submitted = false;
  success = false;
  product: Product;
  categoryId: number;

  constructor(private formBuilder: FormBuilder) { 
    this.editProductGroup = this.formBuilder.group({
      // catId: ['', Validators.required],
      prodName: ['', Validators.required],
      prodDescrip: ['', Validators.required],
      prodImageUrl: ['', Validators.required],

    })


  }

  ngOnInit() {
  }

}
