import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketService } from './socket.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';
  serverMsg = ['', '', ''];

  private socketSubscription: Subscription;

  constructor(private socket: SocketService) { }

  ngOnInit(): void {
    this.socket.connect();

    this.socketSubscription = this.socket.messages.subscribe((message: string) => {
      this.serverMsg.push(message); // ['', '', '', 'The']

      console.log('received message from server: ', message);

      this.serverMsg.shift(); // ['', '', 'The']
    });
  }

  getNextWord(): void {
    this.socket.send('msg');
  }

  ngOnDestroy() {
    this.socketSubscription.unsubscribe();
  }


}
