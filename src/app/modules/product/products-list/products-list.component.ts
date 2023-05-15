import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, finalize } from 'rxjs';
import { ProductsService } from '../../../core/services/products.service';
import { Product } from '../../../models/product.model';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  protected products = new BehaviorSubject<Product[]>([]);
  products$ = this.products.asObservable();
  loading = new BehaviorSubject(false);
  loading$ = this.loading.asObservable();

  constructor(
    private productService: ProductsService,
    private toaster: HotToastService
  ) {}

  getProducts() {
    this.loading.next(true);

    this.productService
      .getProducts()
      .pipe(
        finalize(() => {
          this.loading.next(false);
        })
      )
      .subscribe({
        next: (value) => {
          this.products.next(value);
        },
        error: (error) => {
          this.toaster.error(error.error.message ?? 'Something went wrong');
        },
      });
  }

  ngOnInit(): void {
    this.getProducts();
  }
}
