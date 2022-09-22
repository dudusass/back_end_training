/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Address from '../../src/interfaces/address';
import { MemoryModel } from '../../src/model/memoryModel';
import { AddressService } from '../../src/service/address';

let memoryModel: MemoryModel<Address>;
let addressService: AddressService;

describe('Address', () => {
  beforeEach(() => {
    memoryModel = new MemoryModel();
    addressService = new AddressService(memoryModel);
  });

  describe('Create', () => {
    it('should create a new address', async () => {
      const expected = {
        city: 'city',
        country: 'country',
        number: '12',
        state: 'state',
        street: 'street'
      };
      await addressService.create(expected);
      expect(await addressService.list()).toEqual(
        expect.arrayContaining([expect.objectContaining(expected)])
      );
    });

    it(
      'should create throw an error when trying to create new address with invalid city',
      async () => {
        await expect(
          async () => await addressService.create({
            city: '',
            country: 'country',
            number: '12',
            state: 'state',
            street: 'street'
          })
        ).rejects.toHaveProperty(
          'message',
          'A cidade precisa ter pelo menos 4 caracteres'
        );
      }
    );
  });

  describe('Find', () => {
    beforeEach(async () => {
      await addressService.create({
        city: 'city',
        country: 'country',
        number: '12',
        state: 'state',
        street: 'street'
      });
    });
    it('should find an existing address', async () => {
      const expected = {
        city: 'city',
        country: 'country',
        number: '12',
        state: 'state',
        street: 'street'
      };
      expect(await addressService.find(0)).toEqual(
        expect.objectContaining(expected)
      );
    });

    it('should ot find an inexistent address', async () => {
      expect(await addressService.find(1)).toEqual(null);
    });
  });
});