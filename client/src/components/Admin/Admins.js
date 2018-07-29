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
      <EditButton />
    </Datagrid>
  </List>
);

export const AdminsCreate = props => (
  <Create title="Create" {...props}>
    <SimpleForm>
    <TextInput source="name" />
    </SimpleForm>
  </Create>
);

export const AdminsEdit = props => (
  <Edit title="Edit" {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <TextInput source="name" />
      <EmailField source="email" />
    </SimpleForm>
  </Edit>
);
