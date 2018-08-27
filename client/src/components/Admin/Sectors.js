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


const validateUserCreation = (values) => {
    const errors = {};
    if (!values.image && !values.link) {
        errors.image = ['Must enter image name or image link.'];
        errors.link = ['Must enter image name or image link.'];
    }

    return errors
};

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
    <SimpleForm validate={validateUserCreation}>
    <TextInput source="name" validate={ required() } />
    <LongTextInput label="Image Name" source="image" />
    <LongTextInput label="Image Link" source="link" />
    </SimpleForm>
  </Create>
);

export const SectorsEdit = props => (
  <Edit title="Edit" {...props}>
    <SimpleForm validate={validateUserCreation}>
      <TextInput source="name" validate={ required() } />
      <LongTextInput label="Image Name" source="image" />
      <LongTextInput label="Image Link" source="link" />
    </SimpleForm>
  </Edit>
);
