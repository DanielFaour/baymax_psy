import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface BotMessage {
  role: 'user' | 'assistant' | 'system';
  content: string; // Text only
}

export interface BotRequest {
  model: string;
  messages: BotMessage[];
  temperature?: number;
  stream?: boolean;
}

export interface BotResponse {
  choices: Array<{
    message: BotMessage;
  }>;
}

let apiModel = 'z-ai/glm-4.5-air:free'; // default model

@Injectable({
  providedIn: 'root',
})
export class OpenRouterService {
  private apiUrl = 'https://openrouter.ai/api/v1/chat/completions';
  private apiKey = environment.openRouterApiKey;

  constructor(private http: HttpClient) {}

  testConnection(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
    });

    return this.http.post(
      this.apiUrl,
      {
        model: apiModel,
        messages: [{ role: 'user', content: 'ping' }],
      },
      { headers }
    );
  }

  sendMessages(messages: BotMessage[], model: string = apiModel): Observable<BotResponse> {
    if (!this.apiKey) {
      throw new Error('API key missing. Check environment file.');
    }

    const requestBody: BotRequest = {
      model,
      messages,
      temperature: 0.7, // Simple default
      stream: false,
    };

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
    });

    return this.http.post<BotResponse>(this.apiUrl, requestBody, { headers });
  }
}
