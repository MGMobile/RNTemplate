import dayjs from 'dayjs';

export const checkIfInputIsEmpty = input => {
  if (
    input.length === 0 ||
    input.length === 'undefined' ||
    !Object.keys(input).length ||
    input === 'null'
  ) {
    return 'Ce champ est obligatoire.';
  } else {
    return false;
  }
};

export const checkDate = (date, age = false) => {
  if ((date === undefined || date === '' || date === 'undefined') && !age) {
    return 'Ce champ est obligatoire.';
  } else if (dayjs().diff(dayjs(date), 'year' && age) <= 1) {
    console.log('dayjs().diff(dayjs(date)', date);
    return 'Date invalide.';
  } else {
    return false;
  }
};

export const checkEmail = email => {
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const regexEmoji = /^[\u0000-\u007F]*$/;

  if (regex.test(email) && regexEmoji.test(email)) {
    return false;
  } else {
    return 'Adresse email invalide';
  }
};

export const checkPassword = password => {
  const MATCH_NO_WHITESPACE = /^\S+$/;
  const MATCH_NO_EMOJIS = /^[\u0000-\u007F]*$/;
  if (
    password.length < 8 &&
    password.match(MATCH_NO_WHITESPACE) &&
    password.match(MATCH_NO_EMOJIS)
  ) {
    return 'Le mot de passe doit contenir au moins 8 caractères';
  } else {
    return false;
  }
};
