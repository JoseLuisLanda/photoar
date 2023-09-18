import {Directive, ElementRef, HostListener, Input} from '@angular/core';


@Directive({
       selector: '[number]'
 })

export class NumberDirective {

    @Input() public number: any;
    @Input() public input: any;

    constructor(private el: ElementRef) {}

    @HostListener('change') ngOnChanges() {
        console.log('test');
    }

}