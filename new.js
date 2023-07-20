/**
 * new方法实现
 */

function myNew() {
  const Constructor = [].shift.call(arguments);
  const obj = Object.create(null);

  Object.setPrototypeOf(obj, ConstructorFn.prototype);

  const res = Constructor.apply(obj, arguments);

  return res instanceof Object ? res : obj;
}