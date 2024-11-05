import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ActivesubstancesComponent} from "./activesubstances.component";

const routes: Routes = [
    {
        path: '',
        component: ActivesubstancesComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ActivesubstancesRoutingModule { }
