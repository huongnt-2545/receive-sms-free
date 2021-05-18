import appSettings from '../config/appSettings';

const objectId = (value: string, helpers: any) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

const password = (value: string, helpers: any) => {
  if (value.length < appSettings.passwordMinLength) {
    return helpers.message(`Password must be at least ${appSettings.passwordMinLength} characters`);
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message('Password must contain at least 1 letter and 1 number');
  }
  return value;
};

export {
  objectId,
  password,
};
