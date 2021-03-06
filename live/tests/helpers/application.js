import Ember from 'ember';
import Application from '../../app';
import config from '../../config/environment';

export function startApp(attrs) {
  let attributes = Ember.merge({}, config.APP);
  attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;

  return Ember.run(() => {
    const application = Application.create(attributes);
    application.setupForTesting();
    application.injectTestHelpers();
    return application;
  });
}

export function destroyApp(application) {
  Ember.run(application, 'destroy');
  if (window.server) {
    window.server.shutdown();
  }
  // Sanity check
  _assertModalIsClosed();
}

function _assertModalIsClosed() {
  if (document.body.classList.contains('routable-modal--open')) {
    throw new Error(
      'The body element still has a `routable-modal--open` class, although the app just has been destroyed. ' +
      'This probably means that an acceptance test finished while a modal window was still open. ' +
      'It will cause subtle issues, like the scroll of the test runner window being blocked. ' +
      'To fix this assertion, please close the modal window manually before the test finishes. '
    );
  }
}
