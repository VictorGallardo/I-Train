import { Directive } from '@angular/core';

@Directive({
  selector: '[appAutoHide]',
  host: {
    '(ionScroll)': 'onContentScroll($event)'
  }
})
export class AutoHideDirective {

  constructor() {
    console.log('Soy el auto hide');

  }

  onContentScroll(e) {
    console.log(e);

  }

}
