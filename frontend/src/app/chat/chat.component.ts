import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChatService } from '../_services/chat.service';
import { SocketService } from '../_services/socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  @ViewChild("scrollMe") messageContainer: ElementRef
  user: User={}
  text: string
  editText: string
  subscription: Subscription = new Subscription()
  constructor(
    public chatService: ChatService,
    public socketService: SocketService,
    public activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    public cdr: ChangeDetectorRef) {
    this.user.name = activatedRoute.snapshot.paramMap.get("user")
  }
  initSubscription() {
    this.subscription
      .add(this.socketService
        .newMessageReceived()
        .subscribe((message: Message) => this.pushMessage(message)))
    this.subscription
      .add(this.socketService
        .udpateMessageReceived()
        .subscribe((message: Message) => this.updateMessage(message)))
  }

  ngOnInit(): void {
    this.socketService.join(this.user.name)
    this.get()
    this.initSubscription()
  }
  get() {
    let sub$ = this.chatService.get(this.user.name).subscribe((messages: Message[]) => {
      this.user.messages = messages
      this.updateView()
    })
    this.subscription.add(sub$)
  }
  pushMessage(message: Message) {
    console.log("message received", message)
    this.user.messages.push(message)
    this.scrollToBottom()
  }
  updateMessage(newMessage: Message) {
    console.log("updating", newMessage)
    let message = this.user.messages.find(message => newMessage._id === message._id)
    Object.assign(message, newMessage)
    this.updateView()
  }
  send(ngform: NgForm) {
    console.log(ngform)
    const message = {
      from: this.user.name,
      to: this.user.name === "michel" ? "justin" : "michel",
      text: ngform.value.text,
      timestamp: new Date()
    }
    ngform.reset()
    this.chatService.send(message).subscribe((msg) => {
      console.log(msg, "sent")
    })
  }
  scrollToBottom() {
    try {
      this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
      this.updateView()
    } catch (err) {

    }
  }
  updateView() {
    if (!this.cdr["destroyed"]) this.cdr.detectChanges()
  }
  openEditDialog(editTempRef: TemplateRef<any>, message) {
    let dialogRef = this.dialog.open(editTempRef, {
      data: message,
    });

  }
  save(ngForm: NgForm, message) {
    let edited = {
      ...message,
      text: ngForm.value.editText
    }
    this.chatService.update(edited).subscribe((msg) => {
    })
  }
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}

export interface User {
  name?: string;
  messages?: Message[]

}
export interface Message {
  _id: string,
  text: string
  // type: "incoming" | "outcoming"
  from: string
  to: string

}