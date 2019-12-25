const bcryptjs = require('bcryptjs');
const {Schema, model, models} = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    validate: [
      {
        validator: function(email) {
          return new Promise((resolve, reject) => {
            models.User.findOne({email})
              .then(user => {
                if (user) resolve(false);
                resolve(true);
              })
              .catch(reject);
          });
        },
        msg: 'Email already registered',
      },
      {
        validator: function(email) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
            email.toLowerCase(),
          );
        },
        msg: 'Invalid email format',
      },
    ],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password length min 6 characters'],
  },
});

userSchema.post('validate', function(user) {
  user.password = bcryptjs.hashSync(user.password, bcryptjs.genSaltSync(10));
});

const User = model('User', userSchema);

module.exports = User;
