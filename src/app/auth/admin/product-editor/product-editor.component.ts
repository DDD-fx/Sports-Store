import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Product } from '../../../model/product.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductRepositoryService } from '../../../model/product.repository';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatFormFieldModule, NgIf, FormsModule, MatInputModule, MatButtonModule, RouterLink],
})
export class ProductEditorComponent {
  editing: boolean = false;

  product: Product = new Product();

  constructor(
    private repository: ProductRepositoryService,
    private router: Router,
    activeRoute: ActivatedRoute
  ) {
    this.editing = activeRoute.snapshot.params['mode'] === 'edit';
    if (this.editing) {
      Object.assign(this.product, repository.getProduct(activeRoute.snapshot.params['id']));
    }
  }

  save() {
    this.repository.saveProduct(this.product);
    void this.router.navigateByUrl('/admin/main/products');
  }
}
