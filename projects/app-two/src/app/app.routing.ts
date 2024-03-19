import { Routes } from '@angular/router';
import { IndexComponent } from './_components/pages/index/index.component';
import { ProductComponent } from './_components/pages/product/product.component';
import { ShopComponent } from './_components/pages/shop/shop.component';
import { CartComponent } from './_components/pages/cart/cart.component';
import { WishlistComponent } from './_components/pages/wishlist/wishlist.component';
import { CheckoutComponent } from './_components/pages/checkout/checkout.component';
import { OrderComponent } from './_components/pages/order/order.component';
import { MyAccountComponent } from './_components/pages/my-account/my-account.component';
import { AboutUsComponent } from './_components/pages/about-us/about-us.component';
import { ContactUsComponent } from './_components/pages/contact-us/contact-us.component';
import { ErrorPageComponent } from './_components/pages/error-page/error-page.component';
import { ComparisonComponent } from './_components/pages/comparison/comparison.component';
import { ReturnPoliciesComponent } from './_components/pages/return-policies/return-policies.component';
import { ConfidentialtyPoliciesComponent } from './_components/pages/confidentialty-policies/confidentialty-policies.component';
import { PaymentComponent } from './_components/pages/payment/payment.component';
import { PaymentOneComponent } from './_components/pages/payment-one/payment-one.component';
// Dashboard

export const routes: Routes = [
    { path: '', component: IndexComponent, title: 'Home' },
    { path: 'product/:id', component: ProductComponent, title: 'Product' },
    { path: 'shop', component: ShopComponent, title: 'Shop' },
    { path: 'cart', component: CartComponent, title: 'Cart' },
    { path: 'wishlist', component: WishlistComponent, title: 'Wishlist' },
    { path: 'checkout', component: CheckoutComponent, title: 'Checkout' },
    { path: 'order', component: OrderComponent, title: 'Order' },
    { path: 'order/:id', component: OrderComponent, title: 'Order' },
    { path: 'my-account', component: MyAccountComponent, title: 'My Account' },
    { path: 'about-us', component: AboutUsComponent, title: 'About Us' },
    { path: 'contact-us', component: ContactUsComponent, title: 'Contact Us' },
    { path: 'error-page', component: ErrorPageComponent, title: 'Error Page' },
    { path: 'comparison', component: ComparisonComponent, title: 'Comparison Page' },
    { path: 'return-policies', component: ReturnPoliciesComponent, title: 'Return Policies' },
    { path: 'confidentiality-policies', component: ConfidentialtyPoliciesComponent, title: 'Confidentiality Policies' },
    { path: 'payment', component: PaymentComponent, title: 'Stripe Payments' },
    { path: 'payment-one', component: PaymentOneComponent, title: 'Stripe Payments' },
];
