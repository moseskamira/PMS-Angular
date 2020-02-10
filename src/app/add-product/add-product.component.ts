import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  productGroup: FormGroup;
  submitted = false;
  success = false;

  constructor(private formBuilder: FormBuilder) {
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
    this.success = true;
  }

  ngOnInit() {
  }

}
