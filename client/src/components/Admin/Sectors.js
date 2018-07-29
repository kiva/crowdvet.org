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

export const SectorsList = props => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField label="name" source="name"/>
      <EditButton />
    </Datagrid>
  </List>
);

export const SectorsCreate = props => (
  <Create title="Create" {...props}>
    <SimpleForm>
    <TextInput source="name" />
    </SimpleForm>
  </Create>
);

export const SectorsEdit = props => (
  <Edit title="Edit" {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <TextInput source="name" />
    </SimpleForm>
  </Edit>
);
