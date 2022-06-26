import { animate, animateChild, query, stagger, state, style, transition, trigger } from "@angular/animations";

export const animationLetter =  [trigger('openClose', [
    transition('void => *',[
      style({
        transform: 'translateX(0) scale(0.5)'
      }),
        animate('0.2s')
    ]),
    transition('* => void', [

        animate('0.2s', style({
            // color: 'red',
            opacity: 0,
            transform: 'translateX(0) scale(0.5)'
        }))
    ]),
  ]),
]



// export const animationLetter = [
//   trigger('openClose', [
//     transition('* <=> *', [
//       query(
//         ':enter',
//         [
//           style({ opacity: 0 }),
//           stagger(
//             '70ms',
//             animate(
//               '570ms ease-out',
//               style({ opacity: 1 })
//             )
//           )
//         ],
//         { optional: true }
//       ),
//       query('@childAnimation', [
//         animateChild()
//      ], { optional: true }),
//       query('void', animate('570ms', style({ opacity: 0 })), {
//         optional: true
//       })
//     ])
//   ])
// ]