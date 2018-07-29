import { BulkActions } from 'react-admin';
import ImportAction from './ImportAction';
import React from 'react';

export const ApplicationsBulkActions = props => (
  <BulkActions {...props}>
    <ImportAction label="Import enterprises" />
    {/*<BulkDeleteAction />*/}
  </BulkActions>
);
