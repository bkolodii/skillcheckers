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
  create(data: mesUser): void {
    this.mesUserRef.add({ ...data })
  }
  update(id: string, data: mesUser): Promise<void> {
    return this.mesUserRef.doc(id).update({ ...data });
  }
  updateByName(id: string, data: mesUser): Promise<void> {
    return this.mesUserRef.doc(id).update({ ...data });
  }
  getOne(id): any {
    return this.mesUserRef.ref.where('url', '==', id);
  }
}

