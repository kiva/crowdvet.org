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

export const RecomendationsList = props => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField label="Title" source="title"/>
      <EditButton />
    </Datagrid>
  </List>
);

export const RecomendationsCreate = props => (
  <Create title="Create" {...props}>
    <SimpleForm>
    <LongTextInput label="Title" source="title" />
    <LongTextInput label="Author" source="author" />
    <LongTextInput label="Short Description" source="description" />
    <LongTextInput label="Link" source="link" />
    <TextInput label="Order" source="order" />
    </SimpleForm>
  </Create>
);

export const RecomendationsEdit = props => (
  <Edit title="Edit" {...props}>
    <SimpleForm>
      <LongTextInput source="title" />
      <LongTextInput label="Author" source="author" />
      <LongTextInput label="Short Description" source="description" />
      <LongTextInput label="Link" source="link" />
      <TextInput label="Order" source="order" />
    </SimpleForm>
  </Edit>
);
