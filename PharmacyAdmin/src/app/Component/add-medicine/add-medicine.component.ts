import { Component, OnInit } from '@angular/core';
import { IMedicine } from 'src/app/ViewModel/imedicine';
import { MedicineService } from 'src/app/Service/medicine.service';
import { MedicineComponent } from '../medicine/medicine.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-medicine',
  templateUrl: './add-medicine.component.html',
  styleUrls: ['./add-medicine.component.css']
})
export class AddMedicineComponent implements OnInit {
  med: IMedicine;

  constructor(private MedService: MedicineService , private MedComp: MedicineComponent, private toast: ToastrService) {
    this.med = {
       ArabicName: '',
       EnglishName: '',
       ID: 0,
       Price: 0,
       Quantity: 0
    };
   }

  ngOnInit(): void {
  }

  add()
  {
    this.MedService.addMedicine(this.med).subscribe(
      res => { this.toast.info(`${this.med.EnglishName} Added Successfully`, `Medicine Added`, {
        timeOut: 1500,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      });
               this.MedComp.GetAll();      },
      err => {console.log(err); }
    );
  }
}
