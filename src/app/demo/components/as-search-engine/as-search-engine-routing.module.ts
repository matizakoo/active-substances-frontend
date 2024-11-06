import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AsSearchEngineComponent} from "./as-search-engine.component";

const routes: Routes = [
    {
        path: '',
        component: AsSearchEngineComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AsSearchEngineRoutingModule { }
