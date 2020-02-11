import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Category } from '../shared/models/category';

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
   
  }

  reloadCategoryData() {
    this.dataService.getCategories().subscribe(
      catData=> {
        this.categories = catData
        console.log(this.categories)
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
        console.log(this.catProducts);

      }

    )

  }
}
