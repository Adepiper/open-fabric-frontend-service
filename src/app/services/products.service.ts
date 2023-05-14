import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product, products } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  protected products = new BehaviorSubject<Product[]>(products);

  constructor() {}

  getProducts() {
    return this.products.asObservable();
  }

  addProducts(product: Product) {
    const products = [...this.products.value, product];
    this.products.next(products);
  }
}
