import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { Product } from '../shared/models/product';
import { DataService } from '../data.service';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { Cloudinary } from '@cloudinary/angular-5.x';
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

  selectedFile: File;
  imageUrl: any;
  categories: Object;
  successMsg: boolean = false;

  loading: any;
  uploader: CloudinaryUploader = new CloudinaryUploader(
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
      console.log("Invalid Data Submission");
      return;
    }else{
      this.submitted = true;
      this.uploader.uploadAll();
      this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
      console.log("RESPONSE"+response);
      let res: any = JSON.parse(response);
      this.imageUrl = res.url;

      this.submitOtherFields(this.imageUrl);
    
    };
    this.uploader.onErrorItem = function(fileItem, response, status, headers) {
      console.info('onErrorItem', fileItem, response, status, headers);
    };}
  }

  submitOtherFields(myimgurl: string) {
    this.product = new Product();
    console.log("DATA is Valid");
    this.product.prodImageUrl = myimgurl;
    console.log("THIS IS PRODIMAGEURL ", this.product.prodImageUrl);
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
