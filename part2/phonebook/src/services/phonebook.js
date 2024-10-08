import axios from 'axios'

const baseUrl = '/api/persons'

const getPersons = () => {
	const request = axios.get(baseUrl)
	return request.then(response => response.data)
}

const addPerson = (newPerson) => {
  const request = axios.post(baseUrl, newPerson)
	return request.then((response) => response.data)
}

const updatePersonNumber = (updatedPerson) => {
	const request = axios.put(`${baseUrl}/${updatedPerson.id}`, updatedPerson)
	return request.then((response) => response.data)
}

const deletePerson = (id) => {
	const request = axios.delete(`${baseUrl}/${id}`)
	return request.then((response) => response.data)
}

export default { getPersons, addPerson, updatePersonNumber, deletePerson }