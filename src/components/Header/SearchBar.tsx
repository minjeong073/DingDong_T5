import React, { useState, useRef } from 'react';
import { MdClose } from 'react-icons/md';
import { Fragment, DataResult, Wrapper } from './styled';
import type { QuestionDataType } from '../../stores/page-store';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
//autocomplete 
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

  const navigate = useNavigate();

  const inputRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
  window.addEventListener('load', () => inputRef.current?.focus());

  const handleFilter = ({ target, }: React.ChangeEvent<HTMLInputElement>): void => 
  {
    const searchWord: string = target.value.toLowerCase();
    setWordEntered(searchWord);

    const newFilter: QuestionDataType[] = data.filter(({ title, content } : QuestionDataType): boolean =>
      title.toLowerCase().includes(searchWord) || content.toLowerCase().includes(searchWord)
    )

    if (!searchWord) return setFilteredData([]);
    setFilteredData(newFilter);
  };

  const truncateText = (text:string, selectedWord:string, maxLength:number) => {
    const startIndex = text.indexOf(selectedWord);
    const endIndex = startIndex + selectedWord.length;

    let truncatedText = text.replace(/[ \t\r\n]+/g, ' ').trim().replace(/</g, '&lt;').replace(/>/g, '&gt;'); 
    // replace(/</g, '&lt;').replace(/>/g, '&gt;');     
    // truncatedText.;

    if(startIndex >= 0 ){
      const truncatedStartIndex = Math.max(0, startIndex - maxLength);
      const truncatedEndIndex = Math.min(text.length, endIndex + maxLength);

      truncatedText =
        (truncatedStartIndex > 0 ? '...' : '') +
        text.substring(truncatedStartIndex, truncatedEndIndex) +
        (truncatedEndIndex < text.length ? '...' : '');
    }
    return truncatedText;
  };

  const clearInput = (): void => {
    setFilteredData([]);
    setWordEntered('');
    inputRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter'){
      navigateSearchPage();
    }
  }

  const navigateSearchPage = () => {
    if(filteredData){
      navigate(`/search?keyword=${encodeURIComponent(wordEntered.trim())}`);
    }else{
      alert('관련된 키워드가 담긴 게시글이 없습니다!');
    }
  }

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
          onKeyPress={handleKeyPress}
        />
        <div className="Div">{wordEntered.length !== 0 && <MdClose id="clearBtn" onClick={clearInput} />}</div>
      </Wrapper>
      {filteredData.length !== 0 && (
        <DataResult>
          {filteredData.map(data => (
            <a
              onClick={()=>navigate(`/articles/${data._id}`)}
              key={data?._id}
              target="_blank"
            >
              <span className='title'>
              {data.title}
              </span>
              <span 
                className='content'
                dangerouslySetInnerHTML={
                  data.content.includes(wordEntered)
                  ? {__html: DOMPurify.sanitize(
                    truncateText(data.content, wordEntered, 10)
                    ),}
                  : undefined                
                }
              />
            </a>
          ))}
        </DataResult>
      )}
    </Fragment>
  );
};

export { SearchBar };
