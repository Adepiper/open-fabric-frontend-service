import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent {
  product: Product = {
    name: 'Lorem, ipsum dolor.',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam officia, exercitationem provident praesentium ex sunt laudantium nesciunt aperiam illo saepe iure quisquam minus eos cumque tempore, reprehenderit reiciendis natus dignissimos?',
    id: Math.random(),
    url: 'https://images.pexels.com/photos/2536965/pexels-photo-2536965.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: `$30.00`,
  };

  constructor(private productService: ProductsService) {}
}
