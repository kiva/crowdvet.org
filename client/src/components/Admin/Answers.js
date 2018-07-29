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
  SelectInput,
  ReferenceField,
  ReferenceInput
} from 'react-admin';

export const AnswersList = props => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <ReferenceField label="Question" source="question_id" reference="questions">
        <TextField source="text" />
      </ReferenceField>
      <TextField label="text" source="text"/>
      <EditButton />
    </Datagrid>
  </List>
);

export const AnswersCreate = props => (
  <Create title="Create" {...props}>
    <SimpleForm>
    <ReferenceInput label="Questions" source="question_id" reference="questions">
        <SelectInput optionText="text" />
    </ReferenceInput>
    <SelectInput
      source="score"
      choices={[
        { id: 1, name: '1' },
        { id: 2, name: '2' },
        { id: 3, name: '3' },
        { id: 4, name: '4' },
        { id: 5, name: '5' },
        { id: 6, name: '6' }
      ]}
    />
    <LongTextInput source="text" />
    </SimpleForm>
  </Create>
);

export const AnswersEdit = props => (
  <Edit title="Edit" {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <ReferenceInput label="Question" source="question_id" reference="questions">
        <SelectInput optionText="text" />
      </ReferenceInput>
      <SelectInput
        source="score"
        choices={[
          { id: 1, name: '1' },
          { id: 2, name: '2' },
          { id: 3, name: '3' },
          { id: 4, name: '4' },
          { id: 5, name: '5' },
          { id: 6, name: '6' }
        ]}
      />

      <LongTextInput source="text" />
    </SimpleForm>
  </Edit>
);
