const loginTab = document.getElementById('loginTab');
const registerTab = document.getElementById('registerTab');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

// Switchable Forms
loginTab.onclick = () => {
  loginTab.classList.add('active');
  registerTab.classList.remove('active');
  loginForm.classList.add('active-form');
  registerForm.classList.remove('active-form');
};
registerTab.onclick = () => {
  registerTab.classList.add('active');
  loginTab.classList.remove('active');
  registerForm.classList.add('active-form');
  loginForm.classList.remove('active-form');
};

// Password Reveal/Hide
document.querySelectorAll('.eye').forEach(btn=>{
  btn.onclick = ()=>{
    const input = document.getElementById(btn.dataset.target);
    input.type = input.type === 'password' ? 'text' : 'password';
    btn.textContent = input.type === 'password' ? '👁' : '🙈';
  };
});

// Validation Helpers
const isEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
function showError(inputId, errorId, msg){
  document.getElementById(inputId).classList.add('invalid');
  document.getElementById(errorId).textContent = msg;
}
function clearError(inputId, errorId){
  document.getElementById(inputId).classList.remove('invalid');
  document.getElementById(errorId).textContent = '';
}

// Real-time Validation
loginEmail.addEventListener('input', ()=>{
  isEmail(loginEmail.value) ? clearError('loginEmail','loginEmailError') : showError('loginEmail','loginEmailError','Invalid email format');
});
regEmail.addEventListener('input', ()=>{
  isEmail(regEmail.value) ? clearError('regEmail','regEmailError') : showError('regEmail','regEmailError','Invalid email format');
});
regPassword.addEventListener('input', ()=>{
  regPassword.value.length >= 8 ? clearError('regPassword','regPasswordError') : showError('regPassword','regPasswordError','Password must be at least 8 characters');
  if(confirmPassword.value) validateConfirm();
});
function validateConfirm(){
  confirmPassword.value === regPassword.value ? clearError('confirmPassword','confirmPasswordError') : showError('confirmPassword','confirmPasswordError','Passwords do not match');
}
confirmPassword.addEventListener('input', validateConfirm);

// Submit
loginForm.onsubmit = e=>{
  e.preventDefault();
  if(!isEmail(loginEmail.value)) return showError('loginEmail','loginEmailError','Invalid email format');
  if(loginPassword.value.length < 8) return showError('loginPassword','loginPasswordError','Password must be at least 8 characters');
  alert('Login Successful!');
};
registerForm.onsubmit = e=>{
  e.preventDefault();
  if(!isEmail(regEmail.value)) return showError('regEmail','regEmailError','Invalid email format');
  if(regPassword.value.length < 8) return showError('regPassword','regPasswordError','Password must be at least 8 characters');
  if(regPassword.value !== confirmPassword.value) return showError('confirmPassword','confirmPasswordError','Passwords do not match');
  alert('Registration Successful!');
};
