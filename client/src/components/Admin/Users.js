import React from 'react';
import {
  List,
  Edit,
  Create,
  Datagrid,
  TextField,
  EditButton,
  LongTextInput,
  DisabledInput,
  SimpleForm,
  TextInput,
  SelectInput,
  ReferenceField,
  ReferenceInput
} from 'react-admin';

export const UsersList = props => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField label="name" source="name"/>
      <EditButton />
    </Datagrid>
  </List>
);
