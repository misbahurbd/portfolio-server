import { Prisma } from "@prisma/client"
import {
  IOptions,
  parseFilterOptions,
  parseOptions,
} from "../../../helpers/query-helpers"
import prisma from "../../../utils/prisma-client"
import { IEducation } from "./education.interface"
import { educationSearchFields } from "./education.constant"
import { AppError } from "../../errors/app-error"
import httpStatus from "http-status"

const createEducation = async (educationData: IEducation) => {
  const education = await prisma.education.create({
    data: educationData,
  })

  return education
}

const getEducations = async (query: any, options: IOptions) => {
  const { page, limit, skip, sortBy, sortOrder } = parseOptions(options)
  const filterCondition: Prisma.EducationWhereInput[] = parseFilterOptions(
    query,
    educationSearchFields
  )

  const educations = await prisma.education.findMany({
    where: {
      AND: filterCondition,
    },
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  })

  const total = await prisma.education.count({
    where: {
      AND: filterCondition,
    },
  })

  return {
    data: educations,
    meta: {
      page,
      limit,
      total,
    },
  }
}

const getEducation = async (id: string) => {
  const education = await prisma.education.findUnique({
    where: { id },
  })

  return education
}

const updateEducation = async (id: string, educationData: IEducation) => {
  const education = await prisma.education.update({
    where: { id },
    data: educationData,
  })

  if (!education)
    throw new AppError(httpStatus.BAD_REQUEST, "Education not found!")

  return education
}

const deleteEducation = async (id: string) => {
  const education = await prisma.education.delete({
    where: { id },
  })
  return education
}

export const educationService = {
  createEducation,
  getEducations,
  getEducation,
  updateEducation,
  deleteEducation,
}
