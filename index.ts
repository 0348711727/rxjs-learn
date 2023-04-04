import './style.css';

import { of, map, pipe, Observable, from, timer } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';

// const ajax$ = ajax('https://random-data-api.com/api/v2/users')

// ajax$.subscribe((value: AjaxResponse<{ [key: string]: string }>) =>
//   console.log('sub1 ' + value.response.first_name)
// );
// ajax$.subscribe((value: AjaxResponse<{ [key: string]: string }>) =>
//   console.log('sub2 ' + value.response.first_name)
// );
// ajax$.subscribe((value: AjaxResponse<{ [key: string]: string }>) =>
//   console.log('sub3 ' + value.response.first_name)
// );

// from([1, 2, 3, 4]).subscribe({
//   next: (value) => console.log(value),
//   complete: () => console.log('Completed'),
// });

// function ownerMap(...args: number[]): Observable<number> {
//   console.log(args);
//   return new Observable<number>((subscriber) => {
//     args.map((value) => {
//       subscriber.next(value);
//     });
//     subscriber.complete();
//   });
// }

const subscription = timer(2000).subscribe({
  next: () => console.log('active'),
  complete: () => console.log('Completed'),
});

setTimeout(() => {
  console.log('unsubscribe');
  subscription.unsubscribe();
}, 3000);
