import {Component, signal} from '@angular/core';
import {Trip} from '../../models/trip';
import {SearchBar} from '../../components/header/search-bar.component';
import {TripCard} from '../../components/trip-card/trip-card';

@Component({
  selector: 'app-places',
  imports: [
    SearchBar,
    TripCard
  ],
  template: `
    <app-search-bar placeHolderName="Search in places"/>
    <div class="flex justify-between items-baseline gap-2">
    <div role="tablist" class="tabs tabs-border w-full">
      <a role="tab" class="tab tab-active">Active</a>
      <a role="tab" class="tab">Past</a>
    </div>
      <button role="tab" class="btn btn-primary btn-sm">Add Place</button>
    </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24 mt-4">
        @for (trip of trips(); track trip.id) {
          <app-trip-card [trip]="trip"/>
        }
      </div>
  `,
  styles: ``
})
export class Places {

  trips = signal<Trip[]>([
    {
      id: 't1',
      userId: 'u101',
      title: 'Weekend in Navi Mumbai',
      description: 'A quick getaway to explore the beaches and street food.',
      location: 'Navi Mumbai, India',
      coverImageUrl: 'https://images.unsplash.com/photo-1562979314-bee7453e911c?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      startDate: new Date('2025-09-28'),
      endDate: new Date('2025-09-29'),
      participants: ['u101', 'u102'],
      status: 'upcoming',
      type: 'vacation',
      budget: 15000,
      currency: 'INR',
      createdAt: new Date('2025-09-15'),
      updatedAt: new Date('2025-09-20'),
      notes: 'Book Ola/Uber in advance for airport transfer.',
      isDeleted: false,
    },
    {
      id: 't2',
      userId: 'u102',
      title: 'Business Trip to Bengaluru',
      description: 'Attending a tech conference and client meetings.',
      location: 'Bengaluru, India',
      coverImageUrl: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      startDate: new Date('2025-10-10'),
      endDate: new Date('2025-10-14'),
      participants: ['u102'],
      status: 'upcoming',
      type: 'business',
      budget: 50000,
      currency: 'INR',
      createdAt: new Date('2025-09-05'),
      updatedAt: new Date('2025-09-10'),
      notes: 'Check-in at JW Marriott, meeting with Infosys on 12th.',
      isDeleted: false,
    },
    {
      id: 't3',
      userId: 'u103',
      title: 'Family Vacation in Paris',
      description: 'Exploring museums, Eiffel Tower, and Disneyland Paris.',
      location: 'Paris, France',
      coverImageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      startDate: new Date('2025-12-01'),
      endDate: new Date('2025-12-10'),
      participants: ['u103', 'u104', 'u105'],
      status: 'upcoming',
      type: 'family',
      budget: 2500,
      currency: 'EUR',
      createdAt: new Date('2025-08-20'),
      updatedAt: new Date('2025-09-01'),
      notes: 'Buy museum passes online, pack warm clothes.',
      isDeleted: false,
    },
    {
      id: 't4',
      userId: 'u104',
      title: 'Solo Trek in Himachal',
      description: 'Backpacking through Manali, Kasol, and Tosh.',
      location: 'Himachal Pradesh, India',
      coverImageUrl: 'https://plus.unsplash.com/premium_photo-1697729729075-3e56242aef49?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      startDate: new Date('2025-11-05'),
      endDate: new Date('2025-11-15'),
      participants: ['u104'],
      status: 'upcoming',
      type: 'solo',
      budget: 30000,
      currency: 'INR',
      createdAt: new Date('2025-09-12'),
      updatedAt: new Date('2025-09-18'),
      notes: 'Carry extra jackets, network is patchy in Kasol.',
      isDeleted: false,
    },
    {
      id: 't5',
      userId: 'u105',
      title: 'Completed Trip to Goa',
      description: 'Beach parties, seafood, and water sports.',
      location: 'Goa, India',
      coverImageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      startDate: new Date('2025-07-01'),
      endDate: new Date('2025-07-05'),
      participants: ['u105', 'u101'],
      status: 'completed',
      type: 'vacation',
      budget: 20000,
      currency: 'INR',
      createdAt: new Date('2025-06-10'),
      updatedAt: new Date('2025-07-06'),
      isDeleted: false,
      notes: 'Trip went amazing! Best seafood at Baga Beach.',
    },
  ]);

}
