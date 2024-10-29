import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {CategoryComponent} from "../category/category.component";
import {DiseasesComponent} from "./diseases.component";

const routes: Routes = [
    {
        path: '', // ścieżka względem miejsca załadowania modułu
        component: DiseasesComponent // Komponent do wyrenderowania
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DiseasesRoutingModule { }
