import { RowDataPacket } from 'mysql2';
import conn from '../database/connection';
import Person from '../interfaces/person';
import { SimpleModel } from './model';

export default class PersonModel implements SimpleModel<Person> {
  constructor(private connection = conn) { }
  async create(obj: Person) {
    await this.connection.execute(
      `INSERT INTO T16db.persons(
        name
      ) VALUES (?);`,
      [obj.name]
    );
  }

  async list() {
    const result = await this.connection.execute(
      `SELECT name
      FROM T16db.persons;`
    );
    const [persons] = result;
    return persons as Person[];
  }

  async find(id: number): Promise<Person | null> {
    const result = await this.connection.execute(
      `SELECT name
      FROM T16db.persons as p WHERE p.id = ?;`, [id]
    );
    const [persons] = result as RowDataPacket[];
    return persons[0] as Person;
  }
}