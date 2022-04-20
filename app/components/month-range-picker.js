/* eslint-disable ember/avoid-leaking-state-in-ember-objects */
/* eslint-disable ember/no-classic-classes */
/* eslint-disable ember/require-tagless-components */
/* eslint-disable ember/no-actions-hash */
// eslint-disable-next-line ember/no-classic-components
import Component from '@ember/component';
import { computed } from '@ember/object';
import moment from 'moment';

export default Component.extend({
  monthYearLable: `${new Date().toLocaleString('default', {
    month: 'short',
  })} , ${new Date().getUTCFullYear()} - ${new Date().toLocaleString(
    'default',
    {
      month: 'short',
    }
  )} , ${new Date().getUTCFullYear()}`,
  startMonth: undefined,
  endMonth: undefined,
  startYear: undefined,
  endYear: undefined,
  currentYear: new Date().getUTCFullYear(),
  previousYear: new Date().getUTCFullYear() - 1,
  currentMonth: new Date().toLocaleString('default', { month: 'short' }),
  isDateSelected: computed.and('startMonth', 'endMonth'),
  calendar: [
    {
      year: computed('previousYear'),
      months: computed('months'),
    },
    {
      year: computed('currentYear'),
      months: computed('months'),
    },
  ],
  months: [
    'jan',
    'feb',
    'mar',
    'apr',
    'may',
    'jun',
    'july',
    'aug',
    'sept',
    'oct',
    'nov',
    'dec',
  ],

  actions: {
    onSelectHandler(month, year) {
      const monthDifference = moment(new Date(`${month} ${year}`)).diff(
        new Date(`${this.startMonth} ${this.startYear}`),
        'months',
        true
      );
      if (monthDifference >= 12 || monthDifference < 0) {
        this.set('endMonth', undefined);
        this.set('endYear', undefined);
        this.set('startMonth', undefined);
        this.set('startYear', undefined);
      }
      console.log(monthDifference);
      if (this.startMonth === undefined && this.startYear === undefined) {
        this.set('startMonth', month);
        this.set('startYear', year);
      } else if (
        ![
          this.startMonth,
          this.startYear,
          this.endMonth,
          this.endYear,
        ].includes(undefined)
      ) {
        this.set('endMonth', undefined);
        this.set('endYear', undefined);
        this.set('startMonth', month);
        this.set('startYear', year);
      } else {
        this.set('endMonth', month);
        this.set('endYear', year);
      }
    },
    previousYearSelection() {
      this.set('previousYear', this.previousYear - 1);
      this.set('currentYear', this.currentYear - 1);
    },
    nextYearSelection() {
      var latestYear = moment().format('YYYY');
      if (this.currentYear < latestYear) {
        this.set('previousYear', this.previousYear + 1);
        this.set('currentYear', this.currentYear + 1);
      }
    },
    monthCancelation(dropdown) {
      this.set('endMonth', undefined);
      this.set('endYear', undefined);
      this.set('startMonth', undefined);
      this.set('startYear', undefined);
      dropdown.actions.close();
    },
    applyMonthSelection(dropdown) {
      dropdown.actions.close();
      if (this.endMonth === undefined && this.endYear === undefined) {
        this.set('endMonth', this.startMonth);
        this.set('endYear', this.startYear);
      }
      let monthLable = `${this.startMonth} , ${this.startYear} - ${this.endMonth} , ${this.endYear}`;
      this.set('monthYearLable', monthLable);
      console.log(this.monthYearLable);
    },
  },
});
