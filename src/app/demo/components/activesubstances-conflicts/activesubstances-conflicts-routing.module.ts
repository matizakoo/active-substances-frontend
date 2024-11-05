import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ActivesubstancesConflictsComponent} from "./activesubstances-conflicts.component";

const routes: Routes = [
    {
        path: '',
        component: ActivesubstancesConflictsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ActivesubstancesConflictsRoutingModule { }
