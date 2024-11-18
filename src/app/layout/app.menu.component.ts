import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Start',
                items: [
                    { label: 'Strona główna', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
                ]
            },
            {
                label: 'Lekarz',
                items: [
                    { label: 'Czynniki aktywne', icon: 'pi pi-fw pi-id-card', routerLink: ['/activesubstances']},
                    { label: 'Choroby', icon: 'pi pi-fw pi-share-alt', routerLink: ['/diseases']},
                    { label: 'Czynniki aktywne konflikty', icon: 'pi pi-fw pi-sliders-v', routerLink: ['/activesubstancesconflicts']},
                    { label: 'Czynniki aktywne z chorobami konflikty', icon: 'pi pi-fw pi-lock', routerLink: ['/activesubstancesdiseasesconflicts']},
                    { label: 'Wyszukaj czynnik aktywny dla przypadku', icon: 'pi pi-fw pi-cog', routerLink: ['/assearchengine']}
                ]
            },
            {
                label: 'Pacjent',
                items: [
                    { label: 'Pacjenci', icon: 'pi pi-fw pi-id-card', routerLink: ['/patient']},
                    { label: 'Zarządzaj chorobą pacjenta', icon: 'pi pi-fw pi-cog', routerLink: ['/patientmgmt']},
                ]
            }
        ];
    }
}
