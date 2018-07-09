import { Component, OnInit } from '@angular/core';
import { google } from '@agm/core/services/google-maps-types';
import { MapsAPILoader } from '@agm/core';
import { MatTableDataSource } from '@angular/material';
import { LocationsService } from './locations.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  lat: number;
  lng: number;

  supermarkets = [];


  constructor(private locationsService: LocationsService) {

  }

  // get location
  public handleChangingAddress(newAddress) {
    console.log(newAddress);
    this.lng = newAddress.geometry.viewport.b.b;
    this.lat = newAddress.geometry.viewport.f.b;
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {

  }

  searchSupermarket() {
    this.locationsService.getJSON().subscribe(data => {
      this.supermarkets = data.supermarkets;
      this.getDist();
      console.log(this.supermarkets);
    });

  }

  getDist() {
    const lon1 = this.lng;
    const lat1 = this.lat;
    for (let i = 0; i < this.supermarkets.length; i++) {
      const lon2 = this.supermarkets[i].longitude;
      const lat2 = this.supermarkets[i].latitude;
      const radlat1 = Math.PI * lat1 / 180;
      const radlat2 = Math.PI * lat2 / 180;
      const theta = lon1 - lon2;
      const radtheta = Math.PI * theta / 180;
      let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180 / Math.PI;
      dist = dist * 60 * 1.1515;
      dist = dist * 1.609344;
      this.supermarkets[i].distance = dist;
    }
  }
}

