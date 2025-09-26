import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'; // Adjust path if your service is in a subfolder

export interface GrokMessage {
  role: 'user' | 'assistant' | 'system';
  content: string; // Text only
}

export interface GrokRequest {
  model: string;
  messages: GrokMessage[];
  temperature?: number;
  stream?: boolean;
}

export interface GrokResponse {
  choices: Array<{
    message: GrokMessage;
  }>;
}

@Injectable({
  providedIn: 'root',
})
export class GrokOpenRouterService {
  private apiUrl = 'https://openrouter.ai/api/v1/chat/completions';
  private apiKey = environment.openRouterApiKey;

  constructor(private http: HttpClient) {}

  sendMessages(messages: GrokMessage[], model: string = 'x-ai/grok-4-fast:free'): Observable<GrokResponse> {
    if (!this.apiKey) {
      throw new Error('API key missing. Check environment file.');
    }

    const requestBody: GrokRequest = {
      model,
      messages,
      temperature: 0.7, // Simple default
      stream: false,
    };

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
    });

    return this.http.post<GrokResponse>(this.apiUrl, requestBody, { headers });
  }
}