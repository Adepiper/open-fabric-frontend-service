import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsService } from '../services/products.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  products$ = new Observable<Product[]>();

  constructor(private productService: ProductsService) {}

  setProducts() {
    this.products$ = this.productService.getProducts();
  }

  ngOnInit(): void {
    this.setProducts();
  }
}
