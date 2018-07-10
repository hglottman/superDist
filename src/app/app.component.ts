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
      this.bestCompany();
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

  bestCompany() {

    const dataCount = { shufersal: 0, mega: 0, tivTaam: 0, ampm: 0 };

    for (let i = 0; i < this.supermarkets.length; i++) {
      if (this.supermarkets[i].distance < 50) {
        if (this.supermarkets[i].shopName === 'shufersal') {
          dataCount.shufersal += 1;
        } else if (this.supermarkets[i].shopName === 'mega') {
          dataCount.mega += 1;
        } else if (this.supermarkets[i].shopName === 'tivTaam') {
          dataCount.tivTaam += 1;
        } else if (this.supermarkets[i].shopName === 'am:pm') {
          dataCount.ampm += 1;
        }
      }
    }

    const arrCount: any = Object.values(dataCount);
    // console.log(arrCount);
    const max = Math.max(...arrCount);
    // console.log(` max value: ${max}`);
    const bestCompanies: any = (this.getKeyByValue(dataCount, max));

    // if (bestCompanies.length > 1) {
    //   for (let j = 0; j < bestCompanies.length; j++) {
    //     for (let i = 0; i < this.supermarkets.length; i++) {
    //       if (this.supermarkets[i].shopName === bestCompanies[j]) {
    //         this.supermarkets[i].distance
    //       }

    //     }
    //   }
    }

      getKeyByValue(dataCount, max) {
        const companies = [];
        const company = Object.keys(dataCount).find(key => dataCount[key] === max);
        companies.push(company);
        delete dataCount[company];
        if (Object.keys(dataCount).find(key => dataCount[key] === max)) {
          const company2 = Object.keys(dataCount).find(key => dataCount[key] === max);
          companies.push(company2);
          delete dataCount[company2];
        } if (Object.keys(dataCount).find(key => dataCount[key] === max)) {
          const company3 = Object.keys(dataCount).find(key => dataCount[key] === max);
          companies.push(company3);
          return companies;
        } else {
          return companies;
        }
      }


    }
