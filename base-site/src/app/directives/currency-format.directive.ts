import { AfterViewInit, Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appCurrencyFormat]',
  standalone: true,
})
export class CurrencyFormatDirective implements AfterViewInit {

  @Input() currencyCode: string = 'USD';

  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    this.formatField();
  }

  @HostListener('focus') onFocus(): void {
    this.el.nativeElement.value = this.el.nativeElement.value.replace(/[^0-9.]/g, '');
  }

  @HostListener('blur') onBlur() {
    this.formatField();
  }

  private formatField(): void {
    const value: number = parseFloat(this.el.nativeElement.value);
    if (!isNaN(value)) {
      this.el.nativeElement.value = new Intl.NumberFormat('en-US', { style: 'currency', currency: this.currencyCode }).format(value);
    }
  }
}
