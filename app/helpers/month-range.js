import { helper } from '@ember/component/helper';
import moment from 'moment';

export default helper(
  function monthChecker([
    month,
    year,
    startMonth,
    endMonth,
    startYear,
    endYear,
  ]) {
    var classes = '';
    var today = new Date();
    if (new Date(`${month} ${year}`) > today) {
      classes += 'future-months';
    }
    if (
      `${month} ${year}`.toUpperCase() ===
      moment(new Date()).format('MMM YYYY').toUpperCase()
    ) {
      classes += ' current-month';
    }
    if (
      moment(new Date(`${startMonth} ${startYear}`)).diff(
        moment(new Date(`${month} ${year}`)),
        'months',
        true
      ) === 0 ||
      moment(new Date(`${endMonth} ${endYear}`)).diff(
        moment(new Date(`${month} ${year}`)),
        'months',
        true
      ) === 0
    ) {
      classes += ' selected-month';
    }
    if (![startMonth, endMonth, startYear, endYear].includes(undefined)) {
      classes += '';
      if (
        new Date(`${startMonth} ${startYear}`) < new Date(`${month} ${year}`) &&
        new Date(`${endMonth} ${endYear}`) > new Date(`${month} ${year}`)
      ) {
        classes += ' inbetween-month';
      }
    }
    return classes;
  }
  // function yearchecker(year) {
  //   console.log('fdhfjdh');
  //   console.log(year);
  //   var latestYear = moment().format('YYYY');
  //   if (year === latestYear) {
  //     return 'hidden';
  //   }
  // }
);
