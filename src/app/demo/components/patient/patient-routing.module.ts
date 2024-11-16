import {RouterModule, Routes} from "@angular/router";
import {AsSearchEngineComponent} from "../as-search-engine/as-search-engine.component";
import {NgModule} from "@angular/core";
import {PatientComponent} from "./patient.component";

const routes: Routes = [
    {
        path: '',
        component: PatientComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PatientRoutingModule { }
