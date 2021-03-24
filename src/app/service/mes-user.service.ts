import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { mesUser } from '../shared/interfaces/mesUser.interface';

@Injectable({
  providedIn: 'root'
})
export class MesUserService {
  private dbPath = '/mesUser';
  mesUserRef: AngularFirestoreCollection<mesUser> = null;
  constructor(private db: AngularFirestore) {
    this.mesUserRef = this.db.collection(this.dbPath);
  }

  getAllusers(): AngularFirestoreCollection<mesUser> {
    return this.mesUserRef;
  }
}
