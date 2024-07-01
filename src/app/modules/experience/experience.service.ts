import { Prisma } from "@prisma/client"
import {
  IOptions,
  parseFilterOptions,
  parseOptions,
} from "../../../helpers/query-helpers"
import prisma from "../../../utils/prisma-client"
import { experienceQueryFields } from "./experience.constant"
import { AppError } from "../../errors/app-error"
import httpStatus from "http-status"
import { IExperience } from "./experience.interface"

const createExperience = async (experienceData: IExperience) => {
  const education = await prisma.experience.create({
    data: experienceData,
  })

  return education
}

const getExperiences = async (query: any, options: IOptions) => {
  const { page, limit, skip, sortBy, sortOrder } = parseOptions(options)
  const filterCondition: Prisma.ExperienceWhereInput[] = parseFilterOptions(
    query,
    experienceQueryFields
  )

  const experiences = await prisma.experience.findMany({
    where: {
      AND: filterCondition,
    },
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  })

  const total = await prisma.experience.count({
    where: {
      AND: filterCondition,
    },
  })

  return {
    data: experiences,
    meta: {
      page,
      limit,
      total,
    },
  }
}

const getExperience = async (id: string) => {
  const experience = await prisma.experience.findUnique({
    where: { id },
  })

  return experience
}

const updateExperience = async (id: string, experienceData: IExperience) => {
  const experience = await prisma.experience.update({
    where: { id },
    data: experienceData,
  })

  if (!experience)
    throw new AppError(httpStatus.BAD_REQUEST, "experience not found!")

  return experience
}

const deleteExperience = async (id: string) => {
  const experience = await prisma.experience.delete({
    where: { id },
  })
  return experience
}

export const experienceService = {
  createExperience,
  getExperiences,
  getExperience,
  updateExperience,
  deleteExperience,
}
