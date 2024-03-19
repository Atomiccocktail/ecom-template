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

import { routes } from './app.routing';
import { RouterModule } from '@angular/router';
import { IndexComponent } from './_components/pages/index/index.component';

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
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
