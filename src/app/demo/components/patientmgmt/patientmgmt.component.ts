import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {PatientDiseaseSubstanceModel} from "../../model/patientDiseaseSubstance-model";
import {PatientService} from "../../service/patient.service";
import {PanelModule} from "primeng/panel";
import {AccordionModule} from "primeng/accordion";
import {TableModule} from "primeng/table";
import {CommonModule} from "@angular/common";
import {DropdownModule} from "primeng/dropdown";
import {MultiSelectModule} from "primeng/multiselect";
import {ToastModule} from "primeng/toast";
import {ActivesubstanceModel} from "../../model/activesubstance-model";
import {DialogModule} from "primeng/dialog";
import {DiseaseModel} from "../../model/diseaseModel";
import {AsSearchEngineService} from "../../service/as-search-engine.service";
import {SearchengineDTO} from "../../modelDTO/searchengineDTO";
import {SearchEngineModel} from "../../model/searchEngine-model";
import {ToastService} from "../../service/toast.service";
import {AppMenuitemComponent} from "../../../layout/app.menuitem.component";
import {PatientDiseaseDto} from "../../modelDTO/Patient-disease-dto";
import {DiseaseActiveSubstanceModel} from "../../model/diseaseActiveSubstance-model";
import {DiseaseActiveSubstanceDto} from "../../modelDTO/disease-active-substance-dto";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {RippleModule} from "primeng/ripple";
import {ConfirmationService} from "primeng/api";
import {CheckboxModule} from "primeng/checkbox";

@Component({
  selector: 'app-patientmgmt',
  standalone: true,
    imports: [
        FormsModule,
        InputTextModule,
        ReactiveFormsModule,
        ButtonModule,
        PanelModule,
        AccordionModule,
        TableModule,
        CommonModule,
        DropdownModule,
        MultiSelectModule,
        ToastModule,
        DialogModule,
        ConfirmDialogModule,
        RippleModule,
        CheckboxModule
    ],
    providers: [ConfirmationService],
  templateUrl: './patientmgmt.component.html',
  styleUrl: './patientmgmt.component.scss'
})
export class PatientmgmtComponent implements OnInit{
    getPatient: FormGroup;
    patientDiseaseSubstanceModel:PatientDiseaseSubstanceModel;
    diseasesForm: FormGroup;
    activeSubstances: ActivesubstanceModel[] = [];
    chooseSubstance: ActivesubstanceModel;
    chooseDisease: DiseaseModel;
    diseases:DiseaseModel[];
    displayDialog: boolean = false;
    searchEngineModel: SearchEngineModel[] = [];
    patientDiseaseSubstanceDTO: PatientDiseaseDto;
    diseaseActiveSubstanceModel: DiseaseActiveSubstanceModel;
    diseaseActiveSubstanceDto:DiseaseActiveSubstanceDto;

    ngOnInit(): void {
        this.getPatient.get('patientId')?.valueChanges.subscribe(() => {
            this.patientDiseaseSubstanceModel = null;
        });

        this.diseasesForm.get('pregnance')?.valueChanges.subscribe(() => {
            this.diseasesForm.get('chooseDisease')?.setValue(null);
        });

        this.diseasesForm.get('chooseDisease')?.valueChanges.subscribe((selectedDiseaseId) => {
            this.getActiveSubstancesForDiseaseWithoutConflict(selectedDiseaseId);
            this.diseasesForm.get('selectedSubstances')?.setValue([]);
        });
    }

    getActiveSubstancesForDiseaseWithoutConflict(disease: DiseaseModel) {
        console.log('czy ciaza wybrana: ', this.diseasesForm.get('pregnance').value)
        const searchengine: SearchengineDTO = new SearchengineDTO(
            disease,
            this.patientDiseaseSubstanceModel.diseaseActiveSubstancesDTOList.map(item => item.diseaseDTO),
            this.patientDiseaseSubstanceModel.diseaseActiveSubstancesDTOList.flatMap(item => item.activeSubstanceDTO),
            this.diseasesForm.get('pregnance').value
        );

        this.searchEngine.getActiveSubstanceSearchEngine(searchengine).subscribe({
            next: (data: SearchEngineModel[]) => {
                this.searchEngineModel = data;
                this.toast.showSuccess('Udało się znaleźć szukane substancje', 'Sukces');
                console.log('return: ', this.searchEngineModel);
            },
            error: (error) => {
            }
        });
    }

    constructor(private fb: FormBuilder,
                private patientService: PatientService,
                private cdr: ChangeDetectorRef,
                private searchEngine: AsSearchEngineService,
                private toast: ToastService,
                private confirmation: ConfirmationService) {
        this.getPatient = this.fb.group({
            patientId: ['', Validators.required]}
        );
        this.diseasesForm = this.fb.group({
            selectedSubstances: [[], Validators.required],
            chooseDisease: ['', Validators.required],
            pregnance: [false],
        });
    }
    pregnance: boolean;
    showDialog() {
        this.displayDialog = true;

        this.patientService.getAvailableDiseasesForPatient(this.getPatient.get('patientId').value).subscribe({
            next: (response) => {
                this.diseases = response;
            },
            error: (error) => {
            }
        });
    }

    confirmDelete(id2: number) {
        this.confirmation.confirm({
            message: 'Czy na pewno chcesz usunąć ten element?',
            acceptLabel: 'Tak',
            rejectLabel: 'Nie',
            header: 'Potwierdzenie usunięcia',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.patientService.deleteDisease(this.getPatient.get('patientId').value, id2).subscribe({
                    next: (data) => {
                        this.toast.showSuccess('Udało się usunąć chorobe', 'Sukces');
                        const patient: number = this.getPatient.get('patientId').value;
                        this.getSinglePatient(patient);
                    },
                    error: (err) => {
                        this.toast.showError(err, 'Sukces');
                    }
                })
            },
            reject: () => {
            }
        });
    }

    onSubmitDisease() {
        this.displayDialog = false;
        const diseaseActiveSubstancesDTOList: DiseaseActiveSubstanceDto[] = [
            new DiseaseActiveSubstanceDto(
                this.diseasesForm.get('chooseDisease').value,
                this.diseasesForm.get('selectedSubstances').value
            )
        ]

        this.patientDiseaseSubstanceDTO = new PatientDiseaseDto(
            this.patientDiseaseSubstanceModel.userDTO,
            this.patientDiseaseSubstanceModel.patientDTO,
            diseaseActiveSubstancesDTOList
            );
        console.log(this.patientDiseaseSubstanceDTO)

        this.patientService.addDiseasForPatient(this.patientDiseaseSubstanceDTO).subscribe({
            next: (response) => {
                this.cdr.detectChanges();
                const patient: number = this.getPatient.get('patientId').value;
                this.getSinglePatient(patient);
                this.diseasesForm.reset();
                this.toast.showSuccess('Dodano chorobę', 'Sukces');
            },
            error: (error) => {
                this.toast.showError( 'Nie udało się dodać ', 'Błąd');
            }
        })
    }

    onSubmit() {
        if (this.getPatient.valid) {
            const patient: number = this.getPatient.get('patientId').value;
            this.getSinglePatient(patient);
        }
    }

    getSinglePatient(patient: number) {
        this.patientService.getSinglePatient(patient).subscribe({
            next: (response) => {
                this.patientDiseaseSubstanceModel = response;
                console.log(this.patientDiseaseSubstanceModel)
                this.toast.showSuccess('Znaleziono pacjenta', 'Sukces');
                this.cdr.detectChanges();

            },
            error: (error) => {
                this.toast.showError( 'Nie znaleziono pacjenta', 'Błąd');
            }
        });
    }
}
