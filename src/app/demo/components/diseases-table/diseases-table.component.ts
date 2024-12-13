import {Component, OnInit} from '@angular/core';
import {ActivesubstanceModel} from "../../model/activesubstance-model";
import {ActivesubstancesService} from "../../service/activesubstances.service";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {ConfirmationService, SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {DiseaseService} from "../../service/disease.service";
import {DiseaseDTO} from "../../modelDTO/disease-dto";
import {DiseaseModel} from "../../model/diseaseModel";
import {CommonModule} from "@angular/common";
import {RefreshService} from "../../service/refresh.service";
import {MatTooltip, MatTooltipModule} from "@angular/material/tooltip";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ToastModule} from "primeng/toast";
import {ToastService} from "../../service/toast.service";
import {RippleModule} from "primeng/ripple";

@Component({
  selector: 'app-diseases-table',
  standalone: true,
    imports: [
        ButtonModule,
        CommonModule,
        InputTextModule,
        SharedModule,
        ToastModule,
        TableModule,
        MatTooltipModule,
        ConfirmDialogModule,
        RippleModule,
    ],
    providers: [ConfirmationService],
  templateUrl: './diseases-table.component.html',
  styleUrl: './diseases-table.component.scss'
})
export class DiseasesTableComponent implements OnInit{
    diseaseModel: DiseaseModel[] = [];
    loading: boolean = true;

    constructor(private diseaseService: DiseaseService,
                private refreshService: RefreshService,
                private confirmation: ConfirmationService,
                private toast: ToastService) {
    }

    getDiseases(): void {
        this.diseaseService.getDiseasesWithActiveSubstances().subscribe({
            next: (data) => {
                this.diseaseModel = data;
            },
            error: (err) => console.error('Błąd podczas pobierania listy substancji czynnych:', err)
        });
    }

    ngOnInit(): void {
        this.getDiseases();
        this.refreshService.refreshNeeded$.subscribe(() => {
            this.getDiseases();
        });
    }

    confirmDelete(id: number, name: string) {
        this.confirmation.confirm({
            message: `Czy na pewno chcesz usunąć ten element? Spowoduje to usunięcie wszystkiego powiązane z chorobą ` + name,
            acceptLabel: 'Tak',
            rejectLabel: 'Nie',
            header: 'Potwierdzenie usunięcia',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.diseaseService.deleteDisease(id).subscribe({
                    next: (data) => {
                        this.toast.showSuccess('Udało się usunąć chorobę', 'Sukces');
                        this.refreshService.triggerRefresh();
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
