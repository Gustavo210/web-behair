export interface PropsUser {
    id: string
    name: string
    surname: string
    email: string
}

export interface PropsProduct {
    id: string
    name: string
    photo: string
    description: string
    cost: number
    created_at: string
    updated_at: string
    onClickEdit?: (id: string) => void
    onClickDelete?: (id: string) => void
}

export interface PropsEstablishments {
    id: string
    name: string
    photo: string
    init_hours: string
    final_hours: string
    latitude: string
    longitude: string
    created_at: string
    updated_at: string
    products: Array<PropsProduct>
}

export interface PropsReservation {
    id: string
    name: string
    phone: string
    note: string
    is_active: string
    created_at: string
}