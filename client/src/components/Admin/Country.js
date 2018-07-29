import React from 'react';
import {
  List,
  Edit,
  Create,
  Datagrid,
  TextField,
  EditButton,
  SimpleForm,
  DisabledInput,
  TextInput
} from 'react-admin';

export const CountriesList = props => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField label="name" source="name"/>
      <EditButton />
    </Datagrid>
  </List>
);

export const CountriesCreate = props => (
  <Create title="Create" {...props}>
    <SimpleForm>
    <TextInput source="name" />
    </SimpleForm>
  </Create>
);

export const CountriesEdit = props => (
  <Edit title="Edit" {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <TextInput source="name" />
    </SimpleForm>
  </Edit>
);
