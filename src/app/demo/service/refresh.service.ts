import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RefreshService {
    private refreshNeeded = new Subject<void>();

    refreshNeeded$ = this.refreshNeeded.asObservable();

    triggerRefresh() {
        this.refreshNeeded.next();
    }
}
