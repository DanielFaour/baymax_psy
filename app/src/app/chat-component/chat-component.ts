import { Component, OnInit } from '@angular/core'; // Add OnInit for ngOnInit
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatMessage } from './chat-message';
import { GrokOpenRouterService, GrokMessage, GrokResponse } from './grok/grok-openrouter.service';

@Component({
  selector: 'app-chat-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './chat-component.html',
  styleUrls: ['./chat-component.scss', '../app.scss'],
  standalone: true,
})
export class ChatComponent implements OnInit {
  message: string = '';
  messages: ChatMessage[] = [];

  constructor(private grokService: GrokOpenRouterService) {}

  ngOnInit() {
    const savedMessages = localStorage.getItem('messages');
    if (savedMessages) {
      this.messages = JSON.parse(savedMessages);
      if (this.messages.length > 1)
      setTimeout(() => this.scrolltoBottom(), 0);
    }
    if (this.messages.length === 0) {
      this.addMessage(
        'baymax',
        'You are Baymax, a supportive AI companion acting like a psychologist with funny and caring personality. Use funny phrases from the movie Big Hero 6.'
      );
    }
  }

  scrolltoBottom() {
    setTimeout(() => {
      let messageDiv = document.getElementById('app-container');
      if (messageDiv) {
        messageDiv.scrollTop = messageDiv.scrollHeight;
      }
    }, 0);
  }

  onClearButtonClick() {
    this.messages = [];
    localStorage.removeItem('messages');
    this.addMessage(
      'baymax',
      'You are Baymax, a supportive AI companion acting like a psychologist with funny and caring personality. Use funny phrases from the movie Big Hero 6.'
    );
  }

  onChatButtonClick() {
    console.log(this.message);
    if (this.message.trim()) {
      // uesr message
      this.addMessage('user', this.message.trim());
      this.addMessage('baymax', "...");

      // prepare messages for Grok
      const messagesForGrok: GrokMessage[] = this.messages.map((msg) => ({
        role: msg.sender === 'baymax' ? 'assistant' : msg.sender,
        content: msg.text,
      }));

      // send to Grok and handle response
      this.grokService.sendMessages(messagesForGrok).subscribe({
        next: (response: GrokResponse) => {
          const grokReply = response.choices[0]?.message?.content || 'No response from Baymax.';
          // replace the "..." message with the actual reply
          if (this.messages.length > 0 && this.messages[this.messages.length - 1].text === "...") {
            this.messages.pop(); // remove last message ("...")
          }
          this.addMessage('baymax', grokReply);
          localStorage.setItem('messages', JSON.stringify(this.messages));
          console.log('Grok replied:', grokReply);
        },
        error: (error) => {
          console.error('Grok API error:', error);
          const errorMsg = `Error: ${
            error.message || 'Failed to get response (check API key/limits).'
          }`;
          this.addMessage('baymax', errorMsg);
          localStorage.setItem('messages', JSON.stringify(this.messages));
        },
      });

      // clear input
      this.message = '';
    }
    console.log(this.messages);
  }

  private addMessage(sender: 'user' | 'baymax', text: string) {
    this.messages.push({ sender, text });
    localStorage.setItem('messages', JSON.stringify(this.messages));
    setTimeout(() => this.scrolltoBottom(), 0);
  }
}
