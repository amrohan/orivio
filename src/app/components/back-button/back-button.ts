import {Component, inject} from '@angular/core';
import {ArrowLeft, LucideAngularModule} from 'lucide-angular';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-back-button',
  imports: [LucideAngularModule],
  template: `
    <div class="h-14 flex items-center">
      <button
        class="btn btn-ghost hover:bg-transparent hover:border-none btn-sm gap-2 group p-0 "
        (click)="goBack()"
      >
        <lucide-icon
          [name]="backButton"
          class="w-5 h-5"
        ></lucide-icon>
        Back
      </button>
    </div>
  `,
})
export class BackButton {
  backButton = ArrowLeft;
  location = inject(Location);
  router = inject(Router)

  goBack() {
    if (history.length > 1) {
      this.location.back();
    } else {
      this.router.navigateByUrl('/');
    }
  }
}
