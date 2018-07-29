import React from 'react';
import { Admin, Resource, fetchUtils } from 'react-admin';
import simpleRestProvider from 'ra-data-json-server';
import authProvider from './authProvider';
import LoginPage from './Login';

import { ApplicationsList } from './ApplicationsList';
import { EnterprisesList, EnterprisesEdit } from './EnterprisesList';
import { QuestionsList, QuestionsEdit, QuestionsCreate } from './Questions';
import { AnswersList, AnswersEdit, AnswersCreate } from './Answers';
import { EvaluationsList, EvaluationsEdit, EvaluationsCreate } from './Evaluations';
import { KivaEvaluationsList, KivaEvaluationsEdit, KivaEvaluationsCreate } from './KivaEvaluations';
import { SectorsList, SectorsEdit, SectorsCreate } from './Sectors';
import { CountriesList, CountriesEdit, CountriesCreate } from './Country';
import { UsersList, UsersEdit, UsersCreate } from './Users';
import { AdminsList, AdminsEdit, AdminsCreate } from './Admins';

import addUploadFeature from "./addUploadFeature"

const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const token = localStorage.getItem('token');
    options.headers.set('Authorization', `Bearer ${token}`);
    return fetchUtils.fetchJson(url, options);
}

const dataProvider = simpleRestProvider('/api', httpClient);
const uploadCapableDataProvider = addUploadFeature(dataProvider);

const AppAdmin = () => (
  <Admin loginPage={LoginPage} dataProvider={uploadCapableDataProvider} authProvider={authProvider}>
    <Resource name="applications" list={ApplicationsList} />
    <Resource name="enterprises" list={EnterprisesList} edit={EnterprisesEdit}/>
    <Resource name="questions" list={QuestionsList} edit={QuestionsEdit} create={QuestionsCreate}/>
    <Resource name="answers" list={AnswersList} edit={AnswersEdit} create={AnswersCreate}/>
    <Resource options={{ label: 'Users Evaluations' }} name="evaluations" list={EvaluationsList} edit={EvaluationsEdit} create={EvaluationsCreate}/>
    <Resource options={{ label: 'Kiva Evaluations' }} name="kiva/evaluations" list={KivaEvaluationsList} edit={KivaEvaluationsEdit} create={KivaEvaluationsCreate}/>
    <Resource name="sectors" list={SectorsList} edit={SectorsEdit} create={SectorsCreate}/>
    <Resource name="countries" list={CountriesList} edit={CountriesEdit} create={CountriesCreate}/>
    <Resource name="users" list={UsersList}/>
    <Resource name="admins" list={AdminsList} edit={AdminsEdit} create={AdminsCreate}/>
  </Admin>
);

export default AppAdmin;
