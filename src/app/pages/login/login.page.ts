import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { NativeKeyboard } from '@ionic-native/native-keyboard/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild(IonSlides, {static: false})slides: IonSlides;
  public firePosition: number = 0;
  public fireDifference: number = 80;

  constructor(public keyboard: NativeKeyboard) { }

  ngOnInit() { }

  segmentChanged(event:any){
    if(event.detail.value === "login"){
      this.slides.slidePrev();
      this.firePosition += this.fireDifference;
    }else{
      this.slides.slideNext();
      this.firePosition -= this.fireDifference;
    }
  }

}
