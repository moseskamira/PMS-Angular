import { Component, OnInit } from '@angular/core'
import { DataService } from '../data.service'
import { FormBuilder, Validators, FormGroup } from '@angular/forms'
import { Category } from '../shared/models/category'
import { Router } from '@angular/router'


@Component({
  selector: '.app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  addCategoryForm: FormGroup;
  submitted = false
  success = false
  category: Category
  smsg = ""
  
  categories: Object
  catProducts: Object
  detailedProd: any
  prodToEdit: any


  constructor(private dataService: DataService, private formBuilder: FormBuilder,
    private router : Router) {
    this.addCategoryForm = this.formBuilder.group({
      categoryName: ['', Validators.required]
    })
   }

  ngOnInit() {
    this.reloadCategoryData()
    this.fetchAllProducts()
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
    this.submitted = true
    if(this.addCategoryForm.invalid) {
      return
    }
    this.category = new Category()
    this.category.catName = this.addCategoryForm.get('categoryName').value
    this.dataService.addCategory(this.category).subscribe((response) => console.log(response),
      (error) => console.log(error)
      )
    this.success = true
    this.smsg = "Category Successfully Added"
    this.reloadCategoryData()
   }

  delCat(id:number) {
    this.dataService.deleteCategory(id).subscribe(
      ()=> {
        this.reloadCategoryData()
      }
    )
  }

  getCatProducts(id: number) {
    this.dataService.getcategoryProducts(id).subscribe(
      catProdData=>{
        this.catProducts = catProdData
      }
    )
  }

  displayProdDetails(prodDet: any) {
    this.detailedProd = prodDet
  }

  delProd(cId:number, pId: number) {
    if(confirm("Are You Sure")) {
      this.dataService.deleteProduct(cId, pId).subscribe(
        catData=> {
          console.log("Deleted Successfully")
          this.fetchAllProducts()
        }
      )
    }
  }

  sendToEditProdPage(prodE: any) {
    this.prodToEdit = prodE
    console.log("PRODID "+this.prodToEdit.prodId)
    this.router.navigateByUrl('/editProduct', {state: this.prodToEdit})
  }

}
