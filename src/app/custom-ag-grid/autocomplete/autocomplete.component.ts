import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete } from '@angular/material';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, skip } from 'rxjs/operators';

// import { KZResponse } from '../../../../kzresponse';
// import { BkPartyRendererSearvice } from './bk-party-renderer.service';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { BkPartyRendererSearvice } from './bk-party-renderer.service';
import { KZResponse } from './kzresponse';

@Component({
    selector: 'autocomplete',
    styleUrls: ['autocomplete.component.css'],
    templateUrl: 'autocomplete.component.html'
    
})
export class AutoCompleteComponent implements OnInit, ICellEditorAngularComp {
  @ViewChild(MatAutocomplete) matAutocomplete: MatAutocomplete;
  @ViewChild('input', {read: ViewContainerRef}) public input;
  public params: any;
  public option: string;
  public selectedValue: string;
  public bkPartyList: any;
  public list: any[] = [];
  public isEditable = false;
  bkPartyControl = new FormControl();
  bkCtrlSub: Subscription;
  public isFirstTime = false;
  public tempList = {
    bookingPartyName: '',
    bookingPartyCode: ''
  }

  constructor(private bkPartyRendererService: BkPartyRendererSearvice) { }

  ngOnInit() {
    this.selectedValue = this.params.value;
      this.bkCtrlSub = this.bkPartyControl.valueChanges
      .pipe(debounceTime(1000), skip(1), distinctUntilChanged())
        .subscribe(search => {
            this.modelInput();
        });

  }

  agInit(params: any): void {
    this.params = params;
    this.tempList.bookingPartyCode = this.params.data.bookingPartyCode;
    this.tempList.bookingPartyName = this.params.data.bookingPartyName;
    this.list.push(this.tempList);
  }

  getValue() {
    return `${this.option}`;
  }

  isNeedAutocomplete(str: string) {
    if (str === undefined) {
      return false;
    }
    if (str.length >= 1) {
      return true;
    } else {
      return false;
    }
  }


  validateValue(value) {
    let filteredList: any;
    if (this.list !== undefined && this.list !== null) {
      filteredList = this.list.filter(listObject =>
        listObject.bookingPartyName.toLowerCase() === (value.toLowerCase())
      );
      if (filteredList.length === 0) {
        this.selectedValue = '';
      } else {
        this.params.node.setDataValue('bookingPartyName', filteredList[0].bookingPartyName);
        this.params.node.setDataValue('bookingPartyCode', filteredList[0].bookingPartyCode);
      }
    } else {
      this.selectedValue = '';
    }
  }

  modelInput() {
    console.log('Bk party name input');
    if (!this.isNeedAutocomplete(this.selectedValue)) {
      this.bkPartyList = [];
      this.params.node.setDataValue('bookingPartyName', '');
      this.params.node.setDataValue('bookingPartyCode', '');
      return;
    }
    this.getModelFilterdList(this.selectedValue);
  }

  inputFocus() {
    // this.isEditable = !this.params.context.hashasSCBookTempEditAccess;
    this.getModelFilterdList(this.selectedValue);
  }

  getModelFilterdList(value: string) {
    let filteredList = [];
    if (value !== undefined && value !== '') {
      this.bkPartyRendererService.getBkPartyData(value)
        .subscribe((response: KZResponse) => {
          this.bkPartyList = response.data;
          this.list = this.bkPartyList;
        });
    }
  }

  onSelectionChange(value: any) {
    console.log('Model Selection Changed');
    console.log(value);
    console.log(this.selectedValue);

    if (value.bookingPartyName !== '') {
      if (value.bookingPartyName !== this.selectedValue) {
        this.params.node.setDataValue('bookingPartyName', value.bookingPartyName);
        this.params.node.setDataValue('bookingPartyCode', value.bookingPartyCode);
        this.selectedValue = value.bookingPartyName;
      }
    } else {
      this.params.node.setDataValue('bookingPartyName', '');
      this.params.node.setDataValue('bookingPartyCode', '');
    }
    console.log(this.params.node.data);
  }

  private _filter(value: string, list: any[]): any[] {
    const filterValue = value.toLowerCase();
    return list.filter(option => option.model.toLowerCase() === filterValue);
  }

  refresh(params: any): boolean {
    console.log('----------------- Refreshing -----------------');
    return true;
  }

  getGui() {
    return this.input;
  }

  afterGuiAttached() {
    setTimeout(() => {
      this.input.element.nativeElement.focus();
    });
    this.input.element.nativeElement.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === 'Tab' ||  event.keyCode === 13) {
        this.params.api.setFocusedCell(
          this.params.rowIndex + 1,
          this.params.column
        );
        this.params.api.startEditingCell({
          rowIndex: this.params.rowIndex + 1,
          colKey: this.params.column,
        });
      }
    });
    this.input.element.nativeElement.addEventListener('blur', (event) => {
      setTimeout(() => {
        this.validateValue(this.selectedValue);
      });
    });
  }
}





























// import { Component, AfterViewInit, ViewChild, ViewContainerRef } from '@angular/core';
// import { ICellEditorAngularComp } from 'ag-grid-angular';
// import { FormControl } from '@angular/forms';
// import { Observable } from 'rxjs';
// import { map, startWith } from 'rxjs/operators';

// @Component({
//     selector: 'autocomplete',
//     styleUrls: ['autocomplete.component.css'],
//     templateUrl: 'autocomplete.component.html'
    
// })
// export class AutoCompleteComponent implements ICellEditorAngularComp {
//     valueCtrl: FormControl;
//     filteredValues: Observable<any[]>;

//     private params: any;
//     private values: string[];
//     private selectedValue: string;
//     private selectedIndex: number;

//     @ViewChild("group", { read: ViewContainerRef })
//     public group: any;
    
//     agInit(params: any): void {
//         this.params = params;
//         this.selectedValue = this.params.value;
//         this.values = this.params.values;
//         console.log(this.values);
//         this.selectedIndex = this.values.findIndex((item) => {
//             return item === this.params.value;
//         });
//     }

//     ngAfterViewInit() {
//         setTimeout(() => {
//             this.group.element.nativeElement.focus();
//             this.focusOnSelectedIndex();
//         });
//     }

//     constructor() {
//         this.valueCtrl = new FormControl();
//         this.filteredValues = this.valueCtrl.valueChanges
//             .pipe(
//                 startWith(''),
//                 map(val => val ? this.filterValues(val) : this.values.slice())
//             )
//     }

//     filterValues(name: string) {
//         console.log(this.values.filter(val => {
//             //console.log('this is the place: ', val.toLowerCase().indexOf(val.toLowerCase()) === 0);
//             val.toLowerCase().indexOf(val.toLowerCase()) === 0;
//         }))
//         return this.values.filter(val => {
//             //console.log('this is the place: ', val.toLowerCase().indexOf(val.toLowerCase()) === 0);
//             val.toLowerCase().indexOf(val.toLowerCase()) === 0;
//         })
//     }

//     private focusOnSelectedIndex() {
//         this.selectedValue = this.values[this.selectedIndex];
//     }

//     getValue(): any {
//         return this.selectedValue;
//     }

//     onClick(selection: any) {
//         this.selectedIndex = this.group.findIndex((item) => {
//             return item === selection;
//         });
//         this.params.api.stopEditing();
//     }

//     onKeyDown(event): void {
//         let key = event.which || event.keycode;
//         if(key === 38 || key === 40) {
//             event.preventDefault();
//             event.stopPropagation();

//             if(key == 38) {
//                 this.selectedIndex = this.selectedIndex === 0 ? (this.group.length - 1) : this.selectedIndex - 1;
//             } else if(key == 40) {
//                 this.selectedIndex = (this.selectedIndex === this.group.length - 1) ? 0 : this.selectedIndex + 1;
//             }
//             this.focusOnSelectedIndex();
//         }
//     }
// }