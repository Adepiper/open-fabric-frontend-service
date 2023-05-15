import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { BehaviorSubject, finalize } from 'rxjs';
import { ProductsService } from 'src/app/core/services/products.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.scss'],
})
export class AddNewProductComponent {
  loading = new BehaviorSubject(false);
  loading$ = this.loading.asObservable();
  productForm = new FormGroup({
    name: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    description: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    url: new FormControl<string>('', [
      Validators.required,
      Validators.pattern(
        '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'
      ),
    ]),
    price: new FormControl<string>('', [Validators.required]),
  });

  constructor(
    private toastr: HotToastService,
    private productService: ProductsService
  ) {}

  inputIsInValid(control: AbstractControl): boolean | undefined {
    return control.touched && control.invalid;
  }

  showInputError(control: AbstractControl) {
    const controlErrors = control.errors;
    if (!!controlErrors) {
      const errorName: string = Object.keys(controlErrors)[0];
      const errorDescription: any = Object.values(controlErrors)[0];
      const errorMessage: { [key: string]: any } = {
        minlength: `Must not be less than ${errorDescription.requiredLength} characters`,
        maxlength: `Must not be more than ${errorDescription.requiredLength} characters`,
        required: `Required`,
        email: `Should be a valid Email`,
        mismatch: `${errorDescription}`,
        invalid: errorDescription ? errorDescription : 'This value is invalid',
        max: `Must not be more than ${errorDescription.max}`,
        hasNumber: `should contain a number`,
        hasCapitalCase: `should contain a capital letter`,
        hasSmallCase: `$should contain a small letter`,
        hasSpecialCharacters: `should contain a special character`,
        confirmPassword: `Password mismatch`,
        fromToDate: `Issued date greater than expiry date`,
        pattern: `Should be a valid url`,
      };

      return errorMessage[errorName];
    }
  }

  onSubmit() {
    const product = this.productForm.value as Product;
    this.loading.next(true);
    this.productService
      .addProducts(product)
      .pipe(
        finalize(() => {
          this.loading.next(false);
        })
      )
      .subscribe({
        next: ({ message }) => {
          this.toastr.success(message);
          this.productForm.reset();
        },
        error: (error) => {
          this.toastr.error(error.error.message ?? 'Something went wrong');
        },
      });
  }
}
