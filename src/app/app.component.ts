import { Component } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { AutoCompleteComponent } from './custom-ag-grid/autocomplete/autocomplete.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {



public gridApi;
  public gridColumnApi;
  public rowData: any = [];
  public gridOptions;
  public frameworkComponents;
  public columnDefs;
  public params;
  public context;
  public columnTypes;
  public headerHeight;
  public rowHeight;
  floatingFiltersHeight: number;
  public bookingTemplateName = '';
  public isBtnDisabled = true;
  public isFilledMandatories = false;
  private isAddedNewRow = false;
  public editedRowsList: Set<string> = new Set<string>();
  private addedNewRowCounter = 0;
  private deleteRowCounter = 0;
  public hasSCBookTempAddAccess = false;
  public hasSCBookTempEditAccess = false;
  public defaultColDef;

  // Mock data/ need to change model as well
  public selectedLineLineCat = {
    lineCode: '',
    lineCatID: '',
    teamCode: ''
  };

  public selectedTeam;
  public selectedLine;
  public selectedLineCat;
  teamLists: any;
  lineLists: any;
  lineCatLists: any;
  selectedLineId: any;
  public dialogRef;
  rowSelection: string;
  fromDate: string;
  toDate: string;
  nuhFlg: string;
  public isUpdating;
  constructor(
  ) {
    this.columnDefs = [

      {
        headerName: 'Booking Party',
        field: 'bookingPartyName',
        // cellRenderer: 'partyEditor',
        filter: 'agTextColumnFilter',
        cellEditor: 'partyEditor',
        width: 110,
        editable: true
      }
    ];
    
    this.rowData = [
      { bookingPartyName: 'Toyota', model: 'Celica', price: 35000 },
      { bookingPartyName: 'Ford', model: 'Mondeo', price: 32000 },
      { bookingPartyName: 'Porsche', model: 'Boxter', price: 72000 }
    ];
    
    this.gridOptions = <GridOptions>{
      // rowData: this.createRowData(),
      defaultColDef: {
        editable: true,
        resizable: true,
        sortable: true,
        filter: true,
        singleClickEdit: true,
      }
    };

    this.columnTypes = {
      valueColumn: {
        editable: true,
      }
    };

    this.frameworkComponents = {
      partyEditor: AutoCompleteComponent
    };

    this.headerHeight = 34;
    this.rowHeight = 30;
    this.floatingFiltersHeight = 40;
    this.context = { componentParent: this, hasSCBookTempEditAccess: false };
  }

  private createRowData() {
    return [
      { bookingPartyName: 'Toyota', model: 'Celica', price: 35000},
      { bookingPartyName: 'Ford', model: 'Mondeo', price: 32000},
      { bookingPartyName: 'Porsche', model: 'Boxter', price: 72000}
    ];
  }

  ngOnInit() {

  }

  onGridReady(params) {
    this.params = params;
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

 


//   columnDefs = [
//     {headerName: 'Model', field: 'model' },
//     {headerName: 'Price', field: 'price'},
//           {
//         headerName: 'Booking Party',
//         field: 'bookingPartyName',
//         // cellRenderer: 'BkPartyRenderer',
//         filter: 'agTextColumnFilter',
//         cellEditor: 'BkPartyRenderer',
//         width: 110,
//         editable: true
//       }
// ];

// rowData = [
//     { bookingPartyName: 'Toyota', model: 'Celica', price: 35000 },
//     { bookingPartyName: 'Ford', model: 'Mondeo', price: 32000 },
//     { bookingPartyName: 'Porsche', model: 'Boxter', price: 72000 }
// ];

}