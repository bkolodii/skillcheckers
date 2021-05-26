import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  localUser: any;
  private dbPath = '/users';
  profRef: AngularFirestoreCollection<any> = null;
  constructor(private db: AngularFirestore,
    private auth: AngularFireAuth,
    private router: Router) {
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
                  ...user.data() as any
                }
                console.log(myUser);

                localStorage.setItem('mainuser', JSON.stringify(myUser))
                this.localUser = JSON.parse(localStorage.getItem('user'))
              })
          })

      })

      .catch(
        err => {
          console.log(err);
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
                ...userRef.data() as any

              }
              // console.log(myUser);
              localStorage.setItem('mainuser', JSON.stringify(myUser))
              this.localUser = JSON.parse(localStorage.getItem('user'))
              this.router.navigateByUrl('orders');
            })
          }
        )
      })
      .catch(
        (e) => {
          console.log(e);

        }

      )
  }
  signOut(): void {
    this.auth.signOut()
      .then(() => {
        localStorage.removeItem('mainuser');
        this.router.navigateByUrl('login');
      })
  }
}

