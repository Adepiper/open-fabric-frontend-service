import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Product } from '../../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  protected apiUrl = environment.apiUrl;

  constructor(private https: HttpClient) {}

  getProducts() {
    return this.https.get<Product[]>(`${this.apiUrl}/products`);
  }

  addProducts(product: Product) {}
}
