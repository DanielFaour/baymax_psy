import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatMessage } from './chat-message';

@Component({
  selector: 'app-chat-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './chat-component.html',
  styleUrls: ['./chat-component.scss', '../app.scss'],
  standalone: true,
})
export class ChatComponent {
  message: string = '';
  messages: ChatMessage[] = [];

  ngOnInit() {
    const savedMessages = localStorage.getItem('messages');
    if (savedMessages) {
      this.messages = JSON.parse(savedMessages);
    }
  }
  loremIpsum() {
    return `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`;
  }

  onChatButtonClick() {
    console.log(this.message);
    if (this.message.trim()) {
      this.addMessage('user', this.message.trim());
      localStorage.setItem('messages', JSON.stringify(this.messages));
      this.addMessage('baymax', this.loremIpsum());
      localStorage.setItem('messages', JSON.stringify(this.messages));
    }
    console.log(this.messages);
    this.message = '';
  }

  private addMessage(sender: 'user' | 'baymax', text: string) {
    this.messages.push({ sender, text });
    localStorage.setItem('messages', JSON.stringify(this.messages));
  }
}
