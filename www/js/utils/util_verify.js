/**
 * 验证金额是否正确。
 */
function verifyMoney(scope, element, attr, ngModel) {
  scope.moneyPrompt = "金额必须大于等于0，且最多两位小数";
  if (ngModel) {
    // 前面1-9位数，小数点后最多两位
    var regex = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/;
  }
  var validator = function (value) {
    var validity = ngModel.$isEmpty(value) || regex.test(value);
    ngModel.$setValidity("checkMoney", validity);
    return validity ? value : undefined;
  };
  ngModel.$formatters.push(validator);
  ngModel.$parsers.push(validator);
}

/**
 * 验证密码是否正确
 */
function verifyPassword(scope, element, attr, ngModel) {
  scope.passwordPrompt = "密码只能为字母和数组的组合";
  if (ngModel) {
    // 只允许字母和数字。
    var pwdRegex = /^[A-Za-z0-9]+$/i;
  }
  var pwdValidator = function (value) {
    var validity = ngModel.$isEmpty(value) || pwdRegex.test(value);
    ngModel.$setValidity("checkPwd", validity);
    return validity ? value : undefined;
  };
  ngModel.$formatters.push(pwdValidator);
  ngModel.$parsers.push(pwdValidator);
}

/**
 * 验证两次输入的密码是否一致
 */
function verifyPasswordMatch(scope, element, attr, ngModel) {
  var pwdValidator = function (value) {
    var otherInput = element.inheritedData("$formController")[attr.checkPwdMatch];
    var validity = !ngModel.$isEmpty(value) && value == otherInput.$viewValue;
    console.log(otherInput.$viewValue + value + validity);
    ngModel.$setValidity("checkPwdMatch", validity);
    return validity ? value : undefined;
  };
  ngModel.$formatters.push(pwdValidator);
  ngModel.$parsers.push(pwdValidator);
}
