import {
  Directive,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

class CounterDirectiveContext {
  constructor(public $implicit: any) {}
}

@Directive({
  selector: '[appCounterOf]',
  standalone: true,
})
export class CounterDirective implements OnChanges {
  @Input('appCounterOf')
  appCounter: number = 0;

  constructor(private container: ViewContainerRef, private template: TemplateRef<Object>) {}

  //при каждом нажатии на страницу перерисовывает темплейт
  ngOnChanges(changes: SimpleChanges) {
    this.container.clear();
    for (let i = 0; i < this.appCounter; i++) {
      this.container.createEmbeddedView(this.template, new CounterDirectiveContext(i + 1));
    }
  }
}
