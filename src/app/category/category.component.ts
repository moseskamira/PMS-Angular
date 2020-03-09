import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Category } from '../shared/models/category';
import { takeUntil } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';


@Component({
  selector: '.app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  messageForm: FormGroup;
  submitted = false;
  success = false;
  category: Category;
  public smsg = "";

  categories: Object;
  catProducts: Object;
  constructor(private dataService: DataService, private formBuilder: FormBuilder) {
    this.messageForm = this.formBuilder.group({
      categoryName: ['', Validators.required]
    })
   }

  ngOnInit() {
    this.reloadCategoryData();
    this.fetchAllProducts();
  }

  reloadCategoryData() {
    this.dataService.getCategories().subscribe(
      catData=> {
        this.categories = catData
      }
    )
  }

  fetchAllProducts() {
    this.dataService.getAllProducts().subscribe(
      catData=> {
        this.catProducts = catData
      }
    )
  }

  onSubmit() {
    this.submitted = true;
    if(this.messageForm.invalid) {
      return;
    }
    this.category = new Category();
    this.category.catName = this.messageForm.get('categoryName').value;
    this.dataService.addCategory(this.category).subscribe(
      (response) => console.log(response),
    (error) => console.log(error));
    this.success = true;
    this.smsg = "Category Successfully Added";
    this.reloadCategoryData();
   }

  delCat(id:number) {
    this.dataService.deleteCategory(id).subscribe(
      catData=> {
        console.log("Deleted Successfully");
        this.reloadCategoryData();
      }
    )
  }

  getCatProducts(id: number) {
    console.log("You Clicked "+id);
    this.dataService.getcategoryProducts(id).subscribe(
      catProdData=>{
        this.catProducts = catProdData;
      }
    )
  }

  public loadPreviousPage() {
    
    console.log("Clicked Previous Button");

    // if (this.apiService.prev !== undefined && this.apiService.prev !== '') {
    //   this.products = [];
    //   this.apiService.sendGetRequestToUrl(this.apiService.prev).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>) => {
    //     console.log(res);
    //     this.products = res.body;
    //   })
    // }

  }

  public loadNextPage() {
    console.log("Clicked Next Page Button");
    // if (this.apiService.next !== undefined && this.apiService.next !== '') {
    //   this.products = [];
    //   this.apiService.sendGetRequestToUrl(this.apiService.next).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>) => {
    //     console.log(res);
    //     this.products = res.body;
    //   })
    // }
  }

  delProd(cId:number, pId: number) {
    this.dataService.deleteProduct(cId, pId).subscribe(
      catData=> {
        console.log("Deleted Successfully");
        this.fetchAllProducts();
      }
    )
  }

}
