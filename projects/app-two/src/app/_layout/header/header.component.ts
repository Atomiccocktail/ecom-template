import { Component } from '@angular/core';
import { StoreAuthService } from '../../_services/store-auth.service';
import { devData } from '../../_environments/dev';
import { Loading } from '../../_components/common/loader/Loading';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  registerFirstName:string='';
  registerLastName:string='';
  registerEmail:string='';
  registerPassword:string='';
  registerMobile:string='';

  loginEmail:string='';
  loginPassword:string='';

  isLoggedIn:boolean = false;

  constructor( private apiService:StoreAuthService){

  }

  ngOnInit(){
    if(localStorage.getItem('user')){
      this.isLoggedIn = true;
    }
  }

  login(){
    Loading.show();
    console.log('Login Form-->',this.loginEmail,this.loginPassword);

    let requestBody = {
      "email": this.loginEmail,
      "password": this.loginPassword,
      "tenantId": devData.tenant_id,
      "siteId": devData.storeId,
      "userRole": "TenantSubscriber"
    }

    this.apiService.postLogin(requestBody).subscribe(
      (response: any) => {
          if (response) {
              Loading.hide();
              console.log('Login Response-->',response);
              (document as any).getElementById('login-dropdown').classList.remove('opened');
              this.setCurrentUser(response);
              
      }
    },
      (error:any) => {
          console.log('Error fetching data from API', error);
      }
    );

  }

  register(){
    Loading.show();
    console.log('Register Form-->',this.registerFirstName,this.registerLastName,this.registerEmail,this.registerPassword,this.registerMobile);

    let requestBody = {
      "firstName": this.registerFirstName,
      "lastName": this.registerLastName,
      "phoneNumber": this.registerMobile,
      "email": this.registerEmail,
      "password": this.registerPassword,
      "tenantId": devData.tenant_id,
      "siteId": devData.storeId,
      "userRole": "TenantSubscriber"
    }

    this.apiService.postRegister(requestBody).subscribe(
      (response: any) => {
          if (response) {
              Loading.hide();
              console.log('Register Response-->',response);
              (document as any).getElementById('register').classList.remove('active');
              (document as any).getElementById('signin').classList.add('active');
              (document as any).getElementById('register-btn').classList.remove('active');
              (document as any).getElementById('login-btn').classList.add('active');
              
      }
    },
      (error:any) => {
          console.log('Error fetching data from API', error);
      }
    );

  }

  setCurrentUser = (data:any) =>{
    if (data) {
      const roles = this.getDecodedToken(data.token);
      console.log('roles', roles);
      let userInfo = {'token':data.token,userDetails:{}};
      userInfo.userDetails = roles;
      
      let userRole = '';
      if(roles.length !==0 ){
      }
      localStorage.setItem('user', JSON.stringify(userInfo));
      this.isLoggedIn = true;
      // this.router.navigate(['/ezyy']);
      

    }
  }

  getDecodedToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }

}
