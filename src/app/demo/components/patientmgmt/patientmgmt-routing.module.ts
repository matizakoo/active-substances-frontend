import {RouterModule, Routes} from "@angular/router";
import {PatientTableComponent} from "../patient-table/patient-table.component";
import {NgModule} from "@angular/core";
import {PatientmgmtComponent} from "./patientmgmt.component";

const routes: Routes = [
    {
        path: '',
        component: PatientmgmtComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PatientmgmtRoutingModule { }
