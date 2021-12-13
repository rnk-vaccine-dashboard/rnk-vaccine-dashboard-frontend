import { CenterData, VaccineData } from "../models/DashboardData"

export interface DashboardData {
	data: {
		vaccines: {
			data: VaccineData[] 
		}
		centers: {
			data: CenterData[]
		}
	}
}

const getDashboardData = () : Promise<DashboardData> => {
	const query = `query {
		vaccines(filters: {name: {eq: "Biontech"}}) {
			data {
				id
				attributes {
					name
				}
			}
		}
		centers(pagination: {limit: 200}) {
			data {
				id
				attributes {
					name
					centerId
					biontechStatus: availability_statuses(
						pagination: {limit: 1},
						sort: "createdAt:DESC",
						filters: { vaccine: {name: {eq: "Biontech"}} }
					) {
						data {
							id
							attributes {
								createdAt
								isAvailable
								vaccine {data {id, attributes { name }}}
							}
						}
					}
					modernaStatus: availability_statuses(
						pagination: {limit: 1},
						sort: "createdAt:DESC",
						filters: { vaccine: {name: {eq: "Moderna"}} }
					) {
						data {
							attributes {
								createdAt
								isAvailable
								vaccine {data {id, attributes { name }}}
							}
						}
					}
					johnsonStatus: availability_statuses(
						pagination: {limit: 1},
						sort: "createdAt:DESC",
						filters: { vaccine: {name: {eq: "Johnson & Johnson"}} }
					) {
						data {
							attributes {
								createdAt
								isAvailable
								vaccine {data {id, attributes { name }}}
							}
						}
					}
				}
			}
		}
	}`

	return fetch(`${process.env.CMS_BASE_URL}/graphql`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			// 'Authorization': `Bearer ${localStorage.getItem('token')}`
		},
		body: JSON.stringify({ query })
	})
		.then(res => res.json())
}

export default getDashboardData