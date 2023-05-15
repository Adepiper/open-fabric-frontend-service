import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: ProductComponent,
    children: [
      {
        path: '',
        component: ProductsListComponent,
      },
      {
        path: 'new',
        component: AddNewProductComponent,
      },
      {
        path: ':id',
        component: ProductDetailComponent,
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
