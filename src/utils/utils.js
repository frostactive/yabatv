import moment from 'moment'
export const getHumanReadableDate = date => {
  return moment(date).format('DD MMM, YYYY')
}
