import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../core/services/products.service';
import { Product } from '../../../models/product.model';
import { BehaviorSubject, finalize, take } from 'rxjs';
import { HotToastService } from '@ngneat/hot-toast';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  loading = new BehaviorSubject(false);
  loading$ = this.loading.asObservable();
  routeParamsId!: string;
  product = new BehaviorSubject<Product | undefined>(undefined);
  product$ = this.product.asObservable();

  constructor(
    private productService: ProductsService,
    private toastr: HotToastService,
    private activatedRoute: ActivatedRoute
  ) {}

  getProductById() {
    this.loading.next(true);

    this.productService
      .getProductById(this.routeParamsId)
      .pipe(
        finalize(() => {
          this.loading.next(false);
        })
      )
      .subscribe({
        next: (value) => {
          this.product.next(value);
        },
        error: (error) => {
          this.toastr.error(error.error.message ?? 'Something went wrong');
        },
      });
  }

  ngOnInit(): void {
    this.getIdFromRoute();
    this.getProductById();
  }

  getIdFromRoute() {
    this.activatedRoute.params.pipe(take(1)).subscribe((params) => {
      this.routeParamsId = params['id'];
    });
  }
}
