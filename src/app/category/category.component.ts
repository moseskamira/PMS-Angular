import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Category } from '../shared/models/category';
import { Product } from '../shared/models/product';


@Component({
  selector: '.app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  addCategoryForm: FormGroup;
  submitted = false;
  success = false;
  category: Category;
  public smsg = "";
  detailedProd: Product;

  categories: Object;
  catProducts: Object;
  constructor(private dataService: DataService, private formBuilder: FormBuilder) {
    this.addCategoryForm = this.formBuilder.group({
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
    if(this.addCategoryForm.invalid) {
      return;
    }
    this.category = new Category();
    this.category.catName = this.addCategoryForm.get('categoryName').value;
    this.dataService.addCategory(this.category).subscribe((response) => console.log(response),
      (error) => console.log(error)
      );
    this.success = true;
    this.smsg = "Category Successfully Added";
    this.reloadCategoryData();
   }

  delCat(id:number) {
    this.dataService.deleteCategory(id).subscribe(
      ()=> {
        this.reloadCategoryData();
      }
    )
  }

  getCatProducts(id: number) {
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

  displayProdDetails(prodDet: Product) {
    this.detailedProd = prodDet;
    console.log("Image URL "+this.detailedProd.prodImageUrl);
  }

  delProd(cId:number, pId: number) {
    if(confirm("Are You Sure")) {
      this.dataService.deleteProduct(cId, pId).subscribe(
        catData=> {
          console.log("Deleted Successfully");
          this.fetchAllProducts();
        }
      )
    }
  }

}
