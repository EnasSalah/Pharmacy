import { Component, OnInit } from '@angular/core';
import { MedicineService } from 'src/app/Service/medicine.service';
import { IMedicine } from 'src/app/ViewModel/Imedicine';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-medicines',
  templateUrl: './medicines.component.html',
  styleUrls: ['./medicines.component.css']
})
export class MedicinesComponent implements OnInit {
  private subscriptions: Subscription[] = [];

  MedicineList: IMedicine[] = [];
  searchtext: string;

  constructor(private MedService:MedicineService) { }

  ngOnInit(): void {
    this.subscriptions.push(this.MedService.getAllMedicines().subscribe(
      (response) => {
        console.log(response);
        this.MedicineList = response;
      },
      (err) => { console.log(err); }
    ));
  }
  GetAll(){
    this.subscriptions.push(this.MedService.getAllMedicines().subscribe(
      (response) => {
        console.log(response);
        this.MedicineList = response;
      },
      (err) => { console.log(err); }
    ));
  }
  Search() {
    if (this.searchtext === '') {
      this.GetAll();
    }
    this.MedicineList = this.MedicineList.filter(res => {
      return ((res.EnglishName.toLocaleLowerCase()
      .match(this.searchtext.toLocaleLowerCase())) || res.ArabicName.toString().match(this.searchtext));
    });
  }
}
