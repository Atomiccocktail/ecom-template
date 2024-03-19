import { Injectable } from "@angular/core";
import { Stripe } from "@stripe/stripe-js";

@Injectable({
    providedIn: 'root'
})

export class StripeService{
    stripePromise: Promise<Stripe>;

    constructor(){
        this.stripePromise = this.loadStripe();
    }

    private loadStripe(): Promise<Stripe>{
        return(window as any).stripe('pk_live_51OVIxdBGFqpkWyBM0CVU4Ba6L0HPC0FAO9rtLLf8vL2vL2KCz3Kmm50gTMLpD51yFUR4exJoWqjWRTL2UU5o0ROS00R1wJyYt9')
    }
}