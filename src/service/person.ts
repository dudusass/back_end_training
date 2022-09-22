import Person from '../interfaces/person';
import { SimpleModel } from '../model/model';
import PersonModel from '../model/person';
import Service from './service';

export class PersonService extends Service<Person> {
  constructor(model: SimpleModel<Person> = new PersonModel()) {
    super(model);
  }

  async create(obj: Person): Promise<void> {
    if (obj.name.length <= 3) {
      throw new Error('O nome precisa ter pelo menos 4 caracteres');
    }
    return super.create(obj);
  }
}