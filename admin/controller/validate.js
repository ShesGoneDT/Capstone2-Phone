function kiemTraRong(value, idErr) {
  if (value.length == 0) {
    document.getElementById(idErr).innerHTML = "Không được để trống";
    return false;
  }
  document.getElementById(idErr).innerHTML = "";
  return true;
}

function kiemTraSo(value, idErr) {
  var regaxNumber = /^\d+$/;
  var isCheckNumber = regaxNumber.test(value);
  if (isCheckNumber) {
    document.getElementById(idErr).innerHTML = "";
    return true;
  }
  document.getElementById(idErr).innerHTML = "Trường này chỉ nhận số";
  return false;
}
