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
  ReferenceInput,
  EmailField
} from 'react-admin';

export const AdminsList = props => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField label="name" source="name"/>
      <TextField label="email" source="email"/>
      <EditButton />
    </Datagrid>
  </List>
);

export const AdminsCreate = props => (
  <Create title="Create" {...props}>
    <SimpleForm>
    <TextInput source="name" />
    <TextInput source="email" />
    <TextInput type="password" source="password" />
    </SimpleForm>
  </Create>
);

export const AdminsEdit = props => (
  <Edit title="Edit" {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <TextInput source="name" />
      <EmailField source="email" />
      <TextInput type="password" source="password" />
    </SimpleForm>
  </Edit>
);
