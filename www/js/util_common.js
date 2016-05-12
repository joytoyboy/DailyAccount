/**
 * Created by joytoyboy on 2016/5/12.
 */

function  isUndefined(value) {
  return value === undefined;
}

// 重置表单，
function resetForm(form) {
  if (form){
    // reset dirty state
    form.$setPristine();
    // reset to clear validation
    form.$setValidity();
    form.$setUntouched();
  }
}
