import axios from 'axios';
import { showNotification as showNotificationAction } from 'react-admin';
import { push } from 'react-router-redux';

export const importEnterprises = (ids) => {
  axios.post('/api/admin/enterprises', { ids })
  .then(res => {
    showNotificationAction('Applications imported');
    push('/applications');
  })
  .catch(err => {
    showNotificationAction(
      'An error ocurred while importing applicattions',
      'warning'
    );
  });
};
