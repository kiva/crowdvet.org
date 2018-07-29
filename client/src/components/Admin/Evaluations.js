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
  SimpleFormIterator
} from "react-admin";

import Radio from "./Radio";

const EvaluationFilter = props => (
  <Filter {...props}>
    <TextInput label="Official Votes" source="type" defaultValue="official" />
  </Filter>
);

export const EvaluationsList = props => (
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

export const EvaluationsCreate = props => {
  return (
    <Create title="Create" {...props}>
      <SimpleForm>
        <ReferenceInput
          label="Enterprise"
          source="enterprise_id"
          reference="enterprises"
        >
          <SelectInput optionText="name" />
        </ReferenceInput>

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

export const EvaluationsEdit = props => (
  <Edit title="Edit" {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <ReferenceInput
        label="Enterprise"
        source="enterprise_id"
        reference="enterprises"
      >
        <SelectInput optionText="text" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);
