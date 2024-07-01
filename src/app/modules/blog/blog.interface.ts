export interface IBlogData {
  title: string
  content: string
  featurePhoto: string
  category: string
  metadata: {
    title: string
    description: string
    socialImg?: string
  }
}
