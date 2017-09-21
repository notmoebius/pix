import Ember from 'ember';
import ENV from 'pix-live/config/environment';

export default Ember.Component.extend({

  courses: null,
  selectedCourse: null,
  _isShowingModal: false,

  classNames: ['course-list'],

  isLoading: Ember.computed.readOnly('courses.isPending'),

  filteredCourses: Ember.computed('courses.[]', function() {
    const courses = this.get('courses');
    let filteredCourses = [];

    if (courses) {
      const limit = this.get('limit');
      filteredCourses = courses.toArray();
      if (limit) {
        filteredCourses = courses.slice(0, limit);
      }
    }
    return filteredCourses;
  }),

  didInsertElement() {
    if (ENV.APP.isMobileSimulationEnabled) {
      this.$().on('simulateMobileScreen', () => {
        this.set('isSimulatedMobileScreen', 'true');
      });
    }
  },

  _deviceIsMobile() {
    if (ENV.APP.isMobileSimulationEnabled) {
      return this.get('isSimulatedMobileScreen');
    }
    return $(window).width() < 767;
  },

  _userNotAlreadyWarnedAboutMobileIncompleteSupport() {
    return !localStorage.getItem('pix-mobile-warning');
  },

  _rememberThatUserIsNowAware() {
    localStorage.setItem('pix-mobile-warning', 'true');
  },

  _displayWarningModal() {
    this.set('_isShowingModal', true);
  },

  _doStartCourse() {
    this.sendAction('startCourse', this.get('selectedCourse'));
  },

  actions: {
    startCourse(course) {
      this.set('selectedCourse', course);
      if (this._deviceIsMobile() && this._userNotAlreadyWarnedAboutMobileIncompleteSupport()) {
        //this._rememberThatUserIsNowAware();
        this._displayWarningModal();
      } else {
        this._doStartCourse();
      }
    },

    createAssessment() {
      this._doStartCourse();
    }
  }

});
