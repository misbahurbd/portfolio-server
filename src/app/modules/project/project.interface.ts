export interface ICreateProjectData {
  title: string
  challenges: string
  solutions: string
  featurePhoto: string
  photos: string[]
  skills: string[]
  metadata: {
    title: string
    description: string
    socialImg?: string
  }
  sourceLinks: {
    label: string
    link: string
  }[]
}
