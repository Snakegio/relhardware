import { Component, inject, input, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgIf } from '@angular/common';
import { ICompany } from '@relhardware/dto-shared';
import { Skeleton } from 'primeng/skeleton';
import { Tag } from 'primeng/tag';

@Component({
  selector: 'app-map',
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.css'],
  standalone: true,
  imports: [
    NgIf,
    Skeleton,
    Tag
  ]
})

export class MapComponent implements OnInit {
  private http = inject(HttpClient);
  coordinates: { lat: string; lon: string } | null = null;
  mapUrl = '';
  data = input.required<ICompany>();
  layout = input.required<string>();

  constructor() {
  }

  ngOnInit() {
    this.fetchCoordinates();
  }

  formatAddress(address: string): string {
    return encodeURIComponent(address.trim()).replace(/%20/g, '+');
  }
  calculateSize(layout: string) : string {
    switch(layout) {
      case 'grid':
        return '300,200';
      case 'list':
        return '150,100';
      default:
        return '300,200';
    }
  }


  fetchCoordinates(): void {

    const currentData = this.data();

    const formattedAddress = this.formatAddress(currentData.location);
    const formattedCity = this.formatAddress(currentData.city)


    const url =
      `https://nominatim.openstreetmap.org/search.php?street=${formattedAddress}&city=${formattedCity}&county=IT&country=Italy&postalcode=${currentData.postalCode}&viewbox=9.22697%2C45.53029%2C9.23304%2C45.52893&countrycodes=IT&format=jsonv2`;

    this.http.get<any[]>(url).subscribe({
      next: (data) => {
        if (data.length > 0) {
          const { lat, lon } = data[0];
          this.coordinates = { lat, lon };

          // Genera l'URL dell'immagine della mappa
          this.mapUrl = `https://static-maps.yandex.ru/1.x/?ll=${lon},${lat}&size=${this.calculateSize(this.layout())}&z=15&l=map&lang=it_IT`;
        }
      },
      error: (err) => {
        console.error('Errore nel recupero delle coordinate:', err);
      },
    });
  }



}
