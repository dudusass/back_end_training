import Address from '../interfaces/address';
import AddressModel from '../model/address';
import { SimpleModel } from '../model/model';
import Service from './service';
import ValidationError from './validationError';

export class AddressService extends Service<Address> {
  constructor(model: SimpleModel<Address> = new AddressModel()) {
    super(model);
  }

  async create(obj: Address): Promise<void> {
    if (obj.city.length <= 3) {
      throw new ValidationError(
        'A cidade precisa ter pelo menos 4 caracteres'
      );
    }
    return super.create(obj);
  }
}