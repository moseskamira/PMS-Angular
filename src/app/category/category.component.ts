import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categories: Object;
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getCategories().subscribe(
      catData=> {
        this.categories = catData
        console.log(this.categories)
      }
    )
  }

  deleteCategory(categoryId: number) {
    this.dataService.deleteCategory(categoryId).subscribe(
      catData=> {
        this.categories = catData
        console.log(this.categories)
      }
    )
  }


}
