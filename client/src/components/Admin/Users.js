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

const required = (message = 'Required') =>
    value => value ? undefined : message;


export const UsersList = props => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField label="name" source="name"/>
      <TextField label="email" source="email"/>
      <EditButton />
    </Datagrid>
  </List>
);

export const UsersEdit = props => (
  <Edit title="Edit" {...props}>
    <SimpleForm>
      <TextInput source="name" validate={ required() } />
      <TextInput label="email" source="email" validate={ required() } />
    </SimpleForm>
  </Edit>
);
