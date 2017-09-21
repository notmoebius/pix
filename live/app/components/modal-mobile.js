import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ['modal-mobile'],

  // actions
  onContinue: null,

  actions: {
    startCourse() {
      this.get('onContinue')();
    },

    closeModal() {
      this.set('open', false);
    }
  }
});
