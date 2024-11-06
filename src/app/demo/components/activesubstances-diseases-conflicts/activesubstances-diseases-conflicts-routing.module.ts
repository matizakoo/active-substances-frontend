import {RouterModule, Routes} from "@angular/router";
import {ActivesubstancesConflictsComponent} from "../activesubstances-conflicts/activesubstances-conflicts.component";
import {NgModule} from "@angular/core";
import {ActivesubstancesDiseasesConflictsComponent} from "./activesubstances-diseases-conflicts.component";

const routes: Routes = [
    {
        path: '',
        component: ActivesubstancesDiseasesConflictsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ActivesubstancesDiseasesConflictsRoutingModule { }
