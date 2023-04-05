import './style.css';

import {
  of,
  map,
  pipe,
  Observable,
  from,
  timer,
  interval,
  forkJoin,
} from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';

//<----------ajax observable--------->
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

//=> Each subscriber will subscriber different Data => cold observable

//<--------from-------->
// from([1, 2, 3, 4]).subscribe({
//   next: (value) => console.log(value),
//   complete: () => console.log('Completed'),
// });

//<----------create function to handle observable-------------->
// function ownerMap(...args: number[]): Observable<number> {
//   console.log(args);
//   return new Observable<number>((subscriber) => {
//     args.map((value) => {
//       subscriber.next(value);
//     });
//     subscriber.complete();
//   });
// }

//<----------interval----------->
// const subscription = interval(1000).subscribe({
//   next: (value) => console.log(value),
//   complete: () => console.log('Completed'),
// });

// setTimeout(() => {
//   subscription.unsubscribe();
//   console.log('unsubscribe');

//   // clearInterval(subscription)
// }, 3000);

//<----------ForkJoin------------>
// const randomName$ = ajax('https://random-data-api.com/api/v2/users');
// const randomBloodType$ = ajax('https://random-data-api.com/api/v2/blood_types');
// const randomBeers$ = ajax('https://random-data-api.com/api/v2/beers');

// randomName$.subscribe((data: AjaxResponse<{ [key: string]: string }>) =>
//   console.log(data.response.first_name)
// );
// randomBloodType$.subscribe((data: AjaxResponse<{ [key: string]: string }>) =>
//   console.log(data.response.group)
// );
// randomBeers$.subscribe((data: AjaxResponse<{ [key: string]: string }>) =>
//   console.log(data.response.name)
// );

//<-------forkjoin--------> to call multiple api without waiting for other, maybe it similar to Promise.all
// forkJoin([randomName$, randomBloodType$, randomBeers$]).subscribe(
//   (data: any) => {
//     const [name, bloodType, beer] = data;
//     console.log(
//       name.response.first_name,
//       bloodType.response.group,
//       beer.response.name
//     );
//   }
// );

//<------Filter------>
// const newFeed$ = new Observable((subscriber) => {
//   setTimeout(() => subscriber.next({ category: 'Swim' }), 1000);
//   setTimeout(() => subscriber.next({ category: 'Foot' }), 2000);
//   setTimeout(() => subscriber.next({ category: 'Bad' }), 3000);
//   setTimeout(() => subscriber.next({ category: 'Ski' }), 4000);
//   setTimeout(() => subscriber.next({ category: 'Skate' }), 5000);
//   // subscriber.complete();
// });

// const Swim$ = newFeed$.pipe(
//   filter(
//     (value: { category: string }) =>
//       value.category == 'Swim' || value.category === 'Foot'
//   )
// );

// Swim$.subscribe({
//   next: (value) => console.log(value),
//   complete: () => console.log('Complete'),
// });

//<<-------Still forkJoin with map pipe, data cleaner when subscribe to-------->
const randomName$ = ajax('https://random-data-api.com/api/v2/users').pipe(
  map(
    (ajaxResponse: AjaxResponse<{ [key: string]: string }>) =>
      ajaxResponse.response.first_name
  )
);
const randomBloodType$ = ajax(
  'https://random-data-api.com/api/v2/blood_types'
).pipe(
  map(
    (ajaxResponse: AjaxResponse<{ [key: string]: string }>) =>
      ajaxResponse.response.group
  )
);
const randomBeers$ = ajax('https://random-data-api.com/api/v2/beers').pipe(
  map(
    (ajaxResponse: AjaxResponse<{ [key: string]: string }>) =>
      ajaxResponse.response.name
  )
);

forkJoin([randomName$, randomBloodType$, randomBeers$]).subscribe(
  (data: any) => {
    const [name, bloodType, beer] = data;
    console.log(name, bloodType, beer);
  }
);
