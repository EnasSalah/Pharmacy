import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IMedicine } from 'src/app/ViewModel/imedicine';
import { MedicineService } from 'src/app/Service/medicine.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.css']
})
export class MedicineComponent implements OnInit {

  private subscriptions: Subscription[] = [];

  MedicineList: IMedicine[] = [];
  searchtext: string;

  constructor(private MedService: MedicineService, private toast: ToastrService) { }

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

  delete(ID)
  {
    this.MedService.deleteMedicine(ID).subscribe(
      res => {this.toast.error(`Deleted Successfully`, `Medicine Deleted`, {
        timeOut: 1500,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
        });
              this.GetAll(); },
      err => {console.log(err); }
    );
  }
}
