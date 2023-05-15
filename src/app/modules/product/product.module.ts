import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ProductCardComponent } from './products-list/components/product-card/product-card.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { LoaderComponent } from 'src/app/components/loader/loader.component';
import { TableEmptyStateComponent } from 'src/app/components/table-empty-state/table-empty-state.component';

@NgModule({
  declarations: [
    ProductComponent,
    ProductsListComponent,
    AddNewProductComponent,
    ProductDetailComponent,
    ProductCardComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    LoaderComponent,
    TableEmptyStateComponent,
  ],
})
export class ProductModule {}
