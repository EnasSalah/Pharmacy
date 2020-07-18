import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { IUser } from '../ViewModel/iuser';
import { environment } from 'src/environments/environment';
import { ILoginUser } from '../ViewModel/ilogin-user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ITokenResponse } from '../ViewModel/itoken-response';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  Islogin = false;
  private user: string ;
  private Token: string ;

  Logged$ = new BehaviorSubject<boolean>(this.Islogin);
  userData$ = new BehaviorSubject<string>(null);
  userToken$ = new BehaviorSubject<string>(null);

  constructor(private httpClient: HttpClient, private router: Router, private toast: ToastrService) {
    const logged = JSON.parse(localStorage.getItem('IsLogged'));
    const token = JSON.parse(localStorage.getItem('UserToken'));
    const data = JSON.parse(localStorage.getItem('userData'));
    if (data !== null && data !== undefined) {
      this.user = data;
      console.log(this.Islogin);

      this.Islogin = logged;
      console.log(this.Islogin);
      console.log(this.user);

      this.Token = token;
      console.log(this.Token);
      localStorage.setItem('IsLogged', JSON.stringify(this.Islogin));
      localStorage.setItem('userData', JSON.stringify(this.user));
      localStorage.setItem('UserToken', JSON.stringify(this.Token));

      this.Logged$.next(this.Islogin);
      this.userData$.next(this.user);
      this.userToken$.next(this.Token);

    }
  }

  register(user: IUser){
    const httpOptions = {headers: new HttpHeaders({
      'Content-Type': 'application/json'
      // ,'Authorization': 'my-auth-token'
        })};

    this.httpClient.post(`${environment.API_URL}/Account/RegisterAdmin`, user, httpOptions).subscribe(
       res => {
         let tempuser: ILoginUser = {username: user.name, Password: user.Password, grant_type: 'password'};
         this.login(tempuser);
         console.log(res);
         this.router.navigateByUrl('/Home');
       },
       err => {console.log(err) ; alert(err.error.Message); }
     );
  }
  login(user: ILoginUser){
    let data = 'username=' + user.username + '&password=' + user.Password + '&grant_type=password';
    const httpOptions = {headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
      // ,'Authorization': 'my-auth-token'
        })};

    this.httpClient.post<ITokenResponse>(`${environment.API_URL}/token`, data, httpOptions).subscribe(
       res => {
            localStorage.clear();
            console.log(res);
            this.Islogin = true;
            this.user = user.username;

            this.Token = res.access_token;


            localStorage.setItem('UserToken', JSON.stringify(this.Token));
            localStorage.setItem('IsLogged', JSON.stringify(this.Islogin));
            localStorage.setItem('userData', JSON.stringify(user.username));

            this.Logged$.next(this.Islogin);
            this.userData$.next(this.user);
            this.userToken$.next(this.Token);

            this.router.navigateByUrl('Home');
       },
       err => {
        this.toast.error(`'UserName or Password Incorrect'`, `Error`, {
          timeOut: 1500,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'
          }); }
     );
  }
  logout( ){
    localStorage.removeItem('UserToken');
    localStorage.removeItem('IsLogged');
    localStorage.removeItem('userData');

    localStorage.clear();
    this.user = null;
    this.Islogin = false;

    this.Logged$.next(false);
    this.userData$.next(null);

    this.router.navigateByUrl('/login');
  }
}
