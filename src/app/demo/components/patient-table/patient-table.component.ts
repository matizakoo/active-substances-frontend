import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {ActivesubstanceModel} from "../../model/activesubstance-model";
import {PatientModel} from "../../model/patient-model";
import {PatientService} from "../../service/patient.service";
import {ButtonModule} from "primeng/button";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {InputTextModule} from "primeng/inputtext";
import {RippleModule} from "primeng/ripple";
import {ConfirmationService, MessageService, SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {RefreshService} from "../../service/refresh.service";
import {ToastService} from "../../service/toast.service";
import {jwtDecode} from "jwt-decode";

@Component({
    selector: 'app-patient-table',
    standalone: true,
    imports: [
        ButtonModule,
        ConfirmDialogModule,
        InputTextModule,
        RippleModule,
        SharedModule,
        TableModule
    ],
    providers: [MessageService, ConfirmationService],
    templateUrl: './patient-table.component.html',
    styleUrl: './patient-table.component.scss'
})
export class PatientTableComponent implements OnInit {
    patientModels: PatientModel[] = [];

    constructor(private patientService: PatientService,
                private refreshService: RefreshService,
                private confirmation: ConfirmationService,
                private toast: ToastService) {
    }

    ngOnInit(): void {
        const decoded: any = jwtDecode(localStorage.getItem('auth-token'));
        this.getAllPatients(localStorage.getItem(decoded.principal));
    }

    getAllPatients(id: string): void {
        this.patientService.getAllPatientsForDoctor(id).subscribe({
            next: (data) => {
                this.patientModels = data;
                console.log(this.patientModels)
            },
            error: (err) => console.error('Błąd podczas pobierania listy substancji aktywnych:', err)
        });
    }

    confirmDelete(id: number) {
        const decoded: any = jwtDecode(localStorage.getItem('auth-token'));
        this.confirmation.confirm({
            message: 'Czy na pewno chcesz usunąć ten element?',
            acceptLabel: 'Tak',
            rejectLabel: 'Nie',
            header: 'Potwierdzenie usunięcia',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.patientService.deletePatient(id).subscribe({
                    next: (data) => {
                        this.toast.showSuccess('Usunięto pacjenta', 'Sukces');
                        this.refreshService.triggerRefresh();
                        this.getAllPatients(localStorage.getItem(decoded.principal));
                    },
                    error: (err) => {
                        console.error('Coś poszło nie tak')
                    }
                })
            },
            reject: () => {
            }
        });
    }
}
