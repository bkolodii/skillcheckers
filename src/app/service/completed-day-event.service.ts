import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { completedDayEvents } from '../shared/interfaces/completedDayEvents.interface';

@Injectable({
  providedIn: 'root'
})
export class CompletedDayEventService {
  
  private dbPath = '/completedDayEvents';
  completedEventsRef: AngularFirestoreCollection<any> = null;
  constructor(private db: AngularFirestore) {
    this.completedEventsRef = this.db.collection(this.dbPath);
  }

  getAllEvents(): AngularFirestoreCollection<any> {
    return this.completedEventsRef;
  }
  create(comm : completedDayEvents): Promise<DocumentReference<any>> {
    return this.completedEventsRef.add({ ...comm });
  }
  update(id: string, data : completedDayEvents): Promise<void> {
    return this.completedEventsRef.doc(id).update({ ...data });
  }
  delete(id: string): Promise<void> {
    return this.completedEventsRef.doc(id).delete();
  }
}
