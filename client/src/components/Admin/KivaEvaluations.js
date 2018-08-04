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
import Choices from './Choices'

const required = (message = 'Required') =>
    value => value ? undefined : message;


export const KivaEvaluationsList = props => (
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

        <RadioButtonGroupInput fullWidth validate={required()} source="impact" choices={[
            { id: '1', name: 'This indicates any social enterprise you feel has negative social impact, or takes advantage of people - either the people it claims to serve, or other parties.' },
            { id: '2', name: 'This company has no discernable social impact at all. Most for-profit companies fall into this category rating.' },
            { id: '3', name: 'This company has one or more of the following: - Questionable social impact; - Social impact based on donations; - Possible social impact that is not integral to the business model.' },
            { id: '4', name: 'The social impact model of this company makes sense, but it is not currently being measured clearly and methodically.' },
            { id: '5', name: 'The social impact model of this company makes sense, and is being measured clearly and methodically.' },
            { id: '6', name: 'The social impact of this company has been documented and tested with a study or similarly rigorous measure, with demonstrated proof. Or, the company is following an established social impact model which has been tested and demonstrated by research.' }
        ]} />

        <RadioButtonGroupInput fullWidth validate={required()} source="model" choices={[
            { id: '1', name: 'This business is not making money. It is dependant on donations and grants.​' },
            { id: '2', name: 'This business has some income, but is mostly dependent on grants and donations, somewhere around a 20:80 ratio.' },
            { id: '3', name: 'This company has raised cash capital, but has minimal sales, or questionably low sales volume considering its current lifespan.' },
            { id: '4', name: 'This company is on the road to profitability - the business model has clear potential, it seems the only barrier is a current lack of working capital.' },
            { id: '5', name: 'This business does not display robust profits, as it is reinvestmenting its profit into growth of the company.' },
            { id: '6', name: 'This company is already healthily profitable and sustainable, and has the ability to scale.​' }
        ]} />

        <RadioButtonGroupInput fullWidth validate={required()} source="prioritization" choices={[
            { id: '1', name: 'I really wouldn’t recommend moving forward with this enterprise.' },
            { id: '2', name: 'I don’t like it. It might be profitable, but social impact is questionable; It might have great social impact, but business model has significant holes. I don’t think this is for Kiva.' },
            { id: '3', name: 'I’m not sold on this. This isn’t a clear ‘yes’ for Kiva.' },
            { id: '4', name: 'This sounds suitable for Kiva. I would recommend considering this.' },
            { id: '5', name: 'This sounds mostly great. Only a few minor concerns with business model/social enterprise/other.' },
            { id: '6', name: 'This is a definite yes. If everything checks out, let’s send this to crowdfunding right now.' }
        ]} />


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

        <RadioButtonGroupInput fullWidth validate={required()} source="impact" choices={[
            { id: '1', name: 'This indicates any social enterprise you feel has negative social impact, or takes advantage of people - either the people it claims to serve, or other parties.' },
            { id: '2', name: 'This company has no discernable social impact at all. Most for-profit companies fall into this category rating.' },
            { id: '3', name: 'This company has one or more of the following: - Questionable social impact; - Social impact based on donations; - Possible social impact that is not integral to the business model.' },
            { id: '4', name: 'The social impact model of this company makes sense, but it is not currently being measured clearly and methodically.' },
            { id: '5', name: 'The social impact model of this company makes sense, and is being measured clearly and methodically.' },
            { id: '6', name: 'The social impact of this company has been documented and tested with a study or similarly rigorous measure, with demonstrated proof. Or, the company is following an established social impact model which has been tested and demonstrated by research.' }
        ]} />

        <RadioButtonGroupInput fullWidth validate={required()} source="model" choices={[
            { id: '1', name: 'This business is not making money. It is dependant on donations and grants.​' },
            { id: '2', name: 'This business has some income, but is mostly dependent on grants and donations, somewhere around a 20:80 ratio.' },
            { id: '3', name: 'This company has raised cash capital, but has minimal sales, or questionably low sales volume considering its current lifespan.' },
            { id: '4', name: 'This company is on the road to profitability - the business model has clear potential, it seems the only barrier is a current lack of working capital.' },
            { id: '5', name: 'This business does not display robust profits, as it is reinvestmenting its profit into growth of the company.' },
            { id: '6', name: 'This company is already healthily profitable and sustainable, and has the ability to scale.​' }
        ]} />

        <RadioButtonGroupInput fullWidth validate={required()} source="prioritization" choices={[
            { id: '1', name: 'I really wouldn’t recommend moving forward with this enterprise.' },
            { id: '2', name: 'I don’t like it. It might be profitable, but social impact is questionable; It might have great social impact, but business model has significant holes. I don’t think this is for Kiva.' },
            { id: '3', name: 'I’m not sold on this. This isn’t a clear ‘yes’ for Kiva.' },
            { id: '4', name: 'This sounds suitable for Kiva. I would recommend considering this.' },
            { id: '5', name: 'This sounds mostly great. Only a few minor concerns with business model/social enterprise/other.' },
            { id: '6', name: 'This is a definite yes. If everything checks out, let’s send this to crowdfunding right now.' }
        ]} />


      </SimpleForm>
    </Edit>
  );
};
