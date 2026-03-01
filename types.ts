export type Cell = {
  color: string | null
  endpointId?: string
}

export type Grid = Cell[][]

export type Endpoint = {
  id: string
  color: string
  a: { row: number; col: number }
  b: { row: number; col: number }
}

export type Level = {
  size: number
  endpoints: Endpoint[]
}
