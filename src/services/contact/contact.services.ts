import { AppError } from "../../errors/AppError";
import {
  TContact,
  TCreateContact,
  TUpdateContact,
} from "../../interfaces/contact.interfaces";
import prisma from "../../lib/prisma";
import {
  contactSchema,
  updateContactSchema,
} from "../../schemas/contact.schema";
import { Phone } from "@prisma/client";

const createContactService = async (
  payload: TCreateContact,
  userId: number
): Promise<TContact> => {
  const email = await prisma.contact.findFirst({
    where: {
      email: payload.email,
    },
  });

  if (email) {
    throw new AppError("Email already registered", 409);
  }

  const contact = await prisma.contact.create({
    data: {
      name: payload.name,
      email: payload.email,
      userId: userId,
    },
  });

  const phones = await Promise.all(
    payload.phones.map((phone) =>
      prisma.phone.create({ data: { phone: phone, contactId: contact.id } })
    )
  );

  const data = { ...contact, phones: phones };

  const newContact = contactSchema.parse(data);

  return newContact;
};

const updateContactService = async (
  userId: number,
  contactId: number,
  payload: TUpdateContact
): Promise<TUpdateContact> => {

  if (payload.phones && payload.phones.length > 0) {
    await Promise.all(
      payload.phones.map(async (phone) => {
        const retrievePhone = await prisma.phone.findUnique({
          where: {
            id: phone.id
          }
        })
        if (!retrievePhone){
          throw new AppError("Phone not found", 404)
        }
        await prisma.phone.update({
          where: {
            id: phone.id},
            data: {...retrievePhone, ...phone}
        })
      })
    );
  }
  console.log('opaaaaaa')
  const { phones, ...updatedPayload } = payload;

  const contact = await prisma.contact.findFirst({
    where: { id: contactId, userId: userId },
  });

  if (!contact) {
    throw new AppError("Contact not found", 404);
  }

  if (contact.name === updatedPayload.name) {
    delete updatedPayload.name;
  }

  const updatedContact = await prisma.contact.update({
    where: { id: contactId },
    data: {
      ...contact,
      name: updatedPayload.name ? updatedPayload.name : contact.name,
      email: updatedPayload.email ? updatedPayload.email : contact.email,
    },
    include: { phones: true },
  });

  return updateContactSchema.parse(updatedContact);
};

const deleteContactService = async (
  userId: number,
  contactId: number
): Promise<void> => {
  const contact = await prisma.contact.findFirst({
    where: { id: contactId, userId: userId },
  });

  if (!contact) {
    throw new AppError("Contact not found", 404);
  }

  await prisma.contact.delete({
    where: { id: contactId },
  });
};

const getContactsService = async (idUser: number): Promise<TContact[]> => {
  const contacts = await prisma.contact.findMany({
    where: { userId: idUser },
    include: { phones: true },
  });

  if (!contacts) {
    throw new AppError("Contacts not found", 404);
  }
  return contacts;
};

export default {
  createContactService,
  updateContactService,
  deleteContactService,
  getContactsService,
};
