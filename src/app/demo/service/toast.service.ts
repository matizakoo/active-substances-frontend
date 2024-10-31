import { Injectable } from '@angular/core';
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

    constructor(private messageService: MessageService) {}

    showSuccess(detail: string, summary: string = 'Sukces') {
        this.messageService.add({ key: 'global-toast', severity: 'success', summary, detail });
    }

    showError(detail: string, summary: string = 'Błąd') {
        this.messageService.add({ key: 'global-toast', severity: 'error', summary, detail });
    }

    showInfo(detail: string, summary: string = 'Informacja') {
        this.messageService.add({ key: 'global-toast', severity: 'info', summary, detail });
    }

    showWarn(detail: string, summary: string = 'Ostrzeżenie') {
        this.messageService.add({ key: 'global-toast', severity: 'warn', summary, detail });
    }
}
