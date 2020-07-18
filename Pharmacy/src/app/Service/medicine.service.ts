import { Injectable } from '@angular/core';
import { IMedicine } from '../ViewModel/Imedicine';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  constructor(private httpClient: HttpClient) { }

  getAllMedicines(): Observable<IMedicine[]>{
    return this.httpClient.get<IMedicine[]>(`${environment.API_URL}/Medicines/GetMedicines`);
  }

  getMedicineById(MID: number): Observable <IMedicine>{
    return this.httpClient.get<IMedicine>(`${environment.API_URL}/Medicines/GetMedicine/${MID}`);
  }

  addMedicine(MED: IMedicine){
    const httpOptions = {headers: new HttpHeaders({
      'Content-Type': 'application/json'
      // ,'Authorization': 'my-auth-token'
        })};

    return this.httpClient.post(`${environment.API_URL}/Medicines/PostMedicine`, MED, httpOptions);
  }

  updateMedicine(MID: number, MED: IMedicine){
    const httpOptions = {headers: new HttpHeaders({
      'Content-Type': 'application/json'
      // ,'Authorization': 'my-auth-token'
        })};

    return this.httpClient.put(`${environment.API_URL}/Medicines/PutMedicine/${MID}`, MED, httpOptions);
  }
  deleteMedicine(MID: number)
  {
    // const httpOptions = {headers: new HttpHeaders({
    //   'Content-Type': 'application/json'
    //   // ,'Authorization': 'my-auth-token'
    //     })};
    return this.httpClient.delete(`${environment.API_URL}/Medicines/DeleteMedicine/${MID}`);
  }
}
