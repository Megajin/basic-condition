/***************
 * Tab Actions *
 ***************/

const TAB_CHANGE = 'TAB_CHANGE';

/**
 * Depending on value the given Tab will be shown in component
 * keep in mind to pass the right id, where id is the Component name eg. Dashboard.
 * @type {Action}
 */
export const changeTab = (id, value) => {
  return {
    type: TAB_CHANGE,
    id,
    value
  };
};
