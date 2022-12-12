import { Directive, HostListener, ElementRef, OnInit } from '@angular/core';

@Directive({
    selector: '[appTextareaAutoresize]'
})
export class AppTextareaAutoresizeDirective implements OnInit {

    constructor(private elementRef: ElementRef) { }

    @HostListener(':input')
    onInput() {
        this.resize();
    }

    ngOnInit() {

        if (this.elementRef.nativeElement.scrollHeight) {
            setTimeout(() => this.resize());
        }
    }

    resize() {
        if (this.elementRef.nativeElement.scrollHeight === 38){
            this.elementRef.nativeElement.style.height = '0';
            this.elementRef.nativeElement.style.height = 40 + 'px';
        }
        else{
            this.elementRef.nativeElement.style.height = '0';
            this.elementRef.nativeElement.style.height = this.elementRef.nativeElement.scrollHeight + 'px';
        }
    }
}
