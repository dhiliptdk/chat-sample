import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  endpoint = "api/chat"
  url = `${environment.API_URI}/${this.endpoint}`
  constructor(public http: HttpClient) {
  }
  get(user) {
    return this.http.get(`${this.url}/${user}`)
  }
  send(message) {
    return this.http.post(`${this.url}/`, message)

  }
  update(message) {
    let id = message._id
    delete message._id
    return this.http.patch(`${this.url}/${id}`, message)
  }
}
