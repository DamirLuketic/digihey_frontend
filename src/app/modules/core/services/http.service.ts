import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import './types'
import { VehicleJSON } from './types';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  vehiclesData: VehicleJSON[] = [];

  constructor(private http: HttpClient) { }

  getData(): Promise<VehicleJSON[]>{
    const url = new URL('http://localhost:8080/api/vehicles')
    return this.http.get<VehicleJSON[]>(
      url.toString(), 
      {observe: 'body', responseType: 'json'}).
      toPromise()
  }

  deleteEntry(oid: string): Promise<any>{
    const url = new URL('http://localhost:8080/api/delete_vehicle?oid=' + oid)
    return this.http.request<any>(
      'DELETE',
      url.toString(), 
      {observe: 'body', responseType: 'json'}).
      toPromise()
  }
  
  createEntry(vehicle: VehicleJSON): Promise<any>{
    const url = new URL('http://localhost:8080/api/create_vehicle')
    return this.http.request<any>(
      'POST',
      url.toString(), 
      {observe: 'body', responseType: 'json', body: JSON.stringify({
        "make": vehicle.make,
        "model": vehicle.model,
        "year": vehicle.year,
        "oid": vehicle.oid
      })}).
      toPromise()
  }
}
