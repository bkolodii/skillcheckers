import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { RequiredSkills } from '../shared/interfaces/requiredSkill.interface';

@Injectable({
  providedIn: 'root'
})
export class RequiredSkillsService {
  private dbPath = '/RequiredSkills';
  requiredSkillsRef: AngularFirestoreCollection<RequiredSkills> = null;
  updOrder: Subject<string> = new Subject<string>();
  constructor(private db: AngularFirestore) {
    this.requiredSkillsRef = this.db.collection(this.dbPath);
  }

  getAllrequiredSkills(): AngularFirestoreCollection<RequiredSkills> {
    return this.requiredSkillsRef;
  }
  create(order: RequiredSkills): void {
    this.requiredSkillsRef.add({ ...order }).then(
      data => {
        this.updOrder.next(data.id);
      }
    );
  }
  update(id: string, data: RequiredSkills): Promise<void> {
    return this.requiredSkillsRef.doc(id).update({ ...data });
  }
  delete(id: string): Promise<void> {
    return this.requiredSkillsRef.doc(id).delete();
  }
}
