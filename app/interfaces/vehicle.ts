export interface vehicle {
    _id: string,
    identifier?: string,
    status: string,
    currentLocation?: string,
    defaultLocation?: string,
    defaultRoute?: string,
    defaultRouteId?: string,
    defaultDriver?: string,
    defaultDriverId?: string,
    defaultYard?: string,
    defaultYardId?: string,
    vehicle: {
        year?: string,
        make?: string,
        model?: string,
        seatCount?: string,
        length?: string,
        number: string,
        maintId?: string,
        vin?: string,
        license?: string,
        additionalId?: [{
            label?: string,
            number?: string
        }]
    }
}