import React from 'react';
import { List, Edit, Datagrid, TextField } from 'react-admin';
import { ApplicationsBulkActions } from './ApplicationsBulkActions';

export const ApplicationsList = props => (
  <List {...props} bulkActions={<ApplicationsBulkActions />}>
    <Datagrid>
      <TextField source="id" />
      <TextField label="Name" source="answers[185].answer" />
    </Datagrid>
  </List>
);
