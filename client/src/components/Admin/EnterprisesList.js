import React from 'react';
import {
  List,
  Edit,
  Create,
  Datagrid,
  ReferenceField,
  TextField,
  EditButton,
  DisabledInput,
  LongTextInput,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput,
  DateInput,
  BooleanInput,
  ImageField,
  ImageInput,
  ArrayInput,
  SimpleFormIterator
} from 'react-admin';

export const EnterprisesList = props => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField label="Name" source="name" />
      <EditButton />
    </Datagrid>
  </List>
);

export const EnterprisesTitle = ({ record }) => {
  return <span> {record ? `${record.name}` : ''}</span>;
};

const required = (message = 'Required') =>
    value => value ? undefined : message;

export const EnterprisesEdit = props => (
  <Edit title={<EnterprisesTitle />} {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <TextInput source="name" />
      <TextInput label="Email Address" source="email" type="email" />
      <TextInput label="Loan Size" source="loan" validate={required()} />
      <ReferenceInput label="Sectors" source="sector_id" reference="sectors" validate={required()}>
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput label="Country" source="country_id" reference="countries" validate={required()}>
        <SelectInput optionText="name" />
      </ReferenceInput>
      <LongTextInput source="loanPurpose" />
      <LongTextInput label="Business Model" source="business" />
      <LongTextInput label="Asset Size" source="asset" />
      <LongTextInput label="Previous Year Sales Revenue" source="salesRevenue" />
      <LongTextInput label="Ownerhip Status" source="ownershipStatus" />
      <LongTextInput label="Number of Paid Employees" source="paidEmployees" />
      <DateInput label="Began Operating" source="beganOperating" />
      <DateInput label="End Date" source="endDate" validate={required()} />

      <ImageField source="Images" src="url" title="Picture" />

      <ImageInput source="pictures" label="Related pictures" multiple accept="image/*" placeholder={<p>Drop your files here 600 x 400</p>}>
        <ImageField source="src" title="title" />
      </ImageInput>

      <ArrayInput source="Images">
          <SimpleFormIterator disableAdd>
              <TextInput source="url" />
          </SimpleFormIterator>
      </ArrayInput>

      <BooleanInput label="Published" source="published" />
    </SimpleForm>
  </Edit>
);
