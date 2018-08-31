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

export const CommentsList = props => (
  <List {...props}>
    <Datagrid>
      <TextField label="Comment" source="text"/>
      <ReferenceField label="User" source="user_id" reference="users" validate={required()}>
        <TextField source="name"  />
      </ReferenceField>

      <EditButton />
    </Datagrid>
  </List>
);


export const CommentsEdit = props => (
  <Edit title="Edit" {...props}>
    <SimpleForm validate={validateUserCreation}>
      <TextInput source="text" validate={ required() } />
      <ReferenceInput label="User" source="user_id" reference="users" validate={required()}>
        <SelectInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);
