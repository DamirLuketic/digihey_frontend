import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { VehicleJSON } from '../../services/types';
import { MdbTableDirective } from 'angular-bootstrap-md';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @ViewChild(MdbTableDirective, {static: true}) mdbTable: MdbTableDirective;
  elements: VehicleJSON[] = [];
  headElements = ['Make', 'Model', 'Year', 'OID', 'Delete'];
  searchText: string = '';
  previous: string;

  constructor(private httpService: HttpService) {
  }

  @HostListener('input') oninput() {
      this.searchItems();
  }

  ngOnInit() {
    this.setData()
  }

  setData() {
  this.elements = [];
  const vehicles = this.httpService.getData();
  vehicles.then((vehicles) => {
    if (vehicles != null && vehicles.length > 0) {
      for (let vehicle of vehicles) {
        this.elements.push({
            make: vehicle.make , model: vehicle.model, year: vehicle.year, oid: vehicle.oid
          });
        }
    }
  })
  this.mdbTable.setDataSource(this.elements);
  this.previous = this.mdbTable.getDataSource();
  }

  searchItems() {
      const prev = this.mdbTable.getDataSource();
      if (!this.searchText) {
          this.mdbTable.setDataSource(this.previous);
          this.elements = this.mdbTable.getDataSource();
      }
      if (this.searchText) {
          this.elements = this.mdbTable.searchLocalDataBy(this.searchText);
          this.mdbTable.setDataSource(prev);
      }    
  }

  async onDelete(oid: string) {
    await this.httpService.deleteEntry(oid)
    this.setData()
    this.searchText = '';
  }

}
