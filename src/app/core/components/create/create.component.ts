import { Component, OnInit, HostListener } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { VehicleJSON } from '../../services/types';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  vehicleMake: string = '';
  vehicleModel: string = '';
  vehicleYear: number;
  vehicleOID: string = '';
  errorMsg: boolean = false;
  successMsg: boolean = false;

  constructor(
    private httpService: HttpService) { }

  ngOnInit(): void {

  }

  @HostListener('input') oninput() {
    this.isValid();
  }

  isValid() {
    if (this.vehicleMake !== '' && this.vehicleModel !== '' && this.vehicleOID !== '' && this.vehicleYear !== null) {
      return true
    }
    return false
  }

  resetValues() {
    this.vehicleMake = '';
    this.vehicleModel = '';
    this.vehicleYear = null;
    this.vehicleOID = '';
  }

  onSubmit() {
    const vechicle: VehicleJSON = {
      make: this.vehicleMake,
      model: this.vehicleModel,
      year: this.vehicleYear,
      oid: this.vehicleOID
    }
    console.log('Buttone here ', vechicle)
    this.httpService.createEntry(vechicle).
    then(() => {
      this.successMsg = true;
      this.resetValues()
      setTimeout(() => {
        this.successMsg = false
      }, 5000)
    }).
    catch((error) => {
      this.errorMsg = true;
      setTimeout(() => {
        this.errorMsg = false
      }, 5000)
      console.error(error)
    })
  }

}
