const validator = require('validator');

const Bookshelf = require('../../../infrastructure/bookshelf');
const encrypt = require('../../services/encryption-service');
const passwordValidator = require('../../../infrastructure/validators/password-validator');

const Assessment = require('./assessment');
const Organization = require('./organization');

validator.isPassword = passwordValidator;

module.exports = Bookshelf.Model.extend({
  tableName: 'users',

  initialize() {
    Bookshelf.Model.prototype.initialize.apply(this, arguments);
    this.on('creating', this.hashPassword, this);
  },

  validations: {
    firstName: [{
      method: 'isLength',
      error: 'Votre prénom n\'est pas renseigné.', args: { min: 1 }
    }],
    lastName: [{
      method: 'isLength',
      error: 'Votre nom n\'est pas renseigné.', args: { min: 1 }
    }],
    email: [{
      method: 'isEmail',
      error: 'Votre adresse electronique n\'est pas correcte.'
    }],
    password: [{
      method: 'isPassword',
      error: 'Votre mot de passe doit comporter au moins une lettre, un chiffre et 8 caractères.'
    }],
    cgu: [{
      method: 'isRequired',
      error: 'Le champ CGU doit être renseigné.'
    }, {
      method: 'isTrue',
      error: 'Vous devez accepter les conditions d\'utilisation de Pix pour créer un compte.'
    }]
  },

  hashPassword: (model) => {
    return encrypt
      .hashPassword(model.attributes.password)
      .then((hash) => {
        model.set('password', hash);
      });
  },

  assessments() {
    return this.hasMany(Assessment);
  },

  organizations() {
    return this.hasMany(Organization);
  }
});
