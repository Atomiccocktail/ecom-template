import { Component } from '@angular/core';
import { devData } from '../../../_environments/dev';
import { StoreProductsService } from '../../../_services/store-products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {

  tenant_id = devData.tenant_id;
  productData:any = [];

  constructor( private apiService:StoreProductsService,public router: Router,){}

  ngOnInit(){
    this.getProducts();
  }
  // ngAfterViewInit(){
  //   this.getProducts();
  // }

  getProducts(){
    this.apiService.getProducts(this.tenant_id).subscribe(
        (response: any) => {
            if (response) {
                console.log('Get Product-->',response);
                this.productData = response;
                // this.tableData = response;
                // this.tableData.map((item:any)=>{
                //   item.checked = false;
                // })
                // console.log('Get tableData-->',this.tableData);
        }
      },
        (error:any) => {
            console.log('Error fetching data from API', error);
        }
      );
  }

  viewProductPage(productId:string){
    this.router.navigateByUrl(`/product/${productId}`);
  }

}
