import { Component, ViewChild, OnInit } from '@angular/core';
import * as pbi from 'powerbi-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('embeddedReportContainer', {static: true}) embeddedReportContainer: { nativeElement: HTMLElement; };
  private powerbi: pbi.service.Service;

  constructor() {
    this.powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);
  }

  ngOnInit() {
    const config = {
      // tslint:disable-next-line: max-line-length
      accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2ZXIiOiIwLjIuMCIsIndjbiI6IlBvd2VyQmlBenVyZVNhbXBsZXMiLCJ3aWQiOiJmODFjMTk2Ni1lZGVlLTQxMWItOGY4YS1mODQ0NjAxOWIwNDQiLCJyaWQiOiJjNTJhZjhhYi0wNDY4LTQxNjUtOTJhZi1kYzM5ODU4ZDY2YWQiLCJpc3MiOiJQb3dlckJJU0RLIiwiYXVkIjoiaHR0cHM6Ly9hbmFseXNpcy53aW5kb3dzLm5ldC9wb3dlcmJpL2FwaSIsImV4cCI6MTg5MzQ0ODgwMCwibmJmIjoxNDgxMDM3MTY5fQ.m4SwqmRWA9rJgfl72lEQ_G-Ijpw9Up5YwmBOfXi00YU',
      embedUrl:  'https://embedded.powerbi.com/appTokenReportEmbed?reportId=c52af8ab-0468-4165-92af-dc39858d66ad',
      id: 'c52af8ab-0468-4165-92af-dc39858d66ad',


      // id: 'c24ceac8-1f45-49a1-b82e-92aa0d4ebf1e', // User Owns Data
      // secret: 'W0rT30MOjyO5sQWRh3rs/BzpAg8/tWXG1MKAhYJMcTE=' //User Owns Data
      // id: '27846936-1a5d-4d80-8a74-33835f686588',
      type: 'report',
  };

    // display the embedded report
    // this.powerbi.embed(this.embeddedReportContainer.nativeElement, config);

    // create the report
    // this will return an instance of the report, so that we can refresh it
    const report = new pbi.Report(this.powerbi, this.embeddedReportContainer.nativeElement, config);

    // Set a 20 sec. refresh
    window.setInterval(() => {
      report.refresh();
      console.log('Refreshing report...');
    }, 20000);

  }
}
