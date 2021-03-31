import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Month } from '../shared/interfaces/month.interface';

@Injectable({
  providedIn: 'root'
})
export class MonthService {
  private dbPath = '/months';
  monthsRef: AngularFirestoreCollection<Month> = null;
  constructor(private db: AngularFirestore) {
    this.monthsRef = this.db.collection(this.dbPath);
  }

  getAllmonth(): AngularFirestoreCollection<Month> {
    return this.monthsRef;
  }
}
