import { Component, OnInit } from '@angular/core';
import { Tour } from '../../_models/tour';
import { TourService } from '../../_services/tour.service';
import { APIResponse } from 'src/app/_models/apiResponse';
import { APIParams } from 'src/app/_models/apiParams';

@Component({
  selector: 'app-tour-list',
  templateUrl: './tour-list.component.html',
  styleUrls: ['./tour-list.component.css']
})
export class TourListComponent implements OnInit {
  tours: Tour[];
  apiParams: APIParams<Tour> = new APIParams<Tour>();

  constructor(private tourService: TourService) { }

  ngOnInit(): void {
    this.getTours();
  }

  getTours(): void {
    this.tourService.getTours(this.apiParams).subscribe((results: APIResponse<Tour[]>) => {
      this.tours = results.data.data;
    });
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.tourService.addTour({ name } as Tour)
      .subscribe(tour => {
        this.tours.push(tour);
      });
  }

  delete(tour: Tour): void {
    this.tours = this.tours.filter(h => h !== tour);
    this.tourService.deleteTour(tour).subscribe();
  }

}
