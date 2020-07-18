import { Injectable } from '@angular/core';
import { IUser } from '../ViewModel/iuser';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ILoginUser } from '../ViewModel/ilogin-user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  Islogin = false;
  private user: string ;
  Logged$ = new BehaviorSubject<boolean>(this.Islogin);
  userData$ = new BehaviorSubject<string>(null);

  constructor(private httpClient: HttpClient, private router: Router) {
    const logged = JSON.parse(localStorage.getItem('IsLogged'));
    const data = JSON.parse(localStorage.getItem('userData'));
    if (data !== null && data !== undefined) {
      this.user = data;
      console.log(this.Islogin);

      this.Islogin = logged;
      console.log(this.Islogin);
      console.log(this.user);

      localStorage.setItem('IsLogged', JSON.stringify(this.Islogin));
      localStorage.setItem('userData', JSON.stringify(this.user));
      this.Logged$.next(this.Islogin);
      this.userData$.next(this.user);

    }
  }

  register(user: IUser){
    const httpOptions = {headers: new HttpHeaders({
      'Content-Type': 'application/json'
      // ,'Authorization': 'my-auth-token'
        })};

    this.httpClient.post(`${environment.API_URL}/Account/RegisterUser`, user, httpOptions).subscribe(
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

    this.httpClient.post(`${environment.API_URL}/token`, data, httpOptions).subscribe(
       res => {
            localStorage.clear();
            console.log(res);
            this.Islogin = true;
            this.user = user.username;
            // let access_token = res.access_token;
            // localStorage.setItem('UserToken', JSON.stringify(access_token));

            localStorage.setItem('IsLogged', JSON.stringify(this.Islogin));
            localStorage.setItem('userData', JSON.stringify(user.username));
            this.Logged$.next(this.Islogin);
            this.userData$.next(this.user);
            this.router.navigateByUrl('Home');
       },
       err => {console.log(err); }
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
