import { environment } from 'src/environments/environment';
import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @Input() locations: any;
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 37.75;
  lng = -122.41;

  constructor( ) {}

  ngOnInit() {
    this.setMap();
  }

  setMap() {
    (mapboxgl as typeof mapboxgl).accessToken = environment.mapbox.accessToken;

    this.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/ohadpick/ckc1rf6x64q181imnlyiumuw3',
        scrollZoom: false,
        //center: [this.lng, this.lat]
    });

    const bounds = new mapboxgl.LngLatBounds();

    this.locations.forEach(location => {
        // Add marker
        const el = document.createElement('div');
        el.className = 'marker';

        new mapboxgl.Marker({
            element: el,
            anchor: 'bottom'
        }).setLngLat(location.coordinates).addTo(this.map);

        // Add popup
        new mapboxgl.Popup({
            offset: 30
        })
            .setLngLat(location.coordinates)
            .setHTML(`<p>Day ${location.day}: ${location.description}</p>`)
            .addTo(this.map);

        // Extend map bounds to include current location
        bounds.extend(location.coordinates);
    });

    this.map.fitBounds(bounds, {
        padding: {
            top: 200,
            bottom: 150,
            left: 100,
            right: 100
        }
    });

    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());
  }
}
