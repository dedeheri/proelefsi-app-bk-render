function ValidationException(errors) {
  this.status = 400;
  this.message = "FORM.EXCEPTION";
  this.errors = errors;
}

export default ValidationException;
