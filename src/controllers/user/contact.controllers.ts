import { Request, Response } from "express";
import { TContact, TCreateContact, TUpdateContact } from "../../interfaces/contact.interfaces";
import contactServices from "../../services/contact/contact.services";


const createContact = async (req: Request, res: Response) => {
  const data: TCreateContact = req.body;
  const userId = res.locals.userId;

  const newUser: TContact = await contactServices.createContactService(
    data,
    userId
  );

  return res.status(201).json(newUser);
};

const updateContact = async (req: Request, res: Response) => {
  const contactId: number = Number(req.params.id);
  const userId = res.locals.userId;

  const data: TUpdateContact = req.body;

  const updatedContact: TUpdateContact =
    await contactServices.updateContactService(userId, contactId, data);

  return res.status(200).json(updatedContact);
};

const deleteContact = async (req: Request, res: Response) => {
  const contactId: number = Number(req.params.id);
  const userId = res.locals.userId;
  await contactServices.deleteContactService(userId, contactId);

  return res.status(200).send();
};

const listContacts = async (req: Request, res: Response) => {
  const userId = res.locals.userId;

  const contacts = await contactServices.getContactsService(userId);

  return res.status(200).json(contacts);
};

export default { createContact, updateContact, deleteContact, listContacts };
