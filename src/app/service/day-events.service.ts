import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Events } from '../shared/interfaces/events.interface';
import { Question } from '../shared/interfaces/question.interface';

@Injectable({
  providedIn: 'root'
})
export class DayEventsService {
  
  private dbPath = '/dayEvents';
  allEventsRef: AngularFirestoreCollection<Events> = null;
  constructor(private db: AngularFirestore) {
    this.allEventsRef = this.db.collection(this.dbPath);
  }

  getAllEvents(): AngularFirestoreCollection<Events> {
    return this.allEventsRef;
  }
  create(comm: Events): Promise<DocumentReference<Events>> {
    return this.allEventsRef.add({ ...comm });
  }
  // update(id: string, data: Question): Promise<void> {
  //   return this.allEventsRef.doc(id).update({ ...data });
  // }
  // delete(id: string): Promise<void> {
  //   return this.allEventsRef.doc(id).delete();
  // }
}
