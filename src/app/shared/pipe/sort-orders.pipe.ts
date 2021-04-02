import { Pipe, PipeTransform } from '@angular/core';
import { ActiveComponent } from 'src/app/pages/orders/order-items/active/active.component';
import { RequiredSkills } from '../interfaces/requiredSkill.interface';

@Pipe({
  name: 'sortOrders'
})
export class SortOrdersPipe implements PipeTransform {


  transform(value: Array<RequiredSkills>, name: string, location: string, date: string): unknown {
    if (!value) {
      return value
    }
    if (name == 'Unit name' && location == 'Unit location' && date == 'Creation date') {
      return value
    }
    else {
      if (name !== 'Unit name' && location === 'Unit location' && date === "Creation date") {
        return value.filter(sort => sort.unitName == name);
      }
      else if (name === 'Unit name' && location !== 'Unit location' && date === "Creation date") {
        return value.filter(sort => sort.unitLocation == location);
      }
      else if (name !== 'Unit name' && location !== 'Unit location' && date === "Creation date") {
        return value.filter(sort => sort.unitLocation == location && sort.unitName == name);
      }
      else if (name === 'Unit name' && location === 'Unit location' && date !== "Creation date") {
        return value.filter(sort => sort.creationDate == date);
      }
      else if (name !== 'Unit name' && location === 'Unit location' && date !== "Creation date") {
        return value.filter(sort => sort.creationDate == date && sort.unitName == name);
      }
      else if (name === 'Unit name' && location !== 'Unit location' && date !== "Creation date") {
        return value.filter(sort => sort.creationDate == date && sort.unitLocation == location);
      }
      else if (name !== 'Unit name' && location !== 'Unit location' && date !== "Creation date") {
        return value.filter(sort => sort.unitLocation == location && sort.unitName == name && sort.creationDate == date);
      }

    }
  }


}
