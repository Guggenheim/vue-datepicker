<template>
  <div :class="[wrapperClass, isRtl ? 'rtl' : '']" class="vdp-datepicker">
    <DateInput
      :id="id"
      :autofocus="autofocus"
      :bootstrap-styling="bootstrapStyling"
      :calendar-button="calendarButton"
      :calendar-button-icon="calendarButtonIcon"
      :calendar-button-icon-content="calendarButtonIconContent"
      :clear-button="clearButton"
      :clear-button-icon="clearButtonIcon"
      :disabled="disabled"
      :format="format"
      :inline="inline"
      :is-open="isOpen"
      :input-class="inputClass"
      :maxlength="maxlength"
      :name="name"
      :parser="parser"
      :pattern="pattern"
      :placeholder="placeholder"
      :ref-name="refName"
      :required="required"
      :reset-typed-date="resetTypedDate"
      :selected-date="selectedDate"
      :show-calendar-on-button-click="showCalendarOnButtonClick"
      :show-calendar-on-focus="showCalendarOnFocus"
      :tabindex="tabindex"
      :translation="translation"
      :typeable="typeable"
      :use-utc="useUtc"
      @blur="onBlur"
      @clear-date="clearDate"
      @close-calendar="close"
      @focus="onFocus"
      @show-calendar="showCalendar"
      @typed-date="setTypedDate"
    >
      <slot slot="beforeDateInput" name="beforeDateInput" />
      <slot slot="afterDateInput" name="afterDateInput" />
      <slot slot="clearBtn" name="clearBtn" />
      <slot slot="calendarBtn" name="calendarBtn" />
    </DateInput>

    <Popup
      ref="popup"
      :append-to-body="appendToBody"
      :fixed-position="fixedPosition"
      :inline="inline"
      :rtl="isRtl"
      :visible="isOpen"
    >
      <div
        v-if="isOpen"
        ref="datepicker"
        :class="pickerClasses"
        @mousedown.prevent
      >
        <template v-if="isOpen">
          <slot name="beforeCalendarHeader" />
          <Component
            :is="currentPicker"
            :allowed-to-show-view="allowedToShowView"
            :day-cell-content="dayCellContent"
            :disabled-dates="disabledDates"
            :first-day-of-week="firstDayOfWeek"
            :highlighted="highlighted"
            :is-rtl="isRtl"
            :page-date="pageDate"
            :page-timestamp="pageTimestamp"
            :selected-date="selectedDate"
            :show-edge-dates="showEdgeDates"
            :show-full-month-name="fullMonthName"
            :show-header="showHeader"
            :translation="translation"
            :use-utc="useUtc"
            :year-range="yearPickerRange"
            @select-date="selectDate"
            @changed-month="handleChangedMonthFromDayPicker"
            @selected-disabled="selectDisabledDate"
            @select-month="selectMonth"
            @changed-year="setPageDate"
            @show-month-calendar="showSpecificCalendar('Month')"
            @select-year="selectYear"
            @changed-decade="setPageDate"
            @show-year-calendar="showSpecificCalendar('Year')"
          >
            <template v-for="slotKey of calendarSlots">
              <slot :slot="slotKey" :name="slotKey" />
            </template>
          </Component>
          <slot name="calendarFooter" />
        </template>
      </div>
    </Popup>
  </div>
</template>
<script>
import en from '~/locale/translations/en'
import makeDateUtils from '~/utils/DateUtils'
import calendarSlots from '~/utils/calendarSlots'
import DateInput from '~/components/DateInput.vue'
import inputProps from '~/mixins/inputProps.vue'
import PickerDay from '~/components/PickerDay.vue'
import PickerMonth from '~/components/PickerMonth.vue'
import PickerYear from '~/components/PickerYear.vue'
import Popup from '~/components/Popup.vue'
import DisabledDate from '~/utils/DisabledDate'

const validDate = (val) =>
  val === null ||
  val instanceof Date ||
  typeof val === 'string' ||
  typeof val === 'number'

export default {
  name: 'Datepicker',
  components: {
    DateInput,
    PickerDay,
    PickerMonth,
    PickerYear,
    Popup,
  },
  mixins: [inputProps],
  props: {
    appendToBody: {
      type: Boolean,
      default: false,
    },
    calendarClass: {
      type: [String, Object, Array],
      default: '',
    },
    dayCellContent: {
      type: Function,
      default: (day) => day.date,
    },
    disabledDates: {
      type: Object,
      default() {
        return {}
      },
    },
    firstDayOfWeek: {
      type: String,
      default: 'sun',
    },
    fixedPosition: {
      type: String,
      default: '',
      validator: (val) => {
        const possibleValues = [
          '',
          'bottom',
          'bottom-left',
          'bottom-right',
          'top',
          'top-left',
          'top-right',
        ]
        return possibleValues.includes(val)
      },
    },
    fullMonthName: {
      type: Boolean,
      default: false,
    },
    highlighted: {
      type: Object,
      default() {
        return {}
      },
    },
    initialView: {
      type: String,
      default: '',
    },
    language: {
      type: Object,
      default: () => en,
    },
    maximumView: {
      type: String,
      default: 'year',
    },
    minimumView: {
      type: String,
      default: 'day',
    },
    showEdgeDates: {
      type: Boolean,
      default: true,
    },
    showHeader: {
      type: Boolean,
      default: true,
    },
    value: {
      type: [String, Date, Number],
      default: '',
      validator: validDate,
    },
    wrapperClass: {
      type: [String, Object, Array],
      default: '',
    },
    yearPickerRange: {
      type: Number,
      default: 10,
    },
  },
  data() {
    // const startDate = this.openDate ? new Date(this.openDate) : new Date()
    const constructedDateUtils = makeDateUtils(this.useUtc)
    let startDate
    if (this.openDate) {
      startDate = constructedDateUtils.getNewDateObject(this.openDate)
    } else {
      startDate = constructedDateUtils.getNewDateObject()
    }
    const pageTimestamp = constructedDateUtils.setDate(startDate, 1)
    return {
      /*
       * Positioning
       */
      calendarHeight: 0,
      calendarSlots,
      currentPicker: '',
      /*
       * Vue cannot observe changes to a Date Object so date must be stored as a timestamp
       * This represents the first day of the current viewing month
       * {Number}
       */
      pageTimestamp,
      resetTypedDate: constructedDateUtils.getNewDateObject(),
      /*
       * Selected Date
       * {Date}
       */
      selectedDate: null,
      utils: constructedDateUtils,
    }
  },
  computed: {
    computedInitialView() {
      return this.initialView ? this.initialView : this.minimumView
    },
    isInline() {
      return !!this.inline
    },
    isOpen() {
      return this.currentPicker !== ''
    },
    isRtl() {
      return this.translation.rtl === true
    },
    pageDate() {
      return new Date(this.pageTimestamp)
    },
    pickerClasses() {
      return [
        this.calendarClass,
        'vdp-datepicker__calendar',
        this.isInline && 'inline',
        this.isRtl && this.appendToBody && 'rtl',
      ]
    },
    translation() {
      return this.language
    },
    disabledDatesClass() {
      return new DisabledDate(this.utils, this.disabledDates)
    },
  },
  watch: {
    initialView() {
      this.setInitialView()
    },
    openDate() {
      this.setPageDate()
    },
    value(value) {
      const parsedValue = this.parseValue(value)
      this.setValue(parsedValue)
    },
  },
  mounted() {
    this.init()
  },
  methods: {
    /**
     * Are we allowed to show a specific picker view?
     * @param {String} view
     * @return {Boolean}
     */
    allowedToShowView(view) {
      const views = ['day', 'month', 'year']
      const minimumViewIndex = views.indexOf(this.minimumView)
      const maximumViewIndex = views.indexOf(this.maximumView)
      const viewIndex = views.indexOf(view)

      return viewIndex >= minimumViewIndex && viewIndex <= maximumViewIndex
    },
    /**
     * Clear the selected date
     */
    clearDate() {
      this.selectedDate = null
      this.setPageDate()
      this.$emit('selected', null)
      this.$emit('input', null)
      this.$emit('cleared')
    },
    /**
     * Close the calendar views
     */
    close() {
      if (!this.isInline) {
        this.currentPicker = ''
        this.$emit('closed')
      }
    },
    /**
     * Handles a month change from the day picker
     */
    handleChangedMonthFromDayPicker(date) {
      this.setPageDate(date)
      this.$emit('changed-month', date)
    },
    /**
     * Initiate the component
     */
    init() {
      if (this.value) {
        let parsedValue = this.parseValue(this.value)
        const isDateDisabled =
          parsedValue && this.disabledDatesClass.isDateDisabled(parsedValue)
        if (isDateDisabled) {
          parsedValue = null
          this.$emit('input', parsedValue)
        }
        this.setValue(parsedValue)
      }
      if (this.isInline) {
        this.setInitialView()
      }
    },
    /**
     * Emits a 'blur' event
     */
    onBlur() {
      this.$emit('blur')
    },
    /**
     * Emits a 'focus' event
     */
    onFocus() {
      this.$emit('focus')
    },
    /**
     * Called in the event that the user navigates to date pages and
     * closes the picker without selecting a date.
     */
    resetDefaultPageDate() {
      if (this.selectedDate === null) {
        this.setPageDate()
        return
      }
      this.setPageDate(this.selectedDate)
    },
    /**
     * Set the selected date
     * @param {Number} timestamp
     */
    setDate(timestamp) {
      const date = new Date(timestamp)
      this.selectedDate = date
      this.setPageDate(date)
      this.$emit('selected', date)
      this.$emit('input', date)
    },
    /**
     * Sets the initial picker page view: day, month or year
     */
    setInitialView() {
      const initialView = this.computedInitialView
      if (!this.allowedToShowView(initialView)) {
        throw new Error(
          `initialView '${this.initialView}' cannot be rendered based on minimum '${this.minimumView}' and maximum '${this.maximumView}'`,
        )
      }
      switch (initialView) {
        case 'year':
          this.showSpecificCalendar('Year')
          break
        case 'month':
          this.showSpecificCalendar('Month')
          break
        default:
          this.showSpecificCalendar('Day')
          break
      }
    },
    /**
     * Sets the date that the calendar should open on
     */
    setPageDate(date) {
      let dateTemp = date
      if (!dateTemp) {
        if (this.openDate) {
          dateTemp = new Date(this.openDate)
        } else {
          dateTemp = new Date()
        }
        dateTemp = this.utils.resetDateTime(dateTemp)
      }
      this.pageTimestamp = this.utils.setDate(new Date(dateTemp), 1)
    },
    /**
     * Set the date from a typedDate event
     */
    setTypedDate(date) {
      this.setDate(date.valueOf())
    },
    /**
     * Set the datepicker value
     * @param {Date|String|Number|null} date
     */
    setValue(date) {
      if (!date) {
        this.setPageDate()
        this.selectedDate = null
        return
      }
      this.selectedDate = date
      this.setPageDate(date)
    },
    /**
     * parse a datepicker value from string/number to date
     * @param {Date|String|Number|null} date
     */
    parseValue(date) {
      let dateTemp = date
      if (typeof dateTemp === 'string' || typeof dateTemp === 'number') {
        const parsed = new Date(dateTemp)
        dateTemp = Number.isNaN(parsed.valueOf()) ? null : parsed
      }
      return dateTemp
    },
    /**
     * @param {Object} date
     */
    selectDate(date) {
      this.resetTypedDate = this.utils.getNewDateObject()
      this.close()
      this.setDate(date.timestamp)
    },
    /**
     * @param {Object} date
     */
    selectDisabledDate(date) {
      this.$emit('selected-disabled', date)
    },
    /**
     * @param {Object} month
     */
    selectMonth(month) {
      const date = new Date(month.timestamp)
      if (this.allowedToShowView('day')) {
        this.setPageDate(date)
        this.$emit('changed-month', month)
        this.showSpecificCalendar('Day')
      } else {
        this.selectDate(month)
      }
    },
    /**
     * @param {Object} year
     */
    selectYear(year) {
      const date = new Date(year.timestamp)
      if (this.allowedToShowView('month')) {
        this.setPageDate(date)
        this.$emit('changed-year', year)
        this.showSpecificCalendar('Month')
      } else {
        this.selectDate(year)
      }
    },
    /**
     * Shows the calendar at the relevant view: 'day', 'month', or 'year'
     */
    showCalendar() {
      if (this.disabled || this.isInline) {
        return
      }
      this.setInitialView()
      this.$emit('opened')
    },
    /**
     * Show a specific picker
     */
    showSpecificCalendar(type) {
      if (this.allowedToShowView(type.toLowerCase())) {
        this.currentPicker = `Picker${type}`
      }
    },
  },
}
</script>

<style lang="scss">
@import '../styles/style.scss';
</style>
