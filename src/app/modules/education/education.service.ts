import { Prisma } from "@prisma/client"
import {
  IOptions,
  parseFilterOptions,
  parseOptions,
} from "../../../helpers/query-helpers"
import prisma from "../../../utils/prisma-client"
import { ICreateEducation } from "./education.interface"
import { educationSearchFields } from "./education.constant"

const createEducation = async (educationData: ICreateEducation) => {
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

export const educationService = {
  createEducation,
  getEducations,
}
