import loopObject from 'loopobject';
import { camelCase } from 'change-case';

export const fixKeys = function (obj) {
  var altObj = {};
  loopObject(obj, (v, i) => {
    altObj[camelCase(i)] = v;
  });
  return altObj;
};
