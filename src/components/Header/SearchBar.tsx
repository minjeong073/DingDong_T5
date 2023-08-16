import React ,{ useState, useRef } from 'react';
import { MdClose } from 'react-icons/md';
import { Fragment, DataResult, Wrapper } from "./styled";
import type { QuestionDataType } from '../../stores/page-store';
import { useNavigate } from 'react-router-dom';
//autocomplete 

interface SearchProps{
  placeholder?:any,
  data: QuestionDataType[],
}

const SearchBar: React.FC<SearchProps> = ({
  data,
  placeholder
}): JSX.Element => {
  const [filteredData, setFilteredData] = useState<QuestionDataType[]>([]);
  const [wordEntered, setWordEntered] = useState<string>("");

  const navigate = useNavigate();

  const inputRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
  window.addEventListener("load", () => inputRef.current?.focus());

  const handleFilter = ({ target, }: React.ChangeEvent<HTMLInputElement>): void => 
  {
    const searchWord: string = target.value;
    setWordEntered(searchWord);

    const newFilter: QuestionDataType[] = data.filter(({ title, content } : QuestionDataType): boolean =>
      title.includes(searchWord) || content.includes(searchWord)
    )

    if (!searchWord) return setFilteredData([]);
    setFilteredData(newFilter);
  };

  const clearInput = (): void => {
    setFilteredData([]);
    setWordEntered("");
    inputRef.current?.focus();
  };

  return (
    <Fragment>    
      <Wrapper>
        <input
          className='SearchInput'
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
          ref={inputRef}
        />
        <div className='Div'>
          {wordEntered.length !== 0 && (
            <MdClose id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </Wrapper>
      {filteredData.length !==0 && (
        <DataResult>
          {filteredData.map(data => (
            <a
              onClick={()=>navigate(`/articles/${data._id}`)}
              key={data?._id}
              target="_blank"
            >
              {data.title}
            </a>
          ))}
        </DataResult>
      )}
    </Fragment>
  )
}

export { SearchBar }