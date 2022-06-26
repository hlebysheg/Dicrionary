import { animate, style, transition, trigger } from "@angular/animations";

export const testAnimation =  [trigger('enter', [
    transition('void => *',[
      style({
        height: '1rem',
        //transform: 'translateX(0) scale(1) linear'
      }),
        animate('0.4s ease-in')
    ]),
    transition('* => void', [

        animate('0.2s', style({
            // color: 'red',
            opacity: 0,
            transform: 'translateX(0) scale(0.5)'
        }))
    ]),
])]
