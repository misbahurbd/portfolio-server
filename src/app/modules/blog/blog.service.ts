import { Prisma } from "@prisma/client"
import {
  IOptions,
  parseFilterOptions,
  parseOptions,
} from "../../../helpers/query-helpers"
import prisma from "../../../utils/prisma-client"
import { IBlogData } from "./blog.interface"
import { blogSearchFields } from "./blog.constant"
import { AppError } from "../../errors/app-error"
import httpStatus from "http-status"

const createBlog = async (blogData: IBlogData) => {
  let slug = blogData.metadata.title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")

  let uniqueSlug = slug
  let count = 1

  while (!!(await prisma.blog.findUnique({ where: { slug: uniqueSlug } }))) {
    uniqueSlug = `${slug}-${count}`
    count++
  }

  const blog = await prisma.$transaction(async tx => {
    const categorySlug = blogData.category
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
    const category = await tx.blogCategory.upsert({
      where: {
        slug: categorySlug,
      },
      update: {},
      create: {
        label: blogData.category,
        slug: categorySlug,
      },
    })

    const newBlog = await tx.blog.create({
      data: {
        title: blogData.title,
        content: blogData.content,
        featurePhoto: blogData.featurePhoto,
        slug: uniqueSlug,
        categoryId: category.id,
        metadata: {
          create: {
            title: blogData.metadata.title,
            description: blogData.metadata.description,
            socialImg: blogData.metadata.socialImg,
          },
        },
      },
      include: {
        category: true,
        metadata: true,
      },
    })

    return newBlog
  })

  return blog
}

const getBlogs = async (query: any, options: IOptions) => {
  const { page, limit, skip, sortBy, sortOrder } = parseOptions(options)
  const filterCondition: Prisma.BlogWhereInput[] = parseFilterOptions(
    query,
    blogSearchFields
  )

  const blogs = await prisma.blog.findMany({
    where: {
      AND: filterCondition,
    },
    include: {
      category: true,
      metadata: true,
    },
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  })

  const total = await prisma.blog.count({
    where: {
      AND: filterCondition,
    },
  })

  return {
    data: blogs,
    meta: {
      page,
      limit,
      total,
    },
  }
}

const getBlog = async (id: string) => {
  const blog = await prisma.blog.findFirst({
    where: {
      OR: [
        {
          id,
        },
        {
          slug: id,
        },
      ],
    },
    include: {
      category: true,
      metadata: true,
    },
  })

  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog not found!")
  }

  return blog
}

const updateBlog = async (id: string, blogData: IBlogData) => {
  const blogResult = await prisma.$transaction(async tx => {
    const categorySlug = blogData.category
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
    const category = await tx.blogCategory.upsert({
      where: {
        slug: categorySlug,
      },
      update: {},
      create: {
        label: blogData.category,
        slug: categorySlug,
      },
    })

    const blog = await tx.blog.update({
      where: {
        id,
      },
      data: {
        title: blogData.title,
        content: blogData.content,
        featurePhoto: blogData.featurePhoto,
        categoryId: category.id,
        metadata: {
          update: {
            data: {
              title: blogData.metadata.title,
              description: blogData.metadata.description,
              socialImg: blogData.metadata.socialImg,
            },
          },
        },
      },
      include: {
        category: true,
        metadata: true,
      },
    })

    return blog
  })

  return blogResult
}

const deleteBlog = async (id: string) => {
  const blog = await prisma.blog.delete({
    where: { id },
  })

  return blog
}

export const blogService = {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
}
