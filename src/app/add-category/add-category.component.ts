import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { DataService } from '../data.service';
import { Category } from '../shared/models/category';


@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  messageForm: FormGroup;
  submitted = false;
  success = false;
  category: Category;
  
  constructor(private formBuilder: FormBuilder, private dataService: DataService) {
    this.messageForm = this.formBuilder.group({
      categoryName: ['', Validators.required]
    })
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
    }

  ngOnInit() {
  }

}
