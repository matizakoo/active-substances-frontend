import {Component, ElementRef, ViewChild} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {CurrencyPipe, DatePipe} from "@angular/common";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {MultiSelectModule} from "primeng/multiselect";
import {ProgressBarModule} from "primeng/progressbar";
import {ConfirmationService, SharedModule} from "primeng/api";
import {SliderModule} from "primeng/slider";
import {Table, TableModule} from "primeng/table";
import {Customer, Representative} from "../../api/customer";
import {Product} from "../../api/product";
import {CustomerService} from "../../service/customer.service";
import {ProductService} from "../../service/product.service";
import {ActivesubstancesService} from "../../service/activesubstances.service";
import {ActivesubstanceModel} from "../../model/activesubstance-model";
import {RefreshService} from "../../service/refresh.service";
import {RippleModule} from "primeng/ripple";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ToastService} from "../../service/toast.service";

interface expandedRows {
    [key: string]: boolean;
}

@Component({
  selector: 'app-activesubstances-table',
  standalone: true,
    imports: [
        ButtonModule,
        CurrencyPipe,
        DatePipe,
        DropdownModule,
        InputTextModule,
        MultiSelectModule,
        ProgressBarModule,
        SharedModule,
        SliderModule,
        TableModule,
        RippleModule,
        ConfirmDialogModule
    ],
    providers: [ConfirmationService],
  templateUrl: './activesubstances-table.component.html',
  styleUrl: './activesubstances-table.component.scss'
})
export class ActivesubstancesTableComponent {
    customers1: Customer[] = [];

    customers2: Customer[] = [];

    customers3: Customer[] = [];

    representatives: Representative[] = [];

    statuses: any[] = [];

    products: Product[] = [];

    rowGroupMetadata: any;

    expandedRows: expandedRows = {};

    isExpanded: boolean = false;

    loading: boolean = true;

    @ViewChild('filter') filter!: ElementRef;

    activeSubstances: ActivesubstanceModel[] = [];

    constructor(
        private customerService: CustomerService,
        private productService: ProductService,
        private activeSubstancesService: ActivesubstancesService,
        private refreshService: RefreshService,
        private confirmation: ConfirmationService,
        private toast: ToastService,
    ) { }

    getActiveSubstances(): void {
        this.activeSubstancesService.getActiveSubstances().subscribe({
            next: (data) => {
                this.activeSubstances = data;
            },
            error: (err) => console.error('Błąd podczas pobierania listy substancji aktywnych:', err)
        });
    }

    ngOnInit() {
        this.getActiveSubstances();
        this.refreshService.refreshNeeded$.subscribe(() => {
            this.getActiveSubstances();
        });

        this.customerService.getCustomersLarge().then(customers => {
            this.customers1 = customers;
            this.loading = false;

            // @ts-ignore
            this.customers1.forEach(customer => customer.date = new Date(customer.date));
        });
        this.customerService.getCustomersMedium().then(customers => this.customers2 = customers);
        this.customerService.getCustomersLarge().then(customers => this.customers3 = customers);
        this.productService.getProductsWithOrdersSmall().then(data => this.products = data);

        this.refreshService.refreshNeeded$.subscribe(() => {
            this.getActiveSubstances();
        });

        this.representatives = [
            { name: 'Amy Elsner', image: 'amyelsner.png' },
            { name: 'Anna Fali', image: 'annafali.png' },
            { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
            { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
            { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
            { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
            { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
            { name: 'Onyama Limba', image: 'onyamalimba.png' },
            { name: 'Stephen Shaw', image: 'stephenshaw.png' },
            { name: 'XuXue Feng', image: 'xuxuefeng.png' }
        ];

        this.statuses = [
            { label: 'Unqualified', value: 'unqualified' },
            { label: 'Qualified', value: 'qualified' },
            { label: 'New', value: 'new' },
            { label: 'Negotiation', value: 'negotiation' },
            { label: 'Renewal', value: 'renewal' },
            { label: 'Proposal', value: 'proposal' }
        ];
    }

    onSort() {
        this.updateRowGroupMetaData();
    }

    updateRowGroupMetaData() {
        this.rowGroupMetadata = {};

        if (this.customers3) {
            for (let i = 0; i < this.customers3.length; i++) {
                const rowData = this.customers3[i];
                const representativeName = rowData?.representative?.name || '';

                if (i === 0) {
                    this.rowGroupMetadata[representativeName] = { index: 0, size: 1 };
                }
                else {
                    const previousRowData = this.customers3[i - 1];
                    const previousRowGroup = previousRowData?.representative?.name;
                    if (representativeName === previousRowGroup) {
                        this.rowGroupMetadata[representativeName].size++;
                    }
                    else {
                        this.rowGroupMetadata[representativeName] = { index: i, size: 1 };
                    }
                }
            }
        }
    }

    expandAll() {
        if (!this.isExpanded) {
            this.products.forEach(product => product && product.name ? this.expandedRows[product.name] = true : '');

        } else {
            this.expandedRows = {};
        }
        this.isExpanded = !this.isExpanded;
    }

    formatCurrency(value: number) {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    confirmDelete(id: number, name: string) {
        this.confirmation.confirm({
            message: `Czy na pewno chcesz usunąć elemet ${name}?`,
            acceptLabel: 'Tak',
            rejectLabel: 'Nie',
            header: 'Potwierdzenie usunięcia',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.activeSubstancesService.deleteActiveSubstance(id).subscribe({
                    next: (data) => {
                        this.toast.showSuccess('Udało się usunąć konflikt', 'Sukces');
                        this.refreshService.triggerRefresh();
                    },
                    error: (err) => {
                        console.error('Coś poszło nie tak')
                    }
                })
            },
            reject: () => {
            }
        });
    }
}
