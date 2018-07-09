import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LocationsService } from './locations.service';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { OrderByPipe } from './order-by.pipe';

@NgModule({
  declarations: [
    AppComponent,
    OrderByPipe
  ],
  imports: [
    BrowserModule,
    GooglePlaceModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDXvdByHYIUrNGQ9KyHjLAmc9lDePopXuU'
    })
  ],
  providers: [LocationsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
