import Ember from 'ember';
import proposalsAsBlocks from 'pix-live/utils/proposals-as-blocks';

export default Ember.Component.extend({

  classNames: ['qrocm-proposal'],

  // Input
  proposals: null,
  answer:    null,

  // Action
  answerChanged: null,

  _parsedAnswerValue: Ember.computed('answer.value', function() {
    try {
      return jsyaml.load(this.get('answer.value'));
    } catch (e) {
      return undefined;
    }
  }),

  _blocks: Ember.computed('proposals', function() {
    return proposalsAsBlocks(this.get('proposals'));
  }),

  // TODO: use bound properties instead of inspecting the DOM
  getAnswerValueFromInputsState() {
    return jsyaml.safeDump(this.answersFromInputsState());
  },

  answersFromInputsState() {
    const result = {};
    $('.challenge-response__proposal-input').each(function(index, element) {
      result[$(element).attr('name')] = $(element).val();
    });
    return result;
  },

  actions: {
    inputChanged() {
      const answerValue = this.getAnswerValueFromInputsState();
      this.get('answerChanged')(answerValue);
    }
  }
});
