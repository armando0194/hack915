import { Component, NgZone } from '@angular/core';
import { ChatService } from './chat.service';
import { HttpClient } from '@angular/common/http';
import {ApiAiClient} from './ts/ApiAiClient';
import { SmartTableService } from '../../../@core/mock/smart-table.service';

const botAvatar: string = 'https://i.pinimg.com/originals/0c/67/5a/0c675a8e1061478d2b7b21b330093444.gif';

@Component({
  selector: 'ngx-chat',
  templateUrl: 'chat.component.html',
  styleUrls: ['chat.component.scss'],
  providers: [ ChatService ],
})
export class ChatComponent {

  messages: any[];
  chatToggle = false;
  chatDisplay = "none";
  loading = false;
  
  // Random ID to maintain session with server
  sessionId = Math.random().toString(36).slice(-5);

  constructor(protected chatService: ChatService, private http: HttpClient, private service : SmartTableService) {
    this.messages = [];//this.chatService.loadMessages();
  }

  toggleChat(){
    this.chatToggle = !this.chatToggle;
    this.chatDisplay = this.chatToggle? "block" : "none";
  }

  sendMessage(event: any) {
    const files = !event.files ? [] : event.files.map((file) => {
      return {
        url: file.src,
        type: file.type,
        icon: 'nb-compose',
      };
    });

    this.messages.push({
      text: event.message,
      date: new Date(),
      reply: true,
      type: files.length ? 'file' : 'text',
      files: files,
      user: {
        name: 'Jonh Doe',
        avatar: 'https://i.gifer.com/no.gif',
      },
    });
    // const botReply = this.chatService.reply(event.message);
    // if (botReply) {
    //   setTimeout(() => { this.messages.push(botReply); }, 500);
    // }
    // this.handleUserMessage(event.message) ;


    const client = new ApiAiClient({accessToken: '2cee6503a7744d73846911da73782207'})
    client
        .textRequest(event.message)
        .then((response) => {setTimeout(() => { 
          this.messages.push(this.addBotMessage(response.result.fulfillment.speech)); 
          if (response.result.fulfillment.speech.includes("Your income has been changed")){
            console.log("here");
            let res = response.result.fulfillment.speech.split(' ');
            console.log(res[res.length-1]);
            this.service.updateData(res[res.length-1]).subscribe(data => {console.log(data);});
          }
        

        }, 500);

        })
        .catch((error) => {setTimeout(() => { this.messages.push(this.addBotMessage("Please rephrase your question :(")); }, 500);})
  }

  // handleUserMessage(text) {
  //   this.loading = true;

  //   // Make the request 
  //   this.http.post<any>(
  //     dialogflowURL,
  //     {
  //       sessionId: this.sessionId,
  //       queryInput: {
  //         text: {
  //           text,
  //           languageCode: 'en-US'
  //         }
  //       }
  //     }
  //   )
  //   .subscribe(res => {
  //     const { fulfillmentText } = res;
  //     this.addBotMessage(fulfillmentText);
  //     this.loading = false;
  //   });
  // }

  addBotMessage(message){
    return  {
      text: message,
      reply: false,
      date: new Date(),
      user: {
        name: 'Bot',
        avatar: botAvatar,
      },
    };
  }
}
