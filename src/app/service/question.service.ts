import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { Question } from '../shared/interfaces/question.interface';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  updQuest: Subject<string> = new Subject<string>();
  private dbPath = '/Question';
  questRef: AngularFirestoreCollection<Question> = null;
  constructor(private db: AngularFirestore) {
    this.questRef = this.db.collection(this.dbPath);
  }

  getAllquest(): AngularFirestoreCollection<Question> {
    return this.questRef;
  }
  create(quest: Question): void {
    this.questRef.add({ ...quest }).then(
      data => {
        this.updQuest.next(data.id);
      }
    );
  }
  update(id: string, data: Question): Promise<void> {
    return this.questRef.doc(id).update({ ...data });
  }
  delete(id: string): Promise<void> {
    return this.questRef.doc(id).delete();
  }
}
