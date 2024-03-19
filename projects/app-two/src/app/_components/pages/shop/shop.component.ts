import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { devData } from '../../../_environments/dev';
import { StoreProductsService } from '../../../_services/store-products.service';
import { StoreCategoriesService } from '../../../_services/store-categories.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {

  category:string = '';
  tenant_id = devData.tenant_id;
  productData:any = [];
  categoryDataResult:any = [];

  constructor(private route: ActivatedRoute,private apiService:StoreProductsService, private categoryService:StoreCategoriesService ){

  }

  ngOnInit(){
    console.log('queryParams-->',this.route.snapshot.queryParams);
    console.log('fragment-->',this.route.snapshot.fragment);
    if(this.route.snapshot.queryParams['category']){
      this.category = this.route.snapshot.queryParams['category'];
      this.getProducts(this.category);
    }
    this.getCategory();
  }

  getProducts(category:string){
    this.apiService.getProductsByCategory(this.tenant_id,category).subscribe(
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

  getCategory(){
    this.categoryService.getCategory(this.tenant_id).subscribe(
      (response: any) => {
          if (response) {
              this.categoryDataResult = response;
              // this.categoryList = response.map((a:any) => a.name);
              console.log('CategoryList', this.categoryDataResult);
          }
      },
      (error: any) => {
          console.log('Error fetching data from API', error);
      }
  );
  }

}
