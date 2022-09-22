import { MemoryModel, SimpleMemoryModel } from '../../src/model/memoryModel';

interface X {
  x: number;
}


describe('SimpleMemoryModel', () => {
  let model: SimpleMemoryModel<X>;

  beforeEach(() => {
    model = new SimpleMemoryModel();
  });

  it('should list no items', async () => {
    const result = await model.list();
    expect(result).toEqual([]);
  });

  it('should create one item', async () => {
    await model.create({ x: 1 });
    expect(await model.list()).toEqual([{ id: 0, x: 1 }]);
  });

  it('should create two items', async () => {
    await model.create({ x: 1 });
    await model.create({ x: 3 });
    expect(await model.list()).toEqual([
      { id: 0, x: 1 },
      { id: 1, x: 3 },
    ]);
  });

  it('should find one item', async () => {
    await model.create({ x: 1 });
    await model.create({ x: 3 });
    expect(await model.find(1)).toEqual({ id: 1, x: 3 });
  });

  it('should find no item on empty model', async () => {
    expect(await model.find(1)).toEqual(null);
  });

  it('should find no item on non-empty model', async () => {
    await model.create({ x: 1 });
    await model.create({ x: 3 });
    expect(await model.find(3)).toEqual(null);
  });
});

describe('MemoryModel', () => {
  let model: MemoryModel<X>;

  beforeEach(() => {
    model = new MemoryModel();
  });

  it('should delete item', async () => {
    await model.create({ x: 1 });
    await model.create({ x: 3 });
    await model.delete(0);
    expect(await model.list()).toEqual([{ id: 1, x: 3 }]);
  });

  it('should update item', async () => {
    await model.create({ x: 1 });
    await model.create({ x: 3 });
    await model.update(1, { x: 2 });
    expect(await model.list()).toEqual([{ id: 0, x: 1 }, { id: 1, x: 2 }]);
  });

});