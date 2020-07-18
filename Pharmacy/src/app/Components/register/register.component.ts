import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Service/authentication.service';
import { IUser } from 'src/app/ViewModel/iuser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: IUser;
  message: string;
  constructor(private authService: AuthenticationService ) {
    this.user = {name: '', Confirmpassword: '', Password: ''};

   }

  ngOnInit(): void {
  }
register()
{
this.authService.register(this.user);

}
ErrorHandle(){
  if(this.user.name.length < 3)
  {
      this.message = 'user Name Must Be More Than 3';
      // alert( 'user Name Must Be More Than 3');
  }
  if(this.user.Confirmpassword !== this.user.Password )
  {
      this.message = 'Password & Confirmpassword are Different';
      // alert( 'Password & Confirmpassword are Different');

  }

}
}
