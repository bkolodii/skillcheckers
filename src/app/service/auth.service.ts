import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Users } from '../shared/interfaces/users.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  localUser: any;
  private dbPath = '/users';
  updUser: Subject<any> = new Subject<any>();
  profRef: AngularFirestoreCollection<any> = null;
  constructor(private db: AngularFirestore,
    private auth: AngularFireAuth,
    private router: Router,
    private toastr: ToastrService) {
    this.profRef = this.db.collection(this.dbPath);
  }

  signUp(email: string, password: string, userFname: string, userSname: string): void {
    this.auth.createUserWithEmailAndPassword(email, password)

      .then(userResponse => {
        const user = {
          email: userResponse.user.email,
          password: password,
          username: userFname,
          icon: userSname,
        }

        this.db.collection('users').add(user)
          .then(collection => {
            collection.get()
              .then(user => {
                const myUser = {
                  id: user.id,
                  ...user.data() as Users
                }
                this.toastr.success(`Hello ${myUser.username}`, 'Login success');
                localStorage.setItem('mainuser', JSON.stringify(myUser))
                this.localUser = JSON.parse(localStorage.getItem('user'))
              })
          })

      })

      .catch(
        err => {
          console.log(err);
          this.toastr.error('Smth went wrong', 'Login denied');
        }
      )
  }







  signIn(email: string, password: string): void {
    this.auth.signInWithEmailAndPassword(email, password)
      .then(userResponse => {
        this.db.collection('users').ref.where('email', '==', userResponse.user.email).onSnapshot(
          snap => {
            snap.forEach(userRef => {
              const myUser = {
                id: userRef.id,
                ...userRef.data() as Users

              }
              this.toastr.success(`Hello ${myUser.username}`, 'Login success');
              this.updUser.next(myUser)
              localStorage.setItem('mainuser', JSON.stringify(myUser))
              this.localUser = JSON.parse(localStorage.getItem('user'))
              this.router.navigateByUrl('home-page');
            })
          }
        )
      })
      .catch(
        (e) => {
          console.log(e);
          this.toastr.error('Smth went wrong', 'Login denied');
        }

      )
  }
  signOut(): void {
    this.auth.signOut()
      .then(() => {
        localStorage.removeItem('mainuser');
        this.router.navigateByUrl('login');
        this.toastr.success(`Bay`, 'Logout success');
      })
  }

  getAllusers(): AngularFirestoreCollection<any> {
    return this.profRef;
  }
  update(id: string, data): Promise<void> {
    return this.profRef.doc(id).update({ ...data });
  }
  getOne(id: string): any {
    return this.profRef.ref.where('id', '==', id);
  }
}

