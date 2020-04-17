import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Message } from '../shared/models/message';
import { QueryMessage } from '../shared/models/query-message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  messageForm: FormGroup;
  loading = false;
  submitted = false;
  myMessageAutoReply: Message;
  myAutoServerResp: string;
  autoReplyUserDispllay: string;

  myQueryMessage: QueryMessage;
  mySubj: string = "Do Not Reply";
  myMsg: string = "Thank You For Contacting PMS, We Shall Get Back To You Soon !";
  

  constructor(private formBuilder: FormBuilder, private dataService: DataService) {
    this.messageForm = this.formBuilder.group({
      sender: ['', Validators.required],
      topic: ['', Validators.required],
      phone: ['', Validators.required],
      msgQuery: ['', Validators.required]
    });
   }

  ngOnInit() {

  }
  sendAutoReply() {
    this.submitted = true;
    if (this.messageForm.invalid) {
        return;
    }
    this.loading = true;
    this.myMessageAutoReply = new Message();
    this.myMessageAutoReply.to = this.messageForm.get('sender').value;
    this.myMessageAutoReply.subject = this.mySubj;
    this.myMessageAutoReply.text = this.myMsg;

    this.dataService.sendAutoReply(this.myMessageAutoReply).subscribe(queryResp=>{
      console.log("MY SERVER RESP "+queryResp.to);
      
      //  this.myAutoServerResp= queryResp;
      //  if(this.myAutoServerResp=="Message Sent Successfully") {
      //    this.autoReplyUserDispllay = "Successfully Sent!";
      //    console.log(this.autoReplyUserDispllay);
      //    this.submitMessageQuery();

      //  }else{
      //    this.autoReplyUserDispllay = "Could Not Log Response";
      //  }
    });

  }

  submitMessageQuery() {
    this.myQueryMessage = new QueryMessage();
    this.myQueryMessage.querySender = this.messageForm.get('sender').value;
    this.myQueryMessage.topic = this.messageForm.get('topic').value;
    this.myQueryMessage.senderPhone = this.messageForm.get('phone').value;
    this.myQueryMessage.queryMessage = this.messageForm.get('msgQuery').value;
    console.log("REACHED HERE WITH SENDER "+this.myQueryMessage.querySender);
  }

}
