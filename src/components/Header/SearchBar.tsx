import React, { useState, useRef } from 'react';
import { MdClose } from 'react-icons/md';
import { Fragment, DataResult, Wrapper } from './styled';
import type { QuestionDataType } from '../../stores/page-store';
import { useLocation } from 'react-router-dom';
//autocomplete

interface SearchProps {
  placeholder?: any;
  data: QuestionDataType[];
}

const SearchBar: React.FC<SearchProps> = ({ data, placeholder }): JSX.Element => {
  const [filteredData, setFilteredData] = useState<QuestionDataType[]>([]);
  const [wordEntered, setWordEntered] = useState<string>('');

  const location = useLocation();

  const ishome = location.pathname === '/';

  const inputRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
  window.addEventListener('load', () => inputRef.current?.focus());

  const handleFilter = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
    const searchWord: string = target.value;
    setWordEntered(searchWord);

    const newFilter: QuestionDataType[] = data.filter(
      ({ title, content }: QuestionDataType): boolean => title.includes(searchWord) || content.includes(searchWord),
    );

    if (!searchWord) return setFilteredData([]);
    setFilteredData(newFilter);
  };

  const clearInput = (): void => {
    setFilteredData([]);
    setWordEntered('');
    inputRef.current?.focus();
  };

  return (
    <Fragment>
      <Wrapper $ishome={ishome}>
        <input
          className="SearchInput"
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
          ref={inputRef}
        />
        <div className="Div">{wordEntered.length !== 0 && <MdClose id="clearBtn" onClick={clearInput} />}</div>
      </Wrapper>
      {filteredData.length !== 0 && (
        <DataResult>
          {filteredData.map(({ title }, key) => (
            <a key={key} target="_blank">
              {title}
            </a>
          ))}
        </DataResult>
      )}
    </Fragment>
  );
};

export { SearchBar };
