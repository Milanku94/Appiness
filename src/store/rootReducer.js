import { combineReducers } from 'redux';

import { ExpenseReducer } from '../views/expense';
import { SettingsReducer } from '../views/settings';

const rootReducer = combineReducers({
  ExpenseReducer,
  SettingsReducer
});

export default rootReducer;

