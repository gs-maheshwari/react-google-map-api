export interface Pad {
    latitude: string
    longitude: string
    map_image: string
    agency_id: string
}

export interface Launches {
    id: string
    url: string
    name: string
    window_end: string
    window_start: string
    pad: Pad
    status: { abbrev: 'Success' | 'Failure' }
    image: string
}

export interface CustomResponse {
    state: State,
    data?: ServiceResponse
}
export interface ServiceResponse {
    count: number
    next?: string
    previous?: string 
    results: Array<Launches>
}

export enum State {
    'IDEAL',
    'LOADING',
    'SUCCESS',
    'ERROR'
}