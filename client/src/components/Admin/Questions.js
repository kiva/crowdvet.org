import React from 'react';
import {
  List,
  Edit,
  Create,
  Datagrid,
  TextField,
  EditButton,
  LongTextInput,
  TextInput,
  DisabledInput,
  SimpleForm,
} from 'react-admin';

export const QuestionsList = props => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField label="Name" source="text"/>
      <EditButton />
    </Datagrid>
  </List>
);

export const QuestionsCreate = props => (
  <Create title="Create" {...props}>
    <SimpleForm>
    <TextInput source="name" />
    <LongTextInput source="text" />
    </SimpleForm>
  </Create>
);

export const QuestionsEdit = props => (
  <Edit title="Edit" {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <TextInput source="name" />
      <LongTextInput source="text" />
    </SimpleForm>
  </Edit>
);
