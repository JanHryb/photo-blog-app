const input = document.querySelector(".form-page-input");
const oldInputValue = Number(input.value);

const forward = (formName) => {
  const form = document.getElementsByName(formName)[0];
  const inputValue = Number(input.value);
  if (inputValue == oldInputValue) {
    input.value = oldInputValue + 1;
  }
  form.submit();
};

const backward = (formName) => {
  const form = document.getElementsByName(formName)[0];
  const inputValue = Number(input.value);
  if (inputValue == oldInputValue) {
    input.value = oldInputValue - 1;
  }
  form.submit();
};
