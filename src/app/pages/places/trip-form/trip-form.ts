import {Component, OnInit, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {form, FormField, minLength, required} from '@angular/forms/signals';
import {BackButton} from '../../../components/back-button/back-button';

export interface TripFormModel {
  title: string;
  description: string;
  location: string;
  coverImageUrl: string;

  startDate: string;
  endDate: string;

  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  type: 'vacation' | 'business' | 'solo' | 'family';

  statusId: string;
  typeId: string;

  budget: number;
  currency: string;
  notes: string;
}

@Component({
  selector: 'app-trip-form',
  imports: [FormsModule, FormField, BackButton],
  template: `
    <app-back-button/>

    <div class="card bg-base-100 w-full z-30 max-w-5xl mx-auto min-h-dvh">
      <div class="card-body px-1">
        <div class="space-y-4 w-full">
          <h2 class="card-title text-center w-full">Create Trip</h2>
          <form (ngSubmit)="submit()" class="space-y-2" novalidate>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
              <!-- BASIC INFO -->
              <fieldset>
                <!-- TITLE -->
                <label class="fieldset-legend">Title</label>
                <input class="input input-bordered w-full" placeholder="Vacation in Paris"
                       [formField]="tripForm.title"/>
                @if (tripForm.title().touched() && tripForm.title().invalid()) {
                  @for (trip of tripForm.title().errors(); track $index) {
                    <p class="text-error text-sm">{{ trip.message }}</p>
                  }
                }
              </fieldset>

              <!-- LOCATION -->
              <fieldset>
                <label class="fieldset-legend">Location</label>
                <input class="input input-bordered w-full" placeholder="Italy" [formField]="tripForm.location"/>
                @if (tripForm.location().touched() && tripForm.location().invalid()) {
                  @for (trip of tripForm.location().errors(); track $index) {
                    <p class="text-error text-sm">{{ trip }}</p>
                  }
                }
              </fieldset>

              <!-- DATES -->
              <div>
                <fieldset>
                  <label class="fieldset-legend">Start Date</label>
                  <input
                    type="date"
                    class="input input-bordered w-full"
                    [formField]="tripForm.startDate"
                  />
                  @if (tripForm.startDate().touched() && tripForm.startDate().invalid()) {
                    @for (trip of tripForm.startDate().errors(); track $index) {
                      <p class="text-error text-sm">{{ trip }}</p>
                    }
                  }
                </fieldset>
              </div>

              <div>
                <fieldset>
                  <label class="fieldset-legend">End Date</label>
                  <input
                    type="date"
                    class="input input-bordered w-full"
                    [formField]="tripForm.endDate"
                  />
                  @if (tripForm.endDate().touched() && tripForm.endDate().invalid()) {
                    @for (trip of tripForm.endDate().errors(); track $index) {
                      <p class="text-error text-sm">{{ trip }}</p>
                    }
                  }
                </fieldset>
              </div>

              <!-- STATUS -->
              <fieldset>
                <label class="fieldset-legend">Status</label>
                <select class="select select-bordered w-full" [formField]="tripForm.status">
                  <option value="upcoming">Upcoming</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                @if (tripForm.status().touched() && tripForm.status().invalid()) {
                  @for (trip of tripForm.status().errors(); track $index) {
                    <p class="text-error text-sm">{{ trip }}</p>
                  }
                }
              </fieldset>

              <!-- TYPE -->
              <fieldset>
                <label class="fieldset-legend">Type</label>
                <select class="select select-bordered w-full" [formField]="tripForm.type">
                  <option value="vacation">Vacation</option>
                  <option value="business">Business</option>
                  <option value="solo">Solo</option>
                  <option value="family">Family</option>
                </select>

                @if (tripForm.type().touched() && tripForm.type().invalid()) {
                  @for (trip of tripForm.type().errors(); track $index) {
                    <p class="text-error text-sm">{{ trip }}</p>
                  }
                }
              </fieldset>

              <!-- FINANCE -->
              <div>
                <fieldset>
                  <label class="fieldset-legend">Budget</label>
                  <input
                    type="number"
                    class="input input-bordered w-full"
                    [formField]="tripForm.budget"
                  />
                </fieldset>

                @if (tripForm.budget().touched() && tripForm.budget().invalid()) {
                  @for (trip of tripForm.budget().errors(); track $index) {
                    <p class="text-error text-sm">{{ trip }}</p>
                  }
                }
              </div>

              <div>
                <fieldset>
                  <label class="fieldset-legend">Currency</label>
                  <input class="input input-bordered w-full" [formField]="tripForm.currency"/>
                </fieldset>

                @if (tripForm.currency().touched() && tripForm.currency().invalid()) {
                  @for (trip of tripForm.currency().errors(); track $index) {
                    <p class="text-error text-sm">{{ trip }}</p>
                  }
                }
              </div>


              <!-- Cover Image -->
              <fieldset>
                <label class="fieldset-legend ">Cover image</label>
                <input
                  placeholder="Enter the cover image"
                  class="input input-bordered w-full"
                  [formField]="tripForm.coverImageUrl"/>
                @if (tripForm.coverImageUrl().touched() && tripForm.coverImageUrl().invalid()) {
                  @for (trip of tripForm.coverImageUrl().errors(); track $index) {
                    <p class="text-error text-sm">{{ trip }}</p>
                  }
                }
              </fieldset>
              <!-- DESCRIPTION -->
              <fieldset>
                <label class="fieldset-legend">Description</label>
                <textarea
                  class="textarea textarea-bordered w-full"
                  [formField]="tripForm.description"
                  placeholder="Enter the description"
                ></textarea>
                @if (tripForm.description().touched() && tripForm.description().invalid()) {
                  @for (trip of tripForm.description().errors(); track $index) {
                    <p class="text-error text-sm">{{ trip }}</p>
                  }
                }
              </fieldset>

            </div>

            <!-- SUBMIT -->
            <div class="flex flex-col gap-4 mt-2">
              <button [disabled]="tripForm().invalid()" type="submit" class="btn btn-primary w-full mt-2">Save Trip
              </button>
              <button type="button" class="btn w-full mt-2">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
})
export class TripForm implements OnInit {
  tripModel = signal<TripFormModel>({
    title: '',
    description: '',
    location: '',
    coverImageUrl: '',
    startDate: '',
    endDate: '',
    status: 'upcoming',
    type: 'vacation',
    statusId: '',
    typeId: '',
    budget: 0,
    currency: 'INR',
    notes: '',
  });
  tripForm = form(this.tripModel, (path) => {
    minLength(path.title, 3, {message: "Please enter valid trip"});
    required(path.location);
    required(path.startDate);
    required(path.endDate);
  });

  ngOnInit(): void {
    console.log(this.tripForm.currency().errors());
  }

  submit() {
    console.log('FORM VALUE', this.tripModel());
  }
}
