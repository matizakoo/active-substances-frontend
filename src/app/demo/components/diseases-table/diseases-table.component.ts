import {Component, OnInit} from '@angular/core';
import {ActivesubstanceModel} from "../../model/activesubstance-model";
import {ActivesubstancesService} from "../../service/activesubstances.service";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {DiseaseService} from "../../service/disease.service";
import {DiseaseDTO} from "../../modelDTO/disease-dto";
import {DiseaseModel} from "../../model/diseaseModel";
import {CommonModule} from "@angular/common";
import {RefreshService} from "../../service/refresh.service";
import {MatTooltip, MatTooltipModule} from "@angular/material/tooltip";

@Component({
  selector: 'app-diseases-table',
  standalone: true,
    imports: [
        ButtonModule,
        CommonModule,
        InputTextModule,
        SharedModule,
        TableModule,
        MatTooltipModule,
    ],
  templateUrl: './diseases-table.component.html',
  styleUrl: './diseases-table.component.scss'
})
export class DiseasesTableComponent implements OnInit{
    diseaseModel: DiseaseModel[] = [];
    loading: boolean = true;

    constructor(private diseaseService: DiseaseService,
                private refreshService: RefreshService,) {
    }

    getDiseases(): void {
        this.diseaseService.getDiseasesWithActiveSubstances().subscribe({
            next: (data) => {
                this.diseaseModel = data;
            },
            error: (err) => console.error('Błąd podczas pobierania listy substancji aktywnych:', err)
        });
    }

    ngOnInit(): void {
        this.getDiseases();
        this.refreshService.refreshNeeded$.subscribe(() => {
            this.getDiseases();
        });
    }
}
