import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchForm, Div, SearchInput } from './styled';

interface SearchProps {
  placeholder?: any,
  value?: string,
  name?: string,
  handleSubmit?: () => void,
  handleChange: () => void,
}

export const SearchBox :React.FC<SearchProps> = ({
  placeholder,
  value,
  name,
  handleSubmit,
  handleChange,
}) => {

  return(
    <Fragment>
      <SearchForm 
        onSubmit={handleSubmit}
        autoComplete='off'  
      >
        <Div>
          <SearchInput
            autoComplete='off'
            type='text'
            name={name}
            placeholder={placeholder}
            onChange={handleChange}
            value={value}
          />
        </Div>
      </SearchForm>
    </Fragment>
  )
}
