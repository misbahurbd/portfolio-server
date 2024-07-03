import { Prisma } from "@prisma/client"
import {
  IOptions,
  parseFilterOptions,
  parseOptions,
} from "../../../helpers/query-helpers"
import prisma from "../../../utils/prisma-client"
import { IProjectData } from "./project.interface"
import { projectSearchFields } from "./project.constant"
import { AppError } from "../../errors/app-error"
import httpStatus from "http-status"

const createProject = async (projectData: IProjectData) => {
  let slug = projectData.metadata.title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")

  let uniqueSlug = slug
  let count = 1

  while (!!(await prisma.project.findUnique({ where: { slug: uniqueSlug } }))) {
    uniqueSlug = `${slug}-${count}`
    count++
  }

  const project = await prisma.project.create({
    data: {
      title: projectData.title,
      slug: uniqueSlug,
      challenges: projectData.challenges,
      solutions: projectData.solutions,
      featurePhoto: projectData.featurePhoto,
      photos: projectData.photos,
      skills: projectData.skills,
      sourceLinks: {
        createMany: {
          data: projectData.sourceLinks,
        },
      },
      metadata: {
        create: {
          title: projectData.metadata.title,
          description: projectData.metadata.description,
          socialImg: projectData.metadata.socialImg,
        },
      },
    },
  })

  return project
}

const getProjects = async (query: any, options: IOptions) => {
  const { page, limit, skip, sortBy, sortOrder } = parseOptions(options)
  const filterCondition: Prisma.ProjectWhereInput[] = parseFilterOptions(
    query,
    projectSearchFields
  )

  const projects = await prisma.project.findMany({
    where: {
      AND: filterCondition,
    },
    include: {
      metadata: true,
      sourceLinks: true,
    },
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  })

  const total = await prisma.project.count({
    where: {
      AND: filterCondition,
    },
  })

  return {
    data: projects,
    meta: {
      page,
      limit,
      total,
    },
  }
}

const getProject = async (id: string) => {
  const project = await prisma.project.findFirst({
    where: { OR: [{ id }, { slug: id }] },
    include: {
      sourceLinks: true,
      metadata: true,
    },
  })
  if (!project) {
    throw new AppError(httpStatus.NOT_FOUND, "Project not found!")
  }

  return project
}

const updateProject = async (id: string, projectData: IProjectData) => {
  const project = await prisma.project.update({
    where: {
      id,
    },
    data: {
      title: projectData.title,
      challenges: projectData.challenges,
      solutions: projectData.solutions,
      featurePhoto: projectData.featurePhoto,
      photos: {
        set: projectData.photos,
      },
    },
  })

  if (!project) throw new AppError(httpStatus.BAD_REQUEST, "Project not found!")

  return project
}

const deleteProject = async (id: string) => {
  const project = await prisma.project.delete({
    where: { id },
  })

  return project
}

export const projectService = {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
}
