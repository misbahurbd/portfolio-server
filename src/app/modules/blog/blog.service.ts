import { Prisma } from "@prisma/client"
import {
  IOptions,
  parseFilterOptions,
  parseOptions,
} from "../../../helpers/query-helpers"
import prisma from "../../../utils/prisma-client"
import { ICreateBlogData } from "./blog.interface"
import { blogSearchFields } from "./blog.constant"

const createBlog = async (blogData: ICreateBlogData) => {
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

    const metadata = await tx.metadata.create({
      data: {
        title: blogData.metadata.title,
        description: blogData.metadata.description,
        socialImg: blogData.metadata.socialImg,
      },
    })

    const newBlog = await tx.blog.create({
      data: {
        title: blogData.title,
        content: blogData.content,
        featurePhoto: blogData.featurePhoto,
        slug: uniqueSlug,
        categoryId: category.id,
        metadataId: metadata.id,
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

export const blogService = {
  createBlog,
  getBlogs,
}
