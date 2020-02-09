import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'


@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  messageForm: FormGroup;
  submitted = false;
  success = false;

  constructor(private formBuilder: FormBuilder) {
    this.messageForm = this.formBuilder.group({
      categoryName: ['', Validators.required]
    })

   }

   onSubmit() {
     this.submitted = true;

     if(this.messageForm.invalid) {
       return;

     }
     this.success = true;
   }



  ngOnInit() {
  }

}
