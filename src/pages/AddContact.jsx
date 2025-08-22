import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useGlobalReducer from '../hooks/useGlobalReducer'
import ContactPage from '../components/ContactPage';

export const AddContact = () => {
  return (
    <ContactPage title="Add New Contact" />
  );
};
