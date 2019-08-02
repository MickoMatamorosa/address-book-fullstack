import React, { Component, Fragment } from 'react';

import Cancel from '@material-ui/icons/Cancel';
import Save from '@material-ui/icons/Save';

export default function Form(props){
  const { fields, handleChange, cancel, save } = props;
  const { first_name,
          last_name,
          home_phone,
          mobile_phone,
          work_phone,
          email,
          city,
          state_or_province,
          postal_code,
          country } = fields;

  return (
    <Cancel onClick={cancel} />
  )
}