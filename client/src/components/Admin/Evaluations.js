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

const required = (message = 'This field is Required') =>
    value => value ? undefined : message;

const EvaluationFilter = props => (
  <Filter {...props}>
    <TextInput label="Official Votes" source="type" defaultValue="official" />
  </Filter>
);

export const EvaluationsList = props => (
  <List {...props}>
    <Datagrid>
      <ReferenceField label="Users" source="user_id" reference="users">
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

      <ReferenceInput validate={required()}
        label="User"
        source="user_id"
        reference="users"
      >
        <SelectInput optionText="name"  />
      </ReferenceInput>

        <ReferenceInput validate={required()}
          label="Enterprise"
          source="enterprise_id"
          reference="enterprises"
        >
          <SelectInput optionText="name"  />
        </ReferenceInput>


        <RadioButtonGroupInput validate={required()}  fullWidth source="impact" choices={[
            { id: '1', name: 'This indicates any social enterprise you feel has negative social impact, or takes advantage of people - either the people it claims to serve, or other parties.' },
            { id: '2', name: 'This company has no discernable social impact at all. Most for-profit companies fall into this category rating.' },
            { id: '3', name: 'This company has one or more of the following: - Questionable social impact; - Social impact based on donations; - Possible social impact that is not integral to the business model.' }
        ]} />

        <RadioButtonGroupInput validate={required()} fullWidth source="model" choices={[
            { id: '1', name: 'This business is not making money. It is dependant on donations and grants.​' },
            { id: '2', name: 'This business has some income, but is mostly dependent on grants and donations, somewhere around a 20:80 ratio.' },
            { id: '3', name: 'This company has raised cash capital, but has minimal sales, or questionably low sales volume considering its current lifespan.' }
        ]} />
      </SimpleForm>
    </Create>
  );
};

export const EvaluationsEdit = props => (
  <Edit title="Edit" {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <ReferenceInput validate={required()}
        label="User"
        source="user_id"
        reference="users"
      >
        <SelectInput optionText="name"  />
      </ReferenceInput>

      <ReferenceInput
        label="Enterprise"
        source="enterprise_id"
        reference="enterprises"
      >
        <SelectInput optionText="name" />
      </ReferenceInput>

      <RadioButtonGroupInput fullWidth source="impact" choices={[
          { id: '1', name: 'This indicates any social enterprise you feel has negative social impact, or takes advantage of people - either the people it claims to serve, or other parties.' },
          { id: '2', name: 'This company has no discernable social impact at all. Most for-profit companies fall into this category rating.' },
          { id: '3', name: 'This company has one or more of the following: - Questionable social impact; - Social impact based on donations; - Possible social impact that is not integral to the business model.' }
      ]} />

      <RadioButtonGroupInput fullWidth source="model" choices={[
          { id: '1', name: 'This business is not making money. It is dependant on donations and grants.​' },
          { id: '2', name: 'This business has some income, but is mostly dependent on grants and donations, somewhere around a 20:80 ratio.' },
          { id: '3', name: 'This company has raised cash capital, but has minimal sales, or questionably low sales volume considering its current lifespan.' }
      ]} />

      <RadioButtonGroupInput fullWidth source="Prioritization" choices={[
          { id: '1', name: 'This business is not making money. It is dependant on donations and grants.​' },
          { id: '2', name: 'This business has some income, but is mostly dependent on grants and donations, somewhere around a 20:80 ratio.' },
          { id: '3', name: 'This company has raised cash capital, but has minimal sales, or questionably low sales volume considering its current lifespan.' }
      ]} />
    </SimpleForm>
  </Edit>
);
