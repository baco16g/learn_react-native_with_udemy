import axios from 'axios'
import qs from 'qs'
import * as config from '../../config.json'

const buildJobsUrl = (region: Region) => {
  const { latitude, longitude } = region
  const query = qs.stringify({
    lat: latitude,
    long: longitude
  })
  return `${config.github.root_url}${query}`
}

export const fetchJobs = async (region: Region) => {
  const url = buildJobsUrl(region)
  const data = await axios
    .get<Job[]>(url)
    .then(res => {
      return res.data
    })
    .catch(err => window.console.error(err))
  return data
}
