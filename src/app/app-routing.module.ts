import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import {AuthGuard} from "./auth-guard";
import {AuthModule} from "./demo/components/auth/auth.module";
import {DiseasesModule} from "./demo/components/diseases/diseases.module";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent, canActivate: [AuthGuard],
                children: [
                    { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
                    { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
                    { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
                    { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
                    { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) },
                    { path: 'kategorie', loadChildren: () => import('./demo/components/category/category.module').then(m => m.CategoryModule) },
                    { path: 'diseases', loadChildren: () => import('./demo/components/diseases/diseases.module').then(m => m.DiseasesModule) },
                    { path: 'activesubstances', loadChildren: () => import('./demo/components/activesubstances/activesubstances.module').then(m => m.ActivesubstancesModule) },
                    { path: 'activesubstancesconflicts', loadChildren: () => import('./demo/components/activesubstances-conflicts/activesubstances-conflicts.module').then(m => m.ActivesubstancesConflictsModule) },
                    { path: 'activesubstancesdiseasesconflicts', loadChildren: () => import('./demo/components/activesubstances-diseases-conflicts/activesubstances-diseases-conflicts-routing.module').then(m => m.ActivesubstancesDiseasesConflictsRoutingModule) },
                    { path: 'assearchengine', loadChildren: () => import('./demo/components/as-search-engine/as-search-engine.module').then(m => m.AsSearchEngineModule) },
                    { path: 'patient', loadChildren: () => import('./demo/components/patient/patient.module').then(m => m.PatientModule) },
                    { path: 'patientmgmt', loadChildren: () => import('./demo/components/patientmgmt/patientmgmt.module').then(m => m.PatientmgmtModule) },
                ]
            },
            // {
            //     path: '/auth/login', component: AuthModule, canActivate: [AuthGuard]
            // },
            { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule), canActivate: [AuthGuard] },
            { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
