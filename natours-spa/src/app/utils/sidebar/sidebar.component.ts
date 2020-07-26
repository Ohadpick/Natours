import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  componentToDisplay: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.chooseComponent();
  }

  chooseComponent() {
    this.componentToDisplay = this.router.url.split('/')[2];
  }

}
