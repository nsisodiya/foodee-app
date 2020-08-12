export const actions = {};

window.actions = actions;

export const setActions = function (storeName, storeActions) {
  actions[storeName] = storeActions;
};
