import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';
import { Camera, SecurityCamerasData } from '../data/security-cameras';

@Injectable()
export class SecurityCamerasService extends SecurityCamerasData {

  private cameras: Camera[] = [
    {
      title: 'American Legion National High School Oratorical Contest',
      source: 'assets/images/scholarship1.jpg',
      url: 'https://www.legion.org/oratorical/about',
      description: 'Young orators earn some of the most generous college scholarships available to high school students. Over $188,000 in scholarships can be awarded each year. The overall national contest winner gets a $20,000 scholarship. Second place takes home $17,000, and third gets $15,000.',
    },
    {
      title: 'Horatio Alger Scholarship Award',
      source: 'assets/images/scholarship2.jpg',
      url: 'https://scholars.horatioalger.org/about-our-scholarship-programs/',
      description: 'This generous need-based scholarship is geared toward students who have faced and overcome great obstacles. To be considered eligible, your gross adjusted family income must be at or below $55,000. At the national level, there are 106 $25,000 awards; at the state level, there are scholarships for all 50 states plus the District of Columbia of $10,000 each.',
    },
    {
      title: 'Wells Fargo Private Student Loans',
      source: 'assets/images/loans2.png',
      url: 'https://www.wellsfargo.com/jump/student-loans/going-to-college?&kwg=student&gclid=CjwKCAiAzuPuBRAIEiwAkkmOSD9akv75iSSzU4BZEEFdnb-P8xdaSK1MbUbLVUmLadybJON9Ez8nDBoCBdAQAvD_BwE&gclsrc=aw.ds',
      description: 'When it comes to financing your education, be sure to look at all of your options — including grants, scholarships, and loans from all sources — and make careful comparisons among all your choices. If you determine that a private student loan is right for you, Wells Fargo provides loans to help meet the needs of nearly every student.',
    },
    {
      title: 'Upstart Loans',
      source: 'assets/images/loans1.jpg',
      url: 'https://www.upstart.com/?utm_source=google_1508239880&utm_medium=56846528823&utm_campaign=kwd-163748178&gclid=CjwKCAiAzuPuBRAIEiwAkkmOSNwnJ0o6fTgJE5wv-xj636rugvsB7_hkMeHXsnrdmYg5SQu6rHmZ3BoCuQoQAvD_BwE',
      description: 'There\'s more to you than your credit score. Your education and job history help us understand more about your future potential, and allow you to get a lower rate.',
    },
  ];

  getCamerasData(): Observable<Camera[]> {
    return observableOf(this.cameras);
  }
}
