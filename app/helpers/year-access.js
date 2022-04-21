import { helper } from '@ember/component/helper';
import moment from 'moment';
export default helper(function yearAccess([year]) {
  var latestYear = moment().format('YYYY');
  console.log(`${year} ${latestYear}`);
  if (year.toString() === latestYear.toString()) {
    return 'hidden';
  }
});
