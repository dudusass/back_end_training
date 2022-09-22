import { NextFunction, Request, Response } from 'express';

import BadRequest from '../errors/badRequest';

import NotFound from '../errors/notFound';

import PersonInterface from '../interfaces/person';

import { PersonService } from '../service/person';




export async function create(req: Request, res: Response, next: NextFunction) {

  const { name } = req.body as PersonInterface;

  const personService = new PersonService();

  try {

    if (name === undefined) {

      throw new BadRequest('Você precisa enviar o nome da pessoa');

    }

    await personService.create({ name });

    res.status(201).send();

  } catch (err) {

    next(err);

  }

}




export async function find(req: Request, res: Response, next: NextFunction) {

  const { id } = req.params;

  const personService = new PersonService();

  try {

    if (id === undefined) {

      throw new BadRequest('Você precisa enviar o id da pesquisa');

    }

    const obj = await personService.find(parseInt(id, 10));

    if (!obj) {

      throw new NotFound('Pessoa não encontrada');

    }

    res.status(200).json(obj);

  } catch (err) {

    next(err);

  }

}




export async function list(_req: Request, res: Response, next: NextFunction) {

  const personService = new PersonService();

  try {

    const personList = await personService.list();

    res.json(personList);

  } catch (err) {

    next(err);

  }

}