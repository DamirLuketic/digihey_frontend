import { NgModule } from '@angular/core';
import { ListComponent } from './components/list/list.component';
import { CreateComponent } from './components/create/create.component';
import { FormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    ListComponent,
    CreateComponent,
  ],
  imports: [
    FormsModule,
    MDBBootstrapModule,
    MatSliderModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  exports: [
    ListComponent,
    CreateComponent
  ]
})
export class CoreModule { }
