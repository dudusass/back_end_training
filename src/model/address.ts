import { RowDataPacket } from 'mysql2';
import conn from '../database/connection';
import Address from '../interfaces/address';
import { Model } from './model';

export default class AddressModel implements Model<Address> {
  constructor(private connection = conn) { }
  async create(obj: Address) {
    await this.connection.execute(
      `INSERT INTO T16db.addresses(
        number, street, city, state, country
      ) VALUES (?, ?, ?, ?, ?);
    `, [obj.number, obj.street, obj.city, obj.state, obj.country]);
  }

  async list() {
    const result = await this.connection.execute(
      `SELECT 
        id, number, street, city, state, country, person_id 
      FROM T16db.addresses;`
    );
    const [addresses] = result;
    return addresses as Address[];
  }

  async find(id: number): Promise<Address | null> {
    const result = await this.connection.execute(
      `SELECT number, street, city, state, country
      FROM T16db.addresses as p WHERE p.id = ?;`, [id]
    );
    const [addresses] = result as RowDataPacket[];
    return addresses[0] as Address;
  }

  async update(_id: number, _obj: Address): Promise<void> {
    throw new Error('Not implemented error');
  }

  async delete(_id: number): Promise<void> {
    throw new Error('Not implemented error');
  }
}