import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Question } from '../shared/interfaces/question.interface';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private dbPath = '/Question';
  questRef: AngularFirestoreCollection<Question> = null;
  constructor(private db: AngularFirestore) {
    this.questRef = this.db.collection(this.dbPath);
  }

  getAllquest(): AngularFirestoreCollection<Question> {
    return this.questRef;
  }

}
