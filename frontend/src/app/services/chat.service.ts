import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chat } from '../models/chat';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

const API = environment.chatApi;

@Injectable({
  providedIn: 'root'
})
export class ChatService {

constructor(private http: HttpClient) { }

getAllChats(): Observable<Chat[]> {
  return this.http.get<Chat[]>(API);
}

getChat(id: number) {
  return this.getAllChats().pipe(
    map(chat => {
      return chat.find(c => c.id === id);
    })
  )
}

addChat(chat: Chat) {
  return this.http.post(API, chat);
}

updateChat(id: number, chat: Chat) {
  return this.http.put(`${API}/${id}`, chat);
}

}
