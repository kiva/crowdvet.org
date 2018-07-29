import React from "react";
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
  Filter,
  RadioButtonGroupInput,
  ReferenceManyField,
  SingleFieldList,
  SelectArrayInput,
  SelectField,
  ArrayField,
  ArrayInput,
  SimpleFormIterator,
  TabbedForm, FormTab, DateField
} from "react-admin";

import Radio from "./Radio";
import RadioEdit from "./RadioEdit";
import Choices from './Choices'

const required = (message = 'Required') =>
    value => value ? undefined : message;


export const KivaEvaluationsList = props => (
  <List {...props}>
    <Datagrid>
      <ReferenceField label="Users" source="idUser" reference="users">
        <TextField source="name" />
      </ReferenceField>

      <ReferenceField
        label="Enterprise"
        source="enterprise_id"
        reference="enterprises"
      >
        <TextField source="name" />
      </ReferenceField>

      <EditButton />
    </Datagrid>
  </List>
);

export const KivaEvaluationsCreate = props => {
  return (
    <Create title="Create" {...props}>
      <SimpleForm defaultValue={{status:"Pending"}}>

        <ReferenceInput
          label="Enterprise"
          source="enterprise_id"
          reference="enterprises"
          validate={required()}
        >
        <SelectInput optionText="name" />
        </ReferenceInput>

        <RadioButtonGroupInput source="status" choices={[
            { id: 'Pending', name: 'Pending' },
            { id: 'Approved', name: 'Approved' },
            { id: 'Declined', name: 'Declined' }
        ]} />

     <ReferenceManyField label="Evaluation" reference="questions" target="">
          <Datagrid>
            <TextField
              label="Question"
              source="text"
              style={{ "font-size": "16px" }}
            />
            <Radio />
          </Datagrid>
        </ReferenceManyField>
    </SimpleForm>
    </Create>
  );
};

export const KivaEvaluationsEdit = props => {
  return (
    <Edit title="Edit" {...props}>
      <SimpleForm {...props}>
        <DisabledInput source="id" />
        <ReferenceInput
          label="Enterprise"
          source="enterprise_id"
          reference="enterprises"
          validate={required()}
        >
          <SelectInput optionText="name" />
        </ReferenceInput>

        <RadioButtonGroupInput source="status" choices={[
            { id: 'Pending', name: 'Pending' },
            { id: 'Approved', name: 'Approved' },
            { id: 'Declined', name: 'Declined' }
        ]} />

       <Choices />

      </SimpleForm>
    </Edit>
  );
};
