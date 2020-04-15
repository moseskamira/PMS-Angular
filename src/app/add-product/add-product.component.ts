import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { Product } from '../shared/models/product';
import { DataService } from '../data.service';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';

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
  imageUrl: string;
  categories: Object;
  successMsg: boolean = false;
  imageUploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions({ cloudName: 'dfejj9f8i', uploadPreset: 'usguhe1a' })
  );
  
  constructor(private formBuilder: FormBuilder, private dataService: DataService) {
    this.productGroup = this.formBuilder.group({
      catId: [0, Validators.required],
      prodName: ['', Validators.required, Validators.minLength(4)],
      prodDescrip: ['', Validators.required],
      unitPrice: [, Validators.required],
    });
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

  onSubmit() {
    this.uploadImage();

  }

  uploadImage() {
    if(this.productGroup.invalid) {
      return;
    }else{
      this.submitted = true;
      this.imageUploader.uploadAll();
      this.imageUploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
      console.log("RESPONSE"+response);
      let res: any = JSON.parse(response);
      this.imageUrl = res.secure_url;
      this.submitOtherFields(this.imageUrl);
    };
    this.imageUploader.onErrorItem = function(fileItem, response, status, headers) {
      console.info('onErrorItem', fileItem, response, status, headers);
    };}
  }

  submitOtherFields(myimgurl: string) {
    this.product = new Product();
    this.product.prodImageUrl = myimgurl;
    this.product.prodName = this.productGroup.get('prodName').value;
    this.product.prodDescrip = this.productGroup.get('prodDescrip').value;
    this.product.unitPrice = Number.parseInt(this.productGroup.get('unitPrice').value);
    console.log("UNITPRICE"+this.product.unitPrice);
    this.categoryId = this.productGroup.get('catId').value;
    this.dataService.addProduct(this.categoryId, this.product).subscribe(
      (response) => console.log(response),
      (error) => console.log(error));
      this.successMsg = true;     
  }

}
