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
  SimpleFormIterator,
  BooleanField
} from 'react-admin';

export const EnterprisesList = props => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <BooleanField source="published" />
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

const length = (message = 'Should have less than 150 characters') =>
    value => value && value.length <= 150 ? undefined : message;


const number = (message = 'Must be a number') =>
    value => value && isNaN(Number(value)) ? message : undefined;

export const EnterprisesEdit = props => (
  <Edit title={<EnterprisesTitle />} {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <TextInput label="Name" source="name" />
      <TextInput label="Email Address" source="email" type="email" />
      <TextInput label="Loan Size" source="loan" validate={ [required(), number()] } />
      <ReferenceInput label="Sectors" source="sector_id" reference="sectors" validate={required()}>
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput label="Country" source="country_id" reference="countries" validate={required()}>
        <SelectInput optionText="name" />
      </ReferenceInput>
      <LongTextInput source="loanPurpose" />
      <LongTextInput label="Business Model" source="business" />
      <TextInput label="Asset Size" source="asset" validate={ number() } />
      <TextInput label="Previous Year Sales Revenue" source="salesRevenue" validate={ number() } />
      <TextInput label="Ownerhip Status" source="ownershipStatus" />
      <TextInput label="Number of Paid Employees" source="paidEmployees" />

      <LongTextInput label="Initial Loan Inquiry" source="loanInquiry"  />
      <LongTextInput label="Loan Application" source="loanApplication"  />
      <LongTextInput label="Management Team Profile" source="managementTeam" />
      <LongTextInput label="Board and Management Team" source="boardAndManagement"  />
      <LongTextInput label="Zero Tool link" source="zeroTool"  />
      <LongTextInput label="Latest Financial Statement" source="latestFinancial" />

      <LongTextInput label="Anual Report" source="anualReport"  />
      <LongTextInput label="Board of Directors" source="boardOfDirectors"  />
      <LongTextInput label="Management Team" source="managementTeam"  />
      <LongTextInput label="Impact Study" source="impactStudy"  />
      <LongTextInput label="Business Plan" source="businessPlan"  />
      <LongTextInput label="Certificate of Incorporation" source="certificateIncorporation"  />
      <LongTextInput label="Historical Financial Statements" source="historicalFinancial"  />
      <LongTextInput label="YTD Financial Statements" source="YDTFinancial"  />

      <LongTextInput label="Short Description max 150 characters"  validate={ [required(), length()]} source="shortDescription"  />
      <LongTextInput label="Description" source="description"  />
      <TextInput label="Began Operating" source="beganOperating" validate={ number() } />
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
