import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { RequiredSkills } from '../shared/interfaces/requiredSkill.interface';

@Injectable({
  providedIn: 'root'
})
export class RequiredSkillsService {
  private dbPath = '/RequiredSkills';
  requiredSkillsRef: AngularFirestoreCollection<RequiredSkills> = null;
  constructor(private db: AngularFirestore) {
    this.requiredSkillsRef = this.db.collection(this.dbPath);
  }

  getAllrequiredSkills(): AngularFirestoreCollection<RequiredSkills> {
    return this.requiredSkillsRef;
  }
  // getOne(id): any {
  //   return this.requiredSkillsRef.ref.where('id', '==', id);

  // }
}
