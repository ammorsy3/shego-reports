const PASSWORDS = {
  'Sara&acc@seet-marketing': 'admin',
  'shego123&sara@seet': 'shego',
  'ombadr&sara@seet': 'ombdr',
};

const CLIENT_PATHS = {
  shego: '/shego',
  ombdr: '/ombdr',
};

const STORAGE_KEY = 'seet_auth_role';

export function checkPassword(input) {
  return PASSWORDS[input] || null;
}

export function saveRole(role) {
  localStorage.setItem(STORAGE_KEY, role);
}

export function getStoredRole() {
  return localStorage.getItem(STORAGE_KEY);
}

export function clearRole() {
  localStorage.removeItem(STORAGE_KEY);
}

export function getClientPath(role) {
  return CLIENT_PATHS[role] || null;
}

export function isClientRole(role) {
  return role === 'shego' || role === 'ombdr';
}
