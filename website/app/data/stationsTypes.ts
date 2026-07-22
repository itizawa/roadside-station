// data/stations.json（SSOT）の型定義。JSONの実際の構造と一致させること。
export type VisitStatus = 'visited' | 'planned' | 'postponed'

export type TaskStatus = 'done' | 'todo' | 'in_progress' | 'not_scheduled' | 'draft_feedback_pending'

export interface Coordinates {
  lat: number
  lng: number
}

export interface AccessByTrain {
  nearestStation: string
  nearestStationCoordinates?: Coordinates
  distance: string
  walkingTime: string
  alternatives: string[]
}

export interface AccessByCar {
  nearestIC: string
  parking: string
  parkingSpaces: string
}

export interface BasicInfo {
  openingDate?: string
  operatingHours?: string
  closedDays?: string
  website?: string
  concept?: string
}

export interface ContentSection {
  heading: string
  items: string[]
}

export interface Pipeline {
  research: TaskStatus
  route: TaskStatus
  script: TaskStatus
  editing: TaskStatus
  publishDate: string | null
}

export interface Station {
  slug: string
  folder: string
  title: string
  prefecture: string
  address: string
  coordinates?: Coordinates
  visitDate: string | null
  visitStatus: VisitStatus
  transport: string
  transportIcon: string
  description: string
  highlight?: string
  planNote?: string
  internalNote?: string
  postponedReason?: string
  accessByTrain?: AccessByTrain
  accessByCar?: AccessByCar
  basicInfo?: BasicInfo
  contentSections?: ContentSection[]
  pipeline: Pipeline
}

export interface PrefectureInfo {
  name: string
  total: number
}

export interface StationsData {
  _comment?: string
  prefectures: Record<string, PrefectureInfo>
  stations: Station[]
}
