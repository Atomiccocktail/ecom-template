import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthComponent } from './_components/auth/auth.component';
import { AccountComponent } from './_components/account/account.component';
import { ProductsComponent } from './_components/store/products/products.component';
import { CategoriesComponent } from './_components/store/categories/categories.component';
import { BrandsComponent } from './_components/store/brands/brands.component';
import { SliderComponent } from './_components/slider/slider.component';
import { PaginationComponent } from './_shared/pagination/pagination.component';
import { GoogleAutocompleteComponent } from './_shared/google-autocomplete/google-autocomplete.component';
import { NavigationComponent } from './_layout/navigation/navigation.component';
import { FooterComponent } from './_layout/footer/footer.component';
import { HeaderComponent } from './_layout/header/header.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routing';
import { IndexComponent } from './_components/pages/index/index.component';
import { StoreProductsService } from './_services/store-products.service';
import { HttpClientModule } from '@angular/common/http';
import { ProductComponent } from './_components/pages/product/product.component';
import { StoreCartService } from './_services/store-cart.service';
import { StoreWishlistService } from './_services/store-wishlist.service';
import { CartComponent } from './_components/pages/cart/cart.component';
import { FormsModule } from '@angular/forms';
import { CheckoutComponent } from './_components/pages/checkout/checkout.component';
import { WishlistComponent } from './_components/pages/wishlist/wishlist.component';
import { PaymentComponent } from './_components/pages/payment/payment.component';
import { NgxStripeModule } from 'ngx-stripe';
import { StoreAuthService } from './_services/store-auth.service';
import { LoaderComponent } from './_components/common/loader/loader.component';
import { PaymentOneComponent } from './_components/pages/payment-one/payment-one.component';
import { ShopComponent } from './_components/pages/shop/shop.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    AccountComponent,
    ProductsComponent,
    CategoriesComponent,
    BrandsComponent,
    IndexComponent,
    SliderComponent,
    PaginationComponent,
    GoogleAutocompleteComponent,
    NavigationComponent,
    FooterComponent,
    HeaderComponent,
    ProductComponent,
    CartComponent,
    WishlistComponent,
    CheckoutComponent,
    PaymentComponent,
    PaymentOneComponent,
    LoaderComponent,
    ShopComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
    FormsModule,
    NgxStripeModule.forRoot('pk_test_51OVIxdBGFqpkWyBMcLDGk5CxcgTWffYm6lKUwnoGsHbEn4t4Nsuh5ZyBSf3Jn3jFvU4MGNt2ValWvQQknKkaXXCN00ZCa4KUdO'),
  ],
  providers: [StoreProductsService,StoreCartService,StoreWishlistService,StoreAuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
