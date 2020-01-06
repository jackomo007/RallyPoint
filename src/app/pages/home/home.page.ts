import { ProductService } from './../../services/product.service';
import { Product } from './../../interfaces/product';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { IonSlides, LoadingController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  private products = new Array<Product>();
  private productsSuscription: Subscription;
  private loading: any;

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    ) {
    this.productsSuscription = this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
   }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.productsSuscription.unsubscribe();
  }

  async logout(){
    try {
      await this.authService.logout();
    } catch (error) {
      console.error(error);
    }
  }

  async deleteProduct(id: string){
    try {
      await this.productService.deleteProduct(id);
    } catch (error) {
      this.presentToast('Something goes wrong');
    }
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      spinner: 'circular',
      message: 'Validating data... just wait a second',
    });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color:'danger'
    });
    toast.present();
  }

}
