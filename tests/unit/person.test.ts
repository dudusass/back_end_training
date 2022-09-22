/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Person from '../../src/interfaces/person';
import { SimpleMemoryModel } from '../../src/model/memoryModel';
import { PersonService } from '../../src/service/person';

let memoryModel: SimpleMemoryModel<Person>;
let personService: PersonService;

describe('Person', () => {
  beforeEach(() => {
    memoryModel = new SimpleMemoryModel();
    personService = new PersonService(memoryModel);
  });

  describe('Create', () => {
    it('should create a new person', async () => {
      await personService.create({
        name: 'Person'
      });

      const expected = { name: 'Person' };
      expect(await personService.list()).toEqual(
        expect.arrayContaining([expect.objectContaining(expected)])
      );
    });

    it(
      'should create throw an error when trying to create new person with invalid name',
      async () => {
        await expect(
          async () => await personService.create({ name: 'Adm' })
        ).rejects.toHaveProperty(
          'message',
          'O nome precisa ter pelo menos 4 caracteres'
        );
      }
    );
  });

  describe('Find', () => {
    it('should find an existing person', async () => {
      await personService.create({
        name: 'Person'
      });

      const expected = { name: 'Person' };
      expect(await personService.find(0)).toEqual(
        expect.objectContaining(expected)
      );
    });

    it('should ot find an inexistent person', async () => {
      await personService.create({
        name: 'Person'
      });
      expect(await personService.find(1)).toEqual(null);
    });
  });
});