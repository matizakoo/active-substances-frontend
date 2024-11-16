import {RouterModule, Routes} from "@angular/router";
import {PatientComponent} from "../patient/patient.component";
import {NgModule} from "@angular/core";
import {PatientTableComponent} from "./patient-table.component";

const routes: Routes = [
    {
        path: '',
        component: PatientTableComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PatientTableRoutingModule { }
