import Ember from 'ember';
import RSVP from 'rsvp';
import getChallengeType from '../../utils/get-challenge-type';
import BaseRoute from 'pix-live/routes/base-route';

export default BaseRoute.extend({

  assessmentService: Ember.inject.service('assessment'),

  model(params) {
    const store = this.get('store');

    const promises = {
      course: store.findRecord('course', params.course_id),
      challenge: store.findRecord('challenge', params.challenge_id)
    };

    return RSVP.hash(promises).then(function(results) {

      const challenge = results.challenge;
      const course = RSVP.resolve(results.course);

      const assessment = Ember.Object.create({
        id: 'fake',
        course
      });

      return {
        challenge,
        assessment
      };
    });
  },

  setupController(controller, model) {
    this._super(controller, model);
    const challengeType =  getChallengeType(model.challenge.get('type'));
    controller.set('challengeItemType', 'challenge-item-' + challengeType);

  },

  serialize(model) {
    return model.assessment.get('course').then((course) => {
      return {
        course_id: course.id,
        challenge_id: model.challenge.id
      };
    });
  },

  actions: {

    navigate(challenge, assessment) {
      this.get('assessmentService').getNextChallenge(challenge, assessment).then((nextChallenge) => {
        this.transitionToRoute('courses.get-challenge-preview', { challenge: nextChallenge, assessment });
      });
    }
  }
});
