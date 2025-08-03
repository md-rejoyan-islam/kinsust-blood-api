import createError from "http-errors";
import crypto from "crypto";
import PatientModel from "../models/patient.model";

const getAllPatients = async () => {
  // get all patient
  const { count, rows: patients } = await PatientModel.findAndCountAll();

  // if no patient found
  if (!count) throw createError(400, "Couldn't find any patient data.");

  return { count, patients };
};

const createPatient = async (req: any) => {
  const { phone, bloodGroup, location } = req.body;

  if (!phone) throw createError(400, "Phone number is required");
  if (!bloodGroup) throw createError(400, "Blood Group is required");
  if (!location) throw createError(400, "Location is required");

  // check phone number
  const patient = await PatientModel.findOne({ where: { phone } });

  if (patient) throw createError(400, "Phone number already exists");

  // create patient
  const result = await PatientModel.create({
    id: crypto.randomUUID(),
    ...req.body,
    editedBy: req?.me?.email,
  });

  return result;
};

const updatePatientDataById = async (req: any) => {
  const id = req.params.id;

  // find patient by id
  const patient = await PatientModel.findByPk(id);

  // if patient data not found
  if (!patient) throw createError(400, "Couldn't find any patient data.");

  // update patient
  await PatientModel.update(
    {
      ...req.body,
      editedBy: req?.me?.email,
    },
    {
      where: { id },
    }
  );

  // updated data
  const result = await PatientModel.findByPk(id);

  return result;
};

const deletePatient = async (id: string) => {
  // find patient by id
  const patient = await PatientModel.findByPk(id);

  // if patient data not found
  if (!patient) throw createError(400, "Couldn't find any patient data.");

  // delete patient
  await PatientModel.destroy({ where: { id } });

  return patient;
};

export { getAllPatients, createPatient, updatePatientDataById, deletePatient };
