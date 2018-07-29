const axios = require('axios');
const keys = require('../config/keys');

const FORMID = '62525934841965';
const ROOTURL = 'https://api.jotform.com/form';
const submissionsURL = `${ROOTURL}/${FORMID}/submissions?apiKey=${keys.API_KEY}`
const FORMURL = `${ROOTURL}/${FORMID}?apiKey=${keys.API_KEY}`;
const submissionURL ='https://api.jotform.com/submission';

const getEnterprises = async (start,end) => {
  try {
    end = end - start
    const enterprises = await axios.get(`${submissionsURL}&offset=${start}&limit=${end}`);
    return enterprises;
  } catch (e) {
    console.log(e);
  }
};

const getForm = async () => {
  try {
    const form = await axios.get(FORMURL);
    return form;
  } catch (e) {
    console.log(e);
  }
};

const getEnterprise = async (id) => {
  try {
    const url = `${submissionURL}/${id}?apiKey=${keys.API_KEY}`
    const enterprise = await axios.get(url);
    return enterprise;
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  getEnterprises,
  getForm,
  getEnterprise
};
