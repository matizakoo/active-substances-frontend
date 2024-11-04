import {NgModule} from '@angular/core';
import {HashLocationStrategy, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AppLayoutModule} from './layout/app.layout.module';
import {NotfoundComponent} from './demo/components/notfound/notfound.component';
import {ProductService} from './demo/service/product.service';
import {CountryService} from './demo/service/country.service';
import {CustomerService} from './demo/service/customer.service';
import {EventService} from './demo/service/event.service';
import {IconService} from './demo/service/icon.service';
import {NodeService} from './demo/service/node.service';
import {PhotoService} from './demo/service/photo.service';
import {ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./demo/components/auth/auth.interceptor";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ConfirmationService, MessageService} from "primeng/api";
import {DiseasesComponent} from "./demo/components/diseases/diseases.component";
import {DiseasesModule} from "./demo/components/diseases/diseases.module";
import {ToastModule} from "primeng/toast";
import {MatTooltipModule} from "@angular/material/tooltip";

@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        ReactiveFormsModule,
        HttpClientModule,
        ConfirmDialogModule,
        ToastModule,
        MatTooltipModule
    ],
    providers: [
        {
            provide: LocationStrategy,
            useClass: PathLocationStrategy},
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor, multi: true},
        CountryService,
        CustomerService,
        EventService,
        IconService,
        NodeService,
        PhotoService,
        ProductService,
        MessageService,

    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
