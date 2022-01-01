export interface VaccineData {
	id: string;
	attributes: {
		name: string;
	}
}

export interface CenterData {
	id: string;
	attributes: {
		name: string
		centerId: number
		targetGroups: string | null
		biontechStatus?: {
			data: AvailabilityStatusData[]
		}
	}
}

export interface AvailabilityStatusData {
	id: string;
	attributes: {
		createdAt: string;
		updatedAt?: string;
		isAvailable: boolean;
		vaccine?: {
			data: VaccineData
		}
	}
}