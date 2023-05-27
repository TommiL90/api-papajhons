import { AppError } from "../../errors/AppError";
import { TContact, TCreateContact, TUpdateContact } from "../../interfaces/contact.interfaces";
import prisma from "../../prisma";
import { contactSchema } from "../../schemas/contact.schema";
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
  payload: Partial<TContact>
): Promise<TContact> => {
  let updatedPhones: Phone[] = [];

  if (payload.phones && payload.phones.length > 0) {
    updatedPhones = await Promise.all(
      payload.phones.map(async (phone) => {
        const updatedPhone = await prisma.phone.update({
          where: { id: phone.id },
          data: { ...phone },
        });
        return updatedPhone;
      })
    );
  }

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
      ...updatedPayload,
      phones: {
        set: updatedPhones.map((phone) => ({
          id: phone.id,
        })),
      },
    },
    include: { phones: true },
  });

  console.log(updatedContact);

  return contactSchema.parse(updatedContact);
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

  return contacts;
};

export default {
  createContactService,
  updateContactService,
  deleteContactService,
  getContactsService,
};
