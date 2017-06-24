import { List, Record } from 'immutable';

const Recipe = Record({
  id: undefined,
  ingredients: new List(),
  thumbnail: undefined,
  title: undefined
});

export default Recipe;
