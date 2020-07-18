import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMedicine } from '../ViewModel/imedicine';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  Token: string;
  constructor(private httpClient: HttpClient, private AuthService: AuthenticationService) {
    this.AuthService.userToken$.subscribe( data => {this.Token = data; });
   }

  getAllMedicines(): Observable<IMedicine[]>{
    return this.httpClient.get<IMedicine[]>(`${environment.API_URL}/Medicines/GetMedicines`);
  }

  getMedicineById(MID: number): Observable <IMedicine>{
    return this.httpClient.get<IMedicine>(`${environment.API_URL}/Medicines/GetMedicine/${MID}`);
  }

  addMedicine(MED: IMedicine){
    console.log(MED);
    const httpOptions = {headers: new HttpHeaders({
      'Content-Type': 'application/json'
      , 'Authorization': this.Token
       })};

    return this.httpClient.post(`${environment.API_URL}/Medicines/PostMedicine`, MED, httpOptions);
  }

  updateMedicine(MID: number, MED: IMedicine){
    const httpOptions = {headers: new HttpHeaders({
      'Content-Type': 'application/json'
      , 'Authorization': this.Token
        })};

    return this.httpClient.put(`${environment.API_URL}/Medicines/PutMedicine/${MID}`, MED, httpOptions);
  }
  deleteMedicine(MID: number)
  {
    const httpOptions = {headers: new HttpHeaders({
      'Content-Type': 'application/json'
      , 'Authorization': this.Token
        })};
    return this.httpClient.delete(`${environment.API_URL}/Medicines/DeleteMedicine/${MID}`, httpOptions);
  }
}
